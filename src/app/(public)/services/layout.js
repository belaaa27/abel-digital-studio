import { Fragment } from "react";

export const metadata = {
  title: "Web Development Services — ABEL / DIGITAL",
  description:
    "Explore web development services by Abel, including custom websites, full-stack web applications, backend APIs, database systems, and UI implementation.",

  openGraph: {
    title: "Web Development Services — ABEL / DIGITAL",
    description:
      "Custom websites, full-stack applications, backend systems, and thoughtful UI implementation.",
    url: "/services",
    siteName: "ABEL / DIGITAL",
    locale: "en_US",
    type: "website",
  },
};

export default function ServicesLayout({ children }) {
  return <Fragment>{children}</Fragment>;
}
