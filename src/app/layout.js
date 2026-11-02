import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://abel-digital-studio.vercel.app"),

  title: {
    default: "ABEL / DIGITAL — Independent Digital Studio",
    template: "%s | ABEL / DIGITAL",
  },

  description:
    "Independent full-stack developer portfolio showcasing modern web applications, digital experiences, and selected development projects.",

  applicationName: "ABEL / DIGITAL",

  verification: {
    google: "YGevW20-tbHTL8M3w-GiNEMrgTClqT3ArQ9t5TzDRA8",
  },

  openGraph: {
    title: "ABEL / DIGITAL — Independent Digital Studio",
    description:
      "Explore modern web applications, digital experiences, and full-stack development projects by Abel.",
    url: "https://abel-digital-studio.vercel.app",
    siteName: "ABEL / DIGITAL",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "ABEL / DIGITAL — Independent Digital Studio",
    description:
      "Explore modern web applications and full-stack development projects by Abel.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-warm-ivory text-ink-forest">
        {children}
      </body>
    </html>
  );
}
