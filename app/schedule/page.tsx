"use client";

import { useState } from "react";

const TAG_COLOR: Record<string, string> = {
  OPEN: "var(--f-blue)",
  MAIN: "var(--f-orange)",
  STAGE: "var(--f-pink)",
  CLOSE: "var(--f-muted)",
};

const DAY1 = [
  { time: "9:30", tag: "OPEN", name: "開場・受付開始", detail: "正門より入場 / QRコードをご用意ください" },
  { time: "10:00", tag: "MAIN", name: "開会式・オープニングセレモニー", detail: "体育館 大ホール" },
  { time: "10:30", tag: "OPEN", name: "各クラス・部活展示 開始", detail: "全教室・グラウンド" },
  { time: "11:00", tag: "STAGE", name: "吹奏楽部コンサート", detail: "体育館 大ホール" },
  { time: "13:00", tag: "MAIN", name: "ステージ発表 第一部", detail: "体育館 大ホール" },
  { time: "13:30", tag: "CLOSE", name: "入場締切", detail: "以降の入場はできません" },
  { time: "14:00", tag: "CLOSE", name: "公開終了（関係者公開）", detail: "ありがとうございました" },
];

const DAY2 = [
  { time: "9:30", tag: "OPEN", name: "開場・受付開始", detail: "正門より入場" },
  { time: "10:00", tag: "STAGE", name: "書道パフォーマンス", detail: "中庭ステージ" },
  { time: "10:30", tag: "OPEN", name: "各クラス・部活展示", detail: "全教室・グラウンド" },
  { time: "11:00", tag: "STAGE", name: "吹奏楽部コンサート", detail: "体育館 大ホール" },
  { time: "13:00", tag: "MAIN", name: "ステージ発表 第二部", detail: "体育館 大ホール" },
  { time: "13:30", tag: "CLOSE", name: "入場締切", detail: "以降の入場はできません" },
  { time: "14:00", tag: "CLOSE", name: "公開終了", detail: "ありがとうございました" },
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
        .timeline{ max-width:600px; margin:0 auto; position:relative; padding-left:30px; }
        .timeline::before{ content:""; position:absolute; left:7px; top:10px; bottom:10px; width:3px; border-radius:3px; background:#f0e0c2; }
        .sched-item{ position:relative; margin-bottom:22px; display:flex; gap:18px; align-items:flex-start; }
        .sched-item::before{ content:""; position:absolute; left:-30px; top:6px; width:16px; height:16px; border-radius:50%; background:#fff; border:3px solid var(--dot); box-shadow:0 2px 6px var(--f-shadow); }
        .sched-time{ font-family:"DM Serif Display",serif; font-size:20px; color:var(--f-ink-deep); min-width:64px; line-height:1.3; }
        .sched-card{ flex:1; background:var(--f-card); border:1px solid var(--f-border); border-radius:14px; padding:14px 18px; box-shadow:0 4px 12px var(--f-shadow); }
        .sched-name{ font-size:15px; font-weight:900; color:var(--f-ink-deep); margin:6px 0 4px; }
        .sched-detail{ font-size:12.5px; font-weight:500; color:var(--f-muted); }
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
        <div className="timeline">
          {items.map((item, i) => {
            const color = TAG_COLOR[item.tag] ?? "var(--f-pink)";
            return (
              <div key={i} className="sched-item" style={{ ["--dot" as string]: color }}>
                <div className="sched-time">{item.time}</div>
                <div className="sched-card">
                  <span className="ftag" style={{ background: `${color}22`, color }}>{item.tag}</span>
                  <div className="sched-name">{item.name}</div>
                  <div className="sched-detail">{item.detail}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
