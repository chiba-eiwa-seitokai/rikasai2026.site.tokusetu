export const metadata = { title: "梨花祭賞 — 梨花祭2026" };

const AWARDS = [
  {
    tier: "gold",
    label: "Gold Award",
    name: "最優秀賞 梨花祭大賞",
    desc: "すべての部門を通じて最も優れた企画に贈られる最高賞。審査員全員の投票で決定します。",
  },
  {
    tier: "silver",
    label: "Silver Award",
    name: "優秀賞 審査員特別賞",
    desc: "各審査員が特に評価した企画に贈られます。複数選出される場合があります。",
  },
  {
    tier: "bronze",
    label: "Audience Award",
    name: "来場者賞 人気投票賞",
    desc: "来場者の投票（会場内投票箱）によって選ばれる人気企画賞です。",
  },
  {
    tier: "special",
    label: "Special Award",
    name: "特別賞 テーマ賞",
    desc: "今年のテーマ「Fantasy &amp; Fairy Tale」を最もよく表現した企画に贈られる特別賞です。",
  },
];

const CATEGORIES = [
  { name: "飲食部門", desc: "カフェ・屋台・販売" },
  { name: "体験部門", desc: "ワークショップ・ゲーム・体験" },
  { name: "展示部門", desc: "アート・写真・模型" },
  { name: "物販部門", desc: "ハンドメイド・同人誌" },
  { name: "ステージ部門", desc: "演劇・音楽・ダンス" },
];

export default function AwardPage() {
  return (
    <>
      <style>{`
        .award-page-hero{background:var(--ink);padding:80px 24px 60px;text-align:center;position:relative;}
        .award-page-hero::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(212,168,67,0.1) 0%,transparent 70%);}
        .award-page-hero-title{font-family:"Cormorant Garamond",serif;font-size:clamp(36px,8vw,72px);font-weight:300;font-style:italic;color:var(--gold-light);position:relative;}
        .award-page-body{max-width:860px;margin:0 auto;padding:60px 24px 80px;}
        .awards-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin-bottom:56px;}
        .award-card{border:1px solid rgba(212,168,67,0.2);padding:28px 24px;}
        .award-card-gold{border-color:rgba(212,168,67,0.4);background:rgba(212,168,67,0.04);}
        .award-card-silver{border-color:rgba(192,206,220,0.3);background:rgba(192,206,220,0.03);}
        .award-card-bronze{border-color:rgba(212,160,106,0.3);background:rgba(212,160,106,0.03);}
        .award-card-special{border-color:rgba(201,84,106,0.3);background:rgba(201,84,106,0.03);}
        .award-card-label{font-family:"Cinzel",serif;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;margin-bottom:12px;opacity:0.7;}
        .award-card-gold .award-card-label{color:var(--gold);}
        .award-card-silver .award-card-label{color:#c0cedc;}
        .award-card-bronze .award-card-label{color:#d4a06a;}
        .award-card-special .award-card-label{color:var(--rose);}
        .award-card-name{font-family:"Noto Serif JP",serif;font-size:15px;font-weight:400;color:var(--ink);line-height:1.5;margin-bottom:10px;}
        .award-card-desc{font-size:12px;color:var(--ink-soft);line-height:1.7;opacity:0.7;}
        .award-section-title{font-family:"Cinzel",serif;font-size:10px;letter-spacing:0.4em;color:var(--gold);text-transform:uppercase;margin-bottom:20px;padding-bottom:10px;border-bottom:1px solid rgba(212,168,67,0.2);}
        .categories-grid{display:flex;flex-wrap:wrap;gap:12px;}
        .category-chip{border:1px solid rgba(201,169,110,0.3);padding:10px 20px;}
        .category-chip-name{font-family:"Cinzel",serif;font-size:10px;letter-spacing:0.2em;color:var(--gold);text-transform:uppercase;}
        .category-chip-desc{font-size:11px;color:var(--ink-soft);opacity:0.6;margin-top:2px;}
        .voting-box{background:var(--teal);padding:32px;margin-top:48px;text-align:center;}
        .voting-box-title{font-family:"Cinzel",serif;font-size:12px;letter-spacing:0.3em;color:var(--gold-light);text-transform:uppercase;margin-bottom:8px;}
        .voting-box-desc{font-size:13px;color:rgba(232,212,168,0.8);line-height:1.8;}
      `}</style>

      <section className="award-page-hero">
        <p className="section-label" style={{ color: "rgba(212,168,67,0.6)" }}>Awards</p>
        <h1 className="award-page-hero-title">梨花祭賞</h1>
        <p style={{ color: "rgba(232,212,168,0.5)", marginTop: 8, position: "relative", fontFamily: "'Noto Serif JP',serif", fontSize: 13 }}>Rikasai Award 2026</p>
      </section>

      <div className="award-page-body">
        <div className="awards-grid">
          {AWARDS.map((a) => (
            <div key={a.tier} className={`award-card award-card-${a.tier}`}>
              <p className="award-card-label">{a.label}</p>
              <p className="award-card-name" dangerouslySetInnerHTML={{ __html: a.name }} />
              <p className="award-card-desc" dangerouslySetInnerHTML={{ __html: a.desc }} />
            </div>
          ))}
        </div>

        <p className="award-section-title">部門別審査</p>
        <div className="categories-grid">
          {CATEGORIES.map((c) => (
            <div key={c.name} className="category-chip">
              <p className="category-chip-name">{c.name}</p>
              <p className="category-chip-desc">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="voting-box">
          <p className="voting-box-title">来場者投票受付中</p>
          <p className="voting-box-desc">
            会場内の投票箱にて、お気に入りの企画に投票できます。<br />
            投票は各日1人1票。両日来場の方は合計2票投票できます。
          </p>
        </div>
      </div>
    </>
  );
}
