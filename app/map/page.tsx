export const metadata = { title: "マップ — 梨花祭2026" };

export default function MapPage() {
  return (
    <>
      <style>{`
        .map-hero{background:var(--ink);padding:80px 24px 60px;text-align:center;position:relative;}
        .map-hero::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(201,169,110,0.06) 0%,transparent 70%);}
        .map-hero-title{font-family:"Cormorant Garamond",serif;font-size:clamp(36px,8vw,72px);font-weight:300;font-style:italic;color:var(--gold-light);position:relative;}
        .map-body{max-width:860px;margin:0 auto;padding:60px 24px 80px;}
        .map-img-wrap{border:1px solid rgba(201,169,110,0.2);overflow:hidden;margin-bottom:40px;}
        .map-img-wrap img{width:100%;height:auto;display:block;}
        .map-legend-title{font-family:"Cinzel",serif;font-size:10px;letter-spacing:0.3em;color:var(--gold);text-transform:uppercase;margin-bottom:16px;}
        .map-legend-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;}
        .map-legend-item{display:flex;align-items:center;gap:10px;font-size:12px;color:var(--ink-soft);}
        .map-legend-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}
      `}</style>

      <section className="map-hero">
        <p className="section-label" style={{ color: "rgba(212,168,67,0.6)" }}>Map</p>
        <h1 className="map-hero-title">マップ</h1>
        <p style={{ color: "rgba(232,212,168,0.5)", marginTop: 8, position: "relative", fontFamily: "'Noto Serif JP',serif", fontSize: 13 }}>Venue Map</p>
      </section>

      <div className="map-body">
        <div className="map-img-wrap">
          <img src="/map.png" alt="梨花祭2026 会場マップ" />
        </div>
        <p className="map-legend-title">凡例</p>
        <div className="map-legend-grid">
          {[
            { color: "#f08898", label: "飲食" },
            { color: "#48b0b8", label: "体験" },
            { color: "#d4a843", label: "展示" },
            { color: "#7ab870", label: "物販" },
            { color: "#c9546a", label: "ステージ" },
          ].map((l) => (
            <div key={l.label} className="map-legend-item">
              <span className="map-legend-dot" style={{ background: l.color }} />
              <span>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
