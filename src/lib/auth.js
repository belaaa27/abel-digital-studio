import { createHash, randomBytes } from "node:crypto";

export const SESSION_COOKIE_NAME = "abel_admin_session";

export const SESSION_DURATION_SECONDS = 7 * 24 * 60 * 60;

export function createSessionToken() {
  return randomBytes(32).toString("hex");
}

export function hashSessionToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  };
}
