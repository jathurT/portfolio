"use client";

import { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Reveal, Icon } from "@/components/lib/motion";

export default function Archive() {
  const data = PORTFOLIO_DATA;
  const [open, setOpen] = useState(false);
  const visible = open ? data.archive : data.archive.slice(0, 5);
  return (
    <section className="section" id="archive" data-section-label="archive">
      <div className="container">
        <Reveal>
          <div className="section-label">
            <span className="num">07</span>
            <span className="line" />
            <span>archive</span>
          </div>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="h-section" style={{ maxWidth: 720, marginBottom: 32 }}>
            Everything else — courseware, ML experiments, side things.
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <table className="archive-table">
            <thead>
              <tr>
                <th>year</th>
                <th>project</th>
                <th className="col-stack">made with</th>
                <th style={{ textAlign: "right" }}>links</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row, i) => (
                <tr key={i}>
                  <td className="at-year">{row.year}</td>
                  <td className="at-title">{row.title}</td>
                  <td className="at-stack col-stack">
                    {row.stack.map((s, j) => (
                      <span key={j}>{s}</span>
                    ))}
                  </td>
                  <td className="at-links">
                    {row.github && (
                      <a
                        data-link=""
                        href={row.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        github ↗
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {data.archive.length > 5 && (
          <Reveal delay={160}>
            <button
              className="show-more"
              data-link=""
              onClick={() => setOpen(!open)}
            >
              <Icon.Plus />{" "}
              {open ? "show fewer" : `show ${data.archive.length - 5} more`}
            </button>
          </Reveal>
        )}
      </div>
    </section>
  );
}
