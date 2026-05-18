/* global React, ReactDOM, PORTFOLIO_DATA */
const { useEffect, useRef, useState } = React;

// ============================================================
// custom cursor
// ============================================================
function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf = 0;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };
    const tick = () => {
      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;
      ring.style.transform = `translate(${rx.toFixed(2)}px, ${ry.toFixed(2)}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // hover targets — anything with [data-link], a, button
    const isLink = (el) => {
      if (!el || el === document.body) return false;
      if (el.dataset && el.dataset.link !== undefined) return true;
      const tag = el.tagName;
      if (tag === "A" || tag === "BUTTON") return true;
      return isLink(el.parentElement);
    };
    const onOver = (e) => {
      if (isLink(e.target)) document.body.classList.add("hovering-link");
    };
    const onOut = (e) => {
      if (isLink(e.target)) document.body.classList.remove("hovering-link");
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <React.Fragment>
      <div className="cursor-ring" />
      <div className="cursor-dot" />
    </React.Fragment>
  );
}

// ============================================================
// nav
// ============================================================
function Nav({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // close drawer on hash change / link click
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

  const links = [
    ["01", "about", "#about"],
    ["02", "work", "#work"],
    ["03", "projects", "#projects"],
    ["05", "archive", "#archive"],
    ["06", "recs", "#recommendations"],
    ["08", "contact", "#contact"],
  ];

  return (
    <React.Fragment>
      <nav className={"nav" + (scrolled ? " scrolled" : "")}>
        <div className="nav-inner">
          <a href="#home" className="nav-mark" data-link>
            <span className="dot" />
            <span>jathurshan_t</span>
          </a>
          <div className="nav-links">
            {links.map(([n, label, href]) => (
              <a key={href} href={href} data-link>
                <span className="num">{n}</span>{label}
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
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                {menuOpen
                  ? (<g><path d="M6 6l12 12" /><path d="M18 6l-12 12" /></g>)
                  : (<g><path d="M4 8h16" /><path d="M4 16h16" /></g>)}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div className={"mobile-drawer" + (menuOpen ? " open" : "")} aria-hidden={!menuOpen}>
        {links.map(([n, label, href]) => (
          <a key={href} href={href} data-link onClick={() => setMenuOpen(false)}>
            <span className="num">{n}</span>{label}
          </a>
        ))}
        <div className="drawer-foot">
          <span>colombo · lk</span>
          <span>v2026.05</span>
        </div>
      </div>
    </React.Fragment>
  );
}

// ============================================================
// intro overlay — cinematic boot sequence:
//   crosshairs + top progress bar + huge counter + streaming
//   boot log + accent sweep at 100 + flash + shutter wipe
// ============================================================
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

function Intro({ onDone, skip }) {
  const [n, setN] = useState(0);
  const [shown, setShown] = useState(0);    // # of boot lines visible
  const [phase, setPhase] = useState("count"); // count -> sweep -> name -> gone
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (skip) {
      setHidden(true);
      const t = setTimeout(onDone, 50);
      return () => clearTimeout(t);
    }

    // ---- counter 00 -> 100 (easeOutExpo) ----
    const dur = 2400;
    const start = performance.now();
    let raf = 0;
    const ease = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const v = Math.round(ease(t) * 100);
      setN(v);
      // reveal boot lines proportionally
      const targetLines = Math.min(BOOT_LINES.length, Math.floor(t * (BOOT_LINES.length + 0.5)));
      setShown((s) => (targetLines > s ? targetLines : s));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        // sweep
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

  // styles for phase-driven animation
  const barStyle = {
    width: phase === "count" ? n + "%" : "100%",
    transition: phase === "count" ? "none" : "width 0.4s cubic-bezier(0.7,0,0.3,1)",
  };
  const counterStyle = {
    opacity: phase === "count" ? 1 : 0,
    transform: phase === "count" ? "scale(1)" : "scale(0.92)",
    transition: "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)",
  };
  const labelStyle = {
    opacity: phase === "count" ? 0.5 : 0,
    transition: "opacity 0.3s ease",
  };
  const sweepStyle = {
    transform: phase === "count" ? "scaleX(0)" : "scaleX(1)",
    transformOrigin: phase === "name" ? "right center" : "left center",
    transition: "transform 0.45s cubic-bezier(0.7,0,0.3,1)",
  };
  const nameStyle = {
    opacity: phase === "name" ? 1 : 0,
    transform:
      phase === "name"
        ? "translateY(0)"
        : "translateY(12px)",
    transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
  };
  const flashStyle = {
    opacity: phase === "sweep" ? 0.18 : 0,
    transition: "opacity 0.2s ease-out",
  };
  const wrapStyle = {
    opacity: hidden ? 0 : 1,
    transition: "opacity 0.45s cubic-bezier(0.16,1,0.3,1)",
    pointerEvents: hidden ? "none" : "auto",
  };
  const maskTopStyle = {
    transform: hidden ? "translateY(-100%)" : "translateY(0)",
    transition: "transform 0.95s cubic-bezier(0.76, 0, 0.24, 1)",
  };
  const maskBotStyle = {
    transform: hidden ? "translateY(100%)" : "translateY(0)",
    transition: "transform 0.95s cubic-bezier(0.76, 0, 0.24, 1)",
  };

  return (
    <React.Fragment>
      <div className="intro-mask-top" style={maskTopStyle} />
      <div className="intro-mask-bot" style={maskBotStyle} />
      <div className="intro" style={wrapStyle} aria-hidden="true">
        {/* top progress bar */}
        <div className="intro-bar" style={barStyle} />

        {/* top + bottom meta */}
        <div className="intro-meta top">
          <span><span className="dot" />system.boot</span>
          <span>jathurshan_t · v2026.5</span>
        </div>
        <div className="intro-meta bot">
          <span>session · {String(Math.floor(Math.random() * 9999)).padStart(4, "0")}</span>
          <span>colombo · 06°55′N 79°51′E</span>
        </div>

        {/* corners */}
        <span className="intro-corner tl" />
        <span className="intro-corner tr" />
        <span className="intro-corner bl" />
        <span className="intro-corner br" />

        {/* center */}
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

        {/* boot feed bottom-left */}
        <div className="intro-feed">
          {BOOT_LINES.slice(0, shown).map((line, i) => {
            // colorize "ok" tail
            const txt = line.replace(/(ok|100%|\[12\/12\]|ready_)$/, (m) => `__${m}__`);
            return (
              <span
                key={i}
                className="line show"
                style={{ animationDelay: i * 30 + "ms" }}
              >
                {txt.split("__").map((seg, j) =>
                  j % 2 === 1 ? <span key={j} className="ok">{seg}</span> : seg
                )}
              </span>
            );
          })}
        </div>

        {/* sweep line + flash */}
        <div className="intro-sweep" style={sweepStyle} />
        <div className="intro-flash" style={flashStyle} />
      </div>
    </React.Fragment>
  );
}

// ============================================================
// hero content reveal — adds a delay class once intro finishes
// ============================================================
function useIntroReveal(ready) {
  useEffect(() => {
    if (!ready) return;
    // pre-set all .reveal elements that are already in-view so we don't get
    // a no-show because intro masked them.
    requestAnimationFrame(() => {
      document.querySelectorAll(".reveal").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.95) el.classList.add("in");
      });
    });
  }, [ready]);
}

// ============================================================
// theme
// ============================================================
function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return document.documentElement.getAttribute("data-theme") || "dark";
  });

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";

    const doSwap = () => {
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch {}
      setTheme(next);
    };

    if (document.startViewTransition) {
      document.startViewTransition(doSwap);
    } else {
      doSwap();
    }
  };

  // also apply accent (set via tweaks)
  return { theme, setTheme, toggle };
}

// ============================================================
// tweaks (accent color + serif name toggle)
// ============================================================
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "violet",
  "accentLight": false,
  "showCursor": true
}/*EDITMODE-END*/;

const ACCENT_PALETTE = {
  violet:  { dark: "#7c5cff", light: "#5b3df5", fg: "#ffffff" },
  emerald: { dark: "#22d3a3", light: "#0f9d6e", fg: "#04221a" },
  amber:   { dark: "#ffb347", light: "#d97706", fg: "#1a1100" },
  coral:   { dark: "#ff6b6b", light: "#e0394d", fg: "#ffffff" },
  sky:     { dark: "#60a5fa", light: "#2563eb", fg: "#ffffff" },
};

function applyAccent(name, theme) {
  const pal = ACCENT_PALETTE[name] || ACCENT_PALETTE.violet;
  const accent = theme === "light" ? pal.light : pal.dark;
  document.documentElement.style.setProperty("--accent", accent);
  document.documentElement.style.setProperty("--accent-fg", pal.fg);
  document.documentElement.style.setProperty(
    "--accent-glow",
    accent.startsWith("#") ? hexToRgba(accent, 0.18) : accent
  );
}

function hexToRgba(hex, a) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function Tweaks() {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  // sync accent + cursor toggle when tweaks change
  useEffect(() => {
    const theme = document.documentElement.getAttribute("data-theme") || "dark";
    applyAccent(tweaks.accent, theme);
  }, [tweaks.accent]);

  useEffect(() => {
    if (tweaks.showCursor) document.body.classList.remove("no-cursor");
    else document.body.classList.add("no-cursor");
  }, [tweaks.showCursor]);

  // also re-apply accent when theme changes
  useEffect(() => {
    const mo = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute("data-theme") || "dark";
      applyAccent(tweaks.accent, theme);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, [tweaks.accent]);

  const { TweaksPanel, TweakSection, TweakColor, TweakToggle } = window;

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Accent">
        <TweakColor
          label="Color"
          value={ACCENT_PALETTE[tweaks.accent]?.dark || "#7c5cff"}
          options={[
            ACCENT_PALETTE.violet.dark,
            ACCENT_PALETTE.emerald.dark,
            ACCENT_PALETTE.amber.dark,
            ACCENT_PALETTE.coral.dark,
            ACCENT_PALETTE.sky.dark,
          ]}
          onChange={(hex) => {
            const name = Object.keys(ACCENT_PALETTE).find(
              (k) => ACCENT_PALETTE[k].dark === hex
            );
            if (name) setTweak("accent", name);
          }}
        />
      </TweakSection>
      <TweakSection title="Cursor">
        <TweakToggle
          label="Custom cursor"
          value={tweaks.showCursor}
          onChange={(v) => setTweak("showCursor", v)}
        />
      </TweakSection>
      <TweakSection title="Intro">
        <window.TweakButton
          label="Replay boot sequence"
          onClick={() => window.__replayIntro && window.__replayIntro()}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// ============================================================
// app
// ============================================================
function App() {
  const data = window.PORTFOLIO_DATA;
  const { theme, toggle } = useTheme();

  const skipIntro = (() => {
    try { return sessionStorage.getItem("introDone_v3") === "1"; } catch { return false; }
  })();
  const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [forcedReplay, setForcedReplay] = useState(0);
  const [introDone, setIntroDone] = useState(skipIntro || reducedMotion);

  // expose replay handler globally so the Tweaks panel can call it
  useEffect(() => {
    window.__replayIntro = () => {
      try { sessionStorage.removeItem("introDone_v3"); } catch {}
      setIntroDone(false);
      setForcedReplay((x) => x + 1);
    };
    return () => { delete window.__replayIntro; };
  }, []);

  useIntroReveal(introDone);

  const handleIntroDone = () => {
    try { sessionStorage.setItem("introDone_v3", "1"); } catch {}
    setIntroDone(true);
  };

  return (
    <React.Fragment>
      <div className="noise" />
      <CustomCursor />
      {!introDone && <Intro key={forcedReplay} onDone={handleIntroDone} skip={reducedMotion} />}
      <Nav theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero data={data} />
        <About data={data} />
        <Experience data={data} />
        <Projects data={data} />
        <Skills data={data} />
        <Archive data={data} />
        <Recommendations data={data} />
        <Writing data={data} />
        <Contact data={data} />
      </main>
      <Footer />
      <Tweaks />
    </React.Fragment>
  );
}

// boot
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
