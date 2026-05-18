"use client";

import { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Reveal } from "@/components/lib/motion";

export default function Experience() {
  const data = PORTFOLIO_DATA;
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="work" data-section-label="work">
      <div className="container">
        <Reveal>
          <div className="section-label">
            <span className="num">02</span>
            <span className="line" />
            <span>where i&apos;ve been</span>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="h-section" style={{ maxWidth: 720, marginBottom: 48 }}>
            Internships, study, and the kind of competitions that eat weekends.
          </h2>
        </Reveal>

        <div className="exp-list">
          {data.experience.map((e, i) => (
            <Reveal
              key={i}
              delay={i * 50}
              className={"exp-row" + (open === i ? " open" : "")}
              onClick={() => setOpen(open === i ? -1 : i)}
              data-link=""
            >
              <div className="left">
                <div className="exp-company">{e.company}</div>
                <div className="exp-role">{e.role}</div>
              </div>
              <div className="exp-meta">{e.dates}</div>
              <div className="exp-detail">
                <div className="exp-detail-inner">
                  <p className="exp-summary">{e.summary}</p>
                  <div className="chips">
                    {e.stack.map((s, j) => (
                      <span
                        key={j}
                        className={"chip" + (j === 0 ? " accent" : "")}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
