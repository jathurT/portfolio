"use client";

import React, {
  createElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

// ============================================================
// reveal-on-scroll
// ============================================================
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
} & React.HTMLAttributes<HTMLElement> & {
    [dataAttr: `data-${string}`]: string | undefined;
  };

export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  style,
  ...rest
}: RevealProps) {
  const ref = useReveal<HTMLElement>();
  return createElement(
    as,
    {
      ref,
      className: "reveal " + className,
      style: { transitionDelay: delay + "ms", ...style },
      ...rest,
    },
    children
  );
}

// ============================================================
// magnetic-pull wrapper
// ============================================================
export function Magnetic({
  children,
  strength = 0.35,
  radius = 80,
}: {
  children: ReactNode;
  strength?: number;
  radius?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    let raf = 0;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(mx, my);
      if (dist < radius + Math.max(r.width, r.height) / 2) {
        cx = mx * strength;
        cy = my * strength;
      } else {
        cx = 0;
        cy = 0;
      }
    };
    const onLeave = () => {
      cx = 0;
      cy = 0;
    };
    const tick = () => {
      tx += (cx - tx) * 0.18;
      ty += (cy - ty) * 0.18;
      el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(
        2
      )}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength, radius]);
  return (
    <span ref={ref} style={{ display: "inline-flex" }}>
      {children}
    </span>
  );
}

// ============================================================
// 3D tilt on project mockups
// ============================================================
export function useTilt(max = 6) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1200px) rotateY(${(px * max).toFixed(
        2
      )}deg) rotateX(${(-py * max).toFixed(2)}deg) translateZ(0)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [max]);
  return ref;
}

// ============================================================
// live clock for given tz (placeholder until mount → no SSR mismatch)
// ============================================================
function fmtClock(tz: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    return "--:--:--";
  }
}

export function useClock(tz: string) {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    setT(fmtClock(tz));
    const id = setInterval(() => setT(fmtClock(tz)), 1000);
    return () => clearInterval(id);
  }, [tz]);
  return t;
}

// ============================================================
// icons (tiny inline)
// ============================================================
export const Icon = {
  ArrUR: () => (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="arr"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  ),
  ArrR: () => (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="arr"
    >
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  ),
  Sun: () => (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  ),
  Moon: () => (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Plus: () => (
    <svg
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  LinkedIn: ({ size = 13 }: { size?: number }) => (
    <svg
      className="rec-li"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-label="linkedin"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.05-1.86-3.05-1.87 0-2.16 1.46-2.16 2.96v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.86 3.38-1.86 3.61 0 4.28 2.38 4.28 5.47v6.28zM5.34 7.43a2.06 2.06 0 1 1 .01-4.12 2.06 2.06 0 0 1-.01 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
};
