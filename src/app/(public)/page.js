import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "ABEL / DIGITAL — Independent Digital Studio & Full-Stack Practice",
  description:
    "Selected full-stack web applications and digital design projects by Abel, including Time Delivery, Kora Leather, Aster Coffee, Henok Art Studio, and Nuru Dental.",
};

export default async function Home() {
  // Query all published projects from the database with proper error handling (Requirement 9)
  let dbProjects = [];
  try {
    dbProjects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Database error fetching published projects:", err);
    throw new Error("Failed to load published projects from the database.");
  }

  // Placeholder contact email
  const contactEmail = "mailto:abelmillionnov07@gmail.com";

  // Primary Featured Full-Stack Project (Unchanged per requirements)
  const featuredProject = {
    title: "Time Delivery",
    category: "Full-Stack Web Application & Admin Platform",
    url: "https://time-delivery.netlify.app",
    summary:
      "A food ordering web application spanning a customer frontend, RESTful backend API service, and an administrative dashboard for managing items and order records.",
    highlights: [
      "Customer web interface for browsing food items and placing orders",
      "Cart management and checkout workflow",
      "Admin Panel for managing food items, menu categories, and order records",
      "Backend API engine for data persistence and core application business logic",
    ],
    architecture: [
      {
        name: "Frontend Client",
        role: "React / CSS customer web interface",
      },
      {
        name: "Admin Dashboard",
        role: "Management interface for inventory and order records",
      },
      { name: "Backend Service", role: "Node.js / Express REST API engine" },
      { name: "Database Engine", role: "MySQL relational database store" },
    ],
    tags: ["React", "Node.js", "Express", "MySQL", "CSS", "Netlify / Render"],
  };

  return (
    <main className="min-h-screen bg-warm-ivory text-ink-forest">
      {/* HERO SECTION */}
      <section className="relative border-b border-ink-forest/10 px-6 py-20 lg:px-8 lg:py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Headline Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-ink-forest/5 px-3 py-1 border border-ink-forest/10">
                <span className="h-2 w-2 rounded-full bg-electric-lime animate-pulse"></span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-ink-forest/80">
                  Full-Stack Developer & Studio Practice
                </span>
              </div>

              <h1 className="font-serif text-4xl font-light leading-[1.1] text-ink-forest sm:text-6xl lg:text-7xl tracking-tight">
                Crafting performant{" "}
                <span className="italic">web applications</span> & digital
                products.
              </h1>

              <p className="max-w-xl text-sm leading-relaxed text-ink-forest/80 sm:text-base">
                Independent studio by Abel building full-stack platforms, client
                dashboards, and custom frontends with editorial care and robust
                engineering.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#featured"
                  className="inline-flex items-center gap-2 rounded-full bg-ink-forest px-6 py-3 text-xs font-medium uppercase tracking-wider text-warm-ivory transition-transform duration-200 hover:scale-[1.02] hover:bg-ink-forest/90"
                >
                  <span>Explore Featured Work</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-ink-forest/20 px-6 py-3 text-xs font-medium uppercase tracking-wider text-ink-forest transition-colors hover:bg-ink-forest/5"
                >
                  Inquire Studio Services
                </a>
              </div>
            </div>

            {/* Right Graphic/Diagram Column */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-ink-forest/15 bg-white/40 p-6 shadow-sm backdrop-blur-sm sm:p-8">
                <div className="flex items-center justify-between border-b border-ink-forest/10 pb-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-ink-forest/60">
                    Studio Focus
                  </span>
                  <span className="rounded-full bg-electric-lime/40 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-ink-forest">
                    Full-Stack & Web UI
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="p-4 rounded-xl border border-ink-forest/10 bg-warm-ivory/80">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-forest text-warm-ivory font-mono text-xs">
                        01
                      </div>
                      <div>
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-forest">
                          Full-Stack Applications
                        </h2>
                        <p className="text-[11px] text-ink-forest/70">
                          End-to-end web applications with Node.js APIs,
                          administrative dashboards, and database persistence.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-ink-forest/10 bg-warm-ivory/80">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-forest text-warm-ivory font-mono text-xs">
                        02
                      </div>
                      <div>
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-forest">
                          Digital Products & Web UI
                        </h2>
                        <p className="text-[11px] text-ink-forest/70">
                          A curated suite of domain-specific digital web
                          applications and frontends.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-ink-forest/10 flex items-center justify-between text-[11px] font-mono text-ink-forest/60">
                  <span>LOCATION: ADDIS ABABA</span>
                  <span>STATUS: AVAILABLE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED FULL-STACK PROJECT SECTION */}
      <section
        id="featured"
        className="border-b border-ink-forest/10 px-6 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-forest/60 mb-2">
                <span>[ 01 // FEATURED SYSTEM ]</span>
              </div>
              <h2 className="font-serif text-3xl font-light text-ink-forest sm:text-4xl">
                Featured Full-Stack Application
              </h2>
            </div>
            <p className="max-w-md text-xs text-ink-forest/75 leading-relaxed">
              Demonstrating full-stack web architecture: customer web frontend,
              administrative menu & order management dashboard, REST API
              backend, and MySQL database integration.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-ink-forest/20 bg-ink-forest text-warm-ivory shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Info Panel */}
              <div className="p-8 lg:col-span-7 lg:p-12 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-electric-lime px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink-forest">
                      Full-Stack Architecture
                    </span>
                    <span className="font-mono text-xs text-warm-ivory/60">
                      Live Production Build
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-warm-ivory">
                    {featuredProject.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-warm-ivory/80 leading-relaxed max-w-xl">
                    {featuredProject.summary}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2 pt-2">
                    <h4 className="font-mono text-[11px] uppercase tracking-wider text-electric-lime">
                      System Capabilities & Scope:
                    </h4>
                    <ul className="space-y-2 text-xs text-warm-ivory/85">
                      {featuredProject.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <svg
                            className="h-4 w-4 shrink-0 text-electric-lime mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {featuredProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-warm-ivory/20 bg-warm-ivory/10 px-2.5 py-1 font-mono text-[11px] text-warm-ivory"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* External Links CTA */}
                <div className="mt-8 pt-6 border-t border-warm-ivory/15 flex flex-wrap items-center gap-4">
                  <a
                    href={featuredProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-electric-lime px-6 py-3 text-xs font-semibold uppercase tracking-wider text-ink-forest transition-transform hover:scale-105"
                  >
                    <span>Launch Live Web App</span>
                    <svg
                      className="h-4 w-4"
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

              {/* Right Architectural Diagram Panel */}
              <div className="bg-ink-forest/90 p-8 lg:col-span-5 lg:p-12 border-t lg:border-t-0 lg:border-l border-warm-ivory/10 flex flex-col justify-center">
                <h4 className="font-mono text-xs uppercase tracking-widest text-electric-lime mb-6">
                  // Full-Stack Component Diagram
                </h4>

                <div className="space-y-4">
                  {featuredProject.architecture.map((layer, index) => (
                    <div
                      key={layer.name}
                      className="relative rounded-xl border border-warm-ivory/15 bg-warm-ivory/5 p-4 transition-colors hover:border-electric-lime/50"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs font-semibold text-warm-ivory">
                          {layer.name}
                        </span>
                        <span className="font-mono text-[10px] text-electric-lime">
                          0{index + 1}
                        </span>
                      </div>
                      <p className="text-[11px] text-warm-ivory/70 leading-relaxed">
                        {layer.role}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-lg bg-electric-lime/10 p-3 border border-electric-lime/20 text-[11px] text-warm-ivory/80 leading-relaxed">
                  <strong className="text-electric-lime">Note:</strong> Built
                  with a multi-tier structure bridging user ordering and
                  administrative fulfillment using a MySQL relational database
                  backplane.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED WEBSITES & DIGITAL EXPERIENCES GRID (DYNAMIC DB PROJECTS) */}
      <section
        id="work"
        className="border-b border-ink-forest/10 px-6 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-forest/60 mb-2">
                <span>[ 02 // SELECTED SHOWCASE ]</span>
              </div>
              <h2 className="font-serif text-3xl font-light text-ink-forest sm:text-4xl">
                Selected Websites & Digital Experiences
              </h2>
            </div>
            <p className="max-w-md text-xs text-ink-forest/75 leading-relaxed">
              Explorations in brand strategy, domain-specific UI design, and
              responsive frontend implementation across retail, art, healthcare,
              and craftsmanship. Part of an ongoing practice in designing and
              building distinctive digital experiences.
            </p>
          </div>

          {/* Project Grid from Database */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {dbProjects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-ink-forest/15 bg-white/50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-ink-forest/40 hover:shadow-md"
              >
                <div>
                  {/* Card Header Tag & Category */}
                  <div className="flex items-center justify-between gap-2 border-b border-ink-forest/10 pb-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink-forest/60">
                      {project.category || "Digital Experience"}
                    </span>
                    <span className="rounded-full bg-ink-forest/5 px-2.5 py-0.5 font-mono text-[10px] uppercase text-ink-forest/80 border border-ink-forest/10">
                      {project.featured
                        ? "Featured Project"
                        : "Selected Project"}
                    </span>
                  </div>

                  {/* Optional Screenshot Preview if present */}
                  {project.imageUrl && project.imageUrl.trim() !== "" && (
                    <div className="mt-6 overflow-hidden rounded-xl border border-ink-forest/15 bg-ink-forest/5 aspect-[16/9]">
                      <img
                        src={project.imageUrl}
                        alt={`${project.title} live website screenshot`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Card Title & Description */}
                  <h3 className="mt-6 font-serif text-2xl font-normal text-ink-forest transition-colors group-hover:text-ink-forest/80">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-ink-forest/75">
                    {project.description}
                  </p>

                  {/* Technology Tags (Parsed from DB string) */}
                  {project.tags && project.tags.trim() !== "" && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tags.split(",").map((tag) => {
                        const trimmed = tag.trim();
                        if (!trimmed) return null;
                        return (
                          <span
                            key={trimmed}
                            className="rounded-full border border-ink-forest/10 bg-warm-ivory px-2.5 py-1 font-mono text-[10px] text-ink-forest/70"
                          >
                            {trimmed}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Card Action Link */}
                <div className="mt-8 pt-6 border-t border-ink-forest/10 flex items-center justify-between">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink-forest font-semibold transition-colors hover:text-ink-forest/70"
                    >
                      <span>Visit Live Project</span>
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
                  ) : (
                    <span className="font-mono text-xs uppercase tracking-wider text-ink-forest/40">
                      No Live URL
                    </span>
                  )}
                  <span className="font-mono text-[11px] text-ink-forest/40">
                    Live Demo
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING INQUIRY CTA SECTION */}
      <section id="contact" className="px-6 py-20 lg:px-8 bg-warm-ivory">
        <div className="mx-auto max-w-5xl rounded-3xl border border-ink-forest/20 bg-ink-forest p-10 sm:p-16 text-warm-ivory shadow-xl">
          <div className="max-w-2xl space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-electric-lime">
              // Open for Collaborations
            </span>
            <h2 className="font-serif text-3xl font-light sm:text-5xl leading-tight">
              Have a digital project or application in mind?
            </h2>
            <p className="text-xs sm:text-sm text-warm-ivory/80 leading-relaxed">
              Whether you need a full-stack web application, a customized client
              platform, or tailored frontend engineering, let’s bring your ideas
              to reality.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={contactEmail}
                className="inline-flex items-center gap-2 rounded-full bg-electric-lime px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-ink-forest transition-transform hover:scale-105"
              >
                <span>Start a Project</span>
                <span className="font-mono">&rarr;</span>
              </a>
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 rounded-full border border-warm-ivory/20 px-6 py-3.5 text-xs font-medium uppercase tracking-wider text-warm-ivory transition-colors hover:bg-warm-ivory/10"
              >
                Review All Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
