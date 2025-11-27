"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Recommendations from "@/components/sections/Recommendations";
import Contact from "@/components/sections/Contact";

// Dynamically import IntroAnimation to avoid SSR issues with Three.js
const IntroAnimation = dynamic(
  () => import("@/components/sections/IntroAnimation"),
  { ssr: false }
);

export default function PortfolioWrapper() {
  const [showIntro, setShowIntro] = useState(true);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  useEffect(() => {
    // Check if user has already seen the intro in this session
    const introSeen = sessionStorage.getItem("introSeen");
    if (introSeen) {
      setShowIntro(false);
      setHasSeenIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("introSeen", "true");
    setShowIntro(false);
    setHasSeenIntro(true);
  };

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      <div
        className={`min-h-screen transition-opacity duration-1000 ${
          showIntro ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Recommendations />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
