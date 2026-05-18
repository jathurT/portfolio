"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [updated, setUpdated] = useState("");

  useEffect(() => {
    setUpdated(
      new Date()
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .toLowerCase()
    );
  }, []);

  return (
    <footer className="footer">
      <div className="container footer-row">
        <span>built with care · colombo, lk · 2026</span>
        <span>last updated · {updated}</span>
      </div>
    </footer>
  );
}
