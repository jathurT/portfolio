"use client";

import { useMemo, useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Reveal, Icon } from "@/components/lib/motion";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// "2024-08" -> "Aug 2024" (pure, no Date/timezone — hydration-safe)
function fmtIssue(d: string) {
  const [y, m] = d.split("-");
  const mi = Number(m) - 1;
  return MONTHS[mi] ? `${MONTHS[mi]} ${y}` : d;
}

const INITIAL = 9;

export default function Certifications() {
  const data = PORTFOLIO_DATA;
  const [open, setOpen] = useState(false);

  const sorted = useMemo(
    () =>
      [...data.certifications].sort((a, b) =>
        b.issueDate.localeCompare(a.issueDate)
      ),
    [data.certifications]
  );
  const visible = open ? sorted : sorted.slice(0, INITIAL);

  return (
    <section
      className="section"
      id="certifications"
      data-section-label="certifications"
    >
      <div className="container">
        <Reveal>
          <div className="section-label">
            <span className="num">06</span>
            <span className="line" />
            <span>certifications</span>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="cert-head">
            <h2 className="h-section" style={{ maxWidth: 720 }}>
              Proof I kept reading the docs.
            </h2>
            <span className="cert-count">
              {sorted.length} credentials · verified
            </span>
          </div>
        </Reveal>

        <Reveal delay={100} className="cert-grid">
          {visible.map((c) => (
            <div key={c.id} className="cert-card">
              <div className="cert-top">
                <span className="cert-org">{c.issuingOrganization}</span>
                <span className="cert-date">{fmtIssue(c.issueDate)}</span>
              </div>
              <div className="cert-name">{c.name}</div>
              <div className="cert-skills chips">
                {c.skills.map((s, j) => (
                  <span key={j} className="chip">
                    {s}
                  </span>
                ))}
              </div>
              {c.credentialUrl && (
                <a
                  className="cert-link"
                  data-link=""
                  href={c.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  view credential <Icon.ArrUR />
                </a>
              )}
            </div>
          ))}
        </Reveal>

        {sorted.length > INITIAL && (
          <Reveal delay={160}>
            <button
              className="show-more"
              data-link=""
              onClick={() => setOpen(!open)}
            >
              <Icon.Plus />{" "}
              {open
                ? "show fewer"
                : `show ${sorted.length - INITIAL} more`}
            </button>
          </Reveal>
        )}
      </div>
    </section>
  );
}
