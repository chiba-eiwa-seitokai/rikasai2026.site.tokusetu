"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "梨花祭とは", href: "/about" },
  { label: "企画一覧", href: "/attractions" },
  { label: "マップ", href: "/map" },
  { label: "プログラム", href: "/schedule" },
  { label: "お知らせ", href: "/#notice" },
  { label: "梨花祭賞", href: "/award" },
  { label: "ご注意", href: "/rules" },
  { label: "アクセス", href: "/#access" },
];

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
        nav {
          background: var(--ink);
          border-top: 1px solid rgba(212,168,67,0.25);
          border-bottom: 1px solid rgba(212,168,67,0.15);
          padding: 0 24px;
          position: sticky;
          top: 0;
          z-index: 100;
          transition: box-shadow 0.3s;
        }
        nav.scrolled { box-shadow: 0 2px 20px rgba(0,0,0,0.5); }
        .nav-inner {
          max-width: 960px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 52px;
        }
        .nav-links { display: flex; justify-content: center; flex: 1; }
        nav a {
          font-family: "Cinzel", serif;
          font-size: 10px;
          letter-spacing: 0.25em;
          color: rgba(232,212,168,0.9);
          text-decoration: none;
          padding: 16px 10px;
          text-transform: uppercase;
          transition: color 0.3s;
          position: relative;
          cursor: pointer;
          white-space: nowrap;
        }
        nav a::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          right: 50%;
          height: 1px;
          background: var(--gold);
          transition: left 0.3s, right 0.3s;
        }
        nav a:hover { color: var(--gold-light); }
        nav a:hover::after { left: 20%; right: 20%; }
        .nav-burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          cursor: pointer;
          gap: 5px;
          background: none;
          border: none;
          padding: 0;
          margin-left: auto;
        }
        .nav-burger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: var(--gold);
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .nav-burger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nav-burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nav-burger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
        .nav-drawer {
          display: none;
          position: fixed;
          top: 52px;
          left: 0;
          right: 0;
          background: rgba(26,18,10,0.98);
          border-bottom: 1px solid rgba(212,168,67,0.2);
          z-index: 99;
          backdrop-filter: blur(8px);
          transform: translateY(-10px);
          opacity: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
          pointer-events: none;
        }
        .nav-drawer.open { transform: translateY(0); opacity: 1; pointer-events: auto; }
        .nav-drawer a {
          display: block;
          padding: 14px 24px;
          border-bottom: 1px solid rgba(212,168,67,0.08);
        }
        @media(max-width:700px) {
          .nav-links { display: none; }
          .nav-burger { display: flex; }
          .nav-drawer { display: block; }
        }
      `}</style>

      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-inner">
          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
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
      </nav>

      <div className={`nav-drawer${isOpen ? " open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
