"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/lib/motion";

const LINKS: [string, string, string][] = [
  ["01", "about", "#about"],
  ["02", "work", "#work"],
  ["03", "projects", "#projects"],
  ["05", "achievements", "#achievements"],
  ["08", "recs", "#recommendations"],
  ["10", "contact", "#contact"],
];

export default function Nav({
  theme,
  onToggleTheme,
}: {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("hashchange", close);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("hashchange", close);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className={"nav" + (scrolled ? " scrolled" : "")}>
        <div className="nav-inner">
          <a href="#home" className="nav-mark" data-link>
            <span className="dot" />
            <span>jathurshan_t</span>
          </a>
          <div className="nav-links">
            {LINKS.map(([n, label, href]) => (
              <a key={href} href={href} data-link>
                <span className="num">{n}</span>
                {label}
              </a>
            ))}
            <button
              className="theme-btn keep"
              data-link
              aria-label="toggle theme"
              onClick={onToggleTheme}
              style={{ marginLeft: 4 }}
            >
              {theme === "dark" ? <Icon.Sun /> : <Icon.Moon />}
            </button>
            <button
              className="nav-menu-btn"
              data-link
              aria-label="open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                {menuOpen ? (
                  <g>
                    <path d="M6 6l12 12" />
                    <path d="M18 6l-12 12" />
                  </g>
                ) : (
                  <g>
                    <path d="M4 8h16" />
                    <path d="M4 16h16" />
                  </g>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={"mobile-drawer" + (menuOpen ? " open" : "")}
        aria-hidden={!menuOpen}
      >
        {LINKS.map(([n, label, href]) => (
          <a
            key={href}
            href={href}
            data-link
            onClick={() => setMenuOpen(false)}
          >
            <span className="num">{n}</span>
            {label}
          </a>
        ))}
        <div className="drawer-foot">
          <span>colombo · lk</span>
          <span>v2026.05</span>
        </div>
      </div>
    </>
  );
}
