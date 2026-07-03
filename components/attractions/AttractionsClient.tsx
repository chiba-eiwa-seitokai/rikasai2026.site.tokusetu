"use client";

import { useState } from "react";
import Link from "next/link";
import { TYPE_COLOR, CATEGORY_FILTERS, typesForCategory } from "@/lib/festival";

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

export default function AttractionsClient({
  events,
  initialCat = "ALL",
}: {
  events: EventItem[];
  initialCat?: string;
}) {
  const normalizedInitial = CATEGORY_FILTERS.includes(initialCat) ? initialCat : "ALL";
  const [filter, setFilter] = useState(normalizedInitial);
  const [search, setSearch] = useState("");

  const q = search.trim().toLowerCase();
  const allowedTypes = typesForCategory(filter);
  const filtered = events.filter((e) => {
    const catMatch = !allowedTypes || allowedTypes.includes(e.type);
    const textMatch =
      !q ||
      e.title.toLowerCase().includes(q) ||
      e.grade.toLowerCase().includes(q) ||
      e.desc.toLowerCase().includes(q) ||
      e.tags.some((t) => t.toLowerCase().includes(q));
    return catMatch && textMatch;
  });

  return (
    <div className="fbody">
      <style>{`
        .attr-controls{ display:flex; gap:12px; flex-wrap:wrap; align-items:center; justify-content:center; margin-bottom:28px; }
        .search-box{ display:flex; align-items:center; gap:8px; background:var(--f-card); border:1px solid var(--f-border); border-radius:999px; padding:0 16px; flex:1; max-width:320px; box-shadow:0 4px 12px var(--f-shadow); }
        .search-input{ border:none; background:transparent; outline:none; padding:11px 0; font-family:"Zen Maru Gothic",sans-serif; font-size:13px; font-weight:500; color:var(--f-ink); width:100%; }
        .filter-btns{ display:flex; gap:8px; flex-wrap:wrap; }
        .filter-btn{ padding:9px 18px; border:1px solid var(--f-border-warm); background:var(--f-card); color:var(--f-ink-soft); border-radius:999px; font-size:13px; font-weight:700; cursor:pointer; transition:all .2s; }
        .filter-btn.active,.filter-btn:hover{ background:linear-gradient(var(--f-pink-light),var(--f-pink)); color:#fff; border-color:transparent; box-shadow:0 4px 10px rgba(236,97,120,.3); }
        .attr-grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); gap:22px; }
        .acard{ position:relative; background:var(--f-card); border:1px solid var(--f-border); border-radius:18px; overflow:hidden; display:flex; flex-direction:column; text-decoration:none; color:inherit; box-shadow:0 6px 18px var(--f-shadow); transition:transform .25s, box-shadow .25s; }
        .acard:hover{ transform:translateY(-4px); box-shadow:0 14px 30px rgba(120,90,30,.18); }
        .acard-thumb{ width:100%; aspect-ratio:16/10; display:flex; align-items:center; justify-content:center; font-size:52px; background:linear-gradient(135deg,#fdeede,#fbe6ea); position:relative; overflow:hidden; }
        .acard-thumb img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
        .acard-badge{ position:absolute; top:10px; left:10px; z-index:2; }
        .acard-body{ padding:16px 18px 20px; }
        .acard-grade{ font-size:11px; font-weight:700; color:var(--f-muted); letter-spacing:.06em; margin-bottom:5px; }
        .acard-name{ font-size:16px; font-weight:900; color:var(--f-ink-deep); line-height:1.4; margin-bottom:8px; }
        .acard-desc{ font-size:12.5px; font-weight:500; color:var(--f-ink-soft); line-height:1.75; }
        .no-results{ text-align:center; padding:60px 24px; font-size:14px; font-weight:700; color:var(--f-muted); }
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
          {CATEGORY_FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn${filter === f ? " active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "ALL" ? "すべて" : f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="no-results">該当する企画が見つかりませんでした</p>
      ) : (
        <div className="attr-grid">
          {filtered.map((e) => {
            const color = TYPE_COLOR[e.type] ?? "var(--f-pink)";
            return (
              <Link key={e.id} href={`/attractions/${e.id}`} className="acard">
                <div className="acard-thumb">
                  {e.thumbUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={e.thumbUrl} alt={e.title} />
                  )}
                  <span style={{ opacity: e.thumbUrl ? 0 : 1 }}>{e.emoji}</span>
                  <span className="ftag acard-badge" style={{ background: color, color: "#fff" }}>{e.type}</span>
                </div>
                <div className="acard-body">
                  <p className="acard-grade">{e.grade}</p>
                  <p className="acard-name">{e.title}</p>
                  <p className="acard-desc">{e.desc.slice(0, 78)}…</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
