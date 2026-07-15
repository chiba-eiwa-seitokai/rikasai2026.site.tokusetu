"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../auth-context";

const HEADERS = {
  id: "ID（変更しない）", num: "No.", grade: "団体・クラス", title: "企画名", type: "種別", emoji: "絵文字", desc: "紹介文", tags: "タグ（;区切り）",
  thumbUrl: "サムネイル画像URL", heroImgUrl: "メイン画像URL", gallery: "ギャラリー画像URL（;区切り）", day1: "1日目", day2: "2日目", published: "公開", sortOrder: "表示順",
};

type SyncEvent = { id?: string; num: string; grade: string; title: string; type: string; emoji: string; desc: string; tags: string[]; info: { k: string; v: string }[]; thumbUrl: string | null; heroImgUrl: string | null; gallery: string[]; day1: boolean; day2: boolean; published: boolean; sortOrder: number | null };

function parseCsv(text: string): string[][] {
  const rows: string[][] = []; let row: string[] = []; let value = ""; let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') { if (quoted && text[i + 1] === '"') { value += '"'; i++; } else quoted = !quoted; }
    else if (char === "," && !quoted) { row.push(value); value = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) { if (char === "\r" && text[i + 1] === "\n") i++; row.push(value); if (row.some((cell) => cell !== "")) rows.push(row); row = []; value = ""; }
    else value += char;
  }
  row.push(value); if (row.some((cell) => cell !== "")) rows.push(row); return rows;
}

function bool(value: string, fallback: boolean) { return value.trim() ? value.trim().toLowerCase() === "true" : fallback; }
function split(value: string) { return value.split(";").map((item) => item.trim()).filter(Boolean); }

function parseEvents(text: string): { events: SyncEvent[]; errors: string[] } {
  const rows = parseCsv(text.replace(/^\uFEFF/, "")); if (rows.length < 2) return { events: [], errors: ["ヘッダー行と企画データが必要です"] };
  const header = rows[0]; const column = (name: string) => header.indexOf(name);
  const required = [HEADERS.id, HEADERS.num, HEADERS.grade, HEADERS.title, HEADERS.type]; const missing = required.filter((name) => column(name) < 0);
  if (missing.length) return { events: [], errors: [`列が見つかりません: ${missing.join(" / ")}`] };
  const get = (row: string[], name: string) => { const index = column(name); return index >= 0 ? (row[index] ?? "").trim() : ""; };
  const errors: string[] = [];
  const events = rows.slice(1).map((row, index) => {
    const info = Array.from({ length: 6 }, (_, detailIndex) => { const n = detailIndex + 1; const k = get(row, `詳細${n}_項目`); const v = get(row, `詳細${n}_内容`); return k || v ? { k: k || (detailIndex === 0 ? "場所" : `詳細${n}`), v } : null; }).filter((item): item is { k: string; v: string } => Boolean(item?.v));
    const event: SyncEvent = { id: get(row, HEADERS.id) || undefined, num: get(row, HEADERS.num), grade: get(row, HEADERS.grade), title: get(row, HEADERS.title), type: get(row, HEADERS.type), emoji: get(row, HEADERS.emoji) || "🎉", desc: get(row, HEADERS.desc), tags: split(get(row, HEADERS.tags)), info, thumbUrl: get(row, HEADERS.thumbUrl) || null, heroImgUrl: get(row, HEADERS.heroImgUrl) || null, gallery: split(get(row, HEADERS.gallery)), day1: bool(get(row, HEADERS.day1), true), day2: bool(get(row, HEADERS.day2), true), published: bool(get(row, HEADERS.published), true), sortOrder: get(row, HEADERS.sortOrder) ? Number(get(row, HEADERS.sortOrder)) : null };
    if (!event.grade || !event.title || !event.type) errors.push(`行${index + 2}: 団体・クラス、企画名、種別は必須です`);
    return event;
  });
  return { events, errors };
}

export default function EventSyncPage() {
  const { token } = useAuth(); const [events, setEvents] = useState<SyncEvent[]>([]); const [errors, setErrors] = useState<string[]>([]); const [fileName, setFileName] = useState(""); const [syncing, setSyncing] = useState(false); const [result, setResult] = useState<{ created: number; updated: number; total: number } | null>(null);
  const summary = useMemo(() => ({ total: events.length, update: events.filter((event) => event.id).length, create: events.filter((event) => !event.id).length }), [events]);

  async function selectFile(file?: File) {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".csv")) { setErrors(["Excelファイルは「名前を付けて保存」から CSV UTF-8（コンマ区切り）にして選択してください。"]); return; }
    const parsed = parseEvents(await file.text()); setEvents(parsed.events); setErrors(parsed.errors); setFileName(file.name); setResult(null);
  }
  async function sync() {
    if (!events.length || errors.length || !confirm(`${summary.total}件を同期します。既存${summary.update}件は上書き、新規${summary.create}件は追加されます。`)) return;
    setSyncing(true); setResult(null);
    try { const response = await fetch("/api/events/sync", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ events }) }); const data = await response.json(); if (!response.ok) setErrors(Array.isArray(data.errors) ? data.errors : [data.detail ?? data.error ?? "同期に失敗しました"]); else setResult(data); }
    catch { setErrors(["同期に失敗しました"]); } finally { setSyncing(false); }
  }

  return <div style={{ maxWidth: 900 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}><div><h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, fontStyle: "italic", color: "var(--gold-light)", marginBottom: 4 }}>企画一括同期</h2><p style={{ fontSize: 12, color: "rgba(232,212,168,.5)" }}>IDありは更新、ID空欄は新規作成</p></div><Link href="/admin/events" className="admin-btn" style={{ fontSize: 10, padding: "5px 14px", borderColor: "#444", color: "rgba(232,212,168,.55)" }}>← 企画一覧</Link></div>
    <div style={{ border: "1px solid #55472c", background: "rgba(212,168,67,.06)", padding: 18, marginBottom: 20, fontSize: 12, lineHeight: 1.8, color: "rgba(232,212,168,.75)" }}><strong style={{ color: "var(--gold)" }}>使い方</strong><br />編集表の「企画一覧」シートだけを <strong>CSV UTF-8（コンマ区切り）</strong> で保存して選択してください。<br />空欄の「1日目・2日目・公開」は TRUE として扱い、新規企画の表示順が空欄なら既存企画の末尾に追加します。</div>
    <label className="admin-btn admin-btn-gold" style={{ display: "inline-block", cursor: "pointer", marginBottom: 16 }}>編集済みCSVを選択<input type="file" accept=".csv,text/csv" style={{ display: "none" }} onChange={(event) => selectFile(event.target.files?.[0])} /></label>
    {fileName && <p style={{ fontSize: 12, color: "rgba(232,212,168,.6)", marginBottom: 14 }}>{fileName} — {summary.total}件（更新 {summary.update}件／新規 {summary.create}件）</p>}
    {errors.length > 0 && <div style={{ border: "1px solid rgba(220,80,90,.45)", background: "rgba(220,80,90,.08)", color: "#f29aa2", padding: 14, fontSize: 12, lineHeight: 1.7, marginBottom: 16 }}>{errors.slice(0, 12).map((error, index) => <div key={index}>• {error}</div>)}</div>}
    {events.length > 0 && !errors.length && !result && <button className="admin-btn admin-btn-gold" disabled={syncing} onClick={sync}>{syncing ? "同期中..." : `${summary.total}件を同期する`}</button>}
    {result && <div style={{ border: "1px solid rgba(122,184,112,.45)", background: "rgba(122,184,112,.08)", color: "#9bd491", padding: 16, fontSize: 13 }}>同期完了：更新 {result.updated}件／新規 {result.created}件（計 {result.total}件）</div>}
  </div>;
}
