"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [status, setStatus] = useState("loading");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    async function verifyAdminSession() {
      try {
        const response = await fetch("/api/auth/session", { method: "GET" });
        if (!response.ok) {
          router.replace("/admin/login");
          return;
        }

        const data = await response.json();
        if (data.authenticated) {
          setAdmin(data.admin);
          setStatus("ready");
        } else {
          router.replace("/admin/login");
        }
      } catch (err) {
        console.error("Session verification error:", err);
        router.replace("/admin/login");
      }
    }

    verifyAdminSession();
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      router.replace("/admin/login");
    }
  };

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-warm-ivory text-ink-forest flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-ink-forest/20 border-t-ink-forest" />
          <p className="font-mono text-xs uppercase tracking-widest text-ink-forest/60">
            Verifying session...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-warm-ivory text-ink-forest flex flex-col justify-between p-6 lg:p-12">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-ink-forest/10 pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-ink-forest"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-ink-forest/60">
            ABEL /
          </span>
          <span className="tracking-tight uppercase">DIGITAL</span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block font-mono text-xs text-ink-forest/60">
            {admin?.email}
          </span>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-full border border-ink-forest/20 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-ink-forest transition-colors hover:bg-ink-forest hover:text-warm-ivory disabled:opacity-50"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </header>

      {/* Main Content Placeholder */}
      <section className="mx-auto w-full max-w-3xl py-16">
        <div className="rounded-2xl border border-ink-forest/20 bg-ink-forest p-8 sm:p-12 text-warm-ivory shadow-xl">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-electric-lime px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink-forest">
              Authenticated Admin Session
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-warm-ivory font-light">
              Welcome back to ABEL / DIGITAL Studio Portal
            </h1>

            <p className="text-xs sm:text-sm text-warm-ivory/80 leading-relaxed max-w-xl">
              Your session is active. This destination is the base endpoint for
              upcoming administrative modules (project creation, editing, and
              content management).
            </p>

            <div className="pt-4 border-t border-warm-ivory/15 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-warm-ivory/10 border border-warm-ivory/15">
                <span className="text-electric-lime text-[10px] uppercase tracking-wider block mb-1">
                  Session Identity
                </span>
                <span className="truncate block text-warm-ivory">
                  {admin?.email}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-warm-ivory/10 border border-warm-ivory/15">
                <span className="text-electric-lime text-[10px] uppercase tracking-wider block mb-1">
                  Status
                </span>
                <span className="text-warm-ivory">
                  HttpOnly Cookie Validated
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row items-center justify-between border-t border-ink-forest/10 pt-6 text-[11px] font-mono text-ink-forest/60 gap-2">
        <span>ABEL / DIGITAL — ADMIN DASHBOARD</span>
        <span>PROTECTED AREA</span>
      </footer>
    </main>
  );
}
