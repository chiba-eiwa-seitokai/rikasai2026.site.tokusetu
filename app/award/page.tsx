import PageHero from "@/components/layout/PageHero";

export const metadata = {
  title: "梨花祭賞 — 梨花祭2026",
  description: "梨花祭賞の賞区分、審査基準、投票方法、表彰についてご案内します。",
};

const MEDAL_AWARDS = [
  { emoji: "🥇", label: "GOLD AWARD", name: "ゴールド賞", color: "#b88318", bg: "#fff7df" },
  { emoji: "🥈", label: "SILVER AWARD", name: "シルバー賞", color: "#6f7d8c", bg: "#f1f4f7" },
  { emoji: "🥉", label: "BRONZE AWARD", name: "ブロンズ賞", color: "#ad6542", bg: "#fff0e9" },
];

const SPECIAL_AWARDS = [
  {
    emoji: "🎡",
    name: "アトラクション賞",
    selection: "全校から1クラス",
    accent: "var(--f-blue)",
    bg: "#edf6fd",
    criteria: ["みんなが興味を持てる出し物か", "楽しませるためのコンセプトが明確か"],
  },
  {
    emoji: "🎨",
    name: "ポスター賞",
    selection: "各学年から1クラス",
    accent: "var(--f-purple)",
    bg: "#f5effc",
    criteria: ["企画内容が伝わるか", "各クラスの特色が表れているか"],
  },
  {
    emoji: "🍽️",
    name: "飲食賞",
    selection: "各学年から1クラス",
    accent: "var(--f-pink)",
    bg: "#fff0f3",
    criteria: ["接客が良いか", "コンセプトが良いか", "楽しめる企画になっているか"],
  },
];

const VOTING_STEPS = [
  { number: "01", title: "投票用紙を受け取る", desc: "梨花祭1日目のショートホームルーム（SHR）で、担任の先生から配布されます。" },
  { number: "02", title: "企画を見て回る", desc: "2日間を通して各クラスの企画やポスター、飲食企画を確認します。" },
  { number: "03", title: "紙で投票する", desc: "クラスに設置された投票箱へ、投票用紙を入れてください。" },
];

export default function AwardPage() {
  return (
    <div className="fpage">
      <style dangerouslySetInnerHTML={{ __html: `
        .award-lead{background:linear-gradient(135deg,#fff8e9,#fff0f3);border:1px solid var(--f-border-warm);border-radius:20px;padding:28px 30px;box-shadow:0 8px 22px var(--f-shadow);}
        .award-lead p{font-size:14px;font-weight:600;line-height:2;color:var(--f-ink-soft);}
        .purpose-list{display:grid;gap:12px;margin-top:18px;}
        .purpose-item{display:flex;align-items:flex-start;gap:12px;background:rgba(255,255,255,.7);border-radius:12px;padding:13px 15px;font-size:13px;font-weight:700;line-height:1.7;color:var(--f-ink-deep);}
        .purpose-mark{color:var(--f-orange);font-size:16px;line-height:1.5;}
        .medal-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
        .medal-card{border:1px solid var(--medal-color);border-radius:18px;padding:22px 14px;text-align:center;background:var(--medal-bg);}
        .medal-emoji{font-size:38px;line-height:1;margin-bottom:12px;}
        .medal-label{font-family:"DM Serif Display",serif;font-size:11px;letter-spacing:.08em;color:var(--medal-color);margin-bottom:5px;}
        .medal-name{font-size:15px;font-weight:900;color:var(--f-ink-deep);}
        .medal-desc{font-size:12.5px;font-weight:600;line-height:1.7;color:var(--f-ink-soft);text-align:center;margin:16px 0 0;}
        .exclusion-note{display:flex;gap:10px;align-items:flex-start;margin-top:14px;padding:14px 16px;border-radius:12px;background:#fff7e1;border:1px solid #edd49a;font-size:12.5px;font-weight:700;line-height:1.75;color:#72561f;}
        .special-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
        .special-card{border-radius:18px;padding:22px 19px;border:1px solid var(--award-accent);background:var(--award-bg);}
        .special-head{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
        .special-emoji{font-size:27px;}
        .special-name{font-size:15px;font-weight:900;color:var(--f-ink-deep);line-height:1.4;}
        .selection-badge{display:inline-block;border-radius:999px;padding:4px 10px;background:#fff;font-size:10.5px;font-weight:800;color:var(--award-accent);margin-bottom:14px;}
        .criteria-list{display:grid;gap:8px;list-style:none;}
        .criteria-list li{position:relative;padding-left:15px;font-size:12px;font-weight:600;line-height:1.65;color:var(--f-ink-soft);}
        .criteria-list li::before{content:"";position:absolute;left:0;top:.68em;width:6px;height:6px;border-radius:50%;background:var(--award-accent);}
        .vote-period{display:flex;align-items:center;justify-content:space-between;gap:20px;background:linear-gradient(120deg,#eef6fd,#f7f1fc);border:1px solid var(--f-border);border-radius:18px;padding:22px 24px;margin-bottom:18px;}
        .vote-period-label{font-size:11px;font-weight:800;letter-spacing:.12em;color:var(--f-blue);margin-bottom:6px;}
        .vote-period-date{font-size:21px;font-weight:900;color:var(--f-ink-deep);}
        .vote-period-note{font-size:12px;font-weight:600;line-height:1.7;color:var(--f-ink-soft);text-align:right;}
        .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
        .step{position:relative;background:var(--f-card);border:1px solid var(--f-border);border-radius:16px;padding:20px 17px;box-shadow:0 5px 14px var(--f-shadow);}
        .step-num{font-family:"DM Serif Display",serif;font-size:13px;color:var(--f-pink);margin-bottom:9px;}
        .step-title{font-size:14px;font-weight:900;color:var(--f-ink-deep);margin-bottom:7px;}
        .step-desc{font-size:11.5px;font-weight:500;line-height:1.75;color:var(--f-ink-soft);}
        .rule-box{margin-top:18px;border:1px solid #e7b5b5;background:#fff4f4;border-radius:16px;padding:20px 22px;}
        .rule-title{font-size:14px;font-weight:900;color:#b14f4f;margin-bottom:10px;}
        .rule-list{display:grid;gap:7px;padding-left:20px;}
        .rule-list li{font-size:12.5px;font-weight:650;line-height:1.7;color:#754848;}
        .ceremony{display:grid;grid-template-columns:auto 1fr;gap:20px;align-items:center;background:linear-gradient(135deg,#fff6d9,#fff0e7);border:1px solid #edd7a8;border-radius:20px;padding:27px 30px;}
        .ceremony-icon{font-size:45px;}
        .ceremony-date{font-size:20px;font-weight:900;color:var(--f-ink-deep);margin-bottom:6px;}
        .ceremony-desc{font-size:12.5px;font-weight:600;line-height:1.8;color:var(--f-ink-soft);}
        @media(max-width:720px){.special-grid,.steps{grid-template-columns:1fr}.special-card{padding:20px}.vote-period{align-items:flex-start;flex-direction:column}.vote-period-note{text-align:left}.ceremony{grid-template-columns:1fr}.ceremony-icon{font-size:38px}.award-lead{padding:23px 20px}}
        @media(max-width:560px){.medal-grid{grid-template-columns:1fr}.medal-card{display:grid;grid-template-columns:auto 1fr;column-gap:14px;text-align:left;align-items:center;padding:16px 18px}.medal-emoji{grid-row:1 / 3;margin:0}.medal-label{margin:0}.vote-period-date{font-size:18px}}
      ` }} />

      <PageHero eyebrow="Awards" title="梨花祭賞" sub="Rikasai Award 2026" accent="var(--f-orange)" />

      <div className="fbody">
        <section className="fsect">
          <p className="fsect-title">梨花祭賞とは <span className="en">PURPOSE</span></p>
          <div className="award-lead">
            <p>クラス全員で受賞を目指し、梨花祭をより良いものにするための賞です。</p>
            <div className="purpose-list">
              <div className="purpose-item"><span className="purpose-mark">✦</span><span>受賞という共通の目標を通して、クラスの団結につなげる</span></div>
              <div className="purpose-item"><span className="purpose-mark">✦</span><span>梨花祭に向けて取り組んだ努力と、やり遂げた達成感を実感する</span></div>
            </div>
          </div>
        </section>

        <section className="fsect">
          <p className="fsect-title">メダル賞 <span className="en">GOLD / SILVER / BRONZE</span></p>
          <div className="medal-grid">
            {MEDAL_AWARDS.map((award) => (
              <div
                key={award.label}
                className="medal-card"
                style={{ ["--medal-color" as string]: award.color, ["--medal-bg" as string]: award.bg }}
              >
                <div className="medal-emoji">{award.emoji}</div>
                <p className="medal-label">{award.label}</p>
                <p className="medal-name">{award.name}</p>
              </div>
            ))}
          </div>
          <p className="medal-desc">全クラスを対象に、投票結果からゴールド・シルバー・ブロンズの3賞を決定します。</p>
          <div className="exclusion-note">
            <span>※</span>
            <span>メダル賞に選ばれた団体は、アトラクション賞および飲食賞の対象から外れます。</span>
          </div>
        </section>

        <section className="fsect">
          <p className="fsect-title">部門賞と審査基準 <span className="en">SPECIAL AWARDS</span></p>
          <div className="special-grid">
            {SPECIAL_AWARDS.map((award) => (
              <article
                key={award.name}
                className="special-card"
                style={{ ["--award-accent" as string]: award.accent, ["--award-bg" as string]: award.bg }}
              >
                <div className="special-head">
                  <span className="special-emoji">{award.emoji}</span>
                  <h2 className="special-name">{award.name}</h2>
                </div>
                <p className="selection-badge">{award.selection}</p>
                <ul className="criteria-list">
                  {award.criteria.map((criterion) => <li key={criterion}>{criterion}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="fsect">
          <p className="fsect-title">投票方法 <span className="en">HOW TO VOTE</span></p>
          <div className="vote-period">
            <div>
              <p className="vote-period-label">VOTING PERIOD</p>
              <p className="vote-period-date">7月17日（金）・18日（土）</p>
            </div>
            <p className="vote-period-note">梨花祭開催中の2日間<br />在校生による紙投票</p>
          </div>
          <div className="steps">
            {VOTING_STEPS.map((step) => (
              <div key={step.number} className="step">
                <p className="step-num">STEP {step.number}</p>
                <h2 className="step-title">{step.title}</h2>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="rule-box">
            <p className="rule-title">投票時の注意事項</p>
            <ul className="rule-list">
              <li>自分のクラスには投票できません。</li>
              <li>自分のクラスへの投票を他の人に強要してはいけません。</li>
              <li>ルール違反が確認された場合、審査対象外になる可能性があります。</li>
            </ul>
          </div>
        </section>

        <section className="fsect" style={{ marginBottom: 0 }}>
          <p className="fsect-title">表彰 <span className="en">CEREMONY</span></p>
          <div className="ceremony">
            <div className="ceremony-icon">🏆</div>
            <div>
              <p className="ceremony-date">7月21日（火）・約5分間</p>
              <p className="ceremony-desc">受賞したクラスは、表彰後に校長先生と記念撮影ができます。</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
