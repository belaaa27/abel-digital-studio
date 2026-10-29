import Link from "next/link";

export const metadata = {
  title: "About — ABEL / DIGITAL",
  description:
    "Independent full-stack developer and studio practice based in Ethiopia, specializing in web applications and digital products.",
};

export default function AboutPage() {
  const contactEmail = "mailto:abelmillionnov07@gmail.com";
  const githubUrl = "https://github.com/belaaa27";
  const linkedinUrl = "https://www.linkedin.com/in/abela-million-86103a288";

  const toolkit = [
    {
      title: "Frontend",
      skills: ["React", "Next.js", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
      icon: (
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
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express"],
      icon: (
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
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"
          />
        </svg>
      ),
    },
    {
      title: "Databases",
      skills: ["MySQL / MariaDB", "MongoDB"],
      icon: (
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
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      ),
    },
    {
      title: "Tools & Services",
      skills: [
        "Git",
        "GitHub",
        "VS Code",
        "Figma",
        "Netlify",
        "Render",
        "Cloudinary",
      ],
      icon: (
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
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-warm-ivory text-ink-forest">
      {/* HERO / EDITORIAL INTRODUCTION SECTION */}
      <section className="border-b border-ink-forest/10 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Intro Text Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-forest/60">
                <span className="h-2 w-2 rounded-full bg-electric-lime animate-pulse"></span>
                <span>[ 01 // ABOUT THE PRACTICE ]</span>
              </div>

              <h1 className="font-serif text-4xl font-light leading-[1.1] text-ink-forest sm:text-6xl tracking-tight">
                Engineering web software with structural precision & editorial
                care.
              </h1>

              <p className="text-xs sm:text-sm text-ink-forest/80 leading-relaxed max-w-2xl">
                I am Abel, an independent full-stack developer based in
                Ethiopia. I build complete web applications—spanning responsive
                client interfaces, backend REST APIs, database persistence, and
                custom management dashboards.
              </p>

              {/* Action Buttons with Dynamic Hover Effects */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="/resume.pdf"
                  download="Abel_Million_Resume.pdf"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink-forest px-6 py-3 text-xs font-semibold uppercase tracking-wider text-warm-ivory transition-all duration-300 hover:scale-105 hover:bg-ink-forest/90 hover:shadow-md"
                >
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download Résumé</span>
                </a>
                <Link
                  href="/#work"
                  className="group inline-flex items-center gap-2 rounded-full border border-ink-forest/20 px-6 py-3 text-xs font-medium uppercase tracking-wider text-ink-forest transition-all duration-300 hover:border-ink-forest/50 hover:bg-ink-forest/5"
                >
                  <span>Explore Work Showcase</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>

            {/* Portrait Column with Hover Elevation */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl border border-ink-forest/15 bg-white/40 p-4 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-ink-forest/30 hover:shadow-md">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-xl border border-ink-forest/15 bg-warm-ivory/80 relative group">
                  <img
                    src="/profileimg.jpg"
                    alt="Abel Million"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink-forest/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                <div className="mt-4 pt-3 border-t border-ink-forest/10 flex items-center justify-between font-mono text-[10px] text-ink-forest/60">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    ETHIOPIA
                  </span>
                  <span>FULL-STACK DEV</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT MY WORK SECTION */}
      <section className="border-b border-ink-forest/10 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-forest/60 mb-2">
                <span>[ 02 // MY APPROACH ]</span>
              </div>
              <h2 className="font-serif text-3xl font-light text-ink-forest sm:text-4xl">
                Building complete web applications end-to-end.
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-6 text-xs sm:text-sm text-ink-forest/80 leading-relaxed">
              <p>
                As an independent developer, I focus on building complete,
                practical web applications from scratch. Rather than separating
                frontend design from backend logic entirely, I handle the full
                architecture—designing responsive user interfaces, setting up
                reliable REST APIs, and ensuring structured data persistence.
              </p>
              <p>
                My work includes crafting customer-facing web platforms,
                interactive showcases, and secure administrative dashboards. By
                maintaining clean boundaries between server logic and client
                presentation, I build systems that are easy to maintain, scale,
                and navigate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL TOOLKIT SECTION WITH INTERACTIVE CARDS */}
      <section className="border-b border-ink-forest/10 px-6 py-20 lg:px-8 bg-white/30">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-forest/60 mb-2">
              <span>[ 03 // TECHNICAL STACK ]</span>
            </div>
            <h2 className="font-serif text-3xl font-light text-ink-forest sm:text-4xl">
              Technologies & Tools
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {toolkit.map((group, idx) => (
              <div
                key={group.title}
                className="group rounded-2xl border border-ink-forest/15 bg-warm-ivory p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-ink-forest/40 hover:shadow-md"
              >
                <div className="flex items-center justify-between border-b border-ink-forest/10 pb-3 mb-4">
                  <div className="flex items-center gap-2 text-ink-forest">
                    {group.icon}
                    <h3 className="font-mono text-xs uppercase tracking-widest text-ink-forest/80 group-hover:text-ink-forest transition-colors">
                      {group.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-ink-forest/40">
                    0{idx + 1}
                  </span>
                </div>
                <ul className="space-y-2 font-mono text-xs text-ink-forest/80">
                  {group.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-ink-forest/30 transition-colors group-hover:bg-electric-lime"></span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION & QUALIFICATIONS SECTION */}
      <section className="border-b border-ink-forest/10 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-forest/60 mb-2">
              <span>[ 04 // CREDENTIALS & CV ]</span>
            </div>
            <h2 className="font-serif text-3xl font-light text-ink-forest sm:text-4xl">
              Education & Qualifications
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Education Card */}
            <div className="group flex flex-col justify-between rounded-2xl border border-ink-forest/15 bg-white/40 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-ink-forest/40 hover:shadow-md">
              <div>
                <div className="flex items-center justify-between border-b border-ink-forest/10 pb-4">
                  <div className="flex items-center gap-2 text-ink-forest/60 font-mono text-xs uppercase tracking-wider">
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
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      />
                    </svg>
                    <span>Education</span>
                  </div>
                  <span className="rounded-full bg-ink-forest/5 px-2.5 py-0.5 font-mono text-[10px] uppercase text-ink-forest/80 border border-ink-forest/10">
                    2023
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-2xl font-normal text-ink-forest group-hover:text-ink-forest/80 transition-colors">
                  Injibara University
                </h3>
                <p className="mt-2 font-mono text-xs text-ink-forest/75">
                  Bachelor of Science in Computer Science
                </p>
                <p className="mt-3 text-xs leading-relaxed text-ink-forest/70">
                  Focused on computer science foundations, core programming
                  principles, data structures, and software engineering.
                </p>
              </div>
            </div>

            {/* Certificate Card (Clean Link Only) */}
            <div className="group flex flex-col justify-between rounded-2xl border border-ink-forest/15 bg-white/40 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-ink-forest/40 hover:shadow-md">
              <div>
                <div className="flex items-center justify-between border-b border-ink-forest/10 pb-4">
                  <div className="flex items-center gap-2 text-ink-forest/60 font-mono text-xs uppercase tracking-wider">
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
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                    <span>Certificate</span>
                  </div>
                  <span className="rounded-full bg-electric-lime/40 px-2.5 py-0.5 font-mono text-[10px] uppercase text-ink-forest font-semibold">
                    Verified PDF
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-2xl font-normal text-ink-forest group-hover:text-ink-forest/80 transition-colors">
                  Udacity
                </h3>
                <p className="mt-2 font-mono text-xs text-ink-forest/75">
                  Fundamentals of Programming
                </p>
                <p className="mt-3 text-xs leading-relaxed text-ink-forest/70">
                  Covered core programming fundamentals along with HTML, CSS,
                  and JavaScript essential web building blocks.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-ink-forest/10">
                <a
                  href="/Learn the Latest Tech Skills; Advance Your Career _ Udacity.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink-forest font-semibold transition-colors hover:text-ink-forest/70"
                >
                  <span>View Certificate</span>
                  <svg
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Resume Download Card */}
            <div className="group flex flex-col justify-between rounded-2xl border border-ink-forest/15 bg-white/40 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-ink-forest/40 hover:shadow-md">
              <div>
                <div className="flex items-center justify-between border-b border-ink-forest/10 pb-4">
                  <div className="flex items-center gap-2 text-ink-forest/60 font-mono text-xs uppercase tracking-wider">
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>Curriculum Vitae</span>
                  </div>
                  <span className="rounded-full bg-electric-lime/40 px-2.5 py-0.5 font-mono text-[10px] uppercase text-ink-forest font-semibold">
                    Available PDF
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-2xl font-normal text-ink-forest group-hover:text-ink-forest/80 transition-colors">
                  Professional Résumé
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-ink-forest/70">
                  Download the complete official PDF résumé outlining
                  educational history, technical skills, and project experience.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-ink-forest/10">
                <a
                  href="/resume.pdf"
                  download="Abel_Million_Resume.pdf"
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink-forest font-semibold transition-colors hover:text-ink-forest/70"
                >
                  <span>Download PDF Document</span>
                  <svg
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL LINKS & CONTACT CTA SECTION */}
      <section className="px-6 py-20 lg:px-8 bg-warm-ivory">
        <div className="mx-auto max-w-5xl rounded-3xl border border-ink-forest/20 bg-ink-forest p-10 sm:p-16 text-warm-ivory shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-electric-lime">
                // Professional Channels
              </span>
              <h2 className="font-serif text-3xl font-light sm:text-4xl leading-tight">
                Let’s connect and build together.
              </h2>
              <p className="text-xs sm:text-sm text-warm-ivory/80 leading-relaxed">
                Have a project in mind, a full-stack web application
                requirement, or want to discuss potential collaborations? Reach
                out directly via email or check out my code repositories on
                GitHub.
              </p>

              {/* External Links */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-warm-ivory/20 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-warm-ivory transition-all duration-300 hover:border-warm-ivory/50 hover:bg-warm-ivory/10"
                >
                  <span>GitHub (@belaaa27)</span>
                  <svg
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-warm-ivory/20 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-warm-ivory transition-all duration-300 hover:border-warm-ivory/50 hover:bg-warm-ivory/10"
                >
                  <span>LinkedIn</span>
                  <svg
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Direct Email Action Box */}
            <div className="lg:col-span-5 rounded-2xl bg-warm-ivory/10 border border-warm-ivory/20 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-electric-lime">
                  Direct Contact
                </span>
                <h3 className="mt-2 font-serif text-2xl text-warm-ivory">
                  Start a Conversation
                </h3>
                <p className="mt-2 font-mono text-xs text-warm-ivory/70">
                  {contactEmail.replace("mailto:", "")}
                </p>
              </div>

              <a
                href={contactEmail}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-electric-lime px-6 py-3 text-xs font-semibold uppercase tracking-wider text-ink-forest transition-transform duration-300 hover:scale-105"
              >
                <span>Send Email</span>
                <span className="font-mono transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
