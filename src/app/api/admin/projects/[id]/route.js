import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { hashSessionToken } from "@/lib/auth";

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
  } catch (err) {
    console.error("Session verification database error:", err);
    return { adminUser: null, dbError: true };
  }
}

/**
 * Normalizes comma-separated technology tags string: trims, filters empty entries, and deduplicates.
 */
function normalizeTags(tagsInput) {
  if (tagsInput === undefined || tagsInput === null || tagsInput === "") {
    return null;
  }
  if (typeof tagsInput !== "string") {
    return null;
  }
  const tagsArray = tagsInput
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  return tagsArray.length > 0 ? [...new Set(tagsArray)].join(", ") : null;
}

export async function PATCH(request, { params }) {
  const { adminUser, dbError } = await verifyAdminSession();
  if (dbError) {
    return NextResponse.json(
      { error: "Internal server error during session verification." },
      { status: 500 },
    );
  }
  if (!adminUser) {
    return NextResponse.json(
      { error: "Unauthorized access. Valid admin session required." },
      { status: 401 },
    );
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { error: "Validation failed", details: ["Project ID is required."] },
      { status: 400 },
    );
  }

  let body;
  try {
    const text = await request.text();
    if (!text) {
      body = {};
    } else {
      body = JSON.parse(text);
    }
  } catch {
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
        details: ["Request body must be a valid JSON object."],
      },
      { status: 400 },
    );
  }

  let existingProject;
  try {
    existingProject = await prisma.project.findUnique({
      where: { id },
    });
  } catch (err) {
    console.error("Database error finding project:", err);
    return NextResponse.json(
      { error: "Internal server error while checking project existence." },
      { status: 500 },
    );
  }

  if (!existingProject) {
    return NextResponse.json(
      { error: "Not Found", details: [`Project with ID '${id}' not found.`] },
      { status: 404 },
    );
  }

  const {
    title,
    slug,
    category,
    description,
    liveUrl,
    githubUrl,
    imageUrl,
    tags,
    featured,
    published,
  } = body;

  const errors = [];

  let cleanTitle = undefined;
  if (title !== undefined) {
    if (typeof title !== "string") {
      errors.push("Title must be a text string.");
    } else {
      cleanTitle = title.trim();
      if (!cleanTitle || cleanTitle.length < 2 || cleanTitle.length > 150) {
        errors.push(
          "Title is required and must be between 2 and 150 characters.",
        );
      }
    }
  }

  let cleanSlug = undefined;
  if (slug !== undefined) {
    if (typeof slug !== "string") {
      errors.push("Slug must be a text string.");
    } else {
      cleanSlug = slug.trim().toLowerCase();
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (!cleanSlug || !slugRegex.test(cleanSlug) || cleanSlug.length > 150) {
        errors.push(
          "Slug is required and must be lowercase alphanumeric with hyphens (e.g. 'kora-leather').",
        );
      }
    }
  }

  let cleanCategory = undefined;
  if (category !== undefined) {
    if (typeof category !== "string") {
      errors.push("Category must be a text string.");
    } else {
      cleanCategory = category.trim();
      if (!cleanCategory || cleanCategory.length > 100) {
        errors.push("Category is required and must be under 100 characters.");
      }
    }
  }

  let cleanDescription = undefined;
  if (description !== undefined) {
    if (typeof description !== "string") {
      errors.push("Description must be a text string.");
    } else {
      cleanDescription = description.trim();
      if (
        !cleanDescription ||
        cleanDescription.length < 5 ||
        cleanDescription.length > 2000
      ) {
        errors.push(
          "Description is required and must be between 5 and 2000 characters.",
        );
      }
    }
  }

  const validateUrl = (urlVal, fieldName) => {
    if (urlVal === undefined) return undefined;
    if (urlVal === null || urlVal === "") return null;
    if (typeof urlVal !== "string") {
      errors.push(`${fieldName} must be a text string URL.`);
      return undefined;
    }
    const trimmed = urlVal.trim();
    if (trimmed === "") return null;
    if (trimmed.length > 500) {
      errors.push(`${fieldName} must not exceed 500 characters.`);
      return undefined;
    }
    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        errors.push(`${fieldName} must use http or https protocol.`);
        return undefined;
      }
      return trimmed;
    } catch {
      errors.push(
        `${fieldName} must be a valid absolute HTTP or HTTPS URL (e.g., 'https://example.com').`,
      );
      return undefined;
    }
  };

  const cleanLiveUrl = validateUrl(liveUrl, "Live URL");
  const cleanGithubUrl = validateUrl(githubUrl, "GitHub URL");
  const cleanImageUrl = validateUrl(imageUrl, "Image URL");

  let cleanTags = undefined;
  if (tags !== undefined) {
    if (tags !== null && tags !== "" && typeof tags !== "string") {
      errors.push("Tags must be a text string.");
    } else {
      cleanTags = normalizeTags(tags);
    }
  }

  let cleanFeatured = undefined;
  if (featured !== undefined) {
    if (typeof featured !== "boolean") {
      errors.push("Featured flag must be a boolean (true or false).");
    } else {
      cleanFeatured = featured;
    }
  }

  let cleanPublished = undefined;
  if (published !== undefined) {
    if (typeof published !== "boolean") {
      errors.push("Published flag must be a boolean (true or false).");
    } else {
      cleanPublished = published;
    }
  }

  if (errors.length > 0) {
    return NextResponse.json(
      { error: "Validation failed", details: errors },
      { status: 400 },
    );
  }

  if (cleanSlug && cleanSlug !== existingProject.slug) {
    try {
      const duplicate = await prisma.project.findUnique({
        where: { slug: cleanSlug },
      });
      if (duplicate) {
        return NextResponse.json(
          {
            error: "Conflict",
            details: [`A project with the slug '${cleanSlug}' already exists.`],
          },
          { status: 409 },
        );
      }
    } catch (err) {
      console.error("Database error checking duplicate slug:", err);
      return NextResponse.json(
        { error: "Internal server error while verifying slug uniqueness." },
        { status: 500 },
      );
    }
  }

  const updateData = {};
  if (cleanTitle !== undefined) updateData.title = cleanTitle;
  if (cleanSlug !== undefined) updateData.slug = cleanSlug;
  if (cleanCategory !== undefined) updateData.category = cleanCategory;
  if (cleanDescription !== undefined) updateData.description = cleanDescription;
  if (cleanLiveUrl !== undefined) updateData.liveUrl = cleanLiveUrl;
  if (cleanGithubUrl !== undefined) updateData.githubUrl = cleanGithubUrl;
  if (cleanImageUrl !== undefined) updateData.imageUrl = cleanImageUrl;
  if (cleanTags !== undefined) updateData.tags = cleanTags;
  if (cleanFeatured !== undefined) updateData.featured = cleanFeatured;
  if (cleanPublished !== undefined) updateData.published = cleanPublished;

  try {
    const updatedProject = await prisma.project.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(
      { message: "Project updated successfully", project: updatedProject },
      { status: 200 },
    );
  } catch (err) {
    if (err.code === "P2002") {
      return NextResponse.json(
        {
          error: "Conflict",
          details: ["A project with this slug already exists."],
        },
        { status: 409 },
      );
    }
    console.error("Database error updating project:", err);
    return NextResponse.json(
      { error: "Internal server error while updating project." },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  const { adminUser, dbError } = await verifyAdminSession();
  if (dbError) {
    return NextResponse.json(
      { error: "Internal server error during session verification." },
      { status: 500 },
    );
  }
  if (!adminUser) {
    return NextResponse.json(
      { error: "Unauthorized access. Valid admin session required." },
      { status: 401 },
    );
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { error: "Validation failed", details: ["Project ID is required."] },
      { status: 400 },
    );
  }

  let existingProject;
  try {
    existingProject = await prisma.project.findUnique({
      where: { id },
    });
  } catch (err) {
    console.error("Database error finding project for deletion:", err);
    return NextResponse.json(
      { error: "Internal server error while checking project existence." },
      { status: 500 },
    );
  }

  if (!existingProject) {
    return NextResponse.json(
      { error: "Not Found", details: [`Project with ID '${id}' not found.`] },
      { status: 404 },
    );
  }

  try {
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Project deleted successfully", id },
      { status: 200 },
    );
  } catch (err) {
    console.error("Database error deleting project:", err);
    return NextResponse.json(
      { error: "Internal server error while deleting project." },
      { status: 500 },
    );
  }
}
