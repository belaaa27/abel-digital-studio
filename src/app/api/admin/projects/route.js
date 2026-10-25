import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { hashSessionToken } from "@/lib/auth";

/**
 * Helper to verify server-side HttpOnly session cookie against database records.
 * Returns { admin: adminUser, dbError: false } on success/unauthorized, or { dbError: true } on database failure.
 */
async function verifyAdminSession() {
  let cookieStore;
  try {
    cookieStore = await cookies();
  } catch (err) {
    console.error("Error reading cookies:", err);
    return { admin: null, dbError: true };
  }

  const token = cookieStore.get("abel_admin_session")?.value;
  if (!token) {
    return { admin: null, dbError: false };
  }

  try {
    const tokenHash = hashSessionToken(token);

    const session = await prisma.adminSession.findUnique({
      where: { tokenHash },
      include: {
        adminUser: {
          select: {
            id: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            // Strictly exclude passwordHash from selection
          },
        },
      },
    });

    if (!session || !session.adminUser) {
      return { admin: null, dbError: false };
    }

    // Check expiration
    if (new Date(session.expiresAt) < new Date()) {
      return { admin: null, dbError: false };
    }

    return { admin: session.adminUser, dbError: false };
  } catch (err) {
    console.error("Admin session database verification error:", err);
    return { admin: null, dbError: true };
  }
}

/**
 * Validates whether a given string is a valid absolute HTTP or HTTPS URL.
 */
function isValidHttpUrl(stringUrl) {
  try {
    const parsedUrl = new URL(stringUrl);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * GET /api/admin/projects
 * Fetches all project records (published & drafts) for authenticated admin sessions.
 */
export async function GET() {
  const { admin, dbError } = await verifyAdminSession();

  if (dbError) {
    return NextResponse.json(
      { error: "Internal server error while verifying session." },
      { status: 500 },
    );
  }

  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized access. Valid admin session required." },
      { status: 401 },
    );
  }

  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ projects }, { status: 200 });
  } catch (err) {
    console.error("Error fetching admin projects:", err);
    return NextResponse.json(
      { error: "Internal server error while fetching projects." },
      { status: 500 },
    );
  }
}

/**
 * POST /api/admin/projects
 * Validates input fields and creates a new project record for authenticated admins.
 */
export async function POST(request) {
  const { admin, dbError } = await verifyAdminSession();

  if (dbError) {
    return NextResponse.json(
      { error: "Internal server error while verifying session." },
      { status: 500 },
    );
  }

  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized access. Valid admin session required." },
      { status: 401 },
    );
  }

  // 1. Parse JSON body safely
  let body;
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: ["Invalid or malformed JSON payload in request body."],
      },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: ["Request body must be a non-null JSON object."],
      },
      { status: 400 },
    );
  }

  const errors = [];

  // 2. Extract & type-check inputs
  let {
    title,
    slug,
    description,
    category,
    liveUrl,
    githubUrl,
    imageUrl,
    featured,
    published,
  } = body;

  // Validate String Fields & Types
  if (title === undefined || title === null) {
    errors.push("Title is required.");
  } else if (typeof title !== "string") {
    errors.push("Title must be a text string.");
  } else {
    title = title.trim();
    if (title.length < 2 || title.length > 150) {
      errors.push("Title must be between 2 and 150 characters.");
    }
  }

  if (slug === undefined || slug === null) {
    errors.push("Slug is required.");
  } else if (typeof slug !== "string") {
    errors.push("Slug must be a text string.");
  } else {
    slug = slug.trim().toLowerCase();
    if (slug.length < 2 || slug.length > 150) {
      errors.push("Slug must be between 2 and 150 characters.");
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      errors.push(
        "Slug must contain only lowercase alphanumeric characters and hyphens (e.g., 'kora-leather').",
      );
    }
  }

  if (description === undefined || description === null) {
    errors.push("Description is required.");
  } else if (typeof description !== "string") {
    errors.push("Description must be a text string.");
  } else {
    description = description.trim();
    if (description.length < 5 || description.length > 2000) {
      errors.push("Description must be between 5 and 2000 characters.");
    }
  }

  if (category === undefined || category === null) {
    errors.push("Category is required.");
  } else if (typeof category !== "string") {
    errors.push("Category must be a text string.");
  } else {
    category = category.trim();
    if (category.length < 2 || category.length > 100) {
      errors.push("Category must be between 2 and 100 characters.");
    }
  }

  // Validate Optional URLs
  if (liveUrl !== undefined && liveUrl !== null && liveUrl !== "") {
    if (typeof liveUrl !== "string") {
      errors.push("Live URL must be a text string.");
    } else {
      liveUrl = liveUrl.trim();
      if (liveUrl.length > 500) {
        errors.push("Live URL must not exceed 500 characters.");
      } else if (!isValidHttpUrl(liveUrl)) {
        errors.push(
          "Live URL must be a valid absolute HTTP or HTTPS URL (e.g., 'https://example.com').",
        );
      }
    }
  } else {
    liveUrl = null;
  }

  if (githubUrl !== undefined && githubUrl !== null && githubUrl !== "") {
    if (typeof githubUrl !== "string") {
      errors.push("GitHub URL must be a text string.");
    } else {
      githubUrl = githubUrl.trim();
      if (githubUrl.length > 500) {
        errors.push("GitHub URL must not exceed 500 characters.");
      } else if (!isValidHttpUrl(githubUrl)) {
        errors.push(
          "GitHub URL must be a valid absolute HTTP or HTTPS URL (e.g., 'https://github.com/user/repo').",
        );
      }
    }
  } else {
    githubUrl = null;
  }

  if (imageUrl !== undefined && imageUrl !== null && imageUrl !== "") {
    if (typeof imageUrl !== "string") {
      errors.push("Image URL must be a text string.");
    } else {
      imageUrl = imageUrl.trim();
      if (imageUrl.length > 500) {
        errors.push("Image URL must not exceed 500 characters.");
      } else if (!isValidHttpUrl(imageUrl)) {
        errors.push(
          "Image URL must be a valid absolute HTTP or HTTPS URL (e.g., 'https://example.com/image.jpg').",
        );
      }
    }
  } else {
    imageUrl = null;
  }

  // Validate Boolean Flags (Strictly no type coercion of "false" string, numbers, or null)
  if (featured !== undefined) {
    if (typeof featured !== "boolean") {
      errors.push("Featured flag must be a boolean (true or false).");
    }
  } else {
    featured = false;
  }

  if (published !== undefined) {
    if (typeof published !== "boolean") {
      errors.push("Published flag must be a boolean (true or false).");
    }
  } else {
    published = false;
  }

  if (errors.length > 0) {
    return NextResponse.json(
      { error: "Validation failed", details: errors },
      { status: 400 },
    );
  }

  // 3. Pre-check for duplicate slug
  try {
    const existingProject = await prisma.project.findUnique({
      where: { slug },
    });

    if (existingProject) {
      return NextResponse.json(
        {
          error: "Conflict",
          details: [`A project with the slug '${slug}' already exists.`],
        },
        { status: 409 },
      );
    }

    // 4. Create project record with unique constraint fallback handling
    const newProject = await prisma.project.create({
      data: {
        title,
        slug,
        description,
        category,
        liveUrl,
        githubUrl,
        imageUrl,
        featured,
        published,
      },
    });

    return NextResponse.json(
      { message: "Project created successfully", project: newProject },
      { status: 201 },
    );
  } catch (err) {
    // Handle Prisma P2002 Unique Constraint violation error cleanly
    if (err?.code === "P2002") {
      return NextResponse.json(
        {
          error: "Conflict",
          details: [`A project with the slug '${slug}' already exists.`],
        },
        { status: 409 },
      );
    }

    console.error("Error creating project:", err);
    return NextResponse.json(
      { error: "Internal server error while creating project." },
      { status: 500 },
    );
  }
}
