/* global React */
const { useEffect, useRef, useState, useMemo } = React;

// ============================================================
// hooks
// ============================================================

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, className = "", as: As = "div", ...rest }) {
  const ref = useReveal();
  return (
    <As
      ref={ref}
      className={"reveal " + className}
      style={{ transitionDelay: delay + "ms" }}
      {...rest}
    >
      {children}
    </As>
  );
}

// magnetic-pull wrapper — moves child toward cursor within radius
function Magnetic({ children, strength = 0.35, radius = 80 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(mx, my);
      if (dist < radius + Math.max(r.width, r.height) / 2) {
        cx = mx * strength; cy = my * strength;
      } else {
        cx = 0; cy = 0;
      }
    };
    const onLeave = () => { cx = 0; cy = 0; };
    const tick = () => {
      tx += (cx - tx) * 0.18;
      ty += (cy - ty) * 0.18;
      el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength, radius]);
  return <span ref={ref} style={{ display: "inline-flex" }}>{children}</span>;
}

// 3D tilt on project mockups
function useTilt(max = 6) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1200px) rotateY(${(px * max).toFixed(2)}deg) rotateX(${(-py * max).toFixed(2)}deg) translateZ(0)`;
    };
    const onLeave = () => { el.style.transform = ""; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [max]);
  return ref;
}

// live clock for given tz
function useClock(tz) {
  const [t, setT] = useState(() => fmt(tz));
  useEffect(() => {
    const id = setInterval(() => setT(fmt(tz)), 1000);
    return () => clearInterval(id);
  }, [tz]);
  return t;
  function fmt(tz) {
    try {
      return new Intl.DateTimeFormat("en-GB", {
        timeZone: tz,
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
      }).format(new Date());
    } catch { return "--:--:--"; }
  }
}

// ============================================================
// icons (tiny inline)
// ============================================================
const Icon = {
  ArrUR: () => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="arr">
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  ),
  ArrR: () => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="arr">
      <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
    </svg>
  ),
  Sun: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  ),
  Moon: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
};

// ============================================================
// section: hero
// ============================================================
function Hero({ data }) {
  const clock = useClock(data.person.timezone);
  return (
    <section className="hero" id="home">
      <div className="dot-grid" />
      <div className="container hero-inner">
        <Reveal delay={0} className="hero-kicker">
          <span className="bar" />
          <span className="eyebrow">{data.person.title} · {data.person.location}</span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="h-display">
            jathurshan<span className="amp">.</span>
          </h1>
        </Reveal>

        <Reveal delay={160} className="hero-statement">
          <p className="h-statement">
            I build and ship <span className="u-accent">reliable systems</span> — full-stack, infra, ml, and the occasional smart contract.
          </p>
        </Reveal>

        <Reveal delay={240} className="hero-ctas">
          <Magnetic strength={0.25} radius={60}>
            <a className="btn btn-fill" href="#work" data-link>
              view work <Icon.ArrR />
            </a>
          </Magnetic>
          <Magnetic strength={0.25} radius={60}>
            <a className="btn btn-ghost" href="#" data-link onClick={(e) => e.preventDefault()}>
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

// ============================================================
// section: about
// ============================================================
function About({ data }) {
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
              <p key={i} dangerouslySetInnerHTML={{
                __html: p
                  .replace("Primary Dealer System", '<span class="u-accent">Primary Dealer System</span>')
                  .replace("19th nationally", '<span class="u-accent">19th nationally</span>')
                  .replace("paper", '<span class="u-accent">paper</span>')
              }} />
            ))}
          </Reveal>

          <Reveal delay={120} className="about-side">
            <div className="terminal-bar">
              <span className="tb-dot" /><span className="tb-dot" /><span className="tb-dot" />
              <span className="tb-title">~/whoami</span>
            </div>
            <div className="kv">
              <span className="k">name</span><span className="v">{data.person.fullName}</span>
              <span className="k">role</span><span className="v">SWE intern · IronOne</span>
              <span className="k">focus</span><span className="v">full-stack · devops · ai/ml · web3</span>
              <span className="k">studies</span><span className="v">computer eng. · UoR · 3.91/4.0</span>
              <span className="k">backend</span><span className="v">java · quarkus · spring · node · go</span>
              <span className="k">infra</span><span className="v">docker · kubernetes · aws · jenkins · nginx</span>
              <span className="k">ml</span><span className="v">python · scikit · tensorflow · pandas</span>
              <span className="k">chain</span><span className="v">hyperledger · solidity · ethereum</span>
              <span className="k">based in</span><span className="v">colombo, lk</span>
              <span className="k">email</span><span className="v">
                <a data-link href={"mailto:" + data.person.email}>{data.person.email}</a>
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

// ============================================================
// section: work / experience
// ============================================================
function Experience({ data }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="work" data-section-label="work">
      <div className="container">
        <Reveal>
          <div className="section-label">
            <span className="num">02</span>
            <span className="line" />
            <span>where i've been</span>
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
              data-link
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
                      <span key={j} className={"chip" + (j === 0 ? " accent" : "")}>{s}</span>
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

// ============================================================
// project mock illustrations
// ============================================================
function ProjectMock({ kind }) {
  const Bar = ({ url }) => (
    <div className="bar">
      <span className="bd" /><span className="bd" /><span className="bd" />
      <span className="url">{url}</span>
    </div>
  );

  if (kind === "dental") {
    return (
      <div className="mockwin">
        <Bar url="dn-dental.lk/admin" />
        <div className="body mock-dental">
          <div className="grid">
            <div className="nav">
              <div className="item on" />
              <div className="item" /><div className="item" /><div className="item" />
              <div className="item" /><div className="item" />
            </div>
            <div className="panel">
              <div className="row">
                <span className="av" /><span className="ln" /><span className="time">09:00</span>
              </div>
              <div className="row">
                <span className="av" style={{ background: "var(--text-soft)", opacity: 0.4 }} /><span className="ln" /><span className="time">09:30</span>
              </div>
              <div className="row">
                <span className="av" /><span className="ln" /><span className="time">10:15</span>
              </div>
              <div className="row">
                <span className="av" style={{ background: "var(--text-soft)", opacity: 0.4 }} /><span className="ln" /><span className="time">11:00</span>
              </div>
              <div className="row">
                <span className="av" /><span className="ln" /><span className="time">13:45</span>
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
              <div className="bar"><i style={{ width: "82%" }} /></div>
            </div>
            <div className="card">
              <div className="lbl">attendance</div>
              <div className="num">94%</div>
              <div className="bar"><i style={{ width: "94%" }} /></div>
            </div>
            <div className="card">
              <div className="lbl">courses</div>
              <div className="num">38</div>
              <div className="bar"><i style={{ width: "60%" }} /></div>
            </div>
            <div className="card wide">
              <div className="lbl">recent activity</div>
              <div className="rows">
                <div className="r" /><div className="r m" /><div className="r" /><div className="r s" /><div className="r m" />
              </div>
            </div>
            <div className="card">
              <div className="lbl">lecturers</div>
              <div className="num">42</div>
              <div className="bar"><i style={{ width: "70%" }} /></div>
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
            {/* gridlines */}
            {[0,1,2,3,4].map(i => (
              <line key={i} x1="0" x2="360" y1={40 + i*32} y2={40 + i*32} stroke="var(--border)" strokeWidth="1" />
            ))}
            {/* labels */}
            <text x="6" y="20" fontFamily="JetBrains Mono" fontSize="9" fill="var(--text-dim)">accuracy · 0.91</text>
            <text x="280" y="20" fontFamily="JetBrains Mono" fontSize="9" fill="var(--text-dim)">epochs · 50</text>
            {/* area */}
            <path d="M0,150 L30,140 L60,130 L90,135 L120,110 L150,95 L180,90 L210,72 L240,75 L270,60 L300,55 L330,50 L360,46 L360,180 L0,180 Z" fill="url(#g1)" />
            {/* line */}
            <path d="M0,150 L30,140 L60,130 L90,135 L120,110 L150,95 L180,90 L210,72 L240,75 L270,60 L300,55 L330,50 L360,46"
              stroke="var(--accent)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            {/* dots */}
            {[[60,130],[120,110],[180,90],[240,75],[300,55],[360,46]].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r="3" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
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
            <path d="M160,30 L80,90" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            <path d="M160,30 L160,90" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            <path d="M160,30 L240,90" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            <path d="M80,130 L80,160" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            <path d="M160,130 L160,160" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            <path d="M240,130 L240,160" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
          </svg>
          <div className="grid">
            <div className="node api"><span className="dot" />api gateway</div>
            <div className="node"><span className="dot" />user</div>
            <div className="node"><span className="dot" />booking</div>
            <div className="node"><span className="dot" />payment</div>
            <div className="node">postgres</div>
            <div className="node">postgres</div>
            <div className="node">stripe</div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// ============================================================
// section: selected projects
// ============================================================
function Projects({ data }) {
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

function ProjectRow({ project, flip, index }) {
  const tiltRef = useTilt(6);
  return (
    <Reveal className={"prj" + (flip ? " flip" : "")} delay={index * 40}>
      <div className="prj-text">
        <div className="prj-year mono">{project.year}</div>
        <h3 className="prj-title">{project.title}</h3>
        <p className="prj-desc">{project.desc}</p>
        <div className="prj-stack chips">
          {project.stack.map((s, j) => <span key={j} className="chip">{s}</span>)}
        </div>
        <div className="prj-links">
          {project.live && (
            <a className="lnk" data-link href={project.live} target="_blank" rel="noreferrer">
              live <Icon.ArrUR />
            </a>
          )}
          {project.github && (
            <a className="lnk" data-link href={project.github} target="_blank" rel="noreferrer">
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

// ============================================================
// section: skills
// ============================================================
function Skills({ data }) {
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
            What's currently on the bench.
          </h2>
        </Reveal>
        <Reveal delay={120} className="skills-grid">
          {data.skills.map((cat, i) => (
            <div key={i} className="skill-cat">
              <h4>{cat.cat}</h4>
              <ul>
                {cat.items.map(([name, yrs], j) => (
                  <li key={j}><span>{name}</span><span className="yrs">{yrs}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
// section: archive
// ============================================================
function Archive({ data }) {
  const [open, setOpen] = useState(false);
  const visible = open ? data.archive : data.archive.slice(0, 5);
  return (
    <section className="section" id="archive" data-section-label="archive">
      <div className="container">
        <Reveal>
          <div className="section-label">
            <span className="num">05</span>
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
                    {row.stack.map((s, j) => <span key={j}>{s}</span>)}
                  </td>
                  <td className="at-links">
                    {row.github && <a data-link href={row.github} target="_blank" rel="noreferrer">github ↗</a>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {data.archive.length > 5 && (
          <Reveal delay={160}>
            <button className="show-more" data-link onClick={() => setOpen(!open)}>
              <Icon.Plus /> {open ? "show fewer" : `show ${data.archive.length - 5} more`}
            </button>
          </Reveal>
        )}
      </div>
    </section>
  );
}

// ============================================================
// section: recommendations — "wall of love" bento grid
// ============================================================
function Recommendations({ data }) {
  const recs = data.recommendations;
  const featured = recs.find((r) => r.featured) || recs[0];
  const rest = recs.filter((r) => r !== featured);
  const [active, setActive] = useState(null);

  return (
    <section className="section recs-section" id="recommendations" data-section-label="recs">
      <div className="container">
        <Reveal>
          <div className="section-label">
            <span className="num">06</span>
            <span className="line" />
            <span>what people say</span>
          </div>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="h-section recs-title">
            <span className="serif-it">Wall of love</span>
            <span className="dim recs-title-sub">— {recs.length} recommendations from the team I've shipped with at IronOne.</span>
          </h2>
        </Reveal>

        {/* signal row — quick credibility band */}
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

        {/* bento grid */}
        <div className="rec-wall">
          {/* featured (large, spans 2x2) */}
          <div
            className={"rec-card rec-card-featured rec-in" + (active === "f" ? " active" : "")}
            data-tint={featured.tint}
            style={{ animationDelay: "160ms" }}
            onMouseEnter={() => setActive("f")}
            onMouseLeave={() => setActive(null)}
          >
            <div className="rec-card-top">
              <span className="rec-mark-glyph">"</span>
              <span className="rec-badge">
                <span className="rec-badge-dot" />
                featured · {featured.relationship.toLowerCase()}
              </span>
            </div>

            <p className="rec-pull">"{featured.pull}"</p>
            <p className="rec-quote-body">{featured.quote}</p>

            <div className="rec-card-foot">
              <div className={"rec-avi tint-" + featured.tint}>
                <span>{featured.initials}</span>
              </div>
              <div className="rec-id">
                <span className="rec-id-name">
                  {featured.name}
                  <svg className="rec-li" viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-label="linkedin">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.05-1.86-3.05-1.87 0-2.16 1.46-2.16 2.96v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.86 3.38-1.86 3.61 0 4.28 2.38 4.28 5.47v6.28zM5.34 7.43a2.06 2.06 0 1 1 .01-4.12 2.06 2.06 0 0 1-.01 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                  </svg>
                </span>
                <span className="rec-id-role">{featured.role} · {featured.company}</span>
              </div>
              <span className="rec-date">{featured.date}</span>
            </div>

            <span className="rec-card-grain" />
          </div>

          {/* rest of cards */}
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
                <span className="rec-mark-glyph small">"</span>
                <span className="rec-rel">{r.relationship.toLowerCase()}</span>
              </div>
              <p className="rec-pull small">"{r.pull}"</p>
              <p className="rec-quote-body small">{r.quote}</p>
              <div className="rec-card-foot">
                <div className={"rec-avi tint-" + r.tint}>
                  <span>{r.initials}</span>
                </div>
                <div className="rec-id">
                  <span className="rec-id-name">
                    {r.name}
                    <svg className="rec-li" viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-label="linkedin">
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.05-1.86-3.05-1.87 0-2.16 1.46-2.16 2.96v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.86 3.38-1.86 3.61 0 4.28 2.38 4.28 5.47v6.28zM5.34 7.43a2.06 2.06 0 1 1 .01-4.12 2.06 2.06 0 0 1-.01 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                    </svg>
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
            data-link
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

// ============================================================
// section: writing
// ============================================================
function Writing({ data }) {
  return (
    <section className="section" id="writing" data-section-label="writing">
      <div className="container">
        <Reveal>
          <div className="section-label">
            <span className="num">07</span>
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
              <a className="writing-row" data-link href="#" onClick={(e) => e.preventDefault()}>
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

// ============================================================
// section: contact + footer
// ============================================================
function Contact({ data }) {
  return (
    <section className="section contact" id="contact" data-section-label="contact">
      <div className="container">
        <Reveal>
          <div className="section-label">
            <span className="num">08</span>
            <span className="line" />
            <span>get in touch</span>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="contact-title">
            let's build<br />something<span className="accent-text">.</span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="contact-sub">
            I'm open to junior / new-grad roles starting 2026 — software, devops / platform, ai/ml, or anywhere the lines blur. If you've got a system that should hold up, I'd love to talk.
          </p>
        </Reveal>

        <Reveal delay={180} className="contact-actions">
          <Magnetic strength={0.25}>
            <a className="btn btn-fill" data-link href={"mailto:" + data.person.email}>
              {data.person.email} <Icon.ArrR />
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a className="btn btn-ghost" data-link href={data.person.socials.linkedin} target="_blank" rel="noreferrer">
              linkedin <Icon.ArrUR />
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={240} className="socials">
          <a data-link href={data.person.socials.github} target="_blank" rel="noreferrer">github · @jathurT</a>
          <a data-link href={data.person.socials.linkedin} target="_blank" rel="noreferrer">linkedin · @jathurt</a>
          <a data-link href={data.person.socials.leetcode} target="_blank" rel="noreferrer">leetcode · @ktmjathur2001</a>
          <a data-link href={data.person.socials.medium} target="_blank" rel="noreferrer">medium · @jathurt</a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-row">
        <span>built with care · colombo, lk · 2026</span>
        <span>last updated · {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toLowerCase()}</span>
      </div>
    </footer>
  );
}

// expose
Object.assign(window, {
  Hero, About, Experience, Projects, Skills, Archive, Recommendations, Writing, Contact, Footer,
  Reveal, Magnetic, useReveal, Icon,
});
