"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../auth-context";

const VALID_TYPES = ["飲食", "体験", "展示", "物販", "ステージ"];

type ParsedRow = {
  num: string;
  grade: string;
  title: string;
  type: string;
  emoji: string;
  desc: string;
  tags: string[];
  location: string;
  hours: string;
  price: string;
  day1: boolean;
  day2: boolean;
  sortOrder: number;
  _valid: boolean;
  _errors: string[];
};

function parseCSV(text: string): ParsedRow[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const rows = lines.slice(1);
  return rows.map((line) => {
    const cols = line.split(",");
    const [num, grade, title, type, emoji, desc, tagsRaw, location, hours, price, day1Str, day2Str, sortStr] = cols.map((c) => c.trim());
    const errors: string[] = [];
    if (!grade) errors.push("クラス必須");
    if (!title) errors.push("タイトル必須");
    if (!type) errors.push("種別必須");
    else if (!VALID_TYPES.includes(type)) errors.push(`種別無効(${type})`);
    return {
      num: num ?? "",
      grade: grade ?? "",
      title: title ?? "",
      type: type ?? "",
      emoji: emoji || "🎉",
      desc: desc ?? "",
      tags: tagsRaw ? tagsRaw.split(";").map((t) => t.trim()).filter(Boolean) : [],
      location: location ?? "",
      hours: hours ?? "",
      price: price ?? "",
      day1: day1Str?.toLowerCase() === "true",
      day2: day2Str?.toLowerCase() === "true",
      sortOrder: parseInt(sortStr ?? "0") || 0,
      _valid: errors.length === 0,
      _errors: errors,
    };
  });
}

export default function ImportPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [inputMode, setInputMode] = useState<"file" | "paste">("file");
  const [parsed, setParsed] = useState<ParsedRow[]>([]);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ created: number; errors: string[] } | null>(null);
  const [csvText, setCsvText] = useState("");

  function handleParse(text: string) {
    setCsvText(text);
    setParsed(parseCSV(text));
    setResult(null);
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    handleParse(text);
  }

  async function doImport() {
    const valid = parsed.filter((r) => r._valid);
    if (!valid.length) return;
    setImporting(true);
    setResult(null);
    const res = await fetch("/api/events/import", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ events: valid }),
    });
    const data = await res.json();
    setResult(data);
    setImporting(false);
    if (res.ok && data.created > 0) {
      setTimeout(() => router.push("/admin/events"), 2000);
    }
  }

  const validCount = parsed.filter((r) => r._valid).length;
  const invalidCount = parsed.length - validCount;

  return (
    <div style={{ maxWidth: 860 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, fontStyle: "italic", color: "var(--gold-light)" }}>
          CSVインポート
        </h2>
        <Link href="/admin/events" className="admin-btn" style={{ fontSize: 10, padding: "4px 16px", borderColor: "#444", color: "rgba(232,212,168,0.5)" }}>
          ← 企画一覧
        </Link>
      </div>

      <div style={{ background: "#1a1a1a", border: "1px solid #333", padding: 20, marginBottom: 24 }}>
        <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 10 }}>CSVフォーマット</p>
        <pre style={{ fontSize: 11, color: "rgba(232,212,168,0.6)", overflowX: "auto", lineHeight: 1.8 }}>{`num, grade, title, type, emoji, desc, tags, location, hours, price, day1, day2, sortOrder

例:
01,1年A組,おとぎ話カフェ,飲食,☕,魔法の森のカフェです,カフェ;ドリンク,2F-101,9:00-15:00,200円,TRUE,TRUE,10`}</pre>
        <p style={{ fontSize: 11, color: "rgba(232,212,168,0.4)", marginTop: 8 }}>
          ※ tags はセミコロン区切り ／ type は「飲食・体験・展示・物販・ステージ」のいずれか ／ インポート後は非公開状態
        </p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(["file", "paste"] as const).map((m) => (
          <button key={m} onClick={() => setInputMode(m)}
            style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", padding: "6px 16px", cursor: "pointer", background: inputMode === m ? "rgba(212,168,67,0.1)" : "transparent", border: `1px solid ${inputMode === m ? "rgba(212,168,67,0.5)" : "#333"}`, color: inputMode === m ? "var(--gold)" : "rgba(232,212,168,0.4)" }}>
            {m === "file" ? "ファイル選択" : "テキスト貼付"}
          </button>
        ))}
      </div>

      {inputMode === "file" ? (
        <div className="admin-form-group">
          <label className="admin-btn admin-btn-gold" style={{ display: "inline-block", cursor: "pointer" }}>
            CSVファイルを選択
            <input type="file" accept=".csv,text/csv" style={{ display: "none" }} onChange={handleFile} />
          </label>
        </div>
      ) : (
        <div className="admin-form-group">
          <textarea
            className="admin-textarea"
            style={{ minHeight: 160, fontFamily: "monospace", fontSize: 12 }}
            placeholder={"num,grade,title,type,...\n01,1年A組,..."}
            value={csvText}
            onChange={(e) => handleParse(e.target.value)}
          />
        </div>
      )}

      {parsed.length > 0 && (
        <>
          <p style={{ fontSize: 12, color: "rgba(232,212,168,0.6)", marginBottom: 12 }}>
            {parsed.length}件を解析 —
            <span style={{ color: "#7ab870" }}> 有効 {validCount}件</span>
            {invalidCount > 0 && <span style={{ color: "var(--rose)" }}> / 無効 {invalidCount}件</span>}
          </p>

          <div style={{ overflowX: "auto", marginBottom: 20 }}>
            <table className="admin-table" style={{ fontSize: 11 }}>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>クラス</th>
                  <th>タイトル</th>
                  <th>種別</th>
                  <th>Day1</th>
                  <th>Day2</th>
                  <th>状態</th>
                </tr>
              </thead>
              <tbody>
                {parsed.map((row, i) => (
                  <tr key={i} style={{ color: row._valid ? "inherit" : "var(--rose)", opacity: row._valid ? 1 : 0.7 }}>
                    <td>{row.num}</td>
                    <td>{row.grade}</td>
                    <td>{row.emoji} {row.title}</td>
                    <td>{row.type}</td>
                    <td>{row.day1 ? "✓" : "—"}</td>
                    <td>{row.day2 ? "✓" : "—"}</td>
                    <td style={{ fontSize: 10 }}>
                      {row._valid ? (
                        <span style={{ color: "#7ab870" }}>OK</span>
                      ) : (
                        <span title={row._errors.join(", ")}>⚠ {row._errors.join(", ")}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button
              className="admin-btn admin-btn-gold"
              disabled={importing || validCount === 0}
              onClick={doImport}
            >
              {importing ? "インポート中..." : `${validCount}件をインポート`}
            </button>
            {result && (
              <span style={{ fontSize: 12, color: result.errors.length ? "var(--rose)" : "#7ab870" }}>
                {result.created}件を作成。
                {result.errors.length > 0 && ` エラー: ${result.errors.slice(0, 3).join(" / ")}`}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
