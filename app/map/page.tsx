import PageHero from "@/components/layout/PageHero";

export const metadata = { title: "マップ — 梨花祭2026" };

export default function MapPage() {
  return (
    <div className="fpage">
      <style>{`
        .map-img-wrap{ border:1px solid var(--f-border); border-radius:20px; overflow:hidden; box-shadow:0 8px 22px var(--f-shadow); background:var(--f-card); }
        .map-img-wrap img{ width:100%; height:auto; display:block; }
      `}</style>

      <PageHero eyebrow="Map" title="マップ" sub="Venue Map" accent="var(--f-green)" />

      <div className="fbody">
        <div className="map-img-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/map.webp" alt="梨花祭2026 会場マップ" />
        </div>
      </div>
    </div>
  );
}
