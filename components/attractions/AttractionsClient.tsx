"use client";

import { useState } from "react";
import Link from "next/link";

type EventItem = {
  id: string;
  num: string;
  grade: string;
  title: string;
  type: string;
  emoji: string;
  desc: string;
  tags: string[];
  info: { k: string; v: string }[];
  day1: boolean;
  day2: boolean;
  thumbUrl: string | null;
};

const TYPE_COLOR: Record<string, string> = {
  飲食: "#f08898",
  体験: "#48b0b8",
  展示: "#d4a843",
  物販: "#7ab870",
  ステージ: "#c9546a",
};

const FILTERS = ["ALL", "飲食", "体験", "展示", "物販", "ステージ"];

export default function AttractionsClient({ events }: { events: EventItem[] }) {
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const q = search.trim().toLowerCase();
  const filtered = events.filter((e) => {
    const catMatch = filter === "ALL" || e.type === filter;
    const textMatch =
      !q ||
      e.title.toLowerCase().includes(q) ||
      e.grade.toLowerCase().includes(q) ||
      e.desc.toLowerCase().includes(q) ||
      e.tags.some((t) => t.toLowerCase().includes(q));
    return catMatch && textMatch;
  });

  return (
    <>
      <style>{`
        .attr-controls{max-width:960px;margin:0 auto;padding:32px 24px 0;display:flex;gap:12px;flex-wrap:wrap;align-items:center;}
        .search-box{display:flex;align-items:center;gap:8px;border:1px solid rgba(201,169,110,0.3);background:var(--cream);padding:0 14px;flex:1;max-width:320px;}
        .search-input{border:none;background:transparent;outline:none;padding:10px 0;font-family:"Noto Serif JP",serif;font-size:13px;color:var(--ink);width:100%;}
        .filter-btns{display:flex;gap:8px;flex-wrap:wrap;}
        .filter-btn{padding:7px 14px;font-family:"Cinzel",serif;font-size:9px;letter-spacing:0.2em;border:1px solid rgba(201,169,110,0.3);background:transparent;color:rgba(58,40,24,0.6);cursor:pointer;text-transform:uppercase;transition:background 0.2s,color 0.2s,border-color 0.2s;}
        .filter-btn.active,.filter-btn:hover{background:var(--gold);color:var(--ink);border-color:var(--gold);}
        .attr-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px;max-width:960px;margin:32px auto 80px;padding:0 24px;}
        .card{border:1px solid rgba(201,169,110,0.25);background:var(--parchment);position:relative;overflow:hidden;display:flex;flex-direction:column;transition:transform 0.3s,box-shadow 0.3s;cursor:pointer;text-decoration:none;color:inherit;}
        .card::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;z-index:1;}
        .card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(45,74,62,0.12);}
        .card-thumb{width:100%;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;font-size:56px;background:linear-gradient(135deg,rgba(42,122,128,0.1),rgba(212,168,67,0.08));position:relative;overflow:hidden;}
        .card-thumb img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
        .card-thumb-emoji{position:relative;z-index:1;}
        .card-thumb-badge{position:absolute;bottom:8px;right:8px;font-family:"Cinzel",serif;font-size:8px;letter-spacing:0.15em;padding:3px 9px;font-weight:600;z-index:2;}
        .card-body{padding:20px 18px 16px;}
        .card-number{font-family:"Cormorant Garamond",serif;font-size:40px;font-weight:300;color:rgba(201,169,110,0.12);position:absolute;top:8px;right:12px;line-height:1;}
        .card-grade{font-family:"Cinzel",serif;font-size:9px;letter-spacing:0.25em;color:var(--gold);text-transform:uppercase;margin-bottom:6px;}
        .card-name{font-size:15px;font-weight:500;color:var(--ink);margin-bottom:6px;line-height:1.4;}
        .card-type{display:inline-block;font-size:10px;padding:2px 8px;margin-bottom:8px;border:1px solid;}
        .card-desc{font-size:12px;color:var(--ink-soft);line-height:1.8;opacity:0.75;}
        .no-results{text-align:center;padding:80px 24px;font-size:13px;color:var(--ink-soft);opacity:0.6;}
      `}</style>
      <div className="attr-controls">
        <div className="search-box">
          <span>🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="キーワードで検索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-btns">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn${filter === f ? " active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="no-results">該当する出し物が見つかりませんでした</p>
      ) : (
        <div className="attr-grid">
          {filtered.map((e) => {
            const color = TYPE_COLOR[e.type] ?? "#d4a843";
            return (
              <Link key={e.id} href={`/attractions/${e.id}`} className="card" style={{ "--card-color": color } as React.CSSProperties}>
                <style>{`.card[href="/attractions/${e.id}"]::before { background: ${color}; }`}</style>
                <div className="card-thumb">
                  {e.thumbUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={e.thumbUrl} alt={e.title} />
                  )}
                  <span className="card-thumb-emoji" style={{ opacity: e.thumbUrl ? 0 : 1 }}>{e.emoji}</span>
                  <span className="card-thumb-badge" style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}>{e.type}</span>
                </div>
                <div className="card-body">
                  <span className="card-number">{e.num}</span>
                  <p className="card-grade">{e.grade}</p>
                  <p className="card-name">{e.title}</p>
                  <span className="card-type" style={{ color, borderColor: `${color}60` }}>{e.type}</span>
                  <p className="card-desc">{e.desc.slice(0, 90)}…</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
