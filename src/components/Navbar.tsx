"use client";

import { useState, useEffect } from "react";
import { siteContent } from "@/data/content";

const navLinks = [
  { href: "#featured", label: "Featured" },
  { href: "#projects", label: "Projects" },
  { href: "#building", label: "Building" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.2s, border-color 0.2s",
        background: scrolled
          ? "color-mix(in srgb, var(--background) 90%, transparent)"
          : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "3.5rem" }}>
        {/* Logo */}
        <a
          href="#"
          style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--foreground)", textDecoration: "none", letterSpacing: "-0.01em" }}
        >
          {siteContent.name.split(" ")[0]}{" "}
          <span style={{ color: "var(--muted)" }}>{siteContent.name.split(" ").slice(1).join(" ")}</span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: "0.82rem",
                color: "var(--muted)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--foreground)", padding: "0.25rem" }}
          aria-label="Toggle menu"
          className="mobile-menu-btn"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {menuOpen ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          style={{
            background: "var(--background)",
            borderTop: "1px solid var(--border)",
            padding: "1rem 1.5rem 1.5rem",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "0.6rem 0",
                fontSize: "0.95rem",
                color: "var(--muted)",
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
        .desktop-nav { display: flex; }
        .mobile-menu-btn { display: none; }
        @media (max-width: 640px) {
          .desktop-nav { display: none; }
          .mobile-menu-btn { display: block; }
        }
      `}</style>
    </header>
  );
}
