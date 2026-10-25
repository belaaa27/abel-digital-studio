import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  SESSION_COOKIE_NAME,
  SESSION_DURATION_SECONDS,
  createSessionToken,
  hashSessionToken,
  getSessionCookieOptions,
} from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type must be application/json." },
        { status: 415 },
      );
    }

    const body = await request.json();
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (
      !email ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !password ||
      password.length > 1024
    ) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 400 },
      );
    }

    const admin = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const now = new Date();

    await prisma.adminSession.deleteMany({
      where: { expiresAt: { lte: now } },
    });

    const token = createSessionToken();
    const tokenHash = hashSessionToken(token);
    const expiresAt = new Date(now.getTime() + SESSION_DURATION_SECONDS * 1000);

    await prisma.adminSession.create({
      data: {
        tokenHash,
        adminUserId: admin.id,
        expiresAt,
      },
    });

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
      admin: { email: admin.email },
    });

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      ...getSessionCookieOptions(),
      expires: expiresAt,
    });

    return response;
  } catch (error) {
    console.error("Admin login failed:", error);

    return NextResponse.json(
      { error: "Unable to log in right now. Check the server terminal." },
      { status: 500 },
    );
  }
}
