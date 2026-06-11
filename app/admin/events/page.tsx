"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../layout";

type Event = {
  id: string;
  num: string;
  grade: string;
  title: string;
  type: string;
  emoji: string;
  published: boolean;
};

export default function AdminEventsPage() {
  const { token } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/events?all=true", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEvents(await res.json());
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

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, fontStyle: "italic", color: "var(--gold-light)" }}>企画管理</h2>
        <Link href="/admin/events/new" className="admin-btn admin-btn-gold">+ 新規企画</Link>
      </div>
      {loading ? (
        <p style={{ color: "rgba(232,212,168,0.4)", fontSize: 13 }}>読み込み中...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>タイトル</th>
              <th>クラス/部活</th>
              <th>種別</th>
              <th>公開</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id}>
                <td style={{ color: "rgba(212,168,67,0.5)", fontFamily: "'Cormorant Garamond',serif", fontSize: 18 }}>{e.num}</td>
                <td>
                  <span style={{ marginRight: 8 }}>{e.emoji}</span>
                  {e.title}
                </td>
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
                <td style={{ display: "flex", gap: 8 }}>
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
