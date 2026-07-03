import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getNotices() {
  try {
    return await prisma.notice.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    return [];
  }
}

const IMG = {
  heroBg: "/design/c5942e45-191a-4f63-9303-7f9593059c54.png",
  decorFloat: "/design/d21ecd20-de13-46c9-a5d0-47fbfe415847.png",
  decorL: "/design/4b9c0746-18bc-49cb-b2db-03ce5b4b79f6.png",
  decorR: "/design/5624955d-3c78-47be-b9cd-cd6064d8762c.png",
  decorSmall: "/design/ef381786-2715-41ff-bf54-97e2f1748547.png",
  ribbon: "/design/41b1d35d-0ed5-48ea-ba0d-fe5ca97bab3f.png",
  ribbon2: "/design/260eb0ca-d2ac-4e71-b6c7-a712c9a559f2.png",
  decorEvent: "/design/b2fcd9a5-d6b7-4155-a560-a6c276b4e3be.png",
  evStage: "/design/7e9cd9c9-5b96-4b30-b90c-be3823d2f620.png",
  evGallery: "/design/fe0d4f4c-0f6d-412b-a31a-c3bfdcb10f8d.png",
  evNight: "/design/ce72f683-c94b-41e4-a7f6-3a4a6132a7ed.png",
  foodTitle: "/design/c8103a63-3990-4b7d-b8ab-4c5a13ce457f.png",
  foodImg: "/design/7893d22e-7554-4d94-aa9f-df769abe58e7.png",
  schedBanner: "/design/ddd2eb51-6748-4707-8ffa-d3c21124ba2b.png",
  accessBanner: "/design/7425c193-9057-4ae3-b927-2ed06ab6eb6d.png",
  iconGuardian: "/design/9c4b0170-f0ef-4a19-be3b-40d6b31acd61.png",
  iconStudent: "/design/b43793d4-968b-475a-81c4-ae026c5542c9.png",
  iconOB: "/design/6adec448-77b4-4f71-86bd-85d6fd7c7999.png",
  iconOther: "/design/fe300989-500e-4e0e-83e8-0eba69020735.png",
  btnInsta: "/design/c1245892-8168-4bbb-b078-ece1ac745a69.png",
  btnSite: "/design/a78644f8-33b0-4ba5-a54b-0fc3ca48b6ca.png",
  decorLinks: "/design/45ae0e9a-d765-4c6d-a621-a2189cc88444.png",
  map: "/design/baecde2a-45c0-4626-a8d2-98eaa76bd916.png",
  decorMap: "/design/aed61715-06e8-4294-b97e-2f3425691c4f.png",
};

export default async function Home() {
  const notices = await getNotices();

  return (
    <>
      <style>{`
        .lp {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          color: var(--f-ink);
          background: var(--f-surface);
          overflow: hidden;
        }
        .lp img { max-width: 100%; }
        .lp-section { position: relative; padding: 40px 56px; }

        /* HERO */
        .hero {
          position: relative;
          min-height: 560px;
          background-image: url("${IMG.heroBg}");
          background-size: cover;
          background-position: 62% 30%;
          display: flex;
          align-items: center;
        }
        .hero-scrim {
          position: absolute; inset: 0;
          background: linear-gradient(105deg, rgba(255,249,235,.72) 0%, rgba(255,249,235,.28) 46%, rgba(255,249,235,0) 66%);
        }
        .hero-copy { position: relative; padding: 0 0 0 56px; max-width: 540px; }
        .hero-title {
          font-family: "DM Serif Display", serif;
          font-size: clamp(52px, 11vw, 78px);
          line-height: .95; margin: 0; color: var(--f-ink-deep);
          letter-spacing: .01em; text-shadow: 0 2px 10px rgba(255,250,235,.6);
        }
        .hero-lead {
          font-size: clamp(20px, 5vw, 27px); font-weight: 900; margin: 16px 0 0;
          color: var(--f-blue-deep); text-shadow: 0 1px 6px rgba(255,250,235,.7);
        }
        .hero-desc {
          font-size: 15.5px; font-weight: 500; line-height: 2; margin: 20px 0 0;
          color: var(--f-brown); text-shadow: 0 1px 5px rgba(255,250,235,.8);
        }
        .date-card {
          display: inline-flex; align-items: stretch; background: var(--f-card);
          border-radius: 18px; padding: 18px 26px; margin-top: 28px;
          box-shadow: 0 10px 26px var(--f-shadow-strong);
        }
        .date-year {
          display: flex; align-items: center; padding-right: 16px;
          writing-mode: vertical-rl; font-family: "DM Serif Display", serif;
          font-size: 22px; color: #e05a54; letter-spacing: .12em;
        }
        .date-day { text-align: center; padding: 0 22px; }
        .date-num { font-size: 40px; font-weight: 900; line-height: 1; color: var(--f-ink-deep); }
        .date-num span { font-weight: 700; margin: 0 2px; }
        .date-dow { font-size: 15px; font-weight: 700; color: var(--f-ink); margin-top: 6px; }
        .date-bar { width: 50px; height: 6px; border-radius: 999px; margin: 10px auto 0; }
        .date-sep { width: 0; border-left: 2px dotted #d8c9ab; margin: 4px 0; }

        .decor { position: absolute; opacity: 1; pointer-events: none; }
        .decor-float { animation: floaty 6s ease-in-out infinite; }

        /* section heading ribbon */
        .ribbon-wrap { position: relative; text-align: center; margin: 0 auto; }
        .ribbon-wrap span {
          position: absolute; inset: 0; display: flex; align-items: center;
          justify-content: center; color: #fff; font-weight: 700; padding-bottom: 3px;
        }

        /* ABOUT */
        .about-card {
          position: relative; display: flex; background: var(--f-card-alt);
          border: 1px solid var(--f-border); border-radius: 22px; padding: 40px 30px;
          box-shadow: 0 6px 20px rgba(120,90,30,.06); overflow: hidden;
        }
        .about-col { flex: 1; text-align: center; padding: 0 24px; position: relative; z-index: 1; }
        .about-col p { font-size: 15.5px; font-weight: 500; line-height: 1.9; margin: 0; color: var(--f-ink-soft); }
        .about-sep { width: 0; border-left: 2px dotted #ddcaa8; margin: 8px 0; }

        /* generic cards */
        .cards-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .card {
          background: var(--f-card); border-radius: 20px; padding: 16px 16px 24px;
          box-shadow: 0 8px 22px var(--f-shadow); text-align: center;
        }
        .card img.thumb { width: 100%; border-radius: 12px; display: block; }
        .card h3 { font-size: 21px; font-weight: 900; margin: 18px 0 10px; }
        .card p { font-size: 14px; font-weight: 500; line-height: 1.75; color: var(--f-ink-soft); margin: 0 0 18px; }
        .card-btn {
          display: inline-block; font-size: 14px; font-weight: 700; border-radius: 999px;
          padding: 9px 30px; text-decoration: none; border: 2px solid;
        }

        .pill-btn {
          display: inline-flex; align-items: center; gap: 12px; background: var(--f-card);
          border: 2px solid #e6d7ba; border-radius: 999px; padding: 15px 34px;
          font-size: 16px; font-weight: 700; color: var(--f-ink); text-decoration: none;
          box-shadow: 0 6px 16px rgba(120,90,30,.08); transition: transform .15s;
        }
        .pill-btn:hover { transform: translateY(-1px); }

        .solid-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          color: #fff; font-size: 15px; font-weight: 700; padding: 13px;
          border-radius: 999px; text-decoration: none;
        }

        /* NOTICE */
        .notice-list { display: flex; flex-direction: column; gap: 12px; }
        .notice-row {
          display: flex; gap: 14px; align-items: flex-start; background: var(--f-card);
          border: 1px solid var(--f-border); border-left: 4px solid var(--f-pink);
          border-radius: 14px; padding: 16px 20px; box-shadow: 0 6px 16px rgba(120,90,30,.06);
        }
        .notice-badge {
          flex: none; font-size: 11px; font-weight: 700; color: #fff; background: var(--f-pink);
          border-radius: 999px; padding: 4px 12px; margin-top: 2px; letter-spacing: .05em;
        }
        .notice-badge.note { background: var(--f-orange); }
        .notice-row p { font-size: 14px; font-weight: 500; line-height: 1.8; color: var(--f-ink-soft); margin: 0; }

        .sect-head { text-align: center; margin-bottom: 20px; }
        .sect-head h2 { font-size: 26px; font-weight: 900; color: var(--f-ink-deep); letter-spacing: .04em; }
        .sect-head p { font-size: 13px; font-weight: 700; color: var(--f-muted); letter-spacing: .18em; margin-top: 4px; }

        /* INFO row */
        .info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; align-items: start; }
        .info-card { background: var(--f-card); border-radius: 20px; padding: 22px 20px 24px; box-shadow: 0 8px 22px var(--f-shadow); }
        .access-row { display: flex; align-items: center; gap: 10px; }
        .access-row img { width: 34px; flex: none; }
        .access-row .lbl { font-size: 14px; font-weight: 700; color: var(--f-ink); flex: 1; }
        .access-tag {
          font-size: 12px; font-weight: 700; color: var(--f-orange);
          border: 1.5px solid var(--f-orange-soft); border-radius: 999px;
          padding: 6px 12px; text-decoration: none; white-space: nowrap;
        }

        /* LINKS + MAP */
        .links-grid { display: grid; grid-template-columns: 300px 1fr; gap: 22px; align-items: stretch; }
        .links-card {
          position: relative; background: var(--f-card); border-radius: 20px; padding: 34px 30px;
          box-shadow: 0 8px 22px var(--f-shadow); display: flex; flex-direction: column;
          justify-content: center; gap: 24px; overflow: hidden;
        }
        .map-card { position: relative; border-radius: 20px; overflow: hidden; box-shadow: 0 8px 22px var(--f-shadow); min-height: 240px; }
        .map-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .map-tag {
          position: absolute; top: 14px; right: 16px; background: rgba(255,253,247,.92);
          border-radius: 10px; padding: 8px 14px; font-size: 13px; font-weight: 700;
          color: var(--f-ink); line-height: 1.4; box-shadow: 0 3px 8px rgba(0,0,0,.12);
        }

        @media (max-width: 720px) {
          .lp-section { padding: 30px 20px; }
          .hero-copy { padding: 0 20px; }
          .about-card { flex-direction: column; gap: 28px; padding: 32px 22px; }
          .about-sep { display: none; }
          .cards-3, .info-grid { grid-template-columns: 1fr; }
          .links-grid { grid-template-columns: 1fr; }
          .date-day { padding: 0 16px; }
        }
      `}</style>

      <div className="lp">
        {/* ============ HERO ============ */}
        <section className="hero" data-screen-label="Hero">
          <div className="hero-scrim" />
          <div className="hero-copy">
            <h1 className="hero-title">CHALLENGE!</h1>
            <p className="hero-lead">みんなでやろうよ、梨花祭！</p>
            <p className="hero-desc">
              青春のすべてが、ここにある。<br />
              みんなで創る、最高の２日間！<br />
              この瞬間を、思いきり楽しもう！
            </p>
            <div className="date-card">
              <div className="date-year">2026</div>
              <div className="date-day">
                <div className="date-num">7<span>/</span>17</div>
                <div className="date-dow">（金）</div>
                <div className="date-bar" style={{ background: "var(--f-blue)" }} />
              </div>
              <div className="date-sep" />
              <div className="date-day">
                <div className="date-num">7<span>/</span>18</div>
                <div className="date-dow">（土）</div>
                <div className="date-bar" style={{ background: "var(--f-pink)" }} />
              </div>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.decorFloat} alt="" className="decor decor-float" style={{ top: 90, left: -20, width: 84 }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.decorL} alt="" className="decor" style={{ bottom: -6, left: -8, width: 180 }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.decorR} alt="" className="decor" style={{ bottom: -6, right: -6, width: 190 }} />
        </section>

        {/* ============ NOTICE ============ */}
        {notices.length > 0 && (
          <section className="lp-section" id="notice" style={{ paddingTop: 44 }}>
            <div className="sect-head">
              <h2>お知らせ</h2>
              <p>NOTICE</p>
            </div>
            <div className="notice-list">
              {notices.map((n) => (
                <div key={n.id} className="notice-row">
                  <span className={`notice-badge${n.badge === "NOTE" ? " note" : ""}`}>{n.badge}</span>
                  <p>{n.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ============ 見どころ / 楽しみ方 ============ */}
        <section className="lp-section" data-screen-label="About">
          <div className="about-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.decorL} alt="" className="decor" style={{ bottom: -10, left: -14, width: 140 }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.decorR} alt="" className="decor" style={{ bottom: -10, right: -14, width: 150 }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.decorSmall} alt="" className="decor decor-float" style={{ top: 16, right: 24, width: 46 }} />
            <div className="about-col">
              <div className="ribbon-wrap" style={{ width: 150, marginBottom: 20 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.ribbon} alt="" style={{ width: 150, display: "block" }} />
                <span style={{ fontSize: 16 }}>見どころ</span>
              </div>
              <p>ステージ・展示・企画が盛りだくさん！<br />最高の思い出をつくろう！</p>
            </div>
            <div className="about-sep" />
            <div className="about-col">
              <div className="ribbon-wrap" style={{ width: 150, marginBottom: 20 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.ribbon2} alt="" style={{ width: 150, display: "block" }} />
                <span style={{ fontSize: 16 }}>楽しみ方</span>
              </div>
              <p>グルメやグッズも充実！<br />友達や家族と一緒に楽しもう！</p>
            </div>
          </div>
        </section>

        {/* ============ EVENT ============ */}
        <section className="lp-section" data-screen-label="Event" style={{ paddingTop: 10 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.decorEvent} alt="" className="decor" style={{ top: 40, left: -30, width: 120, transform: "scaleX(-1)" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.decorEvent} alt="" className="decor" style={{ top: 40, right: -30, width: 120 }} />
          <div className="ribbon-wrap" style={{ width: 320, maxWidth: "80%", margin: "0 auto 32px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.ribbon} alt="" style={{ width: "100%", display: "block" }} />
            <span style={{ fontSize: 20, letterSpacing: ".14em", paddingBottom: 4 }}>イベント・企画</span>
          </div>
          <div className="cards-3">
            <div className="card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.evStage} alt="ステージ発表" className="thumb" />
              <h3 style={{ color: "var(--f-purple)" }}>ステージ発表</h3>
              <p>部活動や有志団体による<br />熱いパフォーマンス！</p>
              <Link href={`/attractions?cat=${encodeURIComponent("ステージ")}`} className="card-btn" style={{ color: "var(--f-purple)", borderColor: "var(--f-purple-soft)" }}>詳細はこちら</Link>
            </div>
            <div className="card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.evGallery} alt="クラス・部活企画" className="thumb" />
              <h3 style={{ color: "var(--f-orange)" }}>クラス・部活企画</h3>
              <p>個性あふれる展示・体験・物販が<br />盛りだくさん！</p>
              <Link href={`/attractions?cat=${encodeURIComponent("クラス・部活企画")}`} className="card-btn" style={{ color: "var(--f-orange)", borderColor: "var(--f-orange-soft)" }}>詳細はこちら</Link>
            </div>
            <div className="card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.evNight} alt="飲食・キッチンカー" className="thumb" />
              <h3 style={{ color: "var(--f-pink)" }}>飲食・キッチンカー</h3>
              <p>おいしいグルメが勢ぞろい！<br />キッチンカーもやってくる！</p>
              <Link href={`/attractions?cat=${encodeURIComponent("飲食")}`} className="card-btn" style={{ color: "var(--f-pink)", borderColor: "var(--f-pink-light)" }}>詳細はこちら</Link>
            </div>
          </div>
          <div style={{ textAlign: "center", margin: "34px 0 6px" }}>
            <Link href="/attractions" className="pill-btn">すべてのイベントを見る <span style={{ color: "#c9a15a" }}>›</span></Link>
          </div>
        </section>

        {/* ============ FOOD / SCHEDULE / ACCESS ============ */}
        <section className="lp-section" data-screen-label="Info" style={{ paddingTop: 18 }}>
          <div className="info-grid">
            {/* food */}
            <div className="info-card" style={{ textAlign: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.foodTitle} alt="飲食団体とキッチンカー" style={{ width: 180, display: "block", margin: "0 auto 10px" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.foodImg} alt="" style={{ width: "100%", display: "block", margin: "6px 0 14px" }} />
              <p style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.8, color: "var(--f-ink-soft)", margin: "0 0 18px" }}>
                おいしいグルメが勢ぞろい！<br />キッチンカーもやってくる！
              </p>
              <Link href={`/attractions?cat=${encodeURIComponent("飲食")}`} className="solid-btn" style={{ background: "linear-gradient(var(--f-pink-light),var(--f-pink))", boxShadow: "0 5px 12px rgba(236,97,120,.35)" }}>
                詳細はこちら <span>›</span>
              </Link>
            </div>
            {/* schedule */}
            <div className="info-card">
              <div className="ribbon-wrap" style={{ width: 190, margin: "0 auto 22px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.schedBanner} alt="" style={{ width: "100%", display: "block" }} />
                <span style={{ fontSize: 15 }}>タイムスケジュール</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { c: "var(--f-green)", t: "ステージスケジュール" },
                  { c: "var(--f-pink)", t: "展示・企画スケジュール" },
                  { c: "var(--f-green)", t: "飲食スケジュール" },
                ].map((r) => (
                  <div key={r.t} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ width: 26, height: 26, borderRadius: 999, background: r.c, flex: "none" }} />
                    <span style={{ fontSize: 15, fontWeight: 700, color: "var(--f-ink)" }}>{r.t}</span>
                  </div>
                ))}
              </div>
              <p style={{ textAlign: "center", fontSize: 14, fontWeight: 700, color: "var(--f-ink-soft)", margin: "22px 0 16px" }}>タイムテーブルをチェック！</p>
              <Link href="/schedule" className="solid-btn" style={{ background: "linear-gradient(var(--f-green-soft),var(--f-green))", boxShadow: "0 5px 12px rgba(125,182,130,.4)" }}>
                詳細はこちら <span>›</span>
              </Link>
            </div>
            {/* access */}
            <div className="info-card">
              <div className="ribbon-wrap" style={{ width: 180, margin: "0 auto 22px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.accessBanner} alt="" style={{ width: "100%", display: "block" }} />
                <span style={{ fontSize: 15 }}>来校方法</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: IMG.iconGuardian, t: "保護者と招待者" },
                  { icon: IMG.iconStudent, t: "中学生" },
                  { icon: IMG.iconOB, t: "OB" },
                  { icon: IMG.iconOther, t: "その他の方" },
                ].map((r) => (
                  <div key={r.t} className="access-row">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.icon} alt="" />
                    <span className="lbl">{r.t}</span>
                    <Link href="/rules" className="access-tag">詳細はこちら ›</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ LINKS + MAP ============ */}
        <section className="lp-section" id="access" data-screen-label="Access" style={{ paddingBottom: 60 }}>
          <div className="links-grid">
            <div className="links-card">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.btnInsta} alt="公式Instagram" style={{ height: 34 }} />
              </a>
              <a href="https://www.chiba-eiwa.ed.jp/" target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.btnSite} alt="学校公式サイト" style={{ height: 34 }} />
              </a>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.decorLinks} alt="" className="decor" style={{ bottom: -12, right: -10, width: 100 }} />
            </div>
            <div className="map-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.map} alt="会場マップ" />
              <div className="map-tag">
                千葉英和高等学校<br />
                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--f-muted)" }}>（梨花祭 会場）</span>
              </div>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.decorMap} alt="" className="decor" style={{ bottom: -6, right: 8, width: 90 }} />
        </section>
      </div>
    </>
  );
}
