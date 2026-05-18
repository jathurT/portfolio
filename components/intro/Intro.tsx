"use client";

import { useEffect, useState } from "react";

const BOOT_LINES = [
  "> initializing render tree",
  "> connecting to colombo · gmt+05:30",
  "> mounting <portfolio /> · 24 components",
  "> loading projects [12/12]",
  "> auth: keycloak.handshake · ok",
  "> services: backend · infra · ml · chain",
  "> warming caches · 100%",
  "> ready_",
];

type Phase = "count" | "sweep" | "name";

export default function Intro({
  onDone,
  skip,
}: {
  onDone: () => void;
  skip: boolean;
}) {
  const [n, setN] = useState(0);
  const [shown, setShown] = useState(0);
  const [phase, setPhase] = useState<Phase>("count");
  const [hidden, setHidden] = useState(false);
  const [sessionId, setSessionId] = useState("0000");

  useEffect(() => {
    setSessionId(String(Math.floor(Math.random() * 9999)).padStart(4, "0"));
  }, []);

  useEffect(() => {
    if (skip) {
      setHidden(true);
      const t = setTimeout(onDone, 50);
      return () => clearTimeout(t);
    }

    const dur = 2400;
    const start = performance.now();
    let raf = 0;
    const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const v = Math.round(ease(t) * 100);
      setN(v);
      const targetLines = Math.min(
        BOOT_LINES.length,
        Math.floor(t * (BOOT_LINES.length + 0.5))
      );
      setShown((s) => (targetLines > s ? targetLines : s));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setPhase("sweep");
        setTimeout(() => setPhase("name"), 520);
        setTimeout(() => {
          setHidden(true);
          setTimeout(onDone, 700);
        }, 1500);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone, skip]);

  const barStyle: React.CSSProperties = {
    width: phase === "count" ? n + "%" : "100%",
    transition:
      phase === "count" ? "none" : "width 0.4s cubic-bezier(0.7,0,0.3,1)",
  };
  const counterStyle: React.CSSProperties = {
    opacity: phase === "count" ? 1 : 0,
    transform: phase === "count" ? "scale(1)" : "scale(0.92)",
    transition:
      "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)",
  };
  const labelStyle: React.CSSProperties = {
    opacity: phase === "count" ? 0.5 : 0,
    transition: "opacity 0.3s ease",
  };
  const sweepStyle: React.CSSProperties = {
    transform: phase === "count" ? "scaleX(0)" : "scaleX(1)",
    transformOrigin: phase === "name" ? "right center" : "left center",
    transition: "transform 0.45s cubic-bezier(0.7,0,0.3,1)",
  };
  const nameStyle: React.CSSProperties = {
    opacity: phase === "name" ? 1 : 0,
    transform: phase === "name" ? "translateY(0)" : "translateY(12px)",
    transition:
      "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
  };
  const flashStyle: React.CSSProperties = {
    opacity: phase === "sweep" ? 0.18 : 0,
    transition: "opacity 0.2s ease-out",
  };
  const wrapStyle: React.CSSProperties = {
    opacity: hidden ? 0 : 1,
    transition: "opacity 0.45s cubic-bezier(0.16,1,0.3,1)",
    pointerEvents: hidden ? "none" : "auto",
  };
  const maskTopStyle: React.CSSProperties = {
    transform: hidden ? "translateY(-100%)" : "translateY(0)",
    transition: "transform 0.95s cubic-bezier(0.76, 0, 0.24, 1)",
  };
  const maskBotStyle: React.CSSProperties = {
    transform: hidden ? "translateY(100%)" : "translateY(0)",
    transition: "transform 0.95s cubic-bezier(0.76, 0, 0.24, 1)",
  };

  return (
    <>
      <div className="intro-mask-top" style={maskTopStyle} />
      <div className="intro-mask-bot" style={maskBotStyle} />
      <div className="intro" style={wrapStyle} aria-hidden="true">
        <div className="intro-bar" style={barStyle} />

        <div className="intro-meta top">
          <span>
            <span className="dot" />
            system.boot
          </span>
          <span>jathurshan_t · v2026.5</span>
        </div>
        <div className="intro-meta bot">
          <span>session · {sessionId}</span>
          <span>colombo · 06°55′N 79°51′E</span>
        </div>

        <span className="intro-corner tl" />
        <span className="intro-corner tr" />
        <span className="intro-corner bl" />
        <span className="intro-corner br" />

        <div className="intro-center">
          <span className="intro-label" style={labelStyle}>
            loading portfolio
          </span>
          <div className="intro-counter" style={counterStyle}>
            <span>{String(n).padStart(3, "0")}</span>
            <span className="pct">%</span>
          </div>
          <div className="intro-name" style={nameStyle}>
            jathurshan<span className="pulse-mark">_t</span>
          </div>
        </div>

        <div className="intro-feed">
          {BOOT_LINES.slice(0, shown).map((line, i) => {
            const txt = line.replace(
              /(ok|100%|\[12\/12\]|ready_)$/,
              (m) => `__${m}__`
            );
            return (
              <span
                key={i}
                className="line show"
                style={{ animationDelay: i * 30 + "ms" }}
              >
                {txt
                  .split("__")
                  .map((seg, j) =>
                    j % 2 === 1 ? (
                      <span key={j} className="ok">
                        {seg}
                      </span>
                    ) : (
                      seg
                    )
                  )}
              </span>
            );
          })}
        </div>

        <div className="intro-sweep" style={sweepStyle} />
        <div className="intro-flash" style={flashStyle} />
      </div>
    </>
  );
}
