"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// All existing menu items are preserved. 入場方法 is rendered as the pink CTA
// pill (mirroring the design's「来校方法」button); the rest are plain links.
const NAV_LINKS = [
  { label: "梨花祭とは", href: "/about" },
  { label: "企画一覧", href: "/attractions" },
  { label: "マップ", href: "/map" },
  { label: "プログラム", href: "/schedule" },
  { label: "お知らせ", href: "/#notice" },
  { label: "梨花祭賞", href: "/award" },
  { label: "ご注意", href: "/rules" },
];

const CTA = { label: "🎟 入場方法", href: "/#access" };

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        nav.site-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(253,247,234,0.92);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--f-border);
          transition: box-shadow 0.3s;
        }
        nav.site-nav.scrolled { box-shadow: 0 6px 18px rgba(120,90,30,.12); }
        .nav-inner {
          max-width: 1040px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          height: 64px;
          padding: 0 20px;
        }
        .nav-brand {
          display: flex;
          align-items: baseline;
          gap: 10px;
          text-decoration: none;
          white-space: nowrap;
        }
        .nav-brand-jp {
          font-size: 17px;
          font-weight: 900;
          color: var(--f-ink-deep);
          letter-spacing: .04em;
        }
        .nav-brand-sub {
          font-size: 11px;
          font-weight: 700;
          color: var(--f-muted);
          letter-spacing: .06em;
        }
        .nav-cluster { display: flex; align-items: center; gap: 6px; }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          background: var(--f-card);
          border: 1px solid var(--f-border-warm);
          border-radius: 999px;
          padding: 5px 8px;
          box-shadow: 0 6px 18px rgba(120,90,30,.10);
        }
        .nav-links a {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: .04em;
          color: var(--f-ink-soft);
          text-decoration: none;
          padding: 8px 12px;
          border-radius: 999px;
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .nav-links a:hover { background: #f6ecd6; color: var(--f-ink-deep); }
        .nav-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(var(--f-pink-light), var(--f-pink));
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: .04em;
          padding: 11px 20px;
          border-radius: 999px;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 4px 10px rgba(236,97,120,.4);
          transition: transform 0.15s, box-shadow 0.2s;
        }
        .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 14px rgba(236,97,120,.5); }
        .nav-burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 42px;
          height: 42px;
          cursor: pointer;
          gap: 5px;
          background: var(--f-card);
          border: 1px solid var(--f-border-warm);
          border-radius: 12px;
          padding: 0;
        }
        .nav-burger span {
          display: block;
          width: 20px;
          height: 2px;
          border-radius: 2px;
          background: var(--f-ink);
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .nav-burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nav-burger.open span:nth-child(2) { opacity: 0; }
        .nav-burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .nav-drawer {
          display: none;
          position: fixed;
          top: 64px;
          left: 0;
          right: 0;
          background: rgba(253,247,234,0.98);
          border-bottom: 1px solid var(--f-border);
          z-index: 99;
          backdrop-filter: blur(8px);
          transform: translateY(-10px);
          opacity: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
          pointer-events: none;
          box-shadow: 0 10px 24px rgba(120,90,30,.14);
        }
        .nav-drawer.open { transform: translateY(0); opacity: 1; pointer-events: auto; }
        .nav-drawer a {
          display: block;
          padding: 15px 24px;
          font-size: 15px;
          font-weight: 700;
          color: var(--f-ink);
          text-decoration: none;
          border-bottom: 1px solid var(--f-border);
        }
        .nav-drawer a:last-child { border-bottom: none; }
        .nav-drawer a.drawer-cta { color: var(--f-pink); }

        @media (max-width: 900px) {
          .nav-links, .nav-cta { display: none; }
          .nav-burger { display: flex; }
          .nav-drawer { display: block; }
        }
      `}</style>

      <nav className={`site-nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <Link href="/" className="nav-brand">
            <span className="nav-brand-jp">梨花祭 2026</span>
            <span className="nav-brand-sub">千葉英和高等学校・第53回文化祭</span>
          </Link>
          <div className="nav-cluster">
            <div className="nav-links">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
            <Link href={CTA.href} className="nav-cta">
              {CTA.label}
            </Link>
            <button
              className={`nav-burger${isOpen ? " open" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="メニュー"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`nav-drawer${isOpen ? " open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link href={CTA.href} className="drawer-cta" onClick={() => setIsOpen(false)}>
          {CTA.label}
        </Link>
      </div>
    </>
  );
}
