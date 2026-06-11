import { prisma } from "@/lib/prisma";
import Countdown from "@/components/home/Countdown";
import SchedulePreview from "@/components/home/SchedulePreview";
import EventsPreview from "@/components/home/EventsPreview";

export const revalidate = 60;

async function getNotices() {
  return prisma.notice.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
}

async function getEvents() {
  const events = await prisma.event.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
    take: 6,
  });
  return events.map((e) => ({
    ...e,
    tags: JSON.parse(e.tags) as string[],
    info: JSON.parse(e.infoJson) as { k: string; v: string }[],
  }));
}

export default async function Home() {
  const [notices, events] = await Promise.all([getNotices(), getEvents()]);

  return (
    <>
      <style>{`
        /* HERO */
        .hero{min-height:100vh;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;background:#1a120a;}
        .hero-bg{background-image:url("/hero.png");position:absolute;inset:0;background-size:cover;background-position:center 30%;background-repeat:no-repeat;}
        .hero-bg-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(26,18,10,0.35) 0%,rgba(26,18,10,0.1) 40%,rgba(26,18,10,0.4) 75%,rgba(26,18,10,0.88) 100%),radial-gradient(ellipse at 30% 60%,rgba(212,168,67,0.15) 0%,transparent 55%);}
        .hero-frame{position:absolute;inset:24px;border:1px solid rgba(201,169,110,0.25);pointer-events:none;}
        .hero-frame::before,.hero-frame::after{content:"";position:absolute;width:40px;height:40px;border-color:var(--gold);border-style:solid;}
        .hero-frame::before{top:-1px;left:-1px;border-width:2px 0 0 2px;}
        .hero-frame::after{bottom:-1px;right:-1px;border-width:0 2px 2px 0;}
        .hero-content{position:relative;text-align:center;padding:48px 24px;animation:fadeUp 1.4s ease forwards;opacity:0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
        .hero-eyebrow{font-family:"Cinzel",serif;font-size:11px;letter-spacing:0.35em;color:var(--gold);text-transform:uppercase;margin-bottom:28px;opacity:0.9;}
        .hero-title-jp{font-family:"Noto Serif JP",serif;font-size:clamp(52px,12vw,100px);font-weight:300;color:var(--gold-light);letter-spacing:0.15em;line-height:1;text-shadow:0 0 60px rgba(201,169,110,0.3);margin-bottom:12px;}
        .hero-title-en{font-family:"Cormorant Garamond",serif;font-size:clamp(18px,4vw,32px);font-weight:300;font-style:italic;color:rgba(232,212,168,0.6);letter-spacing:0.3em;margin-bottom:40px;}
        .hero-divider{display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:36px;}
        .hero-divider-line{width:80px;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);}
        .hero-divider-diamond{width:6px;height:6px;background:var(--gold);transform:rotate(45deg);}
        .hero-theme{font-family:"Cormorant Garamond",serif;font-size:clamp(14px,3vw,22px);font-style:italic;color:rgba(232,212,168,0.75);letter-spacing:0.1em;margin-bottom:48px;}
        .hero-meta{display:flex;gap:40px;justify-content:center;flex-wrap:wrap;}
        .hero-meta-item{text-align:center;}
        .hero-meta-label{font-family:"Cinzel",serif;font-size:9px;letter-spacing:0.3em;color:var(--gold);opacity:0.7;text-transform:uppercase;display:block;margin-bottom:6px;}
        .hero-meta-value{font-family:"Cormorant Garamond",serif;font-size:20px;font-weight:400;color:var(--gold-light);letter-spacing:0.05em;}
        /* NOTICE */
        .notice-section{background:var(--teal);padding:64px 24px;}
        .notice-section .section-title{color:var(--gold-light);}
        .notice-section .section-title-jp{color:rgba(232,212,168,0.6);}
        .notice-grid{max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:16px;}
        .notice-item{background:rgba(255,255,255,0.05);border:1px solid rgba(201,169,110,0.2);border-left:3px solid var(--gold);padding:20px 24px;display:flex;gap:16px;align-items:flex-start;}
        .notice-badge{background:var(--gold);color:var(--ink);font-family:"Cinzel",serif;font-size:8px;letter-spacing:0.2em;padding:3px 8px;flex-shrink:0;margin-top:2px;}
        .notice-badge-note{background:rgba(255,255,255,0.15);}
        .notice-text{font-size:13px;color:rgba(232,212,168,0.85);line-height:1.8;font-weight:300;}
        /* AWARD */
        .award-section{background:var(--ink);padding:80px 24px;}
        .award-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;max-width:800px;margin:0 auto;}
        .award-tier{border:1px solid rgba(212,168,67,0.2);padding:28px 24px;text-align:center;}
        .award-tier-gold{border-color:rgba(212,168,67,0.4);background:rgba(212,168,67,0.04);}
        .award-tier-label{font-family:"Cinzel",serif;font-size:9px;letter-spacing:0.3em;color:var(--gold);text-transform:uppercase;margin-bottom:12px;opacity:0.7;}
        .award-tier-name{font-family:"Noto Serif JP",serif;font-size:16px;font-weight:400;color:var(--gold-light);line-height:1.4;display:block;margin-bottom:8px;}
        .award-tier-silver .award-tier-name{color:#d0dae4;}
        .award-tier-bronze .award-tier-name{color:#d4a06a;}
        .award-tier-desc{font-size:11px;color:rgba(232,212,168,0.4);line-height:1.7;}
        /* ACCESS */
        .access-section{background:var(--cream);padding:80px 24px;}
        .access-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;max-width:800px;margin:0 auto;}
        @media(max-width:600px){.access-grid{grid-template-columns:1fr;}}
        .access-card{border:1px solid rgba(201,169,110,0.2);padding:28px 24px;}
        .access-card-title{font-family:"Cinzel",serif;font-size:10px;letter-spacing:0.25em;color:var(--gold);text-transform:uppercase;margin-bottom:16px;}
        .access-item{display:flex;gap:12px;margin-bottom:10px;font-size:12px;color:var(--ink-soft);line-height:1.6;}
        .access-item-label{font-family:"Cinzel",serif;font-size:9px;letter-spacing:0.15em;color:var(--gold);text-transform:uppercase;min-width:60px;padding-top:1px;}
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-bg-overlay" />
        <div className="hero-frame" />
        <div className="hero-content">
          <p className="hero-eyebrow">Chiba Eiwa High School — 2026</p>
          <h1 className="hero-title-jp">梨花祭</h1>
          <p className="hero-title-en">Rikasai</p>
          <div className="hero-divider">
            <div className="hero-divider-line" />
            <div className="hero-divider-diamond" />
            <div className="hero-divider-line" />
          </div>
          <p className="hero-theme">— Fantasy &amp; Fairy Tale —</p>
          <div className="hero-meta">
            <div className="hero-meta-item">
              <span className="hero-meta-label">Date</span>
              <span className="hero-meta-value">July 17 – 18</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-label">Year</span>
              <span className="hero-meta-value">2026</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-label">Venue</span>
              <span className="hero-meta-value">千葉英和高校</span>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <Countdown />

      {/* NOTICE */}
      <section className="notice-section" id="notice">
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", marginBottom: 48 }}>
          <p className="section-label" style={{ color: "rgba(232,212,168,0.5)" }}>Important Notice</p>
          <h2 className="section-title">お知らせ・注意事項</h2>
          <p className="section-title-jp">Notice &amp; Information</p>
        </div>
        <div className="notice-grid">
          {notices.map((n) => (
            <div key={n.id} className="notice-item">
              <span className={`notice-badge${n.badge === "NOTE" ? " notice-badge-note" : ""}`}>
                {n.badge}
              </span>
              <p className="notice-text">{n.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SCHEDULE PREVIEW */}
      <SchedulePreview />

      {/* EVENTS PREVIEW */}
      <EventsPreview events={events} />

      {/* AWARD */}
      <section className="award-section">
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div className="section-header">
            <p className="section-label" style={{ color: "rgba(212,168,67,0.6)" }}>Awards</p>
            <h2 className="section-title" style={{ color: "var(--gold-light)" }}>梨花祭賞</h2>
            <p className="section-title-jp" style={{ color: "rgba(232,212,168,0.4)" }}>Rikasai Award</p>
          </div>
          <div className="award-grid">
            <div className="award-tier award-tier-gold">
              <p className="award-tier-label">Gold</p>
              <span className="award-tier-name">最優秀賞<br />梨花祭大賞</span>
              <p className="award-tier-desc">すべての部門を通じて最も優れた企画に贈られる最高賞</p>
            </div>
            <div className="award-tier award-tier-silver">
              <p className="award-tier-label">Silver</p>
              <span className="award-tier-name">優秀賞<br />審査員特別賞</span>
              <p className="award-tier-desc">各部門の審査員が特に評価した企画に贈られる賞</p>
            </div>
            <div className="award-tier award-tier-bronze">
              <p className="award-tier-label">Bronze</p>
              <span className="award-tier-name">来場者賞<br />人気投票賞</span>
              <p className="award-tier-desc">来場者の投票によって選ばれる人気企画賞</p>
            </div>
          </div>
        </div>
      </section>

      {/* ACCESS */}
      <section className="access-section" id="access">
        <div className="section-header">
          <p className="section-label">Access</p>
          <h2 className="section-title">アクセス</h2>
          <p className="section-title-jp">How to get here</p>
        </div>
        <div className="access-grid">
          <div className="access-card">
            <p className="access-card-title">By Train</p>
            <div className="access-item">
              <span className="access-item-label">JR</span>
              <span>船橋駅よりバス約15分「千葉英和高校前」下車徒歩1分</span>
            </div>
            <div className="access-item">
              <span className="access-item-label">東武</span>
              <span>新船橋駅より徒歩約12分</span>
            </div>
          </div>
          <div className="access-card">
            <p className="access-card-title">Address</p>
            <div className="access-item">
              <span className="access-item-label">住所</span>
              <span>〒274-0063 千葉県船橋市習志野台8-34-1</span>
            </div>
            <div className="access-item">
              <span className="access-item-label">駐車場</span>
              <span>来場者用駐車場はございません。公共交通機関をご利用ください。</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
