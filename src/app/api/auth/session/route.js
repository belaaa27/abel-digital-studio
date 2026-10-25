import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  SESSION_COOKIE_NAME,
  hashSessionToken,
  getSessionCookieOptions,
} from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const tokenHash = hashSessionToken(token);

    const session = await prisma.adminSession.findUnique({
      where: { tokenHash },
      include: {
        adminUser: {
          select: { id: true, email: true },
        },
      },
    });

    if (!session || session.expiresAt <= new Date()) {
      if (session) {
        await prisma.adminSession.delete({
          where: { id: session.id },
        });
      }

      const response = NextResponse.json(
        { authenticated: false },
        { status: 401 },
      );

      response.cookies.set(SESSION_COOKIE_NAME, "", {
        ...getSessionCookieOptions(),
        maxAge: 0,
        expires: new Date(0),
      });

      return response;
    }

    return NextResponse.json({
      authenticated: true,
      admin: {
        id: session.adminUser.id,
        email: session.adminUser.email,
      },
      expiresAt: session.expiresAt.toISOString(),
    });
  } catch (error) {
    console.error("Session verification failed:", error);

    return NextResponse.json(
      { error: "Unable to verify the session." },
      { status: 500 },
    );
  }
}
