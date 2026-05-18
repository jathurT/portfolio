import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Jathurshan Thadchanamoorthy | Software Engineer & Computer Engineering Student",
  description:
    "Computer Engineering undergraduate at University of Ruhuna (GPA: 3.91) and Software Engineer Intern at IronOne. Specializing in Spring Boot, React, Machine Learning, and DevOps.",
  keywords: [
    "Jathurshan Thadchanamoorthy",
    "Software Engineer",
    "Computer Engineering",
    "Spring Boot",
    "React",
    "Machine Learning",
    "DevOps",
    "University of Ruhuna",
    "IronOne",
    "Full Stack Developer",
    "Java",
    "Python",
    "Sri Lanka",
  ],
  authors: [{ name: "Jathurshan Thadchanamoorthy" }],
  creator: "Jathurshan Thadchanamoorthy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jathurshan.dev",
    title:
      "Jathurshan Thadchanamoorthy | Software Engineer & Computer Engineering Student",
    description:
      "Computer Engineering undergraduate at University of Ruhuna (GPA: 3.91) and Software Engineer Intern at IronOne. Specializing in Spring Boot, React, Machine Learning, and DevOps.",
    siteName: "Jathurshan's Portfolio",
    images: [
      {
        url: "https://jathurshan.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jathurshan Thadchanamoorthy - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Jathurshan Thadchanamoorthy | Software Engineer & Computer Engineering Student",
    description:
      "Computer Engineering undergraduate at University of Ruhuna specializing in Spring Boot, React, Machine Learning, and DevOps.",
    images: ["https://jathurshan.dev/og-image.jpg"],
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
