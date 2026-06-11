import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const TYPE_COLOR: Record<string, string> = {
  飲食: "#f08898",
  体験: "#48b0b8",
  展示: "#d4a843",
  物販: "#7ab870",
  ステージ: "#c9546a",
};

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

  const color = TYPE_COLOR[e.type] ?? "#d4a843";

  return (
    <>
      <style>{`
        .detail-hero-img{width:100%;max-height:480px;object-fit:cover;display:block;}
        .detail-hero{background:var(--ink);padding:80px 24px 60px;text-align:center;position:relative;overflow:hidden;border-bottom:1px solid rgba(212,168,67,0.15);}
        .detail-hero::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(201,169,110,0.06) 0%,transparent 70%);}
        .detail-hero-emoji{font-size:72px;margin-bottom:24px;position:relative;}
        .detail-hero-grade{font-family:"Cinzel",serif;font-size:10px;letter-spacing:0.3em;color:var(--gold);text-transform:uppercase;margin-bottom:12px;position:relative;opacity:0.8;}
        .detail-hero-title{font-family:"Noto Serif JP",serif;font-size:clamp(24px,5vw,42px);font-weight:400;color:var(--gold-light);position:relative;margin-bottom:12px;}
        .detail-hero-type{display:inline-block;font-family:"Cinzel",serif;font-size:9px;letter-spacing:0.2em;padding:4px 14px;border:1px solid;position:relative;}
        .detail-body{max-width:720px;margin:0 auto;padding:60px 24px 80px;}
        .detail-desc{font-size:15px;color:var(--ink-soft);line-height:2;margin-bottom:40px;}
        .detail-info-table{width:100%;margin-bottom:40px;}
        .detail-info-row{display:flex;gap:16px;border-bottom:1px solid rgba(201,169,110,0.1);padding:12px 0;}
        .detail-info-key{font-family:"Cinzel",serif;font-size:9px;letter-spacing:0.2em;color:var(--gold);text-transform:uppercase;min-width:80px;padding-top:2px;}
        .detail-info-val{font-size:13px;color:var(--ink-soft);line-height:1.6;}
        .detail-tags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:40px;}
        .detail-tag{font-family:"Cinzel",serif;font-size:9px;letter-spacing:0.15em;border:1px solid rgba(201,169,110,0.3);color:rgba(58,40,24,0.6);padding:4px 12px;text-transform:uppercase;}
        .detail-gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-bottom:40px;}
        .detail-gallery img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;}
        .detail-back{display:inline-block;font-family:"Cinzel",serif;font-size:9px;letter-spacing:0.25em;color:var(--gold);text-decoration:none;border:1px solid rgba(212,168,67,0.4);padding:10px 24px;text-transform:uppercase;transition:background 0.2s,color 0.2s;}
        .detail-back:hover{background:var(--gold);color:var(--ink);}
      `}</style>

      {e.heroImgUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={e.heroImgUrl} alt={e.title} className="detail-hero-img" />
      )}

      <section className="detail-hero">
        <p className="detail-hero-emoji">{e.emoji}</p>
        <p className="detail-hero-grade">{e.grade}</p>
        <h1 className="detail-hero-title">{e.title}</h1>
        <span className="detail-hero-type" style={{ color, borderColor: `${color}60` }}>{e.type}</span>
      </section>

      <div className="detail-body">
        <p className="detail-desc">{e.desc}</p>

        <div className="detail-info-table">
          {e.info.map((item, i) => (
            <div key={i} className="detail-info-row">
              <span className="detail-info-key">{item.k}</span>
              <span className="detail-info-val">{item.v}</span>
            </div>
          ))}
        </div>

        {e.tags.length > 0 && (
          <div className="detail-tags">
            {e.tags.map((tag) => (
              <span key={tag} className="detail-tag">{tag}</span>
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
    </>
  );
}
