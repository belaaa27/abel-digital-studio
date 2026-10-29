"use client";

import { useState } from "react";
import Link from "next/link";

export default function ServicesPage() {
  const contactEmail = "mailto:abelmillionnov07@gmail.com";
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  // Four Core Service Offerings
  const services = [
    {
      number: "01",
      title: "Custom Websites",
      description:
        "Responsive business websites, portfolio showcases, and landing pages designed and tailored around client goals and content strategy.",
      deliverables: [
        "Responsive & Cross-Browser Layouts",
        "Domain-Specific Typography & Palettes",
        "Clean Semantic HTML & CSS",
        "Performance & Mobile Optimization",
      ],
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Web Applications",
      description:
        "Interactive client applications built with React and Next.js, focusing on clean component structure, intuitive navigation, and reliable data flow.",
      deliverables: [
        "Next.js App Router Client Architecture",
        "React Component Lifecycle & Flow",
        "Dynamic Client State Management",
        "Accessible User Interaction Patterns",
      ],
      icon: (
        <svg
          className="h-5 w-5"
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
      number: "03",
      title: "Backend & Database Systems",
      description:
        "Server-side RESTful APIs built with Node.js and Express, connected to relational MySQL/MariaDB or MongoDB stores, and paired with custom admin dashboards.",
      deliverables: [
        "RESTful API Endpoint Development",
        "Database Schemas (MySQL / MariaDB / MongoDB)",
        "Session & Admin Authentication Layers",
        "Custom Backoffice Dashboards & Inventory Tools",
      ],
      icon: (
        <svg
          className="h-5 w-5"
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
      number: "04",
      title: "UI Implementation",
      description:
        "Translating design concepts and Figma references into clean, pixel-conscious, and maintainable Tailwind CSS implementations.",
      deliverables: [
        "Figma-to-Code Implementation",
        "Tailwind CSS Layout Systems",
        "Consistent Spacing & Editorial Visual Polish",
        "High-Contrast & Keyboard Accessible UI",
      ],
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
      ),
    },
  ];

  // Five-Step Proposed Working Process
  const processSteps = [
    {
      step: "01",
      name: "Discovery",
      summary:
        "Initial conversation to understand project goals, target users, core requirements, and aesthetic direction.",
    },
    {
      step: "02",
      name: "Planning",
      summary:
        "Defining application architecture, database schemas, key deliverables, milestones, and initial timeline estimates.",
    },
    {
      step: "03",
      name: "Development",
      summary:
        "Building the application in clean, manageable stages—from database setup and API routes to frontend UI integration.",
    },
    {
      step: "04",
      name: "Review & Testing",
      summary:
        "Evaluating functional features, responsive layouts, cross-device compatibility, and making agreed refinements.",
    },
    {
      step: "05",
      name: "Launch & Handover",
      summary:
        "Assisting with deployment setup on platforms such as Netlify or Render and providing handover overview.",
    },
  ];

  // Frequently Asked Questions
  const faqs = [
    {
      question: "What kinds of projects can you build?",
      answer:
        "I build full-stack web applications, custom business websites, management dashboards, API services, and digital showcases. Whether you need a standalone landing page or a database-driven web platform with an admin portal, I handle end-to-end implementation.",
    },
    {
      question: "How much does a project cost?",
      answer:
        "Project cost depends on requirements, complexity, and scope. I discuss pricing individually after reviewing your specific goals and functional requirements before any work begins.",
    },
    {
      question: "How long will a project take?",
      answer:
        "Delivery timelines depend on the project's scope and complexity. Initial timeline estimates are discussed during the planning phase so we have a clear schedule in place.",
    },
    {
      question: "How can I follow the project's progress?",
      answer:
        "We agree on milestone updates and communication channels (such as email or code repository previews) at the start of the project so you can track progress at key build stages.",
    },
    {
      question: "Can you help with hosting and deployment?",
      answer:
        "Yes, I can assist with deployment configuration on hosting services such as Netlify for frontends and Render for backend services, ensuring your application is configured for live environments.",
    },
    {
      question: "Can you make changes after launch?",
      answer:
        "Yes, additional post-launch refinements, feature updates, or maintenance tasks can be discussed and agreed upon based on your evolving needs.",
    },
  ];

  return (
    <main className="min-h-screen bg-warm-ivory text-ink-forest">
      {/* EDITORIAL HERO SECTION */}
      <section className="border-b border-ink-forest/10 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-forest/60">
              <span className="h-2 w-2 rounded-full bg-electric-lime animate-pulse"></span>
              <span>[ 01 // STUDIO SERVICES ]</span>
            </div>

            <h1 className="font-serif text-4xl font-light leading-[1.1] text-ink-forest sm:text-6xl tracking-tight">
              From thoughtful interfaces to reliable web applications.
            </h1>

            <p className="text-xs sm:text-sm text-ink-forest/80 leading-relaxed max-w-2xl">
              I am Abel, an independent full-stack web developer offering web
              development services—from responsive client interfaces and custom
              web software to Node.js APIs and relational database architecture.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={contactEmail}
                className="group inline-flex items-center gap-2 rounded-full bg-ink-forest px-6 py-3 text-xs font-semibold uppercase tracking-wider text-warm-ivory transition-all duration-300 hover:scale-105 hover:bg-ink-forest/90 hover:shadow-md"
              >
                <span>Discuss a Project</span>
                <span className="font-mono transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
              <Link
                href="/#work"
                className="group inline-flex items-center gap-2 rounded-full border border-ink-forest/20 px-6 py-3 text-xs font-medium uppercase tracking-wider text-ink-forest transition-all duration-300 hover:border-ink-forest/50 hover:bg-ink-forest/5"
              >
                <span>Explore My Work</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES OFFERED (4 CARDS GRID) */}
      <section className="border-b border-ink-forest/10 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-forest/60 mb-2">
              <span>[ 02 // CAPABILITIES ]</span>
            </div>
            <h2 className="font-serif text-3xl font-light text-ink-forest sm:text-4xl">
              Services Offered
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.number}
                className="group flex flex-col justify-between rounded-2xl border border-ink-forest/15 bg-white/40 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-ink-forest/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-ink-forest/10 pb-4">
                    <div className="flex items-center gap-2 text-ink-forest">
                      {service.icon}
                      <span className="font-mono text-xs font-semibold text-ink-forest">
                        {service.number}
                      </span>
                    </div>
                    <span className="rounded-full bg-electric-lime/40 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-ink-forest">
                      Core Discipline
                    </span>
                  </div>

                  <h3 className="mt-6 font-serif text-2xl font-normal text-ink-forest group-hover:text-ink-forest/80 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-ink-forest/75">
                    {service.description}
                  </p>

                  <div className="mt-6 space-y-2 pt-4 border-t border-ink-forest/10">
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-ink-forest/60">
                      Deliverables & Scope:
                    </h4>
                    <ul className="space-y-2 text-xs text-ink-forest/80 font-mono text-[11px]">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-electric-lime font-bold">
                            •
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIVE-STEP WORKING PROCESS */}
      <section className="border-b border-ink-forest/10 px-6 py-20 lg:px-8 bg-white/30">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-forest/60 mb-2">
              <span>[ 03 // COLLABORATION ]</span>
            </div>
            <h2 className="font-serif text-3xl font-light text-ink-forest sm:text-4xl">
              Working Process
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((p) => (
              <div
                key={p.step}
                className="group rounded-2xl border border-ink-forest/15 bg-warm-ivory p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-ink-forest/40 hover:shadow-md"
              >
                <div className="flex items-center justify-between border-b border-ink-forest/10 pb-3 mb-4">
                  <span className="font-mono text-xs font-bold text-ink-forest">
                    {p.step}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-ink-forest/30 transition-colors group-hover:bg-electric-lime"></span>
                </div>
                <h3 className="font-serif text-xl font-normal text-ink-forest group-hover:text-ink-forest/80 transition-colors">
                  {p.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-forest/75">
                  {p.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCESSIBLE COLLAPSIBLE FAQ ACCORDION */}
      <section className="border-b border-ink-forest/10 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-forest/60 mb-2">
              <span>[ 04 // FAQ ]</span>
            </div>
            <h2 className="font-serif text-3xl font-light text-ink-forest sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              const contentId = `faq-answer-${i}`;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-ink-forest/15 bg-white/40 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-ink-forest/30 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-forest focus-visible:ring-offset-2 rounded-2xl"
                  >
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-forest pr-4">
                      {faq.question}
                    </span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink-forest/15 bg-warm-ivory text-ink-forest transition-transform duration-300">
                      <svg
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={contentId}
                      className="px-6 pb-6 pt-0 border-t border-ink-forest/10 mt-1"
                    >
                      <p className="pt-4 text-xs text-ink-forest/80 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL PROJECT INQUIRY CTA SECTION */}
      <section className="px-6 py-20 lg:px-8 bg-warm-ivory">
        <div className="mx-auto max-w-5xl rounded-3xl border border-ink-forest/20 bg-ink-forest p-10 sm:p-16 text-warm-ivory shadow-xl">
          <div className="max-w-2xl space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-electric-lime">
              // Open for Collaborations
            </span>
            <h2 className="font-serif text-3xl font-light sm:text-5xl leading-tight">
              Have a project in mind? Let's discuss what you need.
            </h2>
            <p className="text-xs sm:text-sm text-warm-ivory/80 leading-relaxed">
              Reach out directly with your project requirements or application
              concept to get started.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-electric-lime px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-ink-forest transition-transform duration-300 hover:scale-105"
              >
                <span>Let's Talk</span>
                <span className="font-mono transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
              <Link
                href="/#work"
                className="group inline-flex items-center gap-2 rounded-full border border-warm-ivory/20 px-6 py-3.5 text-xs font-medium uppercase tracking-wider text-warm-ivory transition-all duration-300 hover:border-warm-ivory/50 hover:bg-warm-ivory/10"
              >
                <span>View My Work</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
