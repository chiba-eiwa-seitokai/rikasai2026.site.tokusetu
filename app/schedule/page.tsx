"use client";

import { useState } from "react";

const CHAPEL_PROGRAM = [
  { time: "10:00〜11:15", name: "ダンス部" },
  { time: "11:25〜12:40", name: "聖歌合唱・ハンドベル・オルガン・アンサンブル" },
  { time: "12:45〜14:00", name: "演劇部" },
];

const GYM_PROGRAM = [
  { time: "11:50〜12:20", name: "書道部（発表）" },
  { time: "12:30〜12:55", name: "チア（発表）" },
  { time: "13:10〜13:20", name: "チア＋吹奏楽（発表）" },
  { time: "13:20〜13:50", name: "吹奏楽（発表）" },
];

const MUSIC_ROOM_PROGRAM = [
  { time: "終日", name: "軽音楽部" },
];

const DAY1 = [
  {
    venue: "チャペル",
    emoji: "⛪",
    accent: "var(--f-purple)",
    items: [
      ...CHAPEL_PROGRAM,
      { time: "16:00〜17:15", name: "生徒会（中夜祭）", detail: "1日目のみ・生徒のみ参加可能" },
    ],
  },
  { venue: "大体育館", emoji: "🏟️", accent: "var(--f-orange)", items: GYM_PROGRAM },
  { venue: "音楽室", emoji: "🎸", accent: "var(--f-blue)", items: MUSIC_ROOM_PROGRAM },
];

const DAY2 = [
  { venue: "チャペル", emoji: "⛪", accent: "var(--f-purple)", items: CHAPEL_PROGRAM },
  { venue: "大体育館", emoji: "🏟️", accent: "var(--f-orange)", items: GYM_PROGRAM },
  { venue: "音楽室", emoji: "🎸", accent: "var(--f-blue)", items: MUSIC_ROOM_PROGRAM },
];

export default function SchedulePage() {
  const [day, setDay] = useState(0);
  const items = day === 0 ? DAY1 : DAY2;

  return (
    <div className="fpage">
      <style dangerouslySetInnerHTML={{ __html: `
        .sched-tabs{ display:flex; gap:8px; max-width:440px; margin:0 auto 36px; background:var(--f-card); border:1px solid var(--f-border); border-radius:999px; padding:6px; box-shadow:0 6px 18px var(--f-shadow); }
        .tab-btn{ flex:1; padding:11px 16px; background:transparent; border:none; border-radius:999px; color:var(--f-muted); font-size:13px; font-weight:700; cursor:pointer; transition:background .2s,color .2s; }
        .tab-btn.active{ background:linear-gradient(var(--f-pink-light),var(--f-pink)); color:#fff; box-shadow:0 4px 10px rgba(236,97,120,.35); }
        .venue-block{ max-width:720px; margin:0 auto 34px; }
        .venue-title{ display:flex; align-items:center; gap:10px; margin-bottom:16px; padding-bottom:10px; border-bottom:2px solid var(--venue-accent); font-size:18px; font-weight:900; color:var(--f-ink-deep); }
        .venue-title .ico{ width:36px; height:36px; border-radius:12px; display:flex; align-items:center; justify-content:center; background:color-mix(in srgb,var(--venue-accent) 14%,white); }
        .timeline{ position:relative; padding-left:30px; }
        .timeline::before{ content:""; position:absolute; left:7px; top:10px; bottom:10px; width:3px; border-radius:3px; background:#f0e0c2; }
        .sched-item{ position:relative; margin-bottom:22px; display:flex; gap:18px; align-items:flex-start; }
        .sched-item::before{ content:""; position:absolute; left:-30px; top:6px; width:16px; height:16px; border-radius:50%; background:#fff; border:3px solid var(--dot); box-shadow:0 2px 6px var(--f-shadow); }
        .sched-time{ font-family:"DM Serif Display",serif; font-size:17px; color:var(--f-ink-deep); min-width:118px; line-height:1.3; white-space:nowrap; }
        .sched-card{ flex:1; background:var(--f-card); border:1px solid var(--f-border); border-radius:14px; padding:14px 18px; box-shadow:0 4px 12px var(--f-shadow); }
        .sched-name{ font-size:15px; font-weight:900; color:var(--f-ink-deep); }
        .sched-detail{ font-size:12.5px; font-weight:500; color:var(--f-muted); }
        @media (max-width:520px){
          .sched-item{ gap:10px; }
          .sched-time{ min-width:98px; font-size:14px; }
          .sched-card{ padding:12px 14px; }
          .sched-name{ font-size:13.5px; }
        }
      ` }} />

      <section className="fhero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/design/4b9c0746-18bc-49cb-b2db-03ce5b4b79f6.png" alt="" className="fhero-decor" style={{ left: -24, width: 110 }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/design/5624955d-3c78-47be-b9cd-cd6064d8762c.png" alt="" className="fhero-decor" style={{ right: -24, width: 120 }} />
        <div className="fhero-inner">
          <p className="fhero-eyebrow" style={{ color: "var(--f-green)" }}>Program</p>
          <h1 className="fhero-title">プログラム</h1>
          <p className="fhero-sub">Two-Day Schedule</p>
        </div>
      </section>

      <div className="fbody">
        <div className="sched-tabs">
          <button className={`tab-btn${day === 0 ? " active" : ""}`} onClick={() => setDay(0)}>DAY 1 · 7/17 関係者</button>
          <button className={`tab-btn${day === 1 ? " active" : ""}`} onClick={() => setDay(1)}>DAY 2 · 7/18 一般</button>
        </div>
        {items.map((group) => (
          <section key={group.venue} className="venue-block" style={{ ["--venue-accent" as string]: group.accent }}>
            <h2 className="venue-title">
              <span className="ico">{group.emoji}</span>
              {group.venue}
            </h2>
            <div className="timeline">
              {group.items.map((item, i) => (
                <div key={`${group.venue}-${i}`} className="sched-item" style={{ ["--dot" as string]: group.accent }}>
                  <div className="sched-time">{item.time}</div>
                  <div className="sched-card">
                    <div className="sched-name">{item.name}</div>
                    {"detail" in item && item.detail && <div className="sched-detail">{item.detail}</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
