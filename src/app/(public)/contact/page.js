"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    projectType: "Landing page",
    budget: "Not sure yet",
    timeline: "Flexible",
    description: "",
    website: "", // Honeypot field
  });

  // Preserved email for display in success banner
  const [submittedEmail, setSubmittedEmail] = useState("");

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const projectTypes = [
    "Landing page",
    "Business website",
    "Dashboard",
    "E-commerce",
    "Full-stack custom solution",
    "Backend/API development",
    "UI implementation",
    "Other",
  ];

  const budgetRanges = [
    "Under 25,000 ETB",
    "25,000 – 50,000 ETB",
    "50,000 – 100,000 ETB",
    "100,000+ ETB",
    "Not sure yet",
  ];

  const timelines = [
    "As soon as possible",
    "Within 1–2 weeks",
    "Within a month",
    "Flexible",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      // Preserve submitted email for success message before clearing form
      setSubmittedEmail(formData.email);
      setStatus({ submitting: false, success: true, error: null });

      // Reset form controls
      setFormData({
        fullName: "",
        email: "",
        company: "",
        projectType: "Landing page",
        budget: "Not sure yet",
        timeline: "Flexible",
        description: "",
        website: "",
      });
    } catch (err) {
      setStatus({ submitting: false, success: false, error: err.message });
    }
  };

  return (
    <main className="min-h-screen bg-warm-ivory text-ink-forest">
      {/* HERO SECTION */}
      <section className="border-b border-ink-forest/10 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-forest/60">
              <span className="h-2 w-2 rounded-full bg-electric-lime animate-pulse"></span>
              <span>[ 01 // GET IN TOUCH ]</span>
            </div>

            <h1 className="font-serif text-4xl font-light leading-[1.1] text-ink-forest sm:text-6xl tracking-tight">
              Have a project in mind? Let's discuss what you need.
            </h1>

            <p className="text-xs sm:text-sm text-ink-forest/80 leading-relaxed max-w-2xl">
              Fill out the project inquiry form below or reach out directly via
              email or Telegram. I typically respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT GRID (Form & Direct Contacts) */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            {/* INQUIRY FORM COLUMN */}
            <div className="lg:col-span-8 rounded-3xl border border-ink-forest/15 bg-white/40 p-8 sm:p-12 shadow-sm backdrop-blur-sm">
              <div className="mb-8 border-b border-ink-forest/10 pb-4">
                <h2 className="font-serif text-2xl text-ink-forest">
                  Project Inquiry Form
                </h2>
                <p className="mt-1 font-mono text-xs text-ink-forest/60">
                  Share your requirements and we will start a conversation.
                </p>
              </div>

              {status.success ? (
                <div className="rounded-2xl border border-ink-forest/20 bg-ink-forest p-8 text-warm-ivory space-y-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-electric-lime">
                    // Inquiry Received
                  </span>
                  <h3 className="font-serif text-2xl">
                    Thank you for reaching out.
                  </h3>
                  <p className="text-xs sm:text-sm text-warm-ivory/80 leading-relaxed">
                    Your project inquiry has been successfully saved. I have
                    received your message and will get back to you soon at{" "}
                    <strong className="text-warm-ivory">
                      {submittedEmail}
                    </strong>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setStatus({
                        submitting: false,
                        success: false,
                        error: null,
                      })
                    }
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-electric-lime px-6 py-3 font-mono text-xs uppercase tracking-wider text-ink-forest font-semibold transition-transform hover:scale-105"
                  >
                    <span>Submit Another Inquiry</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field (hidden from real users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {status.error && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 font-mono text-xs text-red-700">
                      Error: {status.error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block font-mono text-xs uppercase tracking-wider text-ink-forest/75 mb-2"
                      >
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        maxLength={100}
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Abel Million"
                        className="w-full rounded-xl border border-ink-forest/20 bg-warm-ivory/60 px-4 py-3 font-sans text-xs text-ink-forest placeholder:text-ink-forest/40 focus:border-ink-forest focus:outline-none focus:ring-1 focus:ring-ink-forest"
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block font-mono text-xs uppercase tracking-wider text-ink-forest/75 mb-2"
                      >
                        Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        maxLength={254}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="abelmillionnov07@gmail.com"
                        className="w-full rounded-xl border border-ink-forest/20 bg-warm-ivory/60 px-4 py-3 font-sans text-xs text-ink-forest placeholder:text-ink-forest/40 focus:border-ink-forest focus:outline-none focus:ring-1 focus:ring-ink-forest"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block font-mono text-xs uppercase tracking-wider text-ink-forest/75 mb-2"
                    >
                      Company or Organization{" "}
                      <span className="text-ink-forest/40">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      maxLength={100}
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Studio / Business Name"
                      className="w-full rounded-xl border border-ink-forest/20 bg-warm-ivory/60 px-4 py-3 font-sans text-xs text-ink-forest placeholder:text-ink-forest/40 focus:border-ink-forest focus:outline-none focus:ring-1 focus:ring-ink-forest"
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label
                      htmlFor="projectType"
                      className="block font-mono text-xs uppercase tracking-wider text-ink-forest/75 mb-2"
                    >
                      Project Type <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-ink-forest/20 bg-warm-ivory/60 px-4 py-3 font-sans text-xs text-ink-forest focus:border-ink-forest focus:outline-none focus:ring-1 focus:ring-ink-forest"
                    >
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* Budget Range */}
                    <div>
                      <label
                        htmlFor="budget"
                        className="block font-mono text-xs uppercase tracking-wider text-ink-forest/75 mb-2"
                      >
                        Estimated Budget (ETB){" "}
                        <span className="text-ink-forest/40">(Optional)</span>
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-ink-forest/20 bg-warm-ivory/60 px-4 py-3 font-sans text-xs text-ink-forest focus:border-ink-forest focus:outline-none focus:ring-1 focus:ring-ink-forest"
                      >
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Preferred Timeline */}
                    <div>
                      <label
                        htmlFor="timeline"
                        className="block font-mono text-xs uppercase tracking-wider text-ink-forest/75 mb-2"
                      >
                        Preferred Timeline{" "}
                        <span className="text-ink-forest/40">(Optional)</span>
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-ink-forest/20 bg-warm-ivory/60 px-4 py-3 font-sans text-xs text-ink-forest focus:border-ink-forest focus:outline-none focus:ring-1 focus:ring-ink-forest"
                      >
                        {timelines.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block font-mono text-xs uppercase tracking-wider text-ink-forest/75 mb-2"
                    >
                      Project Description{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={5}
                      minLength={10}
                      maxLength={5000}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Tell me about your project goals, features required, or technical scope..."
                      className="w-full rounded-xl border border-ink-forest/20 bg-warm-ivory/60 p-4 font-sans text-xs text-ink-forest placeholder:text-ink-forest/40 focus:border-ink-forest focus:outline-none focus:ring-1 focus:ring-ink-forest"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={status.submitting}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-forest px-8 py-4 font-mono text-xs uppercase tracking-wider text-warm-ivory font-semibold transition-all duration-300 hover:bg-ink-forest/90 hover:shadow-md disabled:opacity-50"
                    >
                      <span>
                        {status.submitting
                          ? "Sending Inquiry..."
                          : "Submit Project Inquiry"}
                      </span>
                      <span className="font-mono transition-transform duration-300 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* DIRECT CONTACT INFO COLUMN */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-3xl border border-ink-forest/15 bg-white/40 p-8 shadow-sm backdrop-blur-sm space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-ink-forest/60">
                    // Direct Channels
                  </span>
                  <h3 className="mt-2 font-serif text-2xl text-ink-forest">
                    Connect Directly
                  </h3>
                  <p className="mt-2 text-xs text-ink-forest/75 leading-relaxed">
                    Prefer direct messaging or email? Reach out through any of
                    these official channels.
                  </p>
                </div>

                <div className="space-y-4 pt-2 border-t border-ink-forest/10">
                  {/* Email */}
                  <a
                    href="mailto:abelmillionnov07@gmail.com"
                    className="flex items-center gap-3 p-3 rounded-2xl border border-ink-forest/10 bg-warm-ivory/80 transition-colors hover:border-ink-forest/30"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-forest text-warm-ivory">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase text-ink-forest/60">
                        Email
                      </span>
                      <span className="font-mono text-xs text-ink-forest font-medium">
                        abelmillionnov07@gmail.com
                      </span>
                    </div>
                  </a>

                  {/* Telegram */}
                  <a
                    href="https://t.me/Belaa27"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-2xl border border-ink-forest/10 bg-warm-ivory/80 transition-colors hover:border-ink-forest/30"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-forest text-warm-ivory">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase text-ink-forest/60">
                        Telegram
                      </span>
                      <span className="font-mono text-xs text-ink-forest font-medium">
                        @Belaa27
                      </span>
                    </div>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/belaaa27"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-2xl border border-ink-forest/10 bg-warm-ivory/80 transition-colors hover:border-ink-forest/30"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-forest text-warm-ivory">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase text-ink-forest/60">
                        GitHub
                      </span>
                      <span className="font-mono text-xs text-ink-forest font-medium">
                        belaaa27
                      </span>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/abela-million-86103a288"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-2xl border border-ink-forest/10 bg-warm-ivory/80 transition-colors hover:border-ink-forest/30"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-forest text-warm-ivory">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase text-ink-forest/60">
                        LinkedIn
                      </span>
                      <span className="font-mono text-xs text-ink-forest font-medium">
                        abela-million-86103a288
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
