"use client";

import { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Reveal, Icon } from "@/components/lib/motion";

function LinkedInGlyph({ size }: { size: number }) {
  return (
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
  );
}

export default function Recommendations() {
  const data = PORTFOLIO_DATA;
  const recs = data.recommendations;
  const featured = recs.find((r) => r.featured) || recs[0];
  const rest = recs.filter((r) => r !== featured);
  const [active, setActive] = useState<number | "f" | null>(null);

  return (
    <section
      className="section recs-section"
      id="recommendations"
      data-section-label="recs"
    >
      <div className="container">
        <Reveal>
          <div className="section-label">
            <span className="num">08</span>
            <span className="line" />
            <span>what people say</span>
          </div>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="h-section recs-title">
            <span className="serif-it">Wall of love</span>
            <span className="dim recs-title-sub">
              — {recs.length} recommendations from the team I&apos;ve shipped with
              at IronOne.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="rec-signals">
            <div className="rec-signal">
              <span className="rec-signal-v">{recs.length}</span>
              <span className="rec-signal-l">linkedin recs</span>
            </div>
            <div className="rec-signal">
              <span className="rec-signal-v">100%</span>
              <span className="rec-signal-l">verified · ironone</span>
            </div>
            <div className="rec-signal">
              <span className="rec-signal-v">2</span>
              <span className="rec-signal-l">direct managers</span>
            </div>
            <div className="rec-signal">
              <span className="rec-signal-v">6 mo</span>
              <span className="rec-signal-l">working alongside</span>
            </div>
          </div>
        </Reveal>

        <div className="rec-wall">
          <div
            className={
              "rec-card rec-card-featured rec-in" +
              (active === "f" ? " active" : "")
            }
            data-tint={featured.tint}
            style={{ animationDelay: "160ms" }}
            onMouseEnter={() => setActive("f")}
            onMouseLeave={() => setActive(null)}
          >
            <div className="rec-card-top">
              <span className="rec-mark-glyph">&quot;</span>
              <span className="rec-badge">
                <span className="rec-badge-dot" />
                featured · {featured.relationship.toLowerCase()}
              </span>
            </div>

            <p className="rec-pull">&quot;{featured.pull}&quot;</p>
            <p className="rec-quote-body">{featured.quote}</p>

            <div className="rec-card-foot">
              <div className={"rec-avi tint-" + featured.tint}>
                <span>{featured.initials}</span>
              </div>
              <div className="rec-id">
                <span className="rec-id-name">
                  {featured.name}
                  <LinkedInGlyph size={13} />
                </span>
                <span className="rec-id-role">
                  {featured.role} · {featured.company}
                </span>
              </div>
              <span className="rec-date">{featured.date}</span>
            </div>

            <span className="rec-card-grain" />
          </div>

          {rest.map((r, i) => (
            <div
              key={r.initials}
              className={"rec-card rec-in" + (active === i ? " active" : "")}
              data-tint={r.tint}
              style={{ animationDelay: 200 + i * 60 + "ms" }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="rec-card-top">
                <span className="rec-mark-glyph small">&quot;</span>
                <span className="rec-rel">{r.relationship.toLowerCase()}</span>
              </div>
              <p className="rec-pull small">&quot;{r.pull}&quot;</p>
              <p className="rec-quote-body small">{r.quote}</p>
              <div className="rec-card-foot">
                <div className={"rec-avi tint-" + r.tint}>
                  <span>{r.initials}</span>
                </div>
                <div className="rec-id">
                  <span className="rec-id-name">
                    {r.name}
                    <LinkedInGlyph size={12} />
                  </span>
                  <span className="rec-id-role">{r.role}</span>
                </div>
              </div>
              <span className="rec-card-grain" />
            </div>
          ))}
        </div>

        <Reveal delay={460}>
          <a
            className="rec-cta"
            data-link=""
            href={data.person.socials.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            view all on linkedin <Icon.ArrUR />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
