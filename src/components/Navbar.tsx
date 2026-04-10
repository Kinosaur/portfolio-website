"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { href: "#featured", label: "Featured", id: "featured" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#building", label: "Building", id: "building" },
  { href: "#skills",   label: "Skills",   id: "skills"   },
  { href: "#about",    label: "About",    id: "about"    },
  { href: "#contact",  label: "Contact",  id: "contact"  },
];

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [theme, setTheme]       = useState<"dark" | "light">("dark");

  // Read theme from html element on mount (set by the anti-flash script)
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Active section tracking
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0];
          setActiveId(top.target.id);
        }
      },
      { threshold: 0.25 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("kino-theme", next); } catch (_) {}
  }

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.25s, border-color 0.25s",
        background: scrolled
          ? "color-mix(in srgb, var(--background) 88%, transparent)"
          : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "3.5rem",
          gap: "1rem",
        }}
      >
        {/* Logo */}
        <a href="#" className="logo-link" style={{ textDecoration: "none", flexShrink: 0 }}>
          <span className="logo-text">Kinosaur</span>
          <span className="logo-dot" />
        </a>

        {/* Desktop nav + theme toggle */}
        <div className="desktop-nav" style={{ gap: "1.75rem", alignItems: "center" }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${activeId === link.id ? "active" : ""}`}
              style={{
                fontSize: "0.82rem",
                color: activeId === link.id ? "var(--foreground)" : "var(--muted)",
                transition: "color 0.15s",
              }}
            >
              {link.label}
            </a>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              cursor: "pointer",
              color: "var(--muted)",
              padding: "0.3rem 0.4rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color 0.15s, color 0.15s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--foreground)";
              e.currentTarget.style.color = "var(--foreground)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--muted)";
            }}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {/* Mobile right side: theme toggle + hamburger */}
        <div className="mobile-menu-btn" style={{ display: "none", alignItems: "center", gap: "0.5rem" }}>
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              cursor: "pointer",
              color: "var(--muted)",
              padding: "0.3rem 0.4rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--foreground)",
              padding: "0.25rem",
            }}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen ? (
                <>
                  <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <line x1="3"  y1="6"  x2="19" y2="6"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="3"  y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="3"  y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          id="mobile-nav-drawer"
          style={{
            background: "var(--background)",
            borderTop: "1px solid var(--border)",
            padding: "0.5rem 1.5rem 1.25rem",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "0.85rem 0",
                fontSize: "0.95rem",
                color: activeId === link.id ? "var(--foreground)" : "var(--muted)",
                textDecoration: "none",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
