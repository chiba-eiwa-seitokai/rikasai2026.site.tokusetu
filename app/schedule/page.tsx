"use client";

import { useState } from "react";

const DAY1 = [
  { time: "9:00", tag: "OPEN", tagClass: "tag-open", name: "開場・受付開始", detail: "正門より入場 / QRコードをご用意ください" },
  { time: "10:00", tag: "MAIN", tagClass: "tag-main", name: "開会式・オープニングセレモニー", detail: "体育館 大ホール" },
  { time: "10:30", tag: "OPEN", tagClass: "tag-open", name: "各クラス・部活展示 開始", detail: "全教室・グラウンド" },
  { time: "11:00", tag: "STAGE", tagClass: "tag-stage", name: "吹奏楽部コンサート", detail: "体育館 大ホール" },
  { time: "13:00", tag: "MAIN", tagClass: "tag-main", name: "ステージ発表 第一部", detail: "体育館 大ホール" },
  { time: "13:30", tag: "STAGE", tagClass: "tag-stage", name: "演劇部「眠れる森の真実」", detail: "体育館 大ホール" },
  { time: "16:00", tag: "CLOSE", tagClass: "tag-close", name: "Day 1 終了", detail: "翌日もお楽しみに" },
];

const DAY2 = [
  { time: "9:00", tag: "OPEN", tagClass: "tag-open", name: "開場", detail: "正門より入場" },
  { time: "10:00", tag: "STAGE", tagClass: "tag-stage", name: "書道パフォーマンス", detail: "中庭ステージ" },
  { time: "10:30", tag: "OPEN", tagClass: "tag-open", name: "各クラス・部活展示", detail: "全教室・グラウンド" },
  { time: "11:00", tag: "STAGE", tagClass: "tag-stage", name: "吹奏楽部コンサート", detail: "体育館 大ホール" },
  { time: "13:00", tag: "MAIN", tagClass: "tag-main", name: "ステージ発表 第二部", detail: "体育館 大ホール" },
  { time: "14:00", tag: "STAGE", tagClass: "tag-stage", name: "演劇部「眠れる森の真実」", detail: "体育館 大ホール" },
  { time: "15:00", tag: "MAIN", tagClass: "tag-main", name: "閉会式・フィナーレ", detail: "体育館 大ホール" },
  { time: "15:30", tag: "CLOSE", tagClass: "tag-close", name: "梨花祭2026 終了", detail: "ありがとうございました" },
];

export default function SchedulePage() {
  const [day, setDay] = useState(0);
  const items = day === 0 ? DAY1 : DAY2;

  return (
    <>
      <style>{`
        .sched-hero{background:var(--ink);padding:80px 24px 60px;text-align:center;position:relative;}
        .sched-hero::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(201,169,110,0.08) 0%,transparent 70%);}
        .sched-hero-title{font-family:"Cormorant Garamond",serif;font-size:clamp(36px,8vw,72px);font-weight:300;font-style:italic;color:var(--gold-light);position:relative;}
        .sched-body{background:var(--ink);padding:0 24px 80px;}
        .schedule-tabs{display:flex;max-width:400px;margin:0 auto 48px;border:1px solid rgba(201,169,110,0.3);}
        .tab-btn{flex:1;padding:12px 24px;background:transparent;border:none;color:rgba(232,212,168,0.5);font-family:"Cinzel",serif;font-size:11px;letter-spacing:0.2em;cursor:pointer;transition:background 0.2s,color 0.2s;}
        .tab-btn.active{background:rgba(212,168,67,0.15);color:var(--gold);}
        .schedule-timeline{max-width:600px;margin:0 auto;position:relative;padding-left:32px;}
        .schedule-timeline::before{content:"";position:absolute;left:0;top:8px;bottom:8px;width:1px;background:linear-gradient(to bottom,transparent,var(--gold) 10%,var(--gold) 90%,transparent);}
        .schedule-item{position:relative;margin-bottom:32px;display:flex;gap:24px;align-items:flex-start;}
        .schedule-item::before{content:"";position:absolute;left:-36px;top:8px;width:9px;height:9px;border:1px solid var(--gold);background:var(--ink);transform:rotate(45deg);}
        .schedule-time{font-family:"Cormorant Garamond",serif;font-size:20px;font-weight:400;color:var(--gold);min-width:72px;line-height:1.2;}
        .schedule-event{flex:1;}
        .schedule-event-name{font-size:15px;font-weight:500;color:var(--gold-pale);margin-bottom:4px;}
        .schedule-event-detail{font-size:12px;color:rgba(240,208,128,0.5);}
        .schedule-tag{display:inline-block;font-family:"Cinzel",serif;font-size:8px;letter-spacing:0.15em;padding:2px 8px;border:1px solid;margin-bottom:6px;}
        .tag-open{color:var(--teal-light);border-color:rgba(72,176,184,0.5);}
        .tag-main{color:var(--gold);border-color:rgba(212,168,67,0.5);}
        .tag-stage{color:var(--rose);border-color:rgba(201,84,106,0.5);}
        .tag-close{color:rgba(232,212,168,0.3);border-color:rgba(232,212,168,0.2);}
      `}</style>

      <section className="sched-hero">
        <p className="section-label" style={{ color: "rgba(212,168,67,0.6)" }}>Program</p>
        <h1 className="sched-hero-title">プログラム</h1>
        <p style={{ color: "rgba(232,212,168,0.5)", marginTop: 8, position: "relative", fontFamily: "'Noto Serif JP',serif", fontSize: 13 }}>Two-Day Schedule</p>
      </section>

      <div className="sched-body">
        <div className="schedule-tabs" style={{ paddingTop: 48 }}>
          <button className={`tab-btn${day === 0 ? " active" : ""}`} onClick={() => setDay(0)}>DAY 1 · 7/17</button>
          <button className={`tab-btn${day === 1 ? " active" : ""}`} onClick={() => setDay(1)}>DAY 2 · 7/18</button>
        </div>
        <div className="schedule-timeline">
          {items.map((item, i) => (
            <div key={i} className="schedule-item">
              <div className="schedule-time">{item.time}</div>
              <div className="schedule-event">
                <span className={`schedule-tag ${item.tagClass}`}>{item.tag}</span>
                <div className="schedule-event-name">{item.name}</div>
                <div className="schedule-event-detail">{item.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
