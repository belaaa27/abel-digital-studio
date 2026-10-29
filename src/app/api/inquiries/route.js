import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

// Simple in-memory rate limiting store (IP / timestamp map)
const submissionTracker = new Map();

// Small, reusable HTML-escaping helper for email templates
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request) {
  try {
    // 1. Basic Rate Limiting Check (per-instance sliding window)
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute window
    const maxSubmissions = 5;

    if (ip !== "unknown") {
      const history = submissionTracker.get(ip) || [];
      const recent = history.filter((timestamp) => now - timestamp < windowMs);
      if (recent.length >= maxSubmissions) {
        return NextResponse.json(
          { error: "Too many submissions. Please try again later." },
          { status: 429 },
        );
      }
      recent.push(now);
      submissionTracker.set(ip, recent);
    }

    const body = await request.json();

    // 2. Honeypot check for spam bots
    if (body.website || body.fax || body.company_hp) {
      return NextResponse.json({ success: true, message: "Inquiry received." });
    }

    // 3. Server-side validation and normalization
    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const company = body.company ? String(body.company).trim() : null;
    const projectType = String(body.projectType || "").trim();
    const budget = body.budget ? String(body.budget).trim() : null;
    const timeline = body.timeline ? String(body.timeline).trim() : null;
    const description = String(body.description || "").trim();

    if (!fullName || fullName.length > 100) {
      return NextResponse.json(
        { error: "Valid full name is required." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 254) {
      return NextResponse.json(
        { error: "Valid email address is required." },
        { status: 400 },
      );
    }

    const allowedProjectTypes = [
      "Landing page",
      "Business website",
      "Dashboard",
      "E-commerce",
      "Full-stack custom solution",
      "Backend/API development",
      "UI implementation",
      "Other",
    ];

    if (!allowedProjectTypes.includes(projectType)) {
      return NextResponse.json(
        { error: "Invalid project type selected." },
        { status: 400 },
      );
    }

    if (!description || description.length < 10 || description.length > 5000) {
      return NextResponse.json(
        { error: "Project description is required (min 10 characters)." },
        { status: 400 },
      );
    }

    // 4. Database Persistence (Save first before email)
    const inquiry = await prisma.inquiry.create({
      data: {
        fullName,
        email,
        company,
        projectType,
        budget,
        timeline,
        description,
        status: "UNREAD",
      },
    });

    // 5. Email Notification via Nodemailer (Await with try/catch)
    let emailDelivered = false;
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const recipient =
        process.env.CONTACT_RECIPIENT_EMAIL || "abelmillionnov07@gmail.com";

      // HTML-escaped versions for safe injection into the email HTML body
      const safeFullName = escapeHtml(fullName);
      const safeEmail = escapeHtml(email);
      const safeCompany = escapeHtml(company);
      const safeProjectType = escapeHtml(projectType);
      const safeBudget = escapeHtml(budget);
      const safeTimeline = escapeHtml(timeline);
      const safeDescription = escapeHtml(description);

      await transporter.sendMail({
        from: `"ABEL / DIGITAL Studio" <${process.env.SMTP_USER || recipient}>`,
        to: recipient,
        subject: `[New Inquiry] ${projectType} — ${fullName}`,
        text: `You have received a new project inquiry from your portfolio website.\n\nName: ${fullName}\nEmail: ${email}\nCompany: ${company || "N/A"}\nProject Type: ${projectType}\nBudget: ${budget || "N/A"}\nTimeline: ${timeline || "N/A"}\n\nDescription:\n${description}\n\nInquiry ID: ${inquiry.id}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #183D2B; background-color: #F4EFE6; padding: 24px; border-radius: 12px;">
            <h2 style="border-bottom: 1px solid #183D2B33; padding-bottom: 12px;">New Project Inquiry</h2>
            <p><strong>Name:</strong> ${safeFullName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${safeEmail}</a></p>
            <p><strong>Company:</strong> ${safeCompany || "N/A"}</p>
            <p><strong>Project Type:</strong> ${safeProjectType}</p>
            <p><strong>Budget:</strong> ${safeBudget || "N/A"}</p>
            <p><strong>Timeline:</strong> ${safeTimeline || "N/A"}</p>
            <h3 style="margin-top: 20px;">Description:</h3>
            <p style="background: #ffffff; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${safeDescription}</p>
            <p style="font-size: 11px; color: #666; margin-top: 30px;">Inquiry ID: ${inquiry.id}</p>
          </div>
        `,
      });
      emailDelivered = true;
    } catch (emailError) {
      console.error("Email notification dispatch failed:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry saved successfully.",
      emailDelivered,
    });
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 },
    );
  }
}
