import PageHero from "@/components/layout/PageHero";

export const metadata = { title: "ご注意 — 梨花祭2026" };

const ENTRY_INFO = [
  {
    audience: "中学生の方",
    emoji: "🎒",
    date: "7月18日(土)",
    time: "9:30〜14:00（入場13:30まで）",
    reservation: "不要",
    items: ["生徒手帳または制服着用", "上履き・靴袋"],
  },
  {
    audience: "一般の方（招待制）",
    emoji: "✉️",
    date: "7月18日(日)",
    time: "9:30〜14:00（入場13:30まで）",
    reservation: "要（招待QRコード）",
    items: ["招待QRコード", "上履き・靴袋"],
    note: "事前QRコードのない一般の方はご入場いただけません。",
  },
  {
    audience: "卒業生の方",
    emoji: "🎓",
    date: "7月17日(金)・18日(土)",
    time: "9:30〜14:00（入室13:30まで）",
    reservation: "不要",
    items: ["特になし"],
    note: "当日受付にて氏名等をご記入いただいた上で入場となります。",
  },
  {
    audience: "在校生家族",
    emoji: "👨‍👩‍👧",
    date: "7月17日(土)・18日(日)",
    time: "9:30〜14:00（入場13:30まで）",
    reservation: "不要",
    items: ["保護者証明メールの画面", "上履き・靴袋"],
  },
];

const RULES = [
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
      "各企画の料金は現金払いが基本です。",
      "入場は無料ですが、飲食等の各企画は数百円程度の料金が発生する場合があります。",
    ],
  },
  {
    title: "緊急時について",
    emoji: "🚑",
    accent: "var(--f-purple)",
    items: [
      "体調不良の方は、最寄りの教員・生徒会生徒または保健室にお申し出ください。",
      "緊急事態が発生した場合は、教員の指示に従ってください。",
    ],
  },
];

export default function RulesPage() {
  return (
    <div className="fpage">
      <style dangerouslySetInnerHTML={{ __html: `
        .rule-group{ margin-bottom:22px; }
        .rule-group-title{ display:flex; align-items:center; gap:10px; font-size:17px; font-weight:900; color:var(--f-ink-deep); margin-bottom:14px; }
        .rule-group-title .ico{ width:34px; height:34px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:18px; background:#f6ecd6; flex:none; }
        .rule-list{ list-style:none; display:flex; flex-direction:column; gap:12px; }
        .rule-list li{ font-size:13.5px; font-weight:500; color:var(--f-ink-soft); line-height:1.8; padding-left:22px; position:relative; }
        .rule-list li::before{ content:"●"; position:absolute; left:0; top:1px; font-size:9px; color:var(--dot); }

        .entry-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:16px; margin-bottom:18px; }
        @media (max-width:640px){ .entry-grid{ grid-template-columns:1fr; } }
        .entry-card{ background:var(--f-card); border:1px solid var(--f-border); border-radius:16px; padding:20px 20px 18px; box-shadow:0 6px 18px var(--f-shadow); }
        .entry-card-title{ display:flex; align-items:center; gap:8px; font-size:15px; font-weight:900; color:var(--f-ink-deep); margin-bottom:12px; }
        .entry-date{ display:inline-block; font-size:13px; font-weight:700; color:#fff; background:var(--f-pink); border-radius:999px; padding:4px 14px; margin-bottom:10px; }
        .entry-row{ display:flex; gap:8px; font-size:12.5px; font-weight:500; color:var(--f-ink-soft); line-height:1.7; margin-bottom:4px; }
        .entry-row .k{ flex:none; font-weight:700; color:var(--f-ink); min-width:64px; }
        .entry-note{ font-size:11.5px; font-weight:500; color:var(--f-pink); line-height:1.6; margin-top:8px; }
      ` }} />

      <PageHero eyebrow="Guidelines" title="ご注意" sub="Rules & Guidelines" accent="var(--f-orange)" />

      <div className="fbody">
        <div id="entry" className="fcard rule-group" style={{ scrollMarginTop: 84 }}>
          <p className="rule-group-title">
            <span className="ico">🎟</span>
            入場について
          </p>
          <div className="entry-grid">
            {ENTRY_INFO.map((e) => (
              <div key={e.audience} className="entry-card">
                <p className="entry-card-title">
                  <span>{e.emoji}</span>
                  {e.audience}
                </p>
                <span className="entry-date">{e.date}</span>
                <div className="entry-row"><span className="k">時間</span>{e.time}</div>
                <div className="entry-row"><span className="k">事前予約</span>{e.reservation}</div>
                <div className="entry-row"><span className="k">持ち物</span>{e.items.join("、")}</div>
                {e.note && <p className="entry-note">※{e.note}</p>}
              </div>
            ))}
          </div>
          <ul className="rule-list" style={{ ["--dot" as string]: "var(--f-pink)" }}>
            <li>入場料は無料です。各企画は個別に料金が発生する場合があります。</li>
            <li>来校方法（駅からのバス時刻表等）の詳細は学校公式サイトをご確認ください。</li>
          </ul>
        </div>

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
