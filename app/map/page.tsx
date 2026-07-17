import PageHero from "@/components/layout/PageHero";

export const metadata = { title: "マップ — 梨花祭2026" };

export default function MapPage() {
  const floorMaps = [
    { floor: "1F", src: "/maps/floor-1f.webp", alt: "梨花祭2026 1階フロアマップ" },
    { floor: "2F", src: "/maps/floor-2f.webp", alt: "梨花祭2026 2階フロアマップ" },
    { floor: "3F", src: "/maps/floor-3f.webp", alt: "梨花祭2026 3階フロアマップ" },
  ];

  return (
    <div className="fpage">
      <style>{`
        .map-section + .map-section{ margin-top:36px; }
        .map-section-heading{ margin-bottom:14px; }
        .map-section-title{ font-size:20px; font-weight:900; color:var(--f-ink-deep); letter-spacing:.04em; }
        .map-section-note{ margin-top:5px; font-size:12px; color:var(--f-muted); }
        .floor-map-list{ display:flex; flex-direction:column; gap:24px; }
        .map-img-wrap{ border:1px solid var(--f-border); border-radius:20px; overflow:hidden; box-shadow:0 8px 22px var(--f-shadow); background:var(--f-card); }
        .map-img-link{ display:block; }
        .map-img-wrap img{ width:100%; height:auto; display:block; }
        .floor-map-caption{ padding:12px 18px; font-size:15px; font-weight:900; color:var(--f-ink-deep); background:var(--f-card); border-top:1px solid var(--f-border); }
        @media (max-width:600px){
          .map-section + .map-section{ margin-top:28px; }
          .floor-map-list{ gap:18px; }
          .map-img-wrap{ border-radius:14px; }
          .floor-map-caption{ padding:10px 14px; font-size:14px; }
        }
      `}</style>

      <PageHero eyebrow="Map" title="マップ" sub="Venue Map" accent="var(--f-green)" />

      <div className="fbody">
        <section className="map-section" aria-labelledby="venue-map-title">
          <div className="map-section-heading">
            <h2 id="venue-map-title" className="map-section-title">校内全体図</h2>
          </div>
          <div className="map-img-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/map.webp" alt="梨花祭2026 会場マップ" />
          </div>
        </section>

        <section className="map-section" aria-labelledby="floor-map-title">
          <div className="map-section-heading">
            <h2 id="floor-map-title" className="map-section-title">フロアマップ</h2>
            <p className="map-section-note">画像をタップすると拡大して確認できます。</p>
          </div>
          <div className="floor-map-list">
            {floorMaps.map((map) => (
              <figure key={map.floor} className="map-img-wrap">
                <a className="map-img-link" href={map.src} target="_blank" rel="noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={map.src} alt={map.alt} loading="lazy" />
                </a>
                <figcaption className="floor-map-caption">{map.floor} フロアマップ</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
