import PageHero from "@/components/layout/PageHero";

export const metadata = { title: "梨花祭賞 — 梨花祭2026" };

const AWARDS = [
  { emoji: "🏆", accent: "var(--f-orange)", bg: "#fff3df", label: "Gold Award", name: "最優秀賞 梨花祭大賞", desc: "すべての部門を通じて最も優れた企画に贈られる最高賞。審査員全員の投票で決定します。" },
  { emoji: "🥈", accent: "var(--f-blue)", bg: "#eef4fb", label: "Silver Award", name: "優秀賞 審査員特別賞", desc: "各審査員が特に評価した企画に贈られます。複数選出される場合があります。" },
  { emoji: "💗", accent: "var(--f-pink)", bg: "#ffeef1", label: "Audience Award", name: "来場者賞 人気投票賞", desc: "来場者の投票（会場内投票箱）によって選ばれる人気企画賞です。" },
  { emoji: "✨", accent: "var(--f-purple)", bg: "#f3eefb", label: "Special Award", name: "特別賞 チャレンジ賞", desc: "今年のテーマ「CHALLENGE!」を最もよく表現した企画に贈られる特別賞です。" },
];

const CATEGORIES = [
  { name: "飲食部門", desc: "カフェ・屋台・販売", accent: "var(--f-pink)" },
  { name: "体験部門", desc: "ワークショップ・ゲーム・体験", accent: "var(--f-blue)" },
  { name: "展示部門", desc: "アート・写真・模型", accent: "var(--f-orange)" },
  { name: "物販部門", desc: "ハンドメイド・同人誌", accent: "var(--f-green)" },
  { name: "ステージ部門", desc: "演劇・音楽・ダンス", accent: "var(--f-purple)" },
];

export default function AwardPage() {
  return (
    <div className="fpage">
      <style>{`
        .awards-grid{ display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:8px; }
        @media(max-width:560px){ .awards-grid{ grid-template-columns:1fr; } }
        .award-card{ border-radius:18px; padding:24px 22px; border:1px solid var(--f-border); }
        .award-card .em{ font-size:32px; margin-bottom:12px; }
        .award-card .lb{ font-family:"DM Serif Display",serif; font-style:italic; font-size:12px; letter-spacing:.06em; margin-bottom:8px; }
        .award-card .nm{ font-size:16px; font-weight:900; color:var(--f-ink-deep); line-height:1.5; margin-bottom:10px; }
        .award-card .ds{ font-size:12.5px; font-weight:500; color:var(--f-ink-soft); line-height:1.8; }
        .cat-grid{ display:flex; flex-wrap:wrap; gap:12px; }
        .cat-chip{ background:var(--f-card); border:1px solid var(--f-border); border-left:5px solid var(--chip); border-radius:12px; padding:12px 20px; box-shadow:0 4px 12px var(--f-shadow); }
        .cat-chip .cn{ font-size:14px; font-weight:900; color:var(--f-ink-deep); }
        .cat-chip .cd{ font-size:11.5px; font-weight:500; color:var(--f-muted); margin-top:2px; }
        .voting-box{ background:linear-gradient(120deg,#ffe6ea,#fff3e0); border:1px solid var(--f-border); border-radius:20px; padding:32px 28px; margin-top:40px; text-align:center; }
        .voting-box .vt{ font-size:17px; font-weight:900; color:var(--f-pink); margin-bottom:10px; }
        .voting-box .vd{ font-size:13.5px; font-weight:500; color:var(--f-ink-soft); line-height:1.9; }
      `}</style>

      <PageHero eyebrow="Awards" title="梨花祭賞" sub="Rikasai Award 2026" accent="var(--f-orange)" />

      <div className="fbody">
        <div className="fsect">
          <p className="fsect-title">受賞のカテゴリー <span className="en">AWARDS</span></p>
          <div className="awards-grid">
            {AWARDS.map((a) => (
              <div key={a.label} className="award-card" style={{ background: a.bg, borderColor: `${a.accent}` }}>
                <div className="em">{a.emoji}</div>
                <p className="lb" style={{ color: a.accent }}>{a.label}</p>
                <p className="nm">{a.name}</p>
                <p className="ds">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="fsect">
          <p className="fsect-title">部門別審査 <span className="en">CATEGORIES</span></p>
          <div className="cat-grid">
            {CATEGORIES.map((c) => (
              <div key={c.name} className="cat-chip" style={{ ["--chip" as string]: c.accent }}>
                <p className="cn">{c.name}</p>
                <p className="cd">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="voting-box">
          <p className="vt">🗳 来場者投票 受付中</p>
          <p className="vd">
            会場内の投票箱にて、お気に入りの企画に投票できます。<br />
            投票は各日1人1票。両日来場の方は合計2票投票できます。
          </p>
        </div>
      </div>
    </div>
  );
}
