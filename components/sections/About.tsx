"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Reveal } from "@/components/lib/motion";

export default function About() {
  const data = PORTFOLIO_DATA;
  return (
    <section className="section" id="about" data-section-label="about">
      <div className="container">
        <Reveal>
          <div className="section-label">
            <span className="num">01</span>
            <span className="line" />
            <span>about</span>
          </div>
        </Reveal>

        <div className="about-grid">
          <Reveal className="about-prose">
            {data.person.bio.map((p, i) => (
              <p
                key={i}
                dangerouslySetInnerHTML={{
                  __html: p
                    .replace(
                      "Primary Dealer System",
                      '<span class="u-accent">Primary Dealer System</span>'
                    )
                    .replace(
                      "19th nationally",
                      '<span class="u-accent">19th nationally</span>'
                    )
                    .replace("paper", '<span class="u-accent">paper</span>'),
                }}
              />
            ))}
          </Reveal>

          <Reveal delay={120} className="about-side">
            <div className="terminal-bar">
              <span className="tb-dot" />
              <span className="tb-dot" />
              <span className="tb-dot" />
              <span className="tb-title">~/whoami</span>
            </div>
            <div className="kv">
              <span className="k">name</span>
              <span className="v">{data.person.fullName}</span>
              <span className="k">role</span>
              <span className="v">software engineer · ex-IronOne</span>
              <span className="k">focus</span>
              <span className="v">full-stack · devops · ai/ml · web3</span>
              <span className="k">studies</span>
              <span className="v">computer eng. · UoR · 3.91/4.0</span>
              <span className="k">backend</span>
              <span className="v">java · quarkus · spring · node · go</span>
              <span className="k">infra</span>
              <span className="v">docker · kubernetes · aws · jenkins · nginx</span>
              <span className="k">ml</span>
              <span className="v">python · scikit · tensorflow · pandas</span>
              <span className="k">chain</span>
              <span className="v">hyperledger · solidity · ethereum</span>
              <span className="k">based in</span>
              <span className="v">colombo, lk</span>
              <span className="k">status</span>
              <span className="v">open to swe roles · 2026</span>
              <span className="k">email</span>
              <span className="v">
                <a data-link href={"mailto:" + data.person.email}>
                  {data.person.email}
                </a>
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160} className="facts">
          {data.facts.map((f, i) => (
            <div key={i} className="fact">
              <div className="v">{f.v}</div>
              <div className="l">{f.l}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
