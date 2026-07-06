"use client";

import { useState, useEffect } from "react";

const TARGET = new Date("2026-07-17T09:00:00+09:00");

export default function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    function update() {
      const diff = TARGET.getTime() - Date.now();
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .countdown-section{background:var(--ink);padding:56px 24px;text-align:center;position:relative;overflow:hidden;}
        .countdown-section::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(201,169,110,0.08) 0%,transparent 70%);}
        .countdown-grid{display:flex;gap:24px;justify-content:center;flex-wrap:wrap;position:relative;}
        .countdown-item{text-align:center;min-width:80px;}
        .countdown-number{font-family:"Cormorant Garamond",serif;font-size:clamp(48px,10vw,80px);font-weight:300;color:var(--gold-light);line-height:1;display:block;}
        .countdown-sep{font-family:"Cormorant Garamond",serif;font-size:60px;font-weight:300;color:rgba(201,169,110,0.3);line-height:1;align-self:flex-start;margin-top:10px;}
        .countdown-unit{font-family:"Cinzel",serif;font-size:9px;letter-spacing:0.25em;color:rgba(232,212,168,0.5);text-transform:uppercase;margin-top:8px;display:block;}
      ` }} />
      <section className="countdown-section">
        <p className="section-label">Countdown to Rikasai</p>
        <div className="countdown-grid">
          <div className="countdown-item">
            <span className="countdown-number">{pad(time.days)}</span>
            <span className="countdown-unit">Days</span>
          </div>
          <span className="countdown-sep">:</span>
          <div className="countdown-item">
            <span className="countdown-number">{pad(time.hours)}</span>
            <span className="countdown-unit">Hours</span>
          </div>
          <span className="countdown-sep">:</span>
          <div className="countdown-item">
            <span className="countdown-number">{pad(time.mins)}</span>
            <span className="countdown-unit">Minutes</span>
          </div>
          <span className="countdown-sep">:</span>
          <div className="countdown-item">
            <span className="countdown-number">{pad(time.secs)}</span>
            <span className="countdown-unit">Seconds</span>
          </div>
        </div>
      </section>
    </>
  );
}
