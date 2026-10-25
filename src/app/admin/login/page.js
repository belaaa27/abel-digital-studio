"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("checking"); // "checking" | "idle" | "submitting"
  const [errorMessage, setErrorMessage] = useState("");

  // Check if session is already active on initial mount
  useEffect(() => {
    let isMounted = true;

    async function checkExistingSession() {
      try {
        const res = await fetch("/api/auth/session", { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && isMounted) {
            router.replace("/admin");
            return;
          }
        }
      } catch (err) {
        // Quietly fail session check and render login form
      } finally {
        if (isMounted) {
          setStatus("idle");
        }
      }
    }

    checkExistingSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setStatus("submitting");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(
          data.error || "Login failed. Please check your credentials.",
        );
        setStatus("idle");
        return;
      }

      // Login successful, redirect to admin area
      router.replace("/admin");
    } catch (err) {
      console.error("Login request error:", err);
      setErrorMessage("Unable to connect to server. Please try again.");
      setStatus("idle");
    }
  };

  // Initial loading spinner while checking session state
  if (status === "checking") {
    return (
      <main className="min-h-screen bg-warm-ivory text-ink-forest flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-ink-forest/20 border-t-ink-forest" />
          <p className="font-mono text-xs uppercase tracking-widest text-ink-forest/60">
            Checking session...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-warm-ivory text-ink-forest flex flex-col justify-between p-6 lg:p-12 selection:bg-electric-lime selection:text-ink-forest">
      {/* Brand Navigation Header */}
      <div className="flex items-center justify-between border-b border-ink-forest/10 pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-ink-forest transition-opacity hover:opacity-80"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-ink-forest/60">
            ABEL /
          </span>
          <span className="tracking-tight uppercase">DIGITAL</span>
        </Link>
        <span className="rounded-full bg-ink-forest/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-forest/70 border border-ink-forest/10">
          Studio Access
        </span>
      </div>

      {/* Main Login Card */}
      <div className="mx-auto w-full max-w-md py-12">
        <div className="rounded-2xl border border-ink-forest/15 bg-white/70 p-8 shadow-xl backdrop-blur-md sm:p-10">
          <div className="mb-8 space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-ink-forest/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-forest/80 border border-ink-forest/10">
              <span className="h-1.5 w-1.5 rounded-full bg-electric-lime"></span>
              <span>Private Portal</span>
            </div>
            <h1 className="font-serif text-3xl font-light tracking-tight text-ink-forest">
              Studio Admin
            </h1>
            <p className="text-xs text-ink-forest/70 leading-relaxed">
              Sign in with your administrator credentials to access the studio
              management tools.
            </p>
          </div>

          {/* Error Message Display */}
          {errorMessage && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50/80 p-4 text-xs text-red-800 leading-relaxed flex items-start gap-3">
              <svg
                className="h-4 w-4 shrink-0 text-red-600 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block font-mono text-[11px] uppercase tracking-wider text-ink-forest/70 mb-2"
              >
                Admin Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@abeldigital.studio"
                className="w-full rounded-xl border border-ink-forest/20 bg-warm-ivory/50 px-4 py-3 text-xs text-ink-forest placeholder:text-ink-forest/40 focus:border-ink-forest focus:bg-white focus:outline-none focus:ring-1 focus:ring-ink-forest transition-colors"
                disabled={status === "submitting"}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-mono text-[11px] uppercase tracking-wider text-ink-forest/70 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-ink-forest/20 bg-warm-ivory/50 px-4 py-3 pr-12 text-xs text-ink-forest placeholder:text-ink-forest/40 focus:border-ink-forest focus:bg-white focus:outline-none focus:ring-1 focus:ring-ink-forest transition-colors"
                  disabled={status === "submitting"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 font-mono text-[10px] text-ink-forest/60 hover:text-ink-forest uppercase tracking-wider transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-ink-forest px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-warm-ivory transition-transform duration-200 hover:bg-ink-forest/90 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? (
                <>
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-warm-ivory/30 border-t-warm-ivory" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin</span>
                  <span className="font-mono">&rarr;</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer info */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-ink-forest/10 pt-6 text-[11px] font-mono text-ink-forest/60 gap-2">
        <span>ABEL / DIGITAL — STUDIO PRACTICE</span>
        <span>RESTRICTED ACCESS</span>
      </div>
    </main>
  );
}
