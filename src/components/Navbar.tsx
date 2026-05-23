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
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeId,  setActiveId]  = useState("");
  const [theme,     setTheme]     = useState<"dark" | "light">("light"); // light-first

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

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
    <header className={`nav-header${scrolled ? " nav-header--scrolled" : ""}`}>
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
        {/* Logo — Playfair Display 900 via .logo-text class */}
        <a href="#" className="logo-link" style={{ textDecoration: "none", flexShrink: 0 }}>
          <span className="logo-text">Kinosaur</span>
          <span className="logo-dot" />
        </a>

        {/* Desktop nav — JetBrains Mono via .nav-link class */}
        <nav className="desktop-nav" style={{ gap: "1.75rem", alignItems: "center" }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link${activeId === link.id ? " active" : ""}`}
            >
              {link.label}
            </a>
          ))}
          <button onClick={toggleTheme} className="theme-toggle"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </nav>

        {/* Mobile: theme + hamburger */}
        <div className="mobile-menu-btn" style={{ alignItems: "center", gap: "0.5rem" }}>
          <button onClick={toggleTheme} className="theme-toggle"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="hamburger-btn"
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
                  <line x1="3" y1="6"  x2="19" y2="6"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav
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
              className={`nav-drawer-link${activeId === link.id ? " active" : ""}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}

      <style>{`
        .nav-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          transition: background 0.25s, border-color 0.25s;
          background: transparent;
          border-bottom: 1px solid transparent;
        }
        .nav-header--scrolled {
          background: color-mix(in srgb, var(--background) 92%, transparent);
          border-bottom-color: var(--border);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .theme-toggle {
          background: none;
          border: 1px solid var(--border);
          border-radius: var(--r-btn);
          cursor: pointer;
          color: var(--muted);
          padding: 0.3rem 0.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.15s, color 0.15s;
          flex-shrink: 0;
        }
        .theme-toggle:hover {
          border-color: var(--foreground);
          color: var(--foreground);
        }
        .hamburger-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--foreground);
          padding: 0.25rem;
        }
        .nav-drawer-link {
          display: block;
          padding: 0.9rem 0.1rem;
          font-family: var(--font-mono), monospace;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          border-bottom: 1px solid var(--border);
          transition: color 0.15s;
        }
        .nav-drawer-link.active,
        .nav-drawer-link:hover { color: var(--foreground); }
      `}</style>
    </header>
  );
}
