"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../auth-context";

type Notice = {
  id: string;
  badge: string;
  text: string;
  published: boolean;
  sortOrder: number;
};

export default function AdminNoticesPage() {
  const { token } = useAuth();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    try {
      const res = await fetch("/api/notices?all=true", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok || !Array.isArray(data)) {
        setError(data?.detail ?? data?.error ?? "お知らせの読み込みに失敗しました");
        setNotices([]);
      } else {
        setNotices(data);
      }
    } catch {
      setError("お知らせの読み込みに失敗しました");
      setNotices([]);
    }
    setLoading(false);
  }

  useEffect(() => { if (token) load(); }, [token]);

  async function togglePublished(id: string, current: boolean) {
    await fetch(`/api/notices/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ published: !current }),
    });
    load();
  }

  async function deleteNotice(id: string) {
    if (!confirm("このお知らせを削除しますか？")) return;
    await fetch(`/api/notices/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    load();
  }

  async function moveSortOrder(id: string, direction: "up" | "down") {
    const sorted = [...notices].sort((a, b) => a.sortOrder - b.sortOrder);
    const idx = sorted.findIndex((n) => n.id === id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const a = sorted[idx];
    const b = sorted[swapIdx];
    await Promise.all([
      fetch(`/api/notices/${a.id}`, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ sortOrder: b.sortOrder }) }),
      fetch(`/api/notices/${b.id}`, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ sortOrder: a.sortOrder }) }),
    ]);
    load();
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, fontStyle: "italic", color: "var(--gold-light)" }}>お知らせ管理</h2>
        <Link href="/admin/notices/new" className="admin-btn admin-btn-gold">+ 新規お知らせ</Link>
      </div>
      {loading ? (
        <p style={{ color: "rgba(232,212,168,0.4)", fontSize: 13 }}>読み込み中...</p>
      ) : error ? (
        <p style={{ color: "var(--rose)", fontSize: 13 }}>{error}</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: 60 }}>順</th>
              <th>種別</th>
              <th>内容</th>
              <th>公開</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((n) => (
              <tr key={n.id}>
                <td>
                  <div style={{ display: "flex", gap: 2 }}>
                    <button onClick={() => moveSortOrder(n.id, "up")} className="admin-btn" style={{ fontSize: 10, padding: "2px 7px", borderColor: "#333", color: "rgba(212,168,67,0.5)", lineHeight: 1 }}>↑</button>
                    <button onClick={() => moveSortOrder(n.id, "down")} className="admin-btn" style={{ fontSize: 10, padding: "2px 7px", borderColor: "#333", color: "rgba(212,168,67,0.5)", lineHeight: 1 }}>↓</button>
                  </div>
                </td>
                <td>
                  <span className={`admin-badge admin-badge-${n.badge.toLowerCase()}`}>{n.badge}</span>
                </td>
                <td style={{ maxWidth: 400, fontSize: 12, color: "rgba(232,212,168,0.7)" }}>
                  {n.text.length > 80 ? n.text.slice(0, 80) + "…" : n.text}
                </td>
                <td>
                  <button
                    onClick={() => togglePublished(n.id, n.published)}
                    style={{ background: n.published ? "rgba(122,184,112,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${n.published ? "rgba(122,184,112,0.3)" : "#333"}`, color: n.published ? "#7ab870" : "rgba(232,212,168,0.3)", padding: "3px 12px", cursor: "pointer", fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase" }}
                  >
                    {n.published ? "公開中" : "非公開"}
                  </button>
                </td>
                <td style={{ display: "flex", gap: 6 }}>
                  <Link href={`/admin/notices/${n.id}`} className="admin-btn admin-btn-gold" style={{ fontSize: 8, padding: "4px 12px" }}>編集</Link>
                  <button onClick={() => deleteNotice(n.id)} className="admin-btn admin-btn-rose" style={{ fontSize: 8, padding: "4px 12px" }}>削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
