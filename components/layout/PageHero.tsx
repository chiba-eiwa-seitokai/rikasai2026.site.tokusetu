const DECOR_L = "/design/4b9c0746-18bc-49cb-b2db-03ce5b4b79f6.png";
const DECOR_R = "/design/5624955d-3c78-47be-b9cd-cd6064d8762c.png";

export default function PageHero({
  eyebrow,
  title,
  sub,
  accent = "var(--f-pink)",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <section className="fhero">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={DECOR_L} alt="" className="fhero-decor" style={{ left: -24, width: 110 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={DECOR_R} alt="" className="fhero-decor" style={{ right: -24, width: 120 }} />
      <div className="fhero-inner">
        <p className="fhero-eyebrow" style={{ color: accent }}>{eyebrow}</p>
        <h1 className="fhero-title">{title}</h1>
        {sub && <p className="fhero-sub">{sub}</p>}
      </div>
    </section>
  );
}
