import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import CustomCursor from "@/components/ui/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jathurshan Thadchanamoorthy | Software Engineer & Computer Engineering Student",
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
    title: "Jathurshan Thadchanamoorthy | Software Engineer & Computer Engineering Student",
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
    title: "Jathurshan Thadchanamoorthy | Software Engineer & Computer Engineering Student",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <CustomCursor />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
