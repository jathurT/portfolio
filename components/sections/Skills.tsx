"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Reveal } from "@/components/lib/motion";

export default function Skills() {
  const data = PORTFOLIO_DATA;
  return (
    <section className="section" id="skills" data-section-label="skills">
      <div className="container">
        <Reveal>
          <div className="section-label">
            <span className="num">04</span>
            <span className="line" />
            <span>stack</span>
          </div>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="h-section" style={{ maxWidth: 720, marginBottom: 24 }}>
            What&apos;s currently on the bench.
          </h2>
        </Reveal>
        <Reveal delay={120} className="skills-grid">
          {data.skills.map((cat, i) => (
            <div key={i} className="skill-cat">
              <h4>{cat.cat}</h4>
              <ul>
                {cat.items.map(([name, yrs], j) => (
                  <li key={j}>
                    <span>{name}</span>
                    <span className="yrs">{yrs}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
