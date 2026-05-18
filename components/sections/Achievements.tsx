"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Reveal } from "@/components/lib/motion";

export default function Achievements() {
  const data = PORTFOLIO_DATA;
  return (
    <section
      className="section"
      id="achievements"
      data-section-label="achievements"
    >
      <div className="container">
        <Reveal>
          <div className="section-label">
            <span className="num">05</span>
            <span className="line" />
            <span>achievements</span>
          </div>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="h-section" style={{ maxWidth: 720, marginBottom: 8 }}>
            Where the weekends went.
          </h2>
        </Reveal>

        <div className="ach-grid">
          {data.achievements.map((a, i) => (
            <Reveal key={a.id} delay={i * 60} className="ach-card">
              <div className="ach-top">
                <span className="ach-cat">{a.category}</span>
                <span className="ach-rank">{a.rank}</span>
              </div>
              <div>
                <div className="ach-title">{a.title}</div>
                <div className="ach-org">
                  {a.organization} · {a.date}
                </div>
              </div>
              <p className="ach-desc">{a.description}</p>
              <div className="ach-foot">
                {a.totalParticipants && (
                  <span>
                    <span className="live-dot" />
                    {a.totalParticipants}
                  </span>
                )}
                {a.globalRank && <span>{a.globalRank}</span>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
