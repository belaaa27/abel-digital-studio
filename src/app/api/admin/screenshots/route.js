import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { hashSessionToken } from "@/lib/auth";
import dns from "node:dns/promises";
import net from "node:net";
import crypto from "node:crypto";
import ipaddr from "ipaddr.js";

export const runtime = "nodejs";

const MAX_URL_LENGTH = 2048;
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const SCREENSHOT_TIMEOUT_MS = 30_000;
const CLOUDINARY_TIMEOUT_MS = 15_000;

async function verifyAdminSession() {
  let cookieStore;

  try {
    cookieStore = await cookies();
  } catch {
    return { adminUser: null, dbError: true };
  }

  const sessionToken = cookieStore.get("abel_admin_session")?.value;

  if (!sessionToken) {
    return { adminUser: null, dbError: false };
  }

  try {
    const tokenHash = hashSessionToken(sessionToken);
    const session = await prisma.adminSession.findUnique({
      where: { tokenHash },
      include: { adminUser: true },
    });

    if (!session || session.expiresAt < new Date()) {
      return { adminUser: null, dbError: false };
    }

    return { adminUser: session.adminUser, dbError: false };
  } catch {
    console.error("Admin session verification failed.");
    return { adminUser: null, dbError: true };
  }
}

// Strict IP classification: reject anything not classified as unicast.
function isPublicUnicastIP(ipString) {
  try {
    let address = ipaddr.parse(ipString);

    if (address.kind() === "ipv6" && address.isIPv4MappedAddress()) {
      address = address.toIPv4Address();
    }

    return address.range() === "unicast";
  } catch {
    return false;
  }
}

async function isAllowedPublicUrl(urlString) {
  try {
    if (
      typeof urlString !== "string" ||
      urlString.length === 0 ||
      urlString.length > MAX_URL_LENGTH
    ) {
      return false;
    }

    const parsed = new URL(urlString);

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return false;
    }

    // Reject URLs containing embedded credentials.
    if (parsed.username || parsed.password) {
      return false;
    }

    const hostname = parsed.hostname.toLowerCase().replace(/\.$/, "");

    if (
      !hostname ||
      hostname === "localhost" ||
      hostname.endsWith(".localhost") ||
      hostname.endsWith(".local") ||
      hostname.endsWith(".internal") ||
      hostname.endsWith(".test") ||
      hostname.endsWith(".invalid")
    ) {
      return false;
    }

    if (net.isIP(hostname)) {
      return isPublicUnicastIP(hostname);
    }

    // Reject the URL if DNS fails or any returned address is restricted.
    const records = await dns.lookup(hostname, { all: true });

    if (!records.length) {
      return false;
    }

    return records.every((record) => isPublicUnicastIP(record.address));
  } catch {
    return false;
  }
}

function isPng(buffer) {
  const signature = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  ]);

  return (
    buffer.length >= signature.length &&
    buffer.subarray(0, signature.length).equals(signature)
  );
}

async function readPngResponse(response) {
  const contentType = (response.headers.get("content-type") || "")
    .split(";")[0]
    .trim()
    .toLowerCase();

  if (contentType !== "image/png" || !response.body) {
    try {
      await response.body?.cancel();
    } catch {
      // Ignore cleanup errors.
    }

    throw new Error("Invalid screenshot response.");
  }

  const reader = response.body.getReader();
  const chunks = [];
  let totalBytes = 0;
  let completed = false;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        completed = true;
        break;
      }

      totalBytes += value.byteLength;

      if (totalBytes > MAX_IMAGE_SIZE) {
        throw new Error("Screenshot exceeds size limit.");
      }

      chunks.push(Buffer.from(value));
    }
  } finally {
    if (!completed) {
      try {
        await reader.cancel();
      } catch {
        // Preserve the original error.
      }
    }

    try {
      reader.releaseLock();
    } catch {
      // Ignore cleanup errors.
    }
  }

  const buffer = Buffer.concat(chunks);

  if (!isPng(buffer)) {
    throw new Error("Screenshot is not a valid PNG.");
  }

  return buffer;
}

export async function POST(request) {
  const { adminUser, dbError } = await verifyAdminSession();

  if (dbError) {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }

  if (!adminUser) {
    return NextResponse.json(
      { error: "Unauthorized access." },
      { status: 401 },
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const url = typeof body?.url === "string" ? body.url.trim() : "";

  if (!(await isAllowedPublicUrl(url))) {
    return NextResponse.json(
      {
        error: "Enter a valid public website URL using HTTP or HTTPS.",
      },
      { status: 400 },
    );
  }

  const accessKey = process.env.SCREENSHOTONE_ACCESS_KEY;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!accessKey || !cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Screenshot service is not configured." },
      { status: 500 },
    );
  }

  // 1. Capture the public website using ScreenshotOne.
  const screenshotController = new AbortController();
  const screenshotTimer = setTimeout(
    () => screenshotController.abort(),
    SCREENSHOT_TIMEOUT_MS,
  );

  let imageBuffer;

  try {
    const params = new URLSearchParams({
      access_key: accessKey,
      url,
      viewport_width: "1280",
      viewport_height: "800",
      device_scale_factor: "1",
      format: "png",
      block_ads: "true",
      dark_mode: "false",
      delay: "2",
      timeout: "25",
    });

    const response = await fetch(
      `https://api.screenshotone.com/take?${params.toString()}`,
      {
        signal: screenshotController.signal,
        redirect: "error",
      },
    );

    if (!response.ok) {
      try {
        await response.body?.cancel();
      } catch {
        // Ignore cleanup errors.
      }

      console.error(
        "Screenshot provider returned HTTP status:",
        response.status,
      );

      return NextResponse.json(
        { error: "Unable to capture this website." },
        { status: 502 },
      );
    }

    imageBuffer = await readPngResponse(response);
  } catch (error) {
    const timedOut = error?.name === "AbortError";

    console.error(
      "Screenshot capture failed. Error type:",
      timedOut ? "Timeout" : error?.name || "Unknown",
    );

    return NextResponse.json(
      {
        error: timedOut
          ? "Screenshot capture timed out. Please try again."
          : "Unable to capture this website.",
      },
      { status: timedOut ? 504 : 502 },
    );
  } finally {
    clearTimeout(screenshotTimer);
  }

  // 2. Upload the PNG to Cloudinary.
  const cloudController = new AbortController();
  const cloudTimer = setTimeout(
    () => cloudController.abort(),
    CLOUDINARY_TIMEOUT_MS,
  );

  try {
    const timestamp = Math.floor(Date.now() / 1000);

    const signature = crypto
      .createHash("sha1")
      .update(`timestamp=${timestamp}${apiSecret}`)
      .digest("hex");

    const uploadForm = new FormData();

    uploadForm.append(
      "file",
      new Blob([imageBuffer], { type: "image/png" }),
      "website-screenshot.png",
    );
    uploadForm.append("api_key", apiKey);
    uploadForm.append("timestamp", String(timestamp));
    uploadForm.append("signature", signature);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: uploadForm,
        signal: cloudController.signal,
        redirect: "error",
      },
    );

    if (!response.ok) {
      try {
        await response.body?.cancel();
      } catch {
        // Ignore cleanup errors.
      }

      console.error("Cloudinary returned HTTP status:", response.status);

      return NextResponse.json(
        { error: "Unable to store the screenshot." },
        { status: 502 },
      );
    }

    const result = await response.json();
    const secureUrl = result?.secure_url;

    if (typeof secureUrl !== "string") {
      throw new Error("Invalid Cloudinary response.");
    }

    const parsedUrl = new URL(secureUrl);

    if (
      parsedUrl.protocol !== "https:" ||
      parsedUrl.hostname !== "res.cloudinary.com" ||
      parsedUrl.username ||
      parsedUrl.password ||
      !parsedUrl.pathname.startsWith(`/${cloudName}/`)
    ) {
      throw new Error("Invalid Cloudinary image URL.");
    }

    return NextResponse.json({ imageUrl: secureUrl }, { status: 200 });
  } catch (error) {
    const timedOut = error?.name === "AbortError";

    console.error(
      "Screenshot storage failed. Error type:",
      timedOut ? "Timeout" : error?.name || "Unknown",
    );

    return NextResponse.json(
      {
        error: timedOut
          ? "Screenshot upload timed out. Please try again."
          : "Unable to store the screenshot.",
      },
      { status: timedOut ? 504 : 502 },
    );
  } finally {
    clearTimeout(cloudTimer);
  }
}
