"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Reveal, Magnetic, Icon, useClock } from "@/components/lib/motion";

export default function Hero() {
  const data = PORTFOLIO_DATA;
  const clock = useClock(data.person.timezone);
  return (
    <section className="hero" id="home">
      <div className="dot-grid" />
      <div className="container hero-inner">
        <Reveal delay={0} className="hero-kicker">
          <span className="bar" />
          <span className="eyebrow">
            {data.person.title} · {data.person.location}
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="h-display">
            jathurshan<span className="amp">.</span>
          </h1>
        </Reveal>

        <Reveal delay={160} className="hero-statement">
          <p className="h-statement">
            I build and ship <span className="u-accent">reliable systems</span> —
            full-stack, infra, ml, and the occasional smart contract.
          </p>
        </Reveal>

        <Reveal delay={240} className="hero-ctas">
          <Magnetic strength={0.25} radius={60}>
            <a className="btn btn-fill" href="#work" data-link>
              view work <Icon.ArrR />
            </a>
          </Magnetic>
          <Magnetic strength={0.25} radius={60}>
            <a
              className="btn btn-ghost"
              href="#"
              data-link
              onClick={(e) => e.preventDefault()}
            >
              resume <Icon.ArrUR />
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={320} className="hero-status">
          <span className="pill">
            <span className="live-dot" />
            <span>{data.person.intern}</span>
            <span className="sep">·</span>
            <span className="clock">{clock} clt</span>
          </span>
        </Reveal>
      </div>
    </section>
  );
}
