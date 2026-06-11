"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "./auth-context";

export default function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState({ events: 0, publishedEvents: 0, notices: 0 });

  useEffect(() => {
    async function load() {
      const [ev, no] = await Promise.all([
        fetch("/api/events?all=true", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
        fetch("/api/notices?all=true", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      ]);
      setStats({
        events: ev.length,
        publishedEvents: ev.filter((e: { published: boolean }) => e.published).length,
        notices: no.length,
      });
    }
    if (token) load();
  }, [token]);

  return (
    <div>
      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, fontStyle: "italic", color: "var(--gold-light)", marginBottom: 32 }}>
        Dashboard
      </h2>
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
      <div style={{ display: "flex", gap: 16 }}>
        <Link href="/admin/events" className="admin-btn admin-btn-gold">企画管理 →</Link>
        <Link href="/admin/notices" className="admin-btn admin-btn-gold">お知らせ管理 →</Link>
      </div>
    </div>
  );
}
