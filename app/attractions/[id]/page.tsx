import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { TYPE_COLOR } from "@/lib/festival";

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const raw = await prisma.event.findUnique({ where: { id: params.id, published: true } });
  if (!raw) notFound();

  const e = {
    ...raw,
    tags: JSON.parse(raw.tags) as string[],
    info: JSON.parse(raw.infoJson) as { k: string; v: string }[],
    gallery: JSON.parse(raw.galleryJson) as string[],
  };

  const color = TYPE_COLOR[e.type] ?? "var(--f-pink)";

  return (
    <div className="fpage">
      <style>{`
        .detail-hero-img{ width:100%; max-height:420px; object-fit:cover; display:block; }
        .detail-hero{ position:relative; text-align:center; padding:48px 24px 40px; background:linear-gradient(180deg,#fbf1dd,var(--f-card-alt)); border-bottom:1px solid var(--f-border); }
        .detail-emoji{ font-size:60px; margin-bottom:16px; }
        .detail-grade{ font-size:12px; font-weight:700; color:var(--f-muted); letter-spacing:.08em; margin-bottom:10px; }
        .detail-title{ font-size:clamp(24px,5vw,40px); font-weight:900; color:var(--f-ink-deep); margin-bottom:14px; line-height:1.25; }
        .detail-desc{ font-size:15px; font-weight:500; color:var(--f-ink-soft); line-height:2; margin-bottom:32px; }
        .detail-info{ background:var(--f-card); border:1px solid var(--f-border); border-radius:16px; overflow:hidden; margin-bottom:28px; box-shadow:0 6px 18px var(--f-shadow); }
        .detail-info-row{ display:flex; gap:16px; padding:13px 20px; border-top:1px solid var(--f-border); }
        .detail-info-row:first-child{ border-top:none; }
        .detail-info-key{ font-size:12px; font-weight:700; color:var(--f-pink); min-width:84px; padding-top:1px; }
        .detail-info-val{ font-size:13.5px; font-weight:500; color:var(--f-ink-soft); line-height:1.6; }
        .detail-tags{ display:flex; flex-wrap:wrap; gap:8px; margin-bottom:32px; }
        .detail-gallery{ display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:12px; margin-bottom:36px; }
        .detail-gallery img{ width:100%; aspect-ratio:4/3; object-fit:cover; display:block; border-radius:14px; }
        .detail-back{ display:inline-flex; align-items:center; gap:8px; background:var(--f-card); border:2px solid var(--f-border-warm); border-radius:999px; padding:12px 26px; font-size:14px; font-weight:700; color:var(--f-ink); text-decoration:none; box-shadow:0 4px 12px var(--f-shadow); }
      `}</style>

      {e.heroImgUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={e.heroImgUrl} alt={e.title} className="detail-hero-img" />
      )}

      <section className="detail-hero">
        <p className="detail-emoji">{e.emoji}</p>
        <p className="detail-grade">{e.grade}</p>
        <h1 className="detail-title">{e.title}</h1>
        <span className="ftag" style={{ background: color, color: "#fff", fontSize: 13, padding: "5px 16px" }}>{e.type}</span>
      </section>

      <div className="fbody">
        <p className="detail-desc">{e.desc}</p>

        {e.info.length > 0 && (
          <div className="detail-info">
            {e.info.map((item, i) => (
              <div key={i} className="detail-info-row">
                <span className="detail-info-key">{item.k}</span>
                <span className="detail-info-val">{item.v}</span>
              </div>
            ))}
          </div>
        )}

        {e.tags.length > 0 && (
          <div className="detail-tags">
            {e.tags.map((tag) => (
              <span key={tag} className="ftag" style={{ background: "#f6ecd6", color: "var(--f-ink-soft)" }}>#{tag}</span>
            ))}
          </div>
        )}

        {e.gallery.length > 0 && (
          <div className="detail-gallery">
            {e.gallery.map((url, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={url} alt={`${e.title} ${i + 1}`} />
            ))}
          </div>
        )}

        <Link href="/attractions" className="detail-back">← 企画一覧に戻る</Link>
      </div>
    </div>
  );
}
