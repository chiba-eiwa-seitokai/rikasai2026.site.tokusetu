"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../auth-context";

type Event = {
  id: string;
  num: string;
  grade: string;
  title: string;
  type: string;
  emoji: string;
  published: boolean;
  sortOrder: number;
};

const TYPES = ["飲食", "体験", "展示", "物販", "ステージ"];

export default function AdminEventsPage() {
  const { token } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterPublished, setFilterPublished] = useState("all");

  async function load() {
    setError("");
    try {
      const res = await fetch("/api/events?all=true", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok || !Array.isArray(data)) {
        setError(data?.detail ?? data?.error ?? "企画の読み込みに失敗しました");
        setEvents([]);
      } else {
        setEvents(data);
      }
    } catch {
      setError("企画の読み込みに失敗しました");
      setEvents([]);
    }
    setLoading(false);
  }

  useEffect(() => { if (token) load(); }, [token]);

  async function togglePublished(id: string, current: boolean) {
    await fetch(`/api/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ published: !current }),
    });
    load();
  }

  async function deleteEvent(id: string) {
    if (!confirm("この企画を削除しますか？")) return;
    await fetch(`/api/events/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    load();
  }

  async function moveSortOrder(id: string, direction: "up" | "down") {
    const sorted = [...events].sort((a, b) => a.sortOrder - b.sortOrder);
    const idx = sorted.findIndex((e) => e.id === id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const a = sorted[idx];
    const b = sorted[swapIdx];
    await Promise.all([
      fetch(`/api/events/${a.id}`, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ sortOrder: b.sortOrder }) }),
      fetch(`/api/events/${b.id}`, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ sortOrder: a.sortOrder }) }),
    ]);
    load();
  }

  const filtered = events.filter((e) => {
    if (filterType !== "all" && e.type !== filterType) return false;
    if (filterPublished === "published" && !e.published) return false;
    if (filterPublished === "unpublished" && e.published) return false;
    if (search) {
      const q = search.toLowerCase();
      return e.title.toLowerCase().includes(q) || e.grade.toLowerCase().includes(q) || e.num.toLowerCase().includes(q);
    }
    return true;
  });

  const isFiltering = search || filterType !== "all" || filterPublished !== "all";

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, fontStyle: "italic", color: "var(--gold-light)" }}>企画管理</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <Link href="/admin/events/sync" className="admin-btn admin-btn-gold" style={{ fontSize: 8, padding: "4px 12px" }}>一括同期</Link>\n          <Link href="/admin/events/import" className="admin-btn" style={{ fontSize: 8, padding: "4px 12px", borderColor: "#444", color: "rgba(232,212,168,0.5)" }}>新規CSV</Link>
          <Link href="/admin/events/new" className="admin-btn admin-btn-gold">+ 新規企画</Link>
        </div>
      </div>

      {/* 検索・フィルター */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <input
          className="admin-input"
          placeholder="タイトル・クラス・No.で検索..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 260 }}
        />
        <select className="admin-select" value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ maxWidth: 130 }}>
          <option value="all">すべての種別</option>
          {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select className="admin-select" value={filterPublished} onChange={(e) => setFilterPublished(e.target.value)} style={{ maxWidth: 130 }}>
          <option value="all">公開・非公開</option>
          <option value="published">公開中のみ</option>
          <option value="unpublished">非公開のみ</option>
        </select>
        {isFiltering && (
          <button className="admin-btn admin-btn-rose" style={{ fontSize: 8, padding: "4px 10px" }}
            onClick={() => { setSearch(""); setFilterType("all"); setFilterPublished("all"); }}>
            クリア
          </button>
        )}
        <span style={{ fontSize: 11, color: "rgba(232,212,168,0.35)", marginLeft: 4 }}>{filtered.length}件</span>
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
              <th>No.</th>
              <th>タイトル</th>
              <th>クラス/部活</th>
              <th>種別</th>
              <th>公開</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id}>
                <td>
                  <div style={{ display: "flex", gap: 2 }}>
                    <button onClick={() => moveSortOrder(e.id, "up")} className="admin-btn" style={{ fontSize: 10, padding: "2px 7px", borderColor: "#333", color: "rgba(212,168,67,0.5)", lineHeight: 1 }}>↑</button>
                    <button onClick={() => moveSortOrder(e.id, "down")} className="admin-btn" style={{ fontSize: 10, padding: "2px 7px", borderColor: "#333", color: "rgba(212,168,67,0.5)", lineHeight: 1 }}>↓</button>
                  </div>
                </td>
                <td style={{ color: "rgba(212,168,67,0.5)", fontFamily: "'Cormorant Garamond',serif", fontSize: 18 }}>{e.num}</td>
                <td><span style={{ marginRight: 8 }}>{e.emoji}</span>{e.title}</td>
                <td style={{ color: "rgba(232,212,168,0.5)", fontSize: 12 }}>{e.grade}</td>
                <td style={{ fontSize: 12 }}>{e.type}</td>
                <td>
                  <button
                    onClick={() => togglePublished(e.id, e.published)}
                    style={{ background: e.published ? "rgba(122,184,112,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${e.published ? "rgba(122,184,112,0.3)" : "#333"}`, color: e.published ? "#7ab870" : "rgba(232,212,168,0.3)", padding: "3px 12px", cursor: "pointer", fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase" }}
                  >
                    {e.published ? "公開中" : "非公開"}
                  </button>
                </td>
                <td style={{ display: "flex", gap: 6 }}>
                  <Link href={`/admin/events/${e.id}`} className="admin-btn admin-btn-gold" style={{ fontSize: 8, padding: "4px 12px" }}>編集</Link>
                  <button onClick={() => deleteEvent(e.id)} className="admin-btn admin-btn-rose" style={{ fontSize: 8, padding: "4px 12px" }}>削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
