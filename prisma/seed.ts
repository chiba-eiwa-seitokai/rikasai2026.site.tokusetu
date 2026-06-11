import { PrismaClient } from "@prisma/client";
import { SEED_EVENTS, SEED_NOTICES } from "../lib/seed-data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.event.deleteMany();
  await prisma.notice.deleteMany();

  let ei = 0;
  for (const e of SEED_EVENTS) {
    await prisma.event.create({
      data: {
        num: e.num,
        grade: e.grade,
        title: e.title,
        type: e.type,
        emoji: e.emoji,
        desc: e.desc,
        tags: JSON.stringify(e.tags),
        infoJson: JSON.stringify(e.info),
        galleryJson: "[]",
        day1: e.day1,
        day2: e.day2,
        published: true,
        sortOrder: ei++,
      },
    });
  }

  let ni = 0;
  for (const n of SEED_NOTICES) {
    await prisma.notice.create({
      data: {
        badge: n.badge,
        text: n.text,
        linkUrl: n.linkUrl ?? null,
        linkLabel: n.linkLabel ?? null,
        published: true,
        sortOrder: ni++,
      },
    });
  }

  const eventCount = await prisma.event.count();
  const noticeCount = await prisma.notice.count();
  console.log(`Seeded ${eventCount} events and ${noticeCount} notices.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
