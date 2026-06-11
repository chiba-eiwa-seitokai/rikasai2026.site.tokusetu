export const metadata = { title: "梨花祭とは — 梨花祭2026" };

export default function AboutPage() {
  return (
    <>
      <style>{`
        .page-hero{background:var(--ink);padding:80px 24px 60px;text-align:center;position:relative;overflow:hidden;}
        .page-hero::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 20% 50%,rgba(212,168,67,0.1) 0%,transparent 55%),radial-gradient(ellipse at 80% 30%,rgba(201,84,106,0.08) 0%,transparent 50%);}
        .page-hero-title{font-family:"Cormorant Garamond",serif;font-size:clamp(36px,8vw,72px);font-weight:300;font-style:italic;color:var(--gold-light);position:relative;}
        .page-hero-sub{font-family:"Noto Serif JP",serif;font-size:13px;color:rgba(232,212,168,0.5);margin-top:8px;position:relative;}
        .about-body{max-width:720px;margin:0 auto;padding:80px 24px;}
        .about-lead{font-family:"Cormorant Garamond",serif;font-size:clamp(20px,4vw,30px);font-style:italic;color:var(--ink-soft);line-height:1.6;margin-bottom:48px;text-align:center;}
        .about-section{margin-bottom:56px;}
        .about-section-title{font-family:"Cinzel",serif;font-size:10px;letter-spacing:0.4em;color:var(--gold);text-transform:uppercase;margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid rgba(212,168,67,0.2);}
        .about-section-body{font-size:14px;color:var(--ink-soft);line-height:2;}
        .theme-box{background:var(--ink);padding:48px 32px;text-align:center;margin:56px 0;}
        .theme-box-label{font-family:"Cinzel",serif;font-size:9px;letter-spacing:0.4em;color:rgba(212,168,67,0.5);text-transform:uppercase;margin-bottom:16px;}
        .theme-box-title{font-family:"Cormorant Garamond",serif;font-size:clamp(24px,6vw,48px);font-style:italic;color:var(--gold-light);margin-bottom:8px;}
        .theme-box-sub{font-size:13px;color:rgba(232,212,168,0.4);font-family:"Noto Serif JP",serif;}
        .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:32px;}
        @media(max-width:500px){.info-grid{grid-template-columns:1fr;}}
        .info-card{border:1px solid rgba(201,169,110,0.2);padding:20px 24px;}
        .info-card-label{font-family:"Cinzel",serif;font-size:9px;letter-spacing:0.25em;color:var(--gold);text-transform:uppercase;margin-bottom:8px;}
        .info-card-value{font-size:14px;color:var(--ink-soft);line-height:1.6;}
      `}</style>

      <section className="page-hero">
        <p className="section-label" style={{ color: "rgba(212,168,67,0.6)" }}>About</p>
        <h1 className="page-hero-title">梨花祭とは</h1>
        <p className="page-hero-sub">About Rikasai 2026</p>
      </section>

      <div className="about-body">
        <p className="about-lead">
          千葉英和高等学校の文化祭<br />
          「梨花祭2026」へようこそ
        </p>

        <div className="theme-box">
          <p className="theme-box-label">Theme 2026</p>
          <p className="theme-box-title">Fantasy &amp; Fairy Tale</p>
          <p className="theme-box-sub">〜 ファンタジーと童話の世界へ 〜</p>
        </div>

        <div className="about-section">
          <p className="about-section-title">梨花祭について</p>
          <p className="about-section-body">
            梨花祭は千葉英和高等学校が毎年開催する文化祭です。生徒一人ひとりが企画・準備・運営に携わり、クラスや部活動の個性を活かした多彩な出し物をお届けします。2026年のテーマは「Fantasy &amp; Fairy Tale」。まるでおとぎ話の世界に迷い込んだような、非日常の体験をご提供します。
          </p>
        </div>

        <div className="about-section">
          <p className="about-section-title">開催情報</p>
          <div className="info-grid">
            <div className="info-card">
              <p className="info-card-label">日程</p>
              <p className="info-card-value">2026年7月17日（金）<br />2026年7月18日（土）</p>
            </div>
            <div className="info-card">
              <p className="info-card-label">時間</p>
              <p className="info-card-value">受付 9:30〜 / 公開終了 14:00<br />（入場締切 13:30）</p>
            </div>
            <div className="info-card">
              <p className="info-card-label">場所</p>
              <p className="info-card-value">千葉英和高等学校<br />〒276-0028 千葉県八千代市村上709-1</p>
            </div>
            <div className="info-card">
              <p className="info-card-label">入場</p>
              <p className="info-card-value">7/17（金）関係者公開<br />7/18（土）一般公開<br />入場無料</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <p className="about-section-title">来場にあたって</p>
          <p className="about-section-body">
            一般来場の方は事前の招待リンクが必要です。QRコードを印刷またはスマートフォンに表示してお越しください。会場内での写真・動画撮影は出演者のプライバシーに配慮の上マナーを守ってお楽しみください。構内は全面禁煙です。
          </p>
        </div>
      </div>
    </>
  );
}
