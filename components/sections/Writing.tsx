"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Reveal } from "@/components/lib/motion";

export default function Writing() {
  const data = PORTFOLIO_DATA;
  return (
    <section className="section" id="writing" data-section-label="writing">
      <div className="container">
        <Reveal>
          <div className="section-label">
            <span className="num">09</span>
            <span className="line" />
            <span>writing</span>
          </div>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="h-section" style={{ maxWidth: 720, marginBottom: 24 }}>
            Notes from the road.
          </h2>
        </Reveal>

        <div className="writing-list">
          {data.writing.map((w, i) => (
            <Reveal key={i} delay={i * 40}>
              <a
                className="writing-row"
                data-link=""
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <span className="w-date">{w.date}</span>
                <span className="w-title">{w.title}</span>
                <span className="w-time">{w.read}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
