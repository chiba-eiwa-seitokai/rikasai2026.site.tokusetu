"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../layout";

type FormData = {
  badge: string;
  text: string;
  linkUrl: string;
  linkLabel: string;
  published: boolean;
  sortOrder: string;
};

const BADGES = ["INFO", "NOTE", "WARN", "NEW"];
const EMPTY: FormData = { badge: "INFO", text: "", linkUrl: "", linkLabel: "", published: true, sortOrder: "0" };

export default function NoticeEditPage({ params }: { params: { id: string } }) {
  const { token } = useAuth();
  const router = useRouter();
  const isNew = params.id === "new";
  const [form, setForm] = useState<FormData>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!isNew && token) {
      fetch(`/api/notices/${params.id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((n) =>
          setForm({
            badge: n.badge, text: n.text,
            linkUrl: n.linkUrl ?? "", linkLabel: n.linkLabel ?? "",
            published: n.published, sortOrder: String(n.sortOrder),
          })
        );
    }
  }, [isNew, params.id, token]);

  function setField<K extends keyof FormData>(k: K, v: FormData[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("");

    const body = {
      badge: form.badge, text: form.text,
      linkUrl: form.linkUrl || null, linkLabel: form.linkLabel || null,
      published: form.published, sortOrder: Number(form.sortOrder),
    };

    const url = isNew ? "/api/notices" : `/api/notices/${params.id}`;
    const method = isNew ? "POST" : "PUT";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });

    setSaving(false);
    if (res.ok) {
      setMsg("保存しました");
      setTimeout(() => router.push("/admin/notices"), 800);
    } else {
      setMsg("エラーが発生しました");
    }
  }

  return (
    <div style={{ maxWidth: 600 }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, fontStyle: "italic", color: "var(--gold-light)", marginBottom: 32 }}>
        {isNew ? "お知らせを追加" : "お知らせを編集"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="admin-form-group">
          <label>種別</label>
          <select className="admin-select" value={form.badge} onChange={(e) => setField("badge", e.target.value)}>
            {BADGES.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>

        <div className="admin-form-group">
          <label>内容</label>
          <textarea className="admin-textarea" value={form.text} onChange={(e) => setField("text", e.target.value)} required style={{ minHeight: 120 }} />
        </div>

        <div className="admin-form-group">
          <label>リンクURL（任意）</label>
          <input className="admin-input" type="url" value={form.linkUrl} onChange={(e) => setField("linkUrl", e.target.value)} placeholder="https://..." />
        </div>

        {form.linkUrl && (
          <div className="admin-form-group">
            <label>リンクラベル</label>
            <input className="admin-input" value={form.linkLabel} onChange={(e) => setField("linkLabel", e.target.value)} placeholder="詳細を見る" />
          </div>
        )}

        <div style={{ display: "flex", gap: 24, marginBottom: 20 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase" }}>
            <input type="checkbox" checked={form.published} onChange={(e) => setField("published", e.target.checked)} />
            公開
          </label>
        </div>

        <div className="admin-form-group">
          <label>表示順</label>
          <input className="admin-input" type="number" value={form.sortOrder} onChange={(e) => setField("sortOrder", e.target.value)} style={{ maxWidth: 120 }} />
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button type="submit" className="admin-btn admin-btn-gold" disabled={saving}>{saving ? "保存中..." : "保存"}</button>
          <button type="button" className="admin-btn admin-btn-rose" onClick={() => router.push("/admin/notices")}>キャンセル</button>
          {msg && <span style={{ fontSize: 12, color: "var(--teal-light)" }}>{msg}</span>}
        </div>
      </form>
    </div>
  );
}
