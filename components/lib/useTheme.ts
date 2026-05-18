"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  // sync with the data-theme set by the no-flash script before paint
  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme) || "dark";
    setTheme(current);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";

    const doSwap = () => {
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch {}
      setTheme(next);
    };

    if (document.startViewTransition) {
      document.startViewTransition(doSwap);
    } else {
      doSwap();
    }
  };

  return { theme, setTheme, toggle };
}
