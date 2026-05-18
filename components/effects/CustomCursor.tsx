"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const dot = document.querySelector<HTMLElement>(".cursor-dot");
    const ring = document.querySelector<HTMLElement>(".cursor-ring");
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2;
    let rx = mx,
      ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };
    const tick = () => {
      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;
      ring.style.transform = `translate(${rx.toFixed(2)}px, ${ry.toFixed(
        2
      )}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const isLink = (el: Element | null): boolean => {
      if (!el || el === document.body) return false;
      if (el instanceof HTMLElement && el.dataset.link !== undefined)
        return true;
      const tag = el.tagName;
      if (tag === "A" || tag === "BUTTON") return true;
      return isLink(el.parentElement);
    };
    const onOver = (e: MouseEvent) => {
      if (isLink(e.target as Element))
        document.body.classList.add("hovering-link");
    };
    const onOut = (e: MouseEvent) => {
      if (isLink(e.target as Element))
        document.body.classList.remove("hovering-link");
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
    <>
      <div className="cursor-ring" />
      <div className="cursor-dot" />
    </>
  );
}
