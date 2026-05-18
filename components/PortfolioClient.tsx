"use client";

import { useCallback, useEffect, useState } from "react";
import CustomCursor from "@/components/effects/CustomCursor";
import Intro from "@/components/intro/Intro";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { useTheme } from "@/components/lib/useTheme";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Achievements from "@/components/sections/Achievements";
import Certifications from "@/components/sections/Certifications";
import Archive from "@/components/sections/Archive";
import Recommendations from "@/components/sections/Recommendations";
import Writing from "@/components/sections/Writing";
import Contact from "@/components/sections/Contact";

type IntroState = "pending" | "playing" | "done";

export default function PortfolioClient() {
  const { theme, toggle } = useTheme();
  const [introState, setIntroState] = useState<IntroState>("pending");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("introDone_v3") === "1";
    } catch {}
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIntroState(seen || reduced ? "done" : "playing");
  }, []);

  // re-run any in-view reveals once the intro clears (masks could hide them)
  useEffect(() => {
    if (introState !== "done") return;
    requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.95) el.classList.add("in");
      });
    });
  }, [introState]);

  const handleIntroDone = useCallback(() => {
    try {
      sessionStorage.setItem("introDone_v3", "1");
    } catch {}
    setIntroState("done");
  }, []);

  return (
    <>
      <div className="noise" />
      <CustomCursor />
      {introState === "playing" && (
        <Intro onDone={handleIntroDone} skip={false} />
      )}
      <Nav theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Certifications />
        <Archive />
        <Recommendations />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
