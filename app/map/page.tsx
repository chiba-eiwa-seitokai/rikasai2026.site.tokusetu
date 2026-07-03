import PageHero from "@/components/layout/PageHero";
import { TYPE_COLOR } from "@/lib/festival";

export const metadata = { title: "マップ — 梨花祭2026" };

export default function MapPage() {
  return (
    <div className="fpage">
      <style>{`
        .map-img-wrap{ border:1px solid var(--f-border); border-radius:20px; overflow:hidden; margin-bottom:32px; box-shadow:0 8px 22px var(--f-shadow); background:var(--f-card); }
        .map-img-wrap img{ width:100%; height:auto; display:block; }
        .map-legend-grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:12px; }
        .map-legend-item{ display:flex; align-items:center; gap:10px; background:var(--f-card); border:1px solid var(--f-border); border-radius:999px; padding:9px 16px; font-size:13px; font-weight:700; color:var(--f-ink); }
        .map-legend-dot{ width:14px; height:14px; border-radius:50%; flex:none; }
      `}</style>

      <PageHero eyebrow="Map" title="マップ" sub="Venue Map" accent="var(--f-green)" />

      <div className="fbody">
        <div className="map-img-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/map.png" alt="梨花祭2026 会場マップ" />
        </div>
        <div className="fsect">
          <p className="fsect-title">凡例 <span className="en">LEGEND</span></p>
          <div className="map-legend-grid">
            {Object.entries(TYPE_COLOR).map(([label, color]) => (
              <div key={label} className="map-legend-item">
                <span className="map-legend-dot" style={{ background: color }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
