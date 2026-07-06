"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "./auth-context";

export default function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState({ events: 0, publishedEvents: 0, notices: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setError("");
      try {
        const [evRes, noRes] = await Promise.all([
          fetch("/api/events?all=true", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("/api/notices?all=true", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        const [ev, no] = await Promise.all([evRes.json(), noRes.json()]);
        if (!evRes.ok || !noRes.ok || !Array.isArray(ev) || !Array.isArray(no)) {
          setError("データの読み込みに失敗しました");
          return;
        }
        setStats({
          events: ev.length,
          publishedEvents: ev.filter((e: { published: boolean }) => e.published).length,
          notices: no.length,
        });
      } catch {
        setError("データの読み込みに失敗しました");
      }
    }
    if (token) load();
  }, [token]);

  return (
    <div>
      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, fontStyle: "italic", color: "var(--gold-light)", marginBottom: 32 }}>
        Dashboard
      </h2>
      {error && <p style={{ color: "var(--rose)", fontSize: 13, marginBottom: 24 }}>{error}</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20, marginBottom: 48 }}>
        {[
          { label: "総企画数", value: stats.events, link: "/admin/events" },
          { label: "公開中の企画", value: stats.publishedEvents, link: "/admin/events" },
          { label: "お知らせ数", value: stats.notices, link: "/admin/notices" },
        ].map((s) => (
          <Link key={s.label} href={s.link} style={{ textDecoration: "none" }}>
            <div style={{ border: "1px solid #333", padding: "24px", background: "#1a1a1a", transition: "border-color 0.2s" }}>
              <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: "0.25em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 8, opacity: 0.7 }}>{s.label}</p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 48, fontWeight: 300, color: "var(--gold-light)", lineHeight: 1 }}>{s.value}</p>
            </div>
          </Link>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 40 }}>
        <Link href="/admin/events" className="admin-btn admin-btn-gold">企画管理 →</Link>
        <Link href="/admin/notices" className="admin-btn admin-btn-gold">お知らせ管理 →</Link>
      </div>

      <a
        href="https://vercel.com/chiba-eiwa-seitokai/rikasai2026-site-tokusetu/analytics"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", display: "block", maxWidth: 400 }}
      >
        <div style={{ border: "1px solid #2a3a2a", padding: "20px 24px", background: "#111", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "border-color 0.2s" }}>
          <div>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: "0.25em", color: "#7ab870", textTransform: "uppercase", marginBottom: 6, opacity: 0.8 }}>Access Analytics</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, color: "rgba(232,212,168,0.75)" }}>Vercel Analytics →</p>
            <p style={{ fontSize: 10, color: "rgba(232,212,168,0.3)", marginTop: 4 }}>Cookie不使用 · Google非公開 · ページ別閲覧数</p>
          </div>
        </div>
      </a>
    </div>
  );
}
