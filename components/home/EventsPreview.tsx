import Link from "next/link";

type Event = {
  id: string;
  num: string;
  grade: string;
  title: string;
  type: string;
  emoji: string;
  desc: string;
  tags: string[];
};

const TYPE_COLOR: Record<string, string> = {
  飲食: "#f08898",
  体験: "#48b0b8",
  展示: "#d4a843",
  物販: "#7ab870",
  ステージ: "#c9546a",
};

export default function EventsPreview({ events }: { events: Event[] }) {
  return (
    <>
      <style>{`
        .events-preview-section{background:var(--parchment);padding:80px 0;}
        .events-preview-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px;max-width:960px;margin:0 auto;padding:0 24px;}
        .class-card{border:1px solid rgba(201,169,110,0.25);background:var(--cream);position:relative;overflow:hidden;display:flex;flex-direction:column;}
        .class-card::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--gold),var(--rose));z-index:1;}
        .class-card-thumb{width:100%;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;font-size:48px;background:linear-gradient(135deg,rgba(42,122,128,0.1),rgba(212,168,67,0.08));}
        .class-card-body{padding:20px;}
        .class-card-grade{font-family:"Cinzel",serif;font-size:9px;letter-spacing:0.25em;color:var(--gold);text-transform:uppercase;margin-bottom:6px;}
        .class-card-name{font-size:15px;font-weight:500;color:var(--ink);margin-bottom:6px;}
        .class-card-type{display:inline-block;font-size:10px;padding:2px 8px;margin-bottom:8px;border:1px solid;}
        .class-card-desc{font-size:12px;color:var(--ink-soft);line-height:1.7;opacity:0.75;}
        .events-preview-more{text-align:center;margin-top:40px;}
        .events-preview-more a{font-family:"Cinzel",serif;font-size:10px;letter-spacing:0.3em;color:var(--gold);text-decoration:none;border:1px solid rgba(212,168,67,0.4);padding:10px 28px;text-transform:uppercase;transition:background 0.2s,color 0.2s;display:inline-block;}
        .events-preview-more a:hover{background:var(--gold);color:var(--ink);}
      `}</style>
      <section className="events-preview-section" id="classes">
        <div className="section-header" style={{ padding: "0 24px 0" }}>
          <p className="section-label">Attractions</p>
          <h2 className="section-title">出し物・クラス紹介</h2>
          <p className="section-title-jp">Class &amp; Club Exhibition</p>
        </div>
        <div className="events-preview-grid">
          {events.map((e) => {
            const color = TYPE_COLOR[e.type] ?? "#d4a843";
            return (
              <Link key={e.id} href={`/attractions/${e.id}`} style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column" }}>
                <div className="class-card">
                  <div className="class-card-thumb">{e.emoji}</div>
                  <div className="class-card-body">
                    <p className="class-card-grade">{e.grade}</p>
                    <p className="class-card-name">{e.title}</p>
                    <span className="class-card-type" style={{ color, borderColor: `${color}60` }}>{e.type}</span>
                    <p className="class-card-desc">{e.desc.slice(0, 80)}…</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="events-preview-more">
          <Link href="/attractions">全企画を見る — View All</Link>
        </div>
      </section>
    </>
  );
}
