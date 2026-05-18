import type { Metadata } from "next";
import "./globals.css";

// Vercel serves the site at the www subdomain (apex 307-redirects to www),
// so the canonical / OG / structured-data URL must be the www host.
const SITE_URL = "https://www.jathurt.me";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Jathurshan Thadchanamoorthy — Software Engineer | jathurT",
    template: "%s | Jathurshan Thadchanamoorthy",
  },
  description:
    "Jathurshan Thadchanamoorthy (jathurT) — software engineer and Computer Engineering undergraduate at the University of Ruhuna, ex-IronOne SWE intern. Java, Spring Boot, Quarkus, React, DevOps, ML and blockchain.",
  applicationName: "Jathurshan Thadchanamoorthy",
  keywords: [
    "Jathurshan",
    "Jathurshan Thadchanamoorthy",
    "jathurT",
    "jathurt",
    "jathurshan portfolio",
    "Software Engineer",
    "Computer Engineering",
    "University of Ruhuna",
    "IronOne",
    "Spring Boot",
    "Quarkus",
    "React",
    "TypeScript",
    "DevOps",
    "Machine Learning",
    "Blockchain",
    "Sri Lanka",
  ],
  authors: [{ name: "Jathurshan Thadchanamoorthy", url: SITE_URL }],
  creator: "Jathurshan Thadchanamoorthy",
  publisher: "Jathurshan Thadchanamoorthy",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Jathurshan Thadchanamoorthy",
    title: "Jathurshan Thadchanamoorthy — Software Engineer",
    description:
      "Software engineer and Computer Engineering undergraduate at the University of Ruhuna, ex-IronOne SWE intern. Building reliable systems — full-stack, infra, ML, and a bit of chain.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jathurshan Thadchanamoorthy — Software Engineer",
    description:
      "Software engineer · ex-IronOne intern · University of Ruhuna. Full-stack, DevOps, ML, blockchain.",
    creator: "@jathurT",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const themeScript = `(function(){try{var s=localStorage.getItem("theme");var p=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.setAttribute("data-theme",s||p);}catch(e){}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Jathurshan Thadchanamoorthy",
      alternateName: ["Jathurshan", "jathurT", "Jathurshan T"],
      url: SITE_URL,
      image: `${SITE_URL}/apple-icon`,
      jobTitle: "Software Engineer",
      description:
        "Software engineer and Computer Engineering undergraduate at the University of Ruhuna; ex-IronOne software engineering intern.",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of Ruhuna",
      },
      knowsAbout: [
        "Software Engineering",
        "Java",
        "Spring Boot",
        "Quarkus",
        "React",
        "TypeScript",
        "DevOps",
        "Machine Learning",
        "Blockchain",
      ],
      sameAs: [
        "https://github.com/jathurT",
        "https://linkedin.com/in/jathurt",
        "https://leetcode.com/ktmjathur2001",
        "https://medium.com/@jathurt",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Jathurshan Thadchanamoorthy",
      description:
        "Portfolio of Jathurshan Thadchanamoorthy — software engineer.",
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Geist:wght@300;400;500;600&display=swap"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-N7SMM659P9"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-N7SMM659P9');
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
