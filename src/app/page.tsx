"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { siteContent } from "@/data/content";
import { buildingItems } from "@/data/building";

/* ─── Nav ────────────────────────────────────────────── */
const NAV = [
  { id: "profile", label: "PROFILE", num: "01" },
  { id: "work",    label: "WORK",    num: "02" },
  { id: "notes",   label: "NOTES",   num: "03" },
  { id: "contact", label: "CONTACT", num: "04" },
];

/* ─── Shared style fragments ─────────────────────────── */
const BEBAS: React.CSSProperties = {
  fontFamily: "var(--font-bebas), sans-serif",
};
const MONO: React.CSSProperties = {
  fontFamily: "var(--font-mono), monospace",
};
const LINK: React.CSSProperties = {
  ...MONO,
  fontSize: 10,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#2563eb",
  textDecoration: "none",
};

/* ─── Page ───────────────────────────────────────────── */
export default function Home() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const rafRef   = useRef<number>(0);

  /* live refs — no re-renders */
  const mouse       = useRef({ x: -100, y: -100 });
  const ring        = useRef({ x: -100, y: -100 });
  const interactive = useRef(false);
  const reducedMotion = useRef(false);

  const [visible,     setVisible]     = useState(false);
  const [activeId,    setActiveId]    = useState("profile");
  const [emailCopied, setEmailCopied] = useState(false);

  /* ── Cursor RAF loop ─────────────────────────────── */
  useEffect(() => {
    reducedMotion.current =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const LERP = reducedMotion.current ? 1 : 0.14;

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * LERP;
      ring.current.y += (mouse.current.y - ring.current.y) * LERP;

      if (dotRef.current) {
        dotRef.current.style.left = mouse.current.x + "px";
        dotRef.current.style.top  = mouse.current.y + "px";
      }
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top  = ring.current.y + "px";
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ── Cursor mouse events ─────────────────────────── */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setVisible(true);

      const el  = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement | null;
      const typ = el?.dataset.cursor ?? "";
      const wasInteractive = interactive.current;
      interactive.current = !!typ;

      if (wasInteractive !== !!typ) {
        /* dot: hide when interactive */
        if (dotRef.current) {
          dotRef.current.style.width  = typ ? "0px"  : "6px";
          dotRef.current.style.height = typ ? "0px"  : "6px";
          dotRef.current.style.opacity = typ ? "0"   : "1";
        }
        /* ring: expand + fill when interactive */
        if (ringRef.current) {
          ringRef.current.style.width      = typ ? "50px"              : "38px";
          ringRef.current.style.height     = typ ? "50px"              : "38px";
          ringRef.current.style.background = typ ? "rgba(0,0,0,0.88)" : "transparent";
        }
        /* label: show/hide */
        if (labelRef.current) {
          labelRef.current.style.display = typ ? "block" : "none";
        }
      }
      /* always update label text */
      if (labelRef.current && typ) {
        labelRef.current.textContent = typ.toUpperCase();
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  /* Active section */
  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: "-30% 0px -50% 0px", threshold: 0 },
      );
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const copyEmail = () => {
    navigator.clipboard.writeText(siteContent.contact.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  /* ── Render ─────────────────────────────────────────── */
  return (
    <>
      {/* ── Cursor: inner dot ────────────────────────── */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#000",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 10000,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.15s, width 0.12s ease-out, height 0.12s ease-out",
        }}
      />

      {/* ── Cursor: outer ring ───────────────────────── */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: 38,
          height: 38,
          borderRadius: "50%",
          border: "1px solid #000",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.15s, width 0.12s ease-out, height 0.12s ease-out, background 0.12s ease-out",
        }}
      >
        <span
          ref={labelRef}
          style={{
            ...MONO,
            display: "none",
            fontSize: 7,
            fontWeight: 500,
            letterSpacing: "0.05em",
            color: "#fff",
            userSelect: "none",
            lineHeight: 1,
          }}
        />
      </div>

      {/* ── Mobile top strip ─────────────────────────── */}
      <div className="sidebar-mobile">
        <span style={{ ...BEBAS, fontSize: 14, letterSpacing: "0.08em" }}>KKL</span>
        <span style={{ ...MONO, fontSize: 10, letterSpacing: "0.12em", color: "#999" }}>
          {NAV.find(n => n.id === activeId)?.num} {NAV.find(n => n.id === activeId)?.label}
        </span>
      </div>

      {/* ── Layout ───────────────────────────────────── */}
      <div style={{ display: "flex", minHeight: "100vh" }}>

        {/* ── Desktop Sidebar ──────────────────────── */}
        <aside
          className="sidebar-desktop"
          style={{
            position: "fixed",
            left: 0, top: 0, bottom: 0,
            width: "var(--sidebar-w)",
            borderRight: "1px solid #000",
            flexDirection: "column",
            padding: "32px 24px",
            zIndex: 100,
            background: "#fff",
          }}
        >
          {/* Logo */}
          <div style={{ ...BEBAS, fontSize: 32, letterSpacing: "0.08em", lineHeight: 1, marginBottom: 28 }}>
            KKL
          </div>

          <div style={{ borderTop: "1px solid #000", marginBottom: 28 }} />

          {/* Nav */}
          <nav style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {NAV.map(({ id, label: lbl, num }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                data-cursor="read"
                style={{
                  ...MONO,
                  background: "none",
                  border: "none",
                  padding: 0,
                  textAlign: "left",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: activeId === id ? "#000" : "#aaa",
                  fontWeight: activeId === id ? 500 : 400,
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  lineHeight: 1,
                }}
              >
                <span style={{ ...MONO, fontSize: 9, color: "#ddd", letterSpacing: "0.04em" }}>
                  {num}
                </span>
                {lbl}
              </button>
            ))}
          </nav>

          {/* Bottom */}
          <div style={{ marginTop: "auto" }}>
            <div style={{ borderTop: "1px solid #000", marginBottom: 14 }} />
            <span style={{ ...MONO, fontSize: 10, color: "#aaa", letterSpacing: "0.05em" }}>
              2026
            </span>
          </div>
        </aside>

        {/* ── Main ─────────────────────────────────── */}
        <main
          className="main-content"
          style={{ marginLeft: "var(--sidebar-w)", flex: 1, minWidth: 0 }}
        >

          {/* ── Masthead ─────────────────────────── */}
          <section
            className="masthead-pad"
            style={{ padding: "48px 48px 0", borderBottom: "1px solid #000" }}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 12,
            }}>
              <h1
                className="masthead-name"
                style={{ ...BEBAS, fontSize: "clamp(44px, 7vw, 88px)", lineHeight: 1, letterSpacing: "0.02em" }}
              >
                KAUNG KHANT LIN
              </h1>
              <span
                className="masthead-role"
                style={{ ...BEBAS, fontSize: "clamp(14px, 2vw, 24px)", letterSpacing: "0.06em", paddingBottom: 6 }}
              >
                DATA ENGINEERING
              </span>
            </div>

            <div style={{ borderTop: "1px solid #000", marginBottom: 18 }} />

            <div style={{ ...MONO, fontSize: 11, letterSpacing: "0.14em", color: "#888", marginBottom: 22 }}>
              BANGKOK · MYANMAR
            </div>

            <div style={{
              ...MONO,
              fontSize: "clamp(12px, 1.4vw, 15px)",
              lineHeight: 1.65,
              marginBottom: 48,
              color: "#000",
            }}>
              LEARNING DATA ENGINEERING.<br />
              BUILDING REAL PIPELINES IN BANGKOK.
            </div>
          </section>

          {/* ── 01 PROFILE ───────────────────────── */}
          <section
            id="profile"
            className="section-pad"
            style={{ padding: "64px 48px", borderBottom: "1px solid #000" }}
          >
            <SectionLabel number="01" label="PROFILE" />

            {/* About */}
            <div style={{ maxWidth: 620, marginBottom: 56 }}>
              {siteContent.about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  data-cursor="read"
                  style={{
                    ...MONO,
                    fontSize: 13,
                    lineHeight: 1.85,
                    color: "#333",
                    marginBottom: i < siteContent.about.paragraphs.length - 1 ? 18 : 0,
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Skills */}
            <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              {skills.map((tier) => (
                <div key={tier.tier}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                    <span style={{ ...BEBAS, fontSize: 15, letterSpacing: "0.1em" }}>
                      {tier.label.toUpperCase()}
                    </span>
                    <div style={{ flex: 1, borderTop: "1px solid #e5e5e5" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {tier.groups.map((group) => (
                      <div
                        key={group.category}
                        className="skill-row"
                        style={{ display: "flex", gap: 20, alignItems: "baseline" }}
                      >
                        <span
                          className="skill-category"
                          style={{ ...MONO, fontSize: 10, letterSpacing: "0.1em", color: "#aaa", minWidth: 140, textTransform: "uppercase" }}
                        >
                          {group.category}
                        </span>
                        <span style={{ ...MONO, fontSize: 12, color: "#444", lineHeight: 1.6 }}>
                          {group.items.join(", ")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 02 WORK ──────────────────────────── */}
          <section
            id="work"
            className="section-pad"
            style={{ padding: "64px 48px", borderBottom: "1px solid #000" }}
          >
            <SectionLabel number="02" label="WORK" />

            <div>
              {projects.map((project, i) => (
                <div key={project.id}>
                  <div
                    className="project-row"
                    style={{
                      padding: "28px 0 28px 12px",
                      display: "grid",
                      gridTemplateColumns: "36px 1fr",
                      gap: "0 20px",
                      alignItems: "start",
                    }}
                  >
                    {/* Row number */}
                    <span style={{ ...MONO, fontSize: 10, color: "#ccc", paddingTop: 4, letterSpacing: "0.04em" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Content */}
                    <div>
                      <span style={{ ...MONO, fontSize: 9, letterSpacing: "0.15em", color: "#999", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                        {project.tag}
                      </span>
                      <h3 style={{ ...BEBAS, fontSize: 22, letterSpacing: "0.05em", lineHeight: 1, marginBottom: 8 }}>
                        {project.title.toUpperCase()}
                      </h3>
                      <p
                        data-cursor="read"
                        style={{ ...MONO, fontSize: 12, color: "#666", lineHeight: 1.75, marginBottom: 12, maxWidth: 500 }}
                      >
                        {project.subtitle}
                      </p>

                      {/* Stack tags */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
                        {project.stack.map((s) => (
                          <span
                            key={s}
                            style={{
                              ...MONO,
                              fontSize: 9,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              border: "1px solid #e0e0e0",
                              padding: "2px 6px",
                              color: "#888",
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="open"
                          style={LINK}
                        >
                          GitHub ↗
                        </a>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="open"
                            style={LINK}
                          >
                            {project.liveLabel} ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {i < projects.length - 1 && (
                    <div style={{ borderTop: "1px solid #f0f0f0" }} />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── 03 NOTES ─────────────────────────── */}
          <section
            id="notes"
            className="section-pad"
            style={{ padding: "64px 48px", borderBottom: "1px solid #000" }}
          >
            <SectionLabel number="03" label="NOTES" />

            <p style={{ ...MONO, fontSize: 11, color: "#aaa", letterSpacing: "0.06em", marginBottom: 40, textTransform: "uppercase" }}>
              A log of things I am building and figuring out.
            </p>

            <div style={{ maxWidth: 600 }}>
              {buildingItems.map((item, i) => (
                <div key={item.id}>
                  <div style={{ paddingBottom: 36 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <span style={{
                        ...MONO,
                        fontSize: 9,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        border: "1px solid",
                        borderColor: item.status === "in_progress" ? "#000" : "#ccc",
                        color: item.status === "in_progress" ? "#000" : "#aaa",
                        padding: "2px 6px",
                      }}>
                        {item.status === "in_progress" ? "In Progress" : "Planned"}
                      </span>
                    </div>

                    <h4 style={{ ...BEBAS, fontSize: 18, letterSpacing: "0.06em", lineHeight: 1, marginBottom: 8 }}>
                      {item.title.toUpperCase()}
                    </h4>

                    <p
                      data-cursor="read"
                      style={{ ...MONO, fontSize: 12, lineHeight: 1.85, color: "#555" }}
                    >
                      {item.description}
                    </p>

                    {item.repoUrl && (
                      <a
                        href={item.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="open"
                        style={{ ...LINK, display: "inline-block", marginTop: 10 }}
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>

                  {i < buildingItems.length - 1 && (
                    <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: 36 }} />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── 04 CONTACT ───────────────────────── */}
          <section
            id="contact"
            className="section-pad"
            style={{ padding: "64px 48px 96px" }}
          >
            <SectionLabel number="04" label="CONTACT" />

            <div style={{ maxWidth: 440 }}>
              {/* Email */}
              <div style={{ marginBottom: 48 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <span style={{ ...BEBAS, fontSize: 13, letterSpacing: "0.12em" }}>EMAIL</span>
                  <div style={{ flex: 1, borderTop: "1px solid #000" }} />
                </div>
                <button
                  onClick={copyEmail}
                  data-cursor="copy"
                  style={{
                    ...MONO,
                    background: "none",
                    border: "none",
                    padding: 0,
                    fontSize: 13,
                    letterSpacing: "0.02em",
                    color: emailCopied ? "#aaa" : "#000",
                    transition: "color 0.2s",
                  }}
                >
                  {emailCopied ? "Copied." : siteContent.contact.email}
                </button>
              </div>

              {/* Elsewhere */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <span style={{ ...BEBAS, fontSize: 13, letterSpacing: "0.12em" }}>ELSEWHERE</span>
                  <div style={{ flex: 1, borderTop: "1px solid #000" }} />
                </div>
                <div style={{ display: "flex", gap: 32 }}>
                  <a
                    href={siteContent.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="open"
                    style={{ ...MONO, fontSize: 13, color: "#2563eb", textDecoration: "none", letterSpacing: "0.04em" }}
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href={siteContent.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="open"
                    style={{ ...MONO, fontSize: 13, color: "#2563eb", textDecoration: "none", letterSpacing: "0.04em" }}
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </>
  );
}

/* ─── Section label ──────────────────────────────────── */
function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
      <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: "#ccc", letterSpacing: "0.05em" }}>
        {number}
      </span>
      <span style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 26, letterSpacing: "0.1em" }}>
        {label}
      </span>
      <div style={{ flex: 1, borderTop: "1px solid #000" }} />
    </div>
  );
}
