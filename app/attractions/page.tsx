import { prisma } from "@/lib/prisma";
import AttractionsClient from "@/components/attractions/AttractionsClient";
import PageHero from "@/components/layout/PageHero";

export const dynamic = "force-dynamic";

export default async function AttractionsPage({
  searchParams,
}: {
  searchParams: { cat?: string };
}) {
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
    <div className="fpage">
      <PageHero eyebrow="Attractions" title="企画一覧" sub="Class & Club Exhibition" accent="var(--f-orange)" />
      <AttractionsClient events={events} initialCat={searchParams.cat ?? "ALL"} />
    </div>
  );
}
