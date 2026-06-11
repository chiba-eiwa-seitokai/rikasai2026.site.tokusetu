import { prisma } from "@/lib/prisma";
import AttractionsClient from "@/components/attractions/AttractionsClient";

export const dynamic = "force-dynamic";

export default async function AttractionsPage() {
  const raw = await (async () => {
    try {
      return await prisma.event.findMany({
        where: { published: true },
        orderBy: { sortOrder: "asc" },
      });
    } catch {
      return [];
    }
  })();
  const events = raw.map((e) => ({
    id: e.id,
    num: e.num,
    grade: e.grade,
    title: e.title,
    type: e.type,
    emoji: e.emoji,
    desc: e.desc,
    tags: JSON.parse(e.tags) as string[],
    info: JSON.parse(e.infoJson) as { k: string; v: string }[],
    day1: e.day1,
    day2: e.day2,
    thumbUrl: e.thumbUrl ?? null,
  }));

  return (
    <>
      <style>{`
        .attr-hero{background:var(--ink);padding:80px 24px 60px;text-align:center;position:relative;overflow:hidden;}
        .attr-hero::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(201,169,110,0.08) 0%,transparent 70%);}
        .attr-hero-title{font-family:"Cormorant Garamond",serif;font-size:clamp(36px,8vw,72px);font-weight:300;font-style:italic;color:var(--gold-light);position:relative;}
        .attr-hero-sub{font-family:"Noto Serif JP",serif;font-size:13px;color:rgba(232,212,168,0.5);margin-top:8px;position:relative;}
      `}</style>
      <section className="attr-hero">
        <p className="section-label" style={{ color: "rgba(212,168,67,0.6)" }}>Attractions</p>
        <h1 className="attr-hero-title">出し物一覧</h1>
        <p className="attr-hero-sub">Class &amp; Club Exhibition</p>
      </section>
      <AttractionsClient events={events} />
    </>
  );
}
