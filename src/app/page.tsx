"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { projects, personalProjects } from "@/data/projects";
import { skills } from "@/data/skills";
import { siteContent } from "@/data/content";
import { buildingItems } from "@/data/building";

/* ─── Nav ────────────────────────────────────────────── */
const NAV = [
  { id: "profile",  label: "PROFILE",  num: "01" },
  { id: "work",     label: "WORK",     num: "02" },
  { id: "personal", label: "PERSONAL", num: "03" },
  { id: "notes",    label: "NOTES",    num: "04" },
  { id: "contact",  label: "CONTACT",  num: "05" },
];

/* ─── Shared font fragments ──────────────────────────── */
const BEBAS: React.CSSProperties = { fontFamily: "var(--font-bebas), sans-serif" };
const MONO:  React.CSSProperties = { fontFamily: "var(--font-mono), monospace" };

const LINK: React.CSSProperties = {
  ...MONO,
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--blue)",
  textDecoration: "none",
};

/* ─── Page ───────────────────────────────────────────── */
export default function Home() {
  /* Cursor refs — direct DOM, zero re-renders */
  const dotRef      = useRef<HTMLDivElement>(null);
  const ringRef     = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<HTMLSpanElement>(null);
  const rafRef      = useRef<number>(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const topBtnRef   = useRef<HTMLButtonElement>(null);

  const mouse       = useRef({ x: -100, y: -100 });
  const ring        = useRef({ x: -100, y: -100 });
  const interactive = useRef(false);
  const cursorType  = useRef("");
  const reducedMotion = useRef(false);

  const [visible,     setVisible]     = useState(false);
  const [activeId,    setActiveId]    = useState("profile");
  const [emailCopied, setEmailCopied] = useState(false);
  const [isDark,      setIsDark]      = useState(false);
  const [isTouch,     setIsTouch]     = useState(true); // default true avoids cursor flash

  /* ── Theme init ──────────────────────────────────── */
  useEffect(() => {
    const saved    = localStorage.getItem("kkl-theme");
    const sysDark  = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark     = saved ? saved === "dark" : sysDark;
    if (dark) {
      document.documentElement.setAttribute("data-theme", "dark");
      setIsDark(true);
    }
  }, []);

  /* ── Touch detection ─────────────────────────────── */
  useEffect(() => {
    const touch = window.matchMedia("(hover: none)").matches;
    setIsTouch(touch);
    if (!touch) {
      // Only hide system cursor on pointer devices
      document.documentElement.classList.add("no-touch");
    }
  }, []);

  /* ── Theme toggle ────────────────────────────────── */
  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("kkl-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("kkl-theme", "light");
    }
  };

  /* ── Update cursor fill on theme change ─────────── */
  useEffect(() => {
    if (isTouch || !cursorType.current) return;
    const dark = isDark;
    const fill      = dark ? "rgba(242,239,233,0.88)" : "rgba(17,17,17,0.88)";
    const ringColor = dark ? "rgba(242,239,233,0.28)" : "rgba(17,17,17,0.28)";
    const lblC      = dark ? "#141311" : "#F5F3EF";
    const isAction  = cursorType.current === "open" || cursorType.current === "copy" || cursorType.current === "code" || cursorType.current === "run";
    if (ringRef.current) {
      ringRef.current.style.background = isAction ? fill : "transparent";
      ringRef.current.style.border     = isAction ? "none" : `1.5px solid ${ringColor}`;
    }
    if (labelRef.current) labelRef.current.style.color = lblC;
  }, [isDark, isTouch]);

  /* ── Cursor RAF loop (mouse devices only) ────────── */
  useEffect(() => {
    if (isTouch) return;
    reducedMotion.current =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const LERP = reducedMotion.current ? 1 : 0.13;

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
  }, [isTouch]);

  /* ── Cursor mouse events (mouse devices only) ────── */
  useEffect(() => {
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setVisible(true);

      const el     = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement | null;
      const typ    = el?.dataset.cursor ?? "";
      const prevTyp = cursorType.current;
      cursorType.current = typ;
      interactive.current = !!typ;

      if (prevTyp === typ) return;

      const dark      = document.documentElement.dataset.theme === "dark";
      const fill      = dark ? "rgba(242,239,233,0.88)" : "rgba(17,17,17,0.88)";
      const ringColor = dark ? "rgba(242,239,233,0.28)" : "rgba(17,17,17,0.28)";
      const lblC      = dark ? "#141311" : "#F5F3EF";

      /* action cursors — fill ring + show label.
         "code" → CODE, "run" → RUN, "copy" → COPY, "open" → OPEN (fallback)
         "read" is a subtle hint — outline ring only, no label. */
      const isAction = typ === "open" || typ === "copy" || typ === "code" || typ === "run";
      const exiting  = !typ;

      /* dot: hide only for fill-mode actions */
      if (dotRef.current) {
        dotRef.current.style.transform = isAction
          ? "translate(-50%, -50%) scale(0)"
          : "translate(-50%, -50%) scale(1)";
      }

      /* ring: spring enter, fast exit */
      if (ringRef.current) {
        ringRef.current.style.transition = exiting
          ? "opacity 0.2s, transform 0.15s ease-in, background 0.1s, border 0.1s"
          : "opacity 0.2s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1), background 0.12s, border 0.12s";
        ringRef.current.style.transform  = typ
          ? "translate(-50%, -50%) scale(1)"
          : "translate(-50%, -50%) scale(0)";
        ringRef.current.style.background = isAction ? fill : "transparent";
        ringRef.current.style.border     = isAction ? "none"
          : typ ? `1.5px solid ${ringColor}` : "none";
      }

      /* label: opacity fade, only for action cursors */
      if (labelRef.current) {
        labelRef.current.style.opacity = isAction ? "1" : "0";
        labelRef.current.style.color   = lblC;
        if (isAction) labelRef.current.textContent = typ.toUpperCase();
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
  }, [isTouch]);

  /* ── Active section + scroll progress ───────────── */
  useEffect(() => {
    const onScroll = () => {
      const scrollY   = window.scrollY;
      const viewportH = window.innerHeight;
      const pageH     = document.documentElement.scrollHeight;

      /* progress bar — compositor-accelerated, no re-render */
      if (progressRef.current) {
        const maxScroll = pageH - viewportH;
        progressRef.current.style.transform = `scaleX(${maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0})`;
      }

      /* back-to-top — ref toggle, no re-render. Shows once past ~first screen */
      if (topBtnRef.current) {
        const show = scrollY > viewportH * 0.8;
        topBtnRef.current.style.opacity       = show ? "1" : "0";
        topBtnRef.current.style.transform     = show ? "translateY(0)" : "translateY(10px)";
        topBtnRef.current.style.pointerEvents  = show ? "auto" : "none";
      }

      if (scrollY + viewportH >= pageH - 50) {
        setActiveId(NAV[NAV.length - 1].id);
        return;
      }

      const trigger = scrollY + viewportH * 0.35;
      let current = NAV[0].id;
      for (const { id } of NAV) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= trigger) current = id;
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const copyEmail = () => {
    navigator.clipboard.writeText(siteContent.contact.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  /* ── Render ──────────────────────────────────────── */
  return (
    <>
      {/* ── Scroll progress bar ──────────────────── */}
      <div
        ref={progressRef}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          height: 1,
          background: "var(--fg)",
          transformOrigin: "left",
          transform: "scaleX(0)",
          zIndex: 10001,
          pointerEvents: "none",
        }}
      />

      {/* ── Cursor (mouse devices only) ──────────── */}
      {!isTouch && (
        <>
          {/* dot — always visible, disappears on hover */}
          <div
            ref={dotRef}
            style={{
              position: "fixed",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--cursor-dot)",
              transform: "translate(-50%, -50%) scale(1)",
              pointerEvents: "none",
              zIndex: 10000,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.15s, transform 0.1s ease-in",
            }}
          />

          {/* ring — hidden at rest; outline on interactive, filled on action */}
          <div
            ref={ringRef}
            style={{
              position: "fixed",
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "transparent",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "translate(-50%, -50%) scale(0)",
              pointerEvents: "none",
              zIndex: 9999,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.2s, transform 0.2s ease-out, background 0.12s, border 0.12s",
            }}
          >
            <span
              ref={labelRef}
              style={{
                ...MONO,
                display: "block",
                fontSize: 7,
                fontWeight: 500,
                letterSpacing: "0.05em",
                color: "var(--cursor-label)",
                userSelect: "none",
                lineHeight: 1,
                opacity: 0,
                transition: "opacity 0.12s",
              }}
            />
          </div>
        </>
      )}

      {/* ── Back to top — fixed bottom-right, fades in past first screen ── */}
      <button
        ref={topBtnRef}
        onClick={scrollToTop}
        data-cursor="read"
        aria-label="Back to top"
        className="back-to-top"
        style={{
          ...MONO,
          position: "fixed",
          right: 28,
          bottom: 28,
          zIndex: 90,
          background: "var(--bg-sidebar)",
          border: "1px solid var(--border)",
          color: "var(--fg)",
          padding: "0 12px",
          height: 44,
          minHeight: 44,
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          opacity: 0,
          transform: "translateY(10px)",
          pointerEvents: "none",
          transition: "opacity 0.25s ease, transform 0.25s ease, border-color 0.18s ease",
        }}
      >
        <span aria-hidden="true" style={{ fontSize: 13, lineHeight: 1 }}>↑</span>
        TOP
      </button>

      {/* ── Mobile top strip ─────────────────────── */}
      <div className="sidebar-mobile">
        <span style={{ ...BEBAS, fontSize: 14, letterSpacing: "0.08em", color: "var(--fg)" }}>KKL</span>
        <span style={{ ...MONO, fontSize: 10, letterSpacing: "0.12em", color: "var(--fg-secondary)" }}>
          {NAV.find(n => n.id === activeId)?.num}&nbsp;{NAV.find(n => n.id === activeId)?.label}
        </span>
        <button
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          style={{
            ...MONO,
            background: "none",
            border: "none",
            padding: 0,
            fontSize: 9,
            letterSpacing: "0.1em",
            color: "var(--fg-secondary)",
          }}
        >
          {isDark ? "○ LIGHT" : "● DARK"}
        </button>
      </div>

      {/* ── Layout ───────────────────────────────── */}
      <div style={{ display: "flex", minHeight: "100vh" }}>

        {/* ── Desktop sidebar ──────────────────── */}
        <aside
          className="sidebar-desktop"
          style={{
            position: "fixed",
            left: 0, top: 0, bottom: 0,
            width: "var(--sidebar-w)",
            borderRight: "1px solid var(--border)",
            flexDirection: "column",
            padding: "32px 24px",
            zIndex: 100,
            background: "var(--bg-sidebar)",
          }}
        >
          {/* Logo */}
          <div style={{ ...BEBAS, fontSize: 32, letterSpacing: "0.08em", lineHeight: 1, marginBottom: 28, color: "var(--fg)" }}>
            KKL
          </div>

          <div style={{ borderTop: "1px solid var(--border)", marginBottom: 28 }} />

          {/* Nav */}
          <nav aria-label="Page sections" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {NAV.map(({ id, label, num }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                data-cursor="read"
                className="nav-item"
                aria-current={activeId === id ? "true" : undefined}
                style={{
                  ...MONO,
                  background: "none",
                  border: "none",
                  padding: 0,
                  textAlign: "left",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: activeId === id ? "var(--fg)" : "var(--fg-secondary)",
                  fontWeight: activeId === id ? 500 : 400,
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  lineHeight: 1,
                  transition: "color 0.15s",
                }}
              >
                <span style={{ ...MONO, fontSize: 10, color: "var(--fg-secondary)", letterSpacing: "0.04em" }}>
                  {num}
                </span>
                {label}
              </button>
            ))}
          </nav>

          {/* Bottom */}
          <div style={{ marginTop: "auto" }}>
            <div style={{ borderTop: "1px solid var(--border)", marginBottom: 14 }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ ...MONO, fontSize: 10, color: "var(--fg-secondary)", letterSpacing: "0.05em" }}>
                2026
              </span>
              <button
                onClick={toggleTheme}
                data-cursor="read"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                style={{
                  ...MONO,
                  background: "none",
                  border: "none",
                  padding: 0,
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  color: "var(--fg-secondary)",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <span style={{ fontSize: 8 }}>{isDark ? "○" : "●"}</span>
                {isDark ? "LIGHT" : "DARK"}
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main ─────────────────────────────── */}
        <div className="page-offset" style={{ flex: 1, display: "flex", justifyContent: "center", minWidth: 0 }}>
        <main
          className="main-content content-cap"
          style={{ width: "100%", minWidth: 0 }}
        >

          {/* ── Masthead ─────────────────────── */}
          <section
            className="masthead-pad"
            style={{ padding: "48px 48px 0", borderBottom: "1px solid var(--border)" }}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 12,
            }}>
              <h1
                className="masthead-name"
                style={{ ...BEBAS, fontSize: "clamp(44px, 7vw, 88px)", lineHeight: 1, letterSpacing: "0.02em", color: "var(--fg)" }}
              >
                KAUNG KHANT LIN
              </h1>

              {/* Right column: role + live availability signal */}
              <div className="masthead-role" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, paddingBottom: 6 }}>
                <span style={{ ...BEBAS, fontSize: "clamp(14px, 2vw, 24px)", letterSpacing: "0.06em", color: "var(--fg)" }}>
                  DATA ENGINEERING
                </span>
                {/* Clicking badge jumps to contact — functional affordance, cursor signals it */}
                <button
                  onClick={() => scrollTo("contact")}
                  data-cursor="open"
                  aria-label="Open to roles — jump to contact"
                  style={{
                    ...MONO,
                    background: "none",
                    border: "1px solid var(--border)",
                    padding: "4px 10px",
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    cursor: "inherit",
                    minHeight: "unset",
                  }}
                >
                  <span style={{
                    color: "var(--blue)",
                    fontSize: 8,
                    lineHeight: 1,
                    animation: "availability-pulse 2s ease-in-out infinite",
                  }}>●</span>
                  <span style={{ color: "var(--fg)" }}>{siteContent.availability.status}</span>
                </button>
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--fg)", marginBottom: 18 }} />

            {/* Byline */}
            <div style={{ ...MONO, fontSize: 11, letterSpacing: "0.14em", color: "var(--fg-secondary)", marginBottom: 20 }}>
              BANGKOK · MYANMAR
            </div>

            <div style={{ ...MONO, fontSize: "clamp(12px, 1.4vw, 15px)", lineHeight: 1.65, marginBottom: 48, color: "var(--fg-body)" }}>
              BUILDING REAL DATA-BACKED PRODUCTS IN BANGKOK.<br />
              PIPELINES, ANALYTICS APIS, AND CIVIC DASHBOARDS.
            </div>
          </section>

          {/* ── 01 PROFILE ───────────────────── */}
          <section
            id="profile"
            aria-labelledby="heading-profile"
            className="section-pad"
            style={{ padding: "64px 48px", borderBottom: "1px solid var(--border)" }}
          >
            <SectionLabel number="01" label="PROFILE" id="heading-profile" />

            {/* About — bio left, photo right — center aligns short bio with portrait */}
            <div className="profile-bio-row" style={{ display: "flex", gap: 48, marginBottom: 56, alignItems: "center" }}>

              {/* Bio column */}
              <div style={{ flex: 1, minWidth: 0, maxWidth: 480 }}>
                {siteContent.about.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    style={{
                      ...MONO,
                      fontSize: 15,
                      lineHeight: 1.9,
                      color: "var(--fg-body)",
                      marginBottom: i < siteContent.about.paragraphs.length - 1 ? 20 : 0,
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Photo column — right side, bigger */}
              <div className="profile-photo-col" style={{ width: 220, flexShrink: 0, overflow: "hidden" }}>
                <Image
                  src="/images/profile_no_bg.png"
                  alt="Kaung Khant Lin"
                  width={1333}
                  height={2000}
                  priority
                  data-cursor="read"
                  className="profile-photo"
                  style={{ width: "100%", height: 270, objectFit: "cover", objectPosition: "center bottom", display: "block" }}
                />
              </div>
            </div>

            {/* Skills */}
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {skills.map((tier) => (
                <div key={tier.tier}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: tier.tier === "proficient" ? 16 : 12 }}>
                    <span style={{ ...BEBAS, fontSize: 15, letterSpacing: "0.1em", color: "var(--fg)" }}>
                      {tier.label.toUpperCase()}
                    </span>
                    <div style={{ flex: 1, borderTop: "1px solid var(--border-light)" }} />
                  </div>

                  {tier.tier === "proficient" ? (
                    /* Full table for proven skills */
                    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                      {tier.groups.map((group) => (
                        <div
                          key={group.category}
                          className="skill-row"
                          style={{ display: "flex", gap: 20, alignItems: "baseline" }}
                        >
                          <span
                            className="skill-category"
                            style={{ ...MONO, fontSize: 11, letterSpacing: "0.08em", color: "var(--fg-secondary)", minWidth: 160, textTransform: "uppercase" }}
                          >
                            {group.category}
                          </span>
                          <span style={{ ...MONO, fontSize: 14, color: "var(--fg-body)", lineHeight: 1.7 }}>
                            {group.items.join(", ")}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Compact chips for learning/exploring — saves ~280px vertical */
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {tier.groups.flatMap((g) => g.items).map((item) => (
                        <span
                          key={item}
                          style={{
                            ...MONO,
                            fontSize: 11,
                            letterSpacing: "0.05em",
                            border: "1px solid var(--border-light)",
                            padding: "3px 9px",
                            color: "var(--fg-secondary)",
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── 02 WORK ──────────────────────── */}
          <section
            id="work"
            aria-labelledby="heading-work"
            className="section-pad"
            style={{ padding: "64px 48px", borderBottom: "1px solid var(--border)" }}
          >
            <SectionLabel number="02" label="WORK" id="heading-work" />

            <div>
              {projects.map((project, i) => (
                <div key={project.id}>
                  <ProjectRow project={project} index={i} />
                  {i < projects.length - 1 && (
                    <div style={{ borderTop: "1px solid var(--border-light)" }} />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── 03 PERSONAL ──────────────────── */}
          <section
            id="personal"
            aria-labelledby="heading-personal"
            className="section-pad"
            style={{ padding: "64px 48px", borderBottom: "1px solid var(--border)" }}
          >
            <SectionLabel number="03" label="PERSONAL" id="heading-personal" />

            <p style={{ ...MONO, fontSize: 12, color: "var(--fg-secondary)", letterSpacing: "0.04em", marginBottom: 40 }}>
              Smaller tools and digital places I build for real life.
            </p>

            <div>
              {personalProjects.map((project, i) => (
                <div key={project.id}>
                  <ProjectRow project={project} index={i} />
                  {i < personalProjects.length - 1 && (
                    <div style={{ borderTop: "1px solid var(--border-light)" }} />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── 03 NOTES ─────────────────────── */}
          <section
            id="notes"
            aria-labelledby="heading-notes"
            className="section-pad"
            style={{ padding: "64px 48px", borderBottom: "1px solid var(--border)" }}
          >
            <SectionLabel number="04" label="NOTES" id="heading-notes" />

            <p style={{ ...MONO, fontSize: 12, color: "var(--fg-secondary)", letterSpacing: "0.04em", marginBottom: 40 }}>
              A log of things I am building and figuring out.
            </p>

            <div style={{ maxWidth: 560 }}>
              {buildingItems.map((item, i) => (
                <div key={item.id}>
                  <div style={{ paddingBottom: 36 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <span style={{
                        ...MONO,
                        fontSize: 10,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        border: "1px solid",
                        borderColor: item.status === "in_progress" ? "var(--fg)" : "var(--border)",
                        color: item.status === "in_progress" ? "var(--fg)" : "var(--fg-secondary)",
                        padding: "2px 7px",
                      }}>
                        {item.status === "in_progress" ? "In Progress" : "Planned"}
                      </span>
                    </div>

                    <h3 style={{ ...BEBAS, fontSize: 18, letterSpacing: "0.06em", lineHeight: 1, marginBottom: 8, color: "var(--fg)" }}>
                      {item.title.toUpperCase()}
                    </h3>

                    <p style={{ ...MONO, fontSize: 14, lineHeight: 1.9, color: "var(--fg-body)" }}>
                      {item.description}
                    </p>

                    {item.repoUrl && (
                      <a
                        href={item.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="code"
                        style={{ ...LINK, display: "inline-block", marginTop: 10 }}
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>

                  {i < buildingItems.length - 1 && (
                    <div style={{ borderTop: "1px solid var(--border-light)", marginBottom: 36 }} />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── 04 CONTACT ───────────────────── */}
          <section
            id="contact"
            aria-labelledby="heading-contact"
            className="section-pad"
            style={{ padding: "64px 48px 96px" }}
          >
            <SectionLabel number="05" label="CONTACT" id="heading-contact" />

            <div style={{ maxWidth: 440 }}>
              {/* Availability note */}
              <p style={{ ...MONO, fontSize: 13, color: "var(--fg-muted)", marginBottom: 36, lineHeight: 1.7 }}>
                {siteContent.availability.note}
              </p>

              {/* Email */}
              <div style={{ marginBottom: 48 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <span style={{ ...BEBAS, fontSize: 13, letterSpacing: "0.12em", color: "var(--fg)" }}>EMAIL</span>
                  <div style={{ flex: 1, borderTop: "1px solid var(--fg)" }} />
                </div>
                <button
                  onClick={copyEmail}
                  data-cursor="copy"
                  aria-label={emailCopied ? "Email address copied" : `Copy email address: ${siteContent.contact.email}`}
                  style={{
                    ...MONO,
                    background: "none",
                    border: "none",
                    padding: 0,
                    fontSize: 13,
                    letterSpacing: "0.02em",
                    color: emailCopied ? "var(--fg-secondary)" : "var(--fg-body)",
                    transition: "color 0.2s",
                  }}
                >
                  <span aria-live="polite">{emailCopied ? "Copied." : siteContent.contact.email}</span>
                </button>
              </div>

              {/* Elsewhere */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <span style={{ ...BEBAS, fontSize: 13, letterSpacing: "0.12em", color: "var(--fg)" }}>ELSEWHERE</span>
                  <div style={{ flex: 1, borderTop: "1px solid var(--fg)" }} />
                </div>
                <div style={{ display: "flex", gap: 32 }}>
                  <a href={siteContent.contact.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="open"
                    style={{ ...MONO, fontSize: 13, color: "var(--blue)", textDecoration: "none", letterSpacing: "0.04em" }}>
                    LinkedIn ↗
                  </a>
                  <a href={siteContent.contact.github} target="_blank" rel="noopener noreferrer" data-cursor="code"
                    style={{ ...MONO, fontSize: 13, color: "var(--blue)", textDecoration: "none", letterSpacing: "0.04em" }}>
                    GitHub ↗
                  </a>
                </div>
              </div>
            </div>
          </section>

        </main>
        </div>
      </div>
    </>
  );
}

/* ─── Project row ────────────────────────────────────── */
function ProjectRow({ project, index }: { project: import("@/data/projects").Project; index: number }) {
  return (
    <div
      className="project-row"
      data-cursor="read"
      style={{
        padding: "28px 0 28px 12px",
        display: "grid",
        gridTemplateColumns: "36px 1fr",
        gap: "0 20px",
        alignItems: "start",
      }}
    >
      <span className="project-num" style={{ ...MONO, fontSize: 10, color: "var(--fg-secondary)", paddingTop: 4, letterSpacing: "0.04em" }}>
        {String(index + 1).padStart(2, "0")}
      </span>

      <div>
        <span style={{ ...MONO, fontSize: 10, letterSpacing: "0.12em", color: "var(--fg-secondary)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
          {project.tag}
        </span>
        <h3 className="project-title" style={{ ...BEBAS, fontSize: 22, letterSpacing: "0.05em", lineHeight: 1, marginBottom: 8, color: "var(--fg)" }}>
          {project.title.toUpperCase()}
        </h3>
        <p style={{ ...MONO, fontSize: 14, color: "var(--fg-body)", lineHeight: 1.75, marginBottom: 10, maxWidth: 520 }}>
          {project.subtitle}
        </p>
        <p style={{ ...MONO, fontSize: 14, color: "var(--fg-secondary)", lineHeight: 1.85, marginBottom: 14, maxWidth: 520 }}>
          {project.description}
        </p>

        {/* Stack tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
          {project.stack.map((s) => (
            <span
              key={s}
              style={{
                ...MONO,
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                border: "1px solid var(--border)",
                padding: "3px 7px",
                color: "var(--fg-secondary)",
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Links — GitHub only when public (Kino's repo is private) */}
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" data-cursor="code" style={LINK}>
              GitHub ↗
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-cursor="run" style={LINK}>
              {project.liveLabel} ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Section label ──────────────────────────────────── */
function SectionLabel({ number, label, id }: { number: string; label: string; id?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
      <span style={{ ...MONO, fontSize: 10, color: "var(--fg-secondary)", letterSpacing: "0.05em" }} aria-hidden="true">
        {number}
      </span>
      {/* h2 for correct heading hierarchy: h1 (name) → h2 (section) → h3 (project/note) */}
      <h2
        id={id}
        style={{ ...BEBAS, fontSize: 26, letterSpacing: "0.1em", color: "var(--fg)", margin: 0 }}
      >
        {label}
      </h2>
      <div style={{ flex: 1, borderTop: "1px solid var(--fg)" }} aria-hidden="true" />
    </div>
  );
}
