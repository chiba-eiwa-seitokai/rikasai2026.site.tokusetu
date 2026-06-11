export const metadata = { title: "ご注意 — 梨花祭2026" };

const RULES = [
  {
    title: "入場について",
    items: [
      "一般来場の方は、事前の招待リンクをお持ちの方のみご入場いただけます。",
      "QRコードを印刷またはスマートフォンに表示してお越しください。",
      "入場料は無料です。各企画は個別に料金が発生する場合があります。",
    ],
  },
  {
    title: "撮影・録音について",
    items: [
      "会場内での写真・動画撮影は、出演者・展示物のプライバシーに配慮の上お楽しみください。",
      "ステージ演目の無断録音・録画・ライブ配信はご遠慮ください。",
      "撮影した写真・動画をSNSに投稿する場合は、写り込んだ方への配慮をお願いします。",
    ],
  },
  {
    title: "マナーについて",
    items: [
      "構内は全面禁煙です。",
      "ゴミは各自でお持ち帰りいただくようお願いします。",
      "ペット同伴でのご来場はご遠慮ください。",
      "大声での会話・迷惑行為はご遠慮ください。",
    ],
  },
  {
    title: "お支払いについて",
    items: [
      "各企画の料金は現金払いが基本です。一部QRコード決済対応の企画もあります。",
      "入場は無料ですが、飲食・体験・物販の各企画は100〜500円程度の料金が発生します。",
    ],
  },
  {
    title: "緊急時について",
    items: [
      "体調不良の方は、最寄りのスタッフまたは保健室にお申し出ください。",
      "緊急事態が発生した場合は、スタッフの指示に従ってください。",
    ],
  },
];

export default function RulesPage() {
  return (
    <>
      <style>{`
        .rules-hero{background:var(--ink);padding:80px 24px 60px;text-align:center;position:relative;}
        .rules-hero::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(201,169,110,0.06) 0%,transparent 70%);}
        .rules-hero-title{font-family:"Cormorant Garamond",serif;font-size:clamp(36px,8vw,72px);font-weight:300;font-style:italic;color:var(--gold-light);position:relative;}
        .rules-body{max-width:720px;margin:0 auto;padding:60px 24px 80px;}
        .rule-group{margin-bottom:48px;}
        .rule-group-title{font-family:"Cinzel",serif;font-size:10px;letter-spacing:0.4em;color:var(--gold);text-transform:uppercase;margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid rgba(212,168,67,0.2);}
        .rule-list{list-style:none;display:flex;flex-direction:column;gap:10px;}
        .rule-list li{font-size:13px;color:var(--ink-soft);line-height:1.8;padding-left:20px;position:relative;}
        .rule-list li::before{content:"—";position:absolute;left:0;color:var(--gold);opacity:0.6;}
      `}</style>

      <section className="rules-hero">
        <p className="section-label" style={{ color: "rgba(212,168,67,0.6)" }}>Guidelines</p>
        <h1 className="rules-hero-title">ご注意</h1>
        <p style={{ color: "rgba(232,212,168,0.5)", marginTop: 8, position: "relative", fontFamily: "'Noto Serif JP',serif", fontSize: 13 }}>Rules &amp; Guidelines</p>
      </section>

      <div className="rules-body">
        {RULES.map((group) => (
          <div key={group.title} className="rule-group">
            <p className="rule-group-title">{group.title}</p>
            <ul className="rule-list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
