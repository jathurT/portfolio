"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Reveal, Icon, useTilt } from "@/components/lib/motion";
import type { FeaturedProject, ProjectMockKind } from "@/types";

function Bar({ url }: { url: string }) {
  return (
    <div className="bar">
      <span className="bd" />
      <span className="bd" />
      <span className="bd" />
      <span className="url">{url}</span>
    </div>
  );
}

function ProjectMock({ kind }: { kind: ProjectMockKind }) {
  if (kind === "dental") {
    return (
      <div className="mockwin">
        <Bar url="dn-dental.lk/admin" />
        <div className="body mock-dental">
          <div className="grid">
            <div className="nav">
              <div className="item on" />
              <div className="item" />
              <div className="item" />
              <div className="item" />
              <div className="item" />
              <div className="item" />
            </div>
            <div className="panel">
              <div className="row">
                <span className="av" />
                <span className="ln" />
                <span className="time">09:00</span>
              </div>
              <div className="row">
                <span
                  className="av"
                  style={{ background: "var(--text-soft)", opacity: 0.4 }}
                />
                <span className="ln" />
                <span className="time">09:30</span>
              </div>
              <div className="row">
                <span className="av" />
                <span className="ln" />
                <span className="time">10:15</span>
              </div>
              <div className="row">
                <span
                  className="av"
                  style={{ background: "var(--text-soft)", opacity: 0.4 }}
                />
                <span className="ln" />
                <span className="time">11:00</span>
              </div>
              <div className="row">
                <span className="av" />
                <span className="ln" />
                <span className="time">13:45</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "sms") {
    return (
      <div className="mockwin">
        <Bar url="sms.uor.ac.lk/dashboard" />
        <div className="body mock-sms">
          <div className="pad">
            <div className="card">
              <div className="lbl">enrolled</div>
              <div className="num">1,284</div>
              <div className="bar">
                <i style={{ width: "82%" }} />
              </div>
            </div>
            <div className="card">
              <div className="lbl">attendance</div>
              <div className="num">94%</div>
              <div className="bar">
                <i style={{ width: "94%" }} />
              </div>
            </div>
            <div className="card">
              <div className="lbl">courses</div>
              <div className="num">38</div>
              <div className="bar">
                <i style={{ width: "60%" }} />
              </div>
            </div>
            <div className="card wide">
              <div className="lbl">recent activity</div>
              <div className="rows">
                <div className="r" />
                <div className="r m" />
                <div className="r" />
                <div className="r s" />
                <div className="r m" />
              </div>
            </div>
            <div className="card">
              <div className="lbl">lecturers</div>
              <div className="num">42</div>
              <div className="bar">
                <i style={{ width: "70%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "ml") {
    return (
      <div className="mockwin">
        <Bar url="notebook · turnover.ipynb" />
        <div className="body mock-ml">
          <svg viewBox="0 0 360 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.32" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1="0"
                x2="360"
                y1={40 + i * 32}
                y2={40 + i * 32}
                stroke="var(--border)"
                strokeWidth="1"
              />
            ))}
            <text
              x="6"
              y="20"
              fontFamily="JetBrains Mono"
              fontSize="9"
              fill="var(--text-dim)"
            >
              accuracy · 0.91
            </text>
            <text
              x="280"
              y="20"
              fontFamily="JetBrains Mono"
              fontSize="9"
              fill="var(--text-dim)"
            >
              epochs · 50
            </text>
            <path
              d="M0,150 L30,140 L60,130 L90,135 L120,110 L150,95 L180,90 L210,72 L240,75 L270,60 L300,55 L330,50 L360,46 L360,180 L0,180 Z"
              fill="url(#g1)"
            />
            <path
              d="M0,150 L30,140 L60,130 L90,135 L120,110 L150,95 L180,90 L210,72 L240,75 L270,60 L300,55 L330,50 L360,46"
              stroke="var(--accent)"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {[
              [60, 130],
              [120, 110],
              [180, 90],
              [240, 75],
              [300, 55],
              [360, 46],
            ].map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="3"
                fill="var(--bg)"
                stroke="var(--accent)"
                strokeWidth="1.5"
              />
            ))}
          </svg>
        </div>
      </div>
    );
  }

  if (kind === "hotel") {
    return (
      <div className="mockwin">
        <Bar url="hotel-booking · services" />
        <div className="body mock-hotel">
          <svg className="conn" viewBox="0 0 320 200" preserveAspectRatio="none">
            <path
              d="M160,30 L80,90"
              stroke="var(--border-strong)"
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
            />
            <path
              d="M160,30 L160,90"
              stroke="var(--border-strong)"
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
            />
            <path
              d="M160,30 L240,90"
              stroke="var(--border-strong)"
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
            />
            <path
              d="M80,130 L80,160"
              stroke="var(--border-strong)"
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
            />
            <path
              d="M160,130 L160,160"
              stroke="var(--border-strong)"
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
            />
            <path
              d="M240,130 L240,160"
              stroke="var(--border-strong)"
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
            />
          </svg>
          <div className="grid">
            <div className="node api">
              <span className="dot" />
              api gateway
            </div>
            <div className="node">
              <span className="dot" />
              user
            </div>
            <div className="node">
              <span className="dot" />
              booking
            </div>
            <div className="node">
              <span className="dot" />
              payment
            </div>
            <div className="node">postgres</div>
            <div className="node">postgres</div>
            <div className="node">stripe</div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "cloud") {
    return (
      <div className="mockwin">
        <Bar url="eks · choco-java · multi-az" />
        <div className="body mock-cloud">
          <svg className="conn" viewBox="0 0 320 200" preserveAspectRatio="none">
            <path
              d="M160,34 L80,86"
              stroke="var(--border-strong)"
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
            />
            <path
              d="M160,34 L160,86"
              stroke="var(--border-strong)"
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
            />
            <path
              d="M160,34 L240,86"
              stroke="var(--border-strong)"
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
            />
          </svg>
          <div className="grid">
            <div className="node api">
              <span className="dot" />
              spring cloud gateway
            </div>
            <div className="node">
              <span className="dot" />
              user
            </div>
            <div className="node">
              <span className="dot" />
              product
            </div>
            <div className="node">
              <span className="dot" />
              inventory
            </div>
            <div className="node">notification</div>
            <div className="node">eureka</div>
            <div className="node">kafka</div>
            <div className="node db">postgres ×4 · database-per-service</div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "blockchain") {
    return (
      <div className="mockwin">
        <Bar url="sdvn · combined-defense" />
        <div className="body mock-chain">
          <svg className="conn" viewBox="0 0 320 200" preserveAspectRatio="none">
            <path
              d="M160,34 L80,86"
              stroke="var(--border-strong)"
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
            />
            <path
              d="M160,34 L160,86"
              stroke="var(--border-strong)"
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
            />
            <path
              d="M160,34 L240,86"
              stroke="var(--border-strong)"
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
            />
          </svg>
          <div className="grid">
            <div className="node api">
              <span className="dot" />
              sdvn control plane
            </div>
            <div className="node">SC1 · auth</div>
            <div className="node">SC2 · reputation</div>
            <div className="node">SC3 · audit</div>
            <div className="node">zkSNARK proof</div>
            <div className="node">GNN → LLM</div>
            <div className="node">PQ crypto</div>
            <div className="node chainrow">
              ▦ ▦ ▦ ▦ hyperledger fabric
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function ProjectRow({
  project,
  flip,
  index,
}: {
  project: FeaturedProject;
  flip: boolean;
  index: number;
}) {
  const tiltRef = useTilt(6);
  return (
    <Reveal className={"prj" + (flip ? " flip" : "")} delay={index * 40}>
      <div className="prj-text">
        <div className="prj-year mono">{project.year}</div>
        <h3 className="prj-title">{project.title}</h3>
        <p className="prj-desc">{project.desc}</p>
        <div className="prj-stack chips">
          {project.stack.map((s, j) => (
            <span key={j} className="chip">
              {s}
            </span>
          ))}
        </div>
        <div className="prj-links">
          {project.live && (
            <a
              className="lnk"
              data-link=""
              href={project.live}
              target="_blank"
              rel="noreferrer"
            >
              live <Icon.ArrUR />
            </a>
          )}
          {project.demo && (
            <a
              className="lnk"
              data-link=""
              href={project.demo}
              target="_blank"
              rel="noreferrer"
            >
              demo <Icon.ArrUR />
            </a>
          )}
          {project.github && (
            <a
              className="lnk"
              data-link=""
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              github <Icon.ArrUR />
            </a>
          )}
        </div>
      </div>
      <div className="prj-mock" ref={tiltRef}>
        <ProjectMock kind={project.mock} />
      </div>
    </Reveal>
  );
}

export default function Projects() {
  const data = PORTFOLIO_DATA;
  return (
    <section className="section" id="projects" data-section-label="projects">
      <div className="container">
        <Reveal>
          <div className="section-label">
            <span className="num">03</span>
            <span className="line" />
            <span>selected work</span>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="h-section" style={{ maxWidth: 720, marginBottom: 64 }}>
            A handful of things I built and shipped — or am still shipping.
          </h2>
        </Reveal>

        <div className="prj-list">
          {data.featured.map((p, i) => (
            <ProjectRow key={i} project={p} flip={i % 2 === 1} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
