import PageHero from "@/components/layout/PageHero";

export const metadata = { title: "梨花祭とは — 梨花祭2026" };

const INFO = [
  { label: "日程", value: "2026年7月17日（金）\n2026年7月18日（土）" },
  { label: "時間", value: "受付 9:30〜 / 公開終了 14:00\n（入場締切 13:30）" },
  { label: "場所", value: "千葉英和高等学校\n〒276-0028 千葉県八千代市村上709-1" },
  { label: "入場", value: "7/17（金）関係者公開\n7/18（土）一般公開\n入場無料" },
];

export default function AboutPage() {
  return (
    <div className="fpage">
      <style>{`
        .about-lead{ text-align:center; font-size:clamp(20px,4.5vw,28px); font-weight:900; color:var(--f-ink-deep); line-height:1.7; margin-bottom:32px; }
        .theme-box{ position:relative; background:linear-gradient(120deg,#fff3e0,#ffe6ea); border:1px solid var(--f-border); border-radius:22px; padding:36px 28px; text-align:center; margin:0 0 44px; overflow:hidden; }
        .theme-box .en{ font-family:"DM Serif Display",serif; font-size:11px; font-style:italic; letter-spacing:.3em; color:var(--f-pink); margin-bottom:10px; }
        .theme-box .ttl{ font-size:clamp(24px,6vw,40px); font-weight:900; color:var(--f-ink-deep); margin-bottom:8px; }
        .theme-box .sb{ font-size:13px; font-weight:700; color:var(--f-muted); }
        .about-info-grid{ display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        @media(max-width:560px){ .about-info-grid{ grid-template-columns:1fr; } }
        .about-info .lbl{ display:inline-block; font-size:12px; font-weight:700; color:#fff; background:var(--f-pink); border-radius:999px; padding:3px 14px; margin-bottom:10px; }
        .about-info .val{ font-size:14px; font-weight:500; color:var(--f-ink-soft); line-height:1.7; white-space:pre-line; }
      `}</style>

      <PageHero eyebrow="About" title="梨花祭とは" sub="About Rikasai 2026" accent="var(--f-pink)" />

      <div className="fbody">
        <p className="about-lead">
          千葉英和高等学校の文化祭<br />
          「梨花祭2026」へようこそ
        </p>

        <div className="theme-box">
          <p className="en">Theme 2026</p>
          <p className="ttl">CHALLENGE!</p>
          <p className="sb">〜 みんなでやろうよ、梨花祭！ 〜</p>
        </div>

        <div className="fsect">
          <p className="fsect-title">梨花祭について <span className="en">ABOUT</span></p>
          <p className="fbody-text">
            梨花祭は千葉英和高等学校が毎年開催する文化祭です。生徒一人ひとりが企画・準備・運営に携わり、クラスや部活動の個性を活かした多彩な出し物をお届けします。今年のテーマは「CHALLENGE!」。みんなで力を合わせて創り上げる、最高の2日間をお楽しみください。
          </p>
        </div>

        <div className="fsect">
          <p className="fsect-title">開催情報 <span className="en">INFO</span></p>
          <div className="about-info-grid">
            {INFO.map((i) => (
              <div key={i.label} className="fcard about-info">
                <p className="lbl">{i.label}</p>
                <p className="val">{i.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="fsect">
          <p className="fsect-title">来場にあたって <span className="en">NOTICE</span></p>
          <p className="fbody-text">
            一般来場の方は事前の招待リンクが必要です。QRコードを印刷またはスマートフォンに表示してお越しください。会場内での写真・動画撮影は出演者のプライバシーに配慮の上マナーを守ってお楽しみください。構内は全面禁煙です。
          </p>
        </div>
      </div>
    </div>
  );
}
