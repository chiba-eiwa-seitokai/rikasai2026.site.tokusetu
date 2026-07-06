"use client";

import { useState } from "react";

const DAY1 = [
  { time: "9:30", tag: "OPEN", tagClass: "tag-open", name: "開場・受付開始", detail: "正門より入場 / QRコードをご用意ください" },
  { time: "10:00", tag: "MAIN", tagClass: "tag-main", name: "開会式・オープニングセレモニー", detail: "体育館 大ホール" },
  { time: "10:30", tag: "OPEN", tagClass: "tag-open", name: "各クラス・部活展示 開始", detail: "全教室・グラウンド" },
  { time: "13:00", tag: "MAIN", tagClass: "tag-main", name: "ステージ発表 第一部", detail: "体育館 大ホール" },
  { time: "13:30", tag: "CLOSE", tagClass: "tag-close", name: "入場締切", detail: "以降の入場はできません" },
  { time: "14:00", tag: "CLOSE", tagClass: "tag-close", name: "公開終了（関係者公開）", detail: "ありがとうございました" },
];

const DAY2 = [
  { time: "9:30", tag: "OPEN", tagClass: "tag-open", name: "開場・受付開始", detail: "正門より入場" },
  { time: "10:30", tag: "OPEN", tagClass: "tag-open", name: "各クラス・部活展示", detail: "全教室・グラウンド" },
  { time: "13:00", tag: "MAIN", tagClass: "tag-main", name: "ステージ発表 第二部", detail: "体育館 大ホール" },
  { time: "13:30", tag: "CLOSE", tagClass: "tag-close", name: "入場締切", detail: "以降の入場はできません" },
  { time: "14:00", tag: "CLOSE", tagClass: "tag-close", name: "公開終了", detail: "ありがとうございました" },
];

export default function SchedulePreview() {
  const [day, setDay] = useState(0);
  const items = day === 0 ? DAY1 : DAY2;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .sched-section{background:var(--ink);padding:80px 0;}
        .sched-inner{max-width:720px;margin:0 auto;padding:0 24px;}
        .schedule-tabs{display:flex;max-width:400px;margin:0 auto 48px;border:1px solid rgba(201,169,110,0.3);}
        .tab-btn{flex:1;padding:12px 24px;background:transparent;border:none;color:rgba(232,212,168,0.5);font-family:"Cinzel",serif;font-size:11px;letter-spacing:0.2em;cursor:pointer;transition:background 0.2s,color 0.2s;}
        .tab-btn.active{background:rgba(212,168,67,0.15);color:var(--gold);}
        .schedule-timeline{position:relative;padding-left:32px;}
        .schedule-timeline::before{content:"";position:absolute;left:0;top:8px;bottom:8px;width:1px;background:linear-gradient(to bottom,transparent,var(--gold) 10%,var(--gold) 90%,transparent);}
        .schedule-item{position:relative;margin-bottom:32px;display:flex;gap:24px;align-items:flex-start;}
        .schedule-item::before{content:"";position:absolute;left:-36px;top:8px;width:9px;height:9px;border:1px solid var(--gold);background:var(--ink);transform:rotate(45deg);flex-shrink:0;}
        .schedule-time{font-family:"Cormorant Garamond",serif;font-size:20px;font-weight:400;color:var(--gold);min-width:72px;line-height:1.2;}
        .schedule-event{flex:1;}
        .schedule-event-name{font-size:15px;font-weight:500;color:var(--gold-pale);margin-bottom:4px;}
        .schedule-event-detail{font-size:12px;color:rgba(240,208,128,0.5);font-weight:300;}
        .schedule-tag{display:inline-block;font-family:"Cinzel",serif;font-size:8px;letter-spacing:0.15em;padding:2px 8px;border:1px solid;margin-bottom:6px;}
        .tag-open{color:var(--teal-light);border-color:rgba(72,176,184,0.5);}
        .tag-main{color:var(--gold);border-color:rgba(212,168,67,0.5);}
        .tag-close{color:var(--rose);border-color:rgba(201,84,106,0.5);}
      ` }} />
      <section className="sched-section" id="schedule">
        <div className="sched-inner">
          <div className="section-header">
            <p className="section-label" style={{ color: "rgba(212,168,67,0.6)" }}>Program</p>
            <h2 className="section-title" style={{ color: "var(--gold-light)" }}>スケジュール</h2>
            <p className="section-title-jp" style={{ color: "rgba(232,212,168,0.4)" }}>Two-Day Program</p>
          </div>
          <div className="schedule-tabs reveal">
            <button className={`tab-btn${day === 0 ? " active" : ""}`} onClick={() => setDay(0)}>DAY 1 · 7/17 関係者</button>
            <button className={`tab-btn${day === 1 ? " active" : ""}`} onClick={() => setDay(1)}>DAY 2 · 7/18 一般</button>
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
      </section>
    </>
  );
}
