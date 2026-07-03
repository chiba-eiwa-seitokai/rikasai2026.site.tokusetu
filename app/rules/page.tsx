import PageHero from "@/components/layout/PageHero";

export const metadata = { title: "ご注意 — 梨花祭2026" };

const RULES = [
  {
    title: "入場について",
    emoji: "🎟",
    accent: "var(--f-pink)",
    items: [
      "一般来場の方は、事前の招待リンクをお持ちの方のみご入場いただけます。",
      "QRコードを印刷またはスマートフォンに表示してお越しください。",
      "入場料は無料です。各企画は個別に料金が発生する場合があります。",
    ],
  },
  {
    title: "撮影・録音について",
    emoji: "📷",
    accent: "var(--f-blue)",
    items: [
      "会場内での写真・動画撮影は、出演者・展示物のプライバシーに配慮の上お楽しみください。",
      "ステージ演目の無断録音・録画・ライブ配信はご遠慮ください。",
      "撮影した写真・動画をSNSに投稿する場合は、写り込んだ方への配慮をお願いします。",
    ],
  },
  {
    title: "マナーについて",
    emoji: "🌿",
    accent: "var(--f-green)",
    items: [
      "構内は全面禁煙です。",
      "ゴミは各自でお持ち帰りいただくようお願いします。",
      "ペット同伴でのご来場はご遠慮ください。",
      "大声での会話・迷惑行為はご遠慮ください。",
    ],
  },
  {
    title: "お支払いについて",
    emoji: "💴",
    accent: "var(--f-orange)",
    items: [
      "各企画の料金は現金払いが基本です。一部QRコード決済対応の企画もあります。",
      "入場は無料ですが、飲食・体験・物販の各企画は100〜500円程度の料金が発生します。",
    ],
  },
  {
    title: "緊急時について",
    emoji: "🚑",
    accent: "var(--f-purple)",
    items: [
      "体調不良の方は、最寄りのスタッフまたは保健室にお申し出ください。",
      "緊急事態が発生した場合は、スタッフの指示に従ってください。",
    ],
  },
];

export default function RulesPage() {
  return (
    <div className="fpage">
      <style>{`
        .rule-group{ margin-bottom:22px; }
        .rule-group-title{ display:flex; align-items:center; gap:10px; font-size:17px; font-weight:900; color:var(--f-ink-deep); margin-bottom:14px; }
        .rule-group-title .ico{ width:34px; height:34px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:18px; background:#f6ecd6; flex:none; }
        .rule-list{ list-style:none; display:flex; flex-direction:column; gap:12px; }
        .rule-list li{ font-size:13.5px; font-weight:500; color:var(--f-ink-soft); line-height:1.8; padding-left:22px; position:relative; }
        .rule-list li::before{ content:"●"; position:absolute; left:0; top:1px; font-size:9px; color:var(--dot); }
      `}</style>

      <PageHero eyebrow="Guidelines" title="ご注意" sub="Rules & Guidelines" accent="var(--f-orange)" />

      <div className="fbody">
        {RULES.map((group) => (
          <div key={group.title} className="fcard rule-group">
            <p className="rule-group-title">
              <span className="ico">{group.emoji}</span>
              {group.title}
            </p>
            <ul className="rule-list" style={{ ["--dot" as string]: group.accent }}>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
