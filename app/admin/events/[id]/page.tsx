"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../auth-context";

type InfoItem = { k: string; v: string };
type FormData = {
  num: string; grade: string; title: string; type: string; emoji: string;
  desc: string; tags: string;
  day1: boolean; day2: boolean; published: boolean; sortOrder: string;
  infoItems: InfoItem[];
  thumbUrl: string;
  heroImgUrl: string;
  galleryUrls: string[];
};

const TYPES = ["飲食", "体験", "展示", "物販", "ステージ"];
const EMPTY: FormData = {
  num: "", grade: "", title: "", type: "体験", emoji: "🎉",
  desc: "", tags: "",
  day1: true, day2: true, published: true, sortOrder: "0",
  infoItems: [{ k: "場所", v: "" }, { k: "料金", v: "" }],
  thumbUrl: "", heroImgUrl: "", galleryUrls: [],
};

export default function EventEditPage({ params }: { params: { id: string } }) {
  const { token } = useAuth();
  const router = useRouter();
  const isNew = params.id === "new";
  const [form, setForm] = useState<FormData>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    if (!isNew && token) {
      fetch(`/api/events/${params.id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((e) => {
          const info: InfoItem[] = e.info ?? [];
          setForm({
            num: e.num, grade: e.grade, title: e.title, type: e.type, emoji: e.emoji,
            desc: e.desc, tags: (e.tags ?? []).join("、"),
            day1: e.day1, day2: e.day2, published: e.published, sortOrder: String(e.sortOrder),
            infoItems: info.length > 0 ? info : EMPTY.infoItems,
            thumbUrl: e.thumbUrl ?? "",
            heroImgUrl: e.heroImgUrl ?? "",
            galleryUrls: e.gallery ?? [],
          });
        });
    }
  }, [isNew, params.id, token]);

  function setField<K extends keyof FormData>(k: K, v: FormData[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function setInfoItem(i: number, field: "k" | "v", val: string) {
    setForm((f) => {
      const items = [...f.infoItems];
      items[i] = { ...items[i], [field]: val };
      return { ...f, infoItems: items };
    });
  }

  async function uploadImage(file: File): Promise<string | null> {
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (!res.ok) {
        const err = await res.json();
        setMsg(`アップロードエラー: ${err.detail ?? err.error}`);
        return null;
      }
      return (await res.json()).url as string;
    } catch {
      setMsg("アップロードに失敗しました");
      return null;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("");

    const body = {
      num: form.num, grade: form.grade, title: form.title, type: form.type, emoji: form.emoji,
      desc: form.desc, tags: form.tags.split(/[、,\s]+/).filter(Boolean),
      info: form.infoItems.filter((i) => i.k && i.v),
      day1: form.day1, day2: form.day2, published: form.published,
      sortOrder: Number(form.sortOrder),
      thumbUrl: form.thumbUrl || null,
      heroImgUrl: form.heroImgUrl || null,
      gallery: form.galleryUrls,
    };

    const url = isNew ? "/api/events" : `/api/events/${params.id}`;
    const method = isNew ? "POST" : "PUT";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });

    setSaving(false);
    if (res.ok) {
      setMsg("保存しました");
      setTimeout(() => router.push("/admin/events"), 800);
    } else {
      const err = await res.json().catch(() => null);
      setMsg(`エラーが発生しました${err?.detail ? `: ${err.detail}` : ""}`);
    }
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, fontStyle: "italic", color: "var(--gold-light)", marginBottom: 32 }}>
        {isNew ? "企画を追加" : "企画を編集"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 16, marginBottom: 20 }}>
          <div className="admin-form-group" style={{ margin: 0 }}>
            <label>No.</label>
            <input className="admin-input" value={form.num} onChange={(e) => setField("num", e.target.value)} placeholder="01" />
          </div>
          <div className="admin-form-group" style={{ margin: 0 }}>
            <label>クラス / 部活</label>
            <input className="admin-input" value={form.grade} onChange={(e) => setField("grade", e.target.value)} placeholder="1年A組" required />
          </div>
        </div>

        <div className="admin-form-group">
          <label>企画名</label>
          <input className="admin-input" value={form.title} onChange={(e) => setField("title", e.target.value)} placeholder="おとぎ話カフェ" required />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 80px", gap: 16, marginBottom: 20 }}>
          <div className="admin-form-group" style={{ margin: 0 }}>
            <label>種別</label>
            <select className="admin-select" value={form.type} onChange={(e) => setField("type", e.target.value)}>
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="admin-form-group" style={{ margin: 0 }}>
            <label>絵文字</label>
            <input className="admin-input" value={form.emoji} onChange={(e) => setField("emoji", e.target.value)} placeholder="☕" />
          </div>
        </div>

        <div className="admin-form-group">
          <label>説明文</label>
          <textarea className="admin-textarea" value={form.desc} onChange={(e) => setField("desc", e.target.value)} required />
        </div>

        <div className="admin-form-group">
          <label>タグ（読点または半角カンマ区切り）</label>
          <input className="admin-input" value={form.tags} onChange={(e) => setField("tags", e.target.value)} placeholder="カフェ、ドリンク、体験" />
        </div>

        <div className="admin-form-group">
          <label>案内情報</label>
          {form.infoItems.map((item, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 1fr 32px", gap: 8, marginBottom: 8 }}>
              <input className="admin-input" value={item.k} onChange={(e) => setInfoItem(i, "k", e.target.value)} placeholder="項目名" style={{ fontSize: 12 }} />
              <input className="admin-input" value={item.v} onChange={(e) => setInfoItem(i, "v", e.target.value)} placeholder="内容" style={{ fontSize: 12 }} />
              <button type="button" onClick={() => setForm((f) => ({ ...f, infoItems: f.infoItems.filter((_, j) => j !== i) }))} style={{ background: "none", border: "1px solid #444", color: "var(--rose)", cursor: "pointer" }}>×</button>
            </div>
          ))}
          <button type="button" onClick={() => setForm((f) => ({ ...f, infoItems: [...f.infoItems, { k: "", v: "" }] }))} className="admin-btn admin-btn-gold" style={{ fontSize: 8, padding: "4px 12px", marginTop: 4 }}>+ 行を追加</button>
        </div>

        {/* 画像セクション */}
        <div className="admin-form-group">
          <label>画像</label>

          {/* サムネ */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: "0.2em", color: "rgba(212,168,67,0.7)", textTransform: "uppercase", marginBottom: 8 }}>Thumbnail</p>
            {form.thumbUrl && (
              <div style={{ position: "relative", display: "inline-block", marginBottom: 8 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.thumbUrl} alt="thumb" style={{ width: 160, height: 90, objectFit: "cover", border: "1px solid #333", display: "block" }} />
                <button type="button" onClick={() => setField("thumbUrl", "")}
                  style={{ position: "absolute", top: 4, right: 4, background: "rgba(0,0,0,0.75)", border: "none", color: "var(--rose)", cursor: "pointer", padding: "2px 7px", fontSize: 12, lineHeight: 1 }}>×</button>
              </div>
            )}
            <label className="admin-btn admin-btn-gold" style={{ fontSize: 8, padding: "4px 12px", cursor: uploading ? "not-allowed" : "pointer", opacity: uploading ? 0.5 : 1, display: "inline-block" }}>
              {uploading === "thumb" ? "アップロード中..." : "ファイルを選択"}
              <input type="file" accept="image/*" style={{ display: "none" }} disabled={uploading !== null}
                onChange={async (e) => {
                  const file = e.target.files?.[0]; if (!file) return;
                  setUploading("thumb");
                  const url = await uploadImage(file);
                  if (url) setField("thumbUrl", url);
                  setUploading(null);
                  e.target.value = "";
                }} />
            </label>
          </div>

          {/* ヒーロー */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: "0.2em", color: "rgba(212,168,67,0.7)", textTransform: "uppercase", marginBottom: 8 }}>Hero Image</p>
            {form.heroImgUrl && (
              <div style={{ position: "relative", display: "inline-block", marginBottom: 8 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.heroImgUrl} alt="hero" style={{ width: 240, height: 135, objectFit: "cover", border: "1px solid #333", display: "block" }} />
                <button type="button" onClick={() => setField("heroImgUrl", "")}
                  style={{ position: "absolute", top: 4, right: 4, background: "rgba(0,0,0,0.75)", border: "none", color: "var(--rose)", cursor: "pointer", padding: "2px 7px", fontSize: 12, lineHeight: 1 }}>×</button>
              </div>
            )}
            <label className="admin-btn admin-btn-gold" style={{ fontSize: 8, padding: "4px 12px", cursor: uploading ? "not-allowed" : "pointer", opacity: uploading ? 0.5 : 1, display: "inline-block" }}>
              {uploading === "hero" ? "アップロード中..." : "ファイルを選択"}
              <input type="file" accept="image/*" style={{ display: "none" }} disabled={uploading !== null}
                onChange={async (e) => {
                  const file = e.target.files?.[0]; if (!file) return;
                  setUploading("hero");
                  const url = await uploadImage(file);
                  if (url) setField("heroImgUrl", url);
                  setUploading(null);
                  e.target.value = "";
                }} />
            </label>
          </div>

          {/* ギャラリー */}
          <div>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: "0.2em", color: "rgba(212,168,67,0.7)", textTransform: "uppercase", marginBottom: 8 }}>Gallery</p>
            {form.galleryUrls.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                {form.galleryUrls.map((url, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`gallery-${i}`} style={{ width: 100, height: 70, objectFit: "cover", border: "1px solid #333", display: "block" }} />
                    <button type="button"
                      onClick={() => setForm((f) => ({ ...f, galleryUrls: f.galleryUrls.filter((_, j) => j !== i) }))}
                      style={{ position: "absolute", top: 2, right: 2, background: "rgba(0,0,0,0.75)", border: "none", color: "var(--rose)", cursor: "pointer", padding: "1px 6px", fontSize: 11, lineHeight: 1 }}>×</button>
                  </div>
                ))}
              </div>
            )}
            <label className="admin-btn admin-btn-gold" style={{ fontSize: 8, padding: "4px 12px", cursor: uploading ? "not-allowed" : "pointer", opacity: uploading ? 0.5 : 1, display: "inline-block" }}>
              {uploading?.startsWith("gallery") ? "アップロード中..." : "+ 画像を追加"}
              <input type="file" accept="image/*" style={{ display: "none" }} disabled={uploading !== null}
                onChange={async (e) => {
                  const file = e.target.files?.[0]; if (!file) return;
                  setUploading("gallery-new");
                  const url = await uploadImage(file);
                  if (url) setForm((f) => ({ ...f, galleryUrls: [...f.galleryUrls, url] }));
                  setUploading(null);
                  e.target.value = "";
                }} />
            </label>
          </div>
        </div>

        <div style={{ display: "flex", gap: 24, marginBottom: 20 }}>
          {[["day1", "Day 1 (7/17)"], ["day2", "Day 2 (7/18)"], ["published", "公開"]].map(([key, label]) => (
            <label key={key} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase" }}>
              <input type="checkbox" checked={form[key as keyof FormData] as boolean} onChange={(e) => setField(key as keyof FormData, e.target.checked as never)} />
              {label}
            </label>
          ))}
        </div>

        <div className="admin-form-group">
          <label>表示順</label>
          <input className="admin-input" type="number" value={form.sortOrder} onChange={(e) => setField("sortOrder", e.target.value)} style={{ maxWidth: 120 }} />
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button type="submit" className="admin-btn admin-btn-gold" disabled={saving}>
            {saving ? "保存中..." : "保存"}
          </button>
          <button type="button" className="admin-btn admin-btn-rose" onClick={() => router.push("/admin/events")}>キャンセル</button>
          {msg && <span style={{ fontSize: 12, color: msg.includes("エラー") || msg.includes("失敗") ? "var(--rose)" : "var(--teal-light)" }}>{msg}</span>}
        </div>
      </form>
    </div>
  );
}
