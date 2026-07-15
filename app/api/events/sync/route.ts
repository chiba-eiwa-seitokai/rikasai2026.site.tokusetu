import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/auth";

const VALID_TYPES = new Set(["飲食", "体験", "展示", "物販", "ステージ"]);

type SyncEvent = {
  id?: string;
  num: string;
  grade: string;
  title: string;
  type: string;
  emoji?: string;
  desc?: string;
  tags?: string[];
  info?: { k: string; v: string }[];
  thumbUrl?: string | null;
  heroImgUrl?: string | null;
  gallery?: string[];
  day1?: boolean;
  day2?: boolean;
  published?: boolean;
  sortOrder?: number | null;
};

function cleanText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!Array.isArray(body.events) || body.events.length === 0) {
      return NextResponse.json({ error: "events must be a non-empty array" }, { status: 400 });
    }

    const events = body.events as SyncEvent[];
    const errors: string[] = [];
    const ids = new Set<string>();

    events.forEach((event, index) => {
      const row = index + 2;
      if (!cleanText(event.grade)) errors.push(`行${row}: 団体・クラスが空欄です`);
      if (!cleanText(event.title)) errors.push(`行${row}: 企画名が空欄です`);
      if (!VALID_TYPES.has(cleanText(event.type))) errors.push(`行${row}: 種別が無効です`);
      if (event.id) {
        if (ids.has(event.id)) errors.push(`行${row}: IDが重複しています`);
        ids.add(event.id);
      }
    });

    const existing = await prisma.event.findMany({
      select: { id: true, sortOrder: true },
    });
    const existingIds = new Set(existing.map((event) => event.id));
    for (const id of ids) {
      if (!existingIds.has(id)) errors.push(`ID ${id} は現在の企画一覧にありません`);
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: "Validation failed", errors }, { status: 400 });
    }

    let nextSortOrder = Math.max(34, ...existing.map((event) => event.sortOrder)) + 1;
    let created = 0;
    let updated = 0;

    await prisma.$transaction(async (tx) => {
      for (const event of events) {
        const isExisting = Boolean(event.id);
        const data = {
          num: cleanText(event.num),
          grade: cleanText(event.grade),
          title: cleanText(event.title),
          type: cleanText(event.type),
          emoji: cleanText(event.emoji) || "🎉",
          desc: typeof event.desc === "string" ? event.desc.trim() : "",
          tags: JSON.stringify(Array.isArray(event.tags) ? event.tags.map(cleanText).filter(Boolean) : []),
          infoJson: JSON.stringify(
            (Array.isArray(event.info) ? event.info : [])
              .map((item, index) => ({
                k: cleanText(item.k) || (cleanText(item.v) && index === 0 ? "場所" : ""),
                v: cleanText(item.v),
              }))
              .filter((item) => item.k && item.v)
          ),
          thumbUrl: cleanText(event.thumbUrl) || null,
          heroImgUrl: cleanText(event.heroImgUrl) || null,
          galleryJson: JSON.stringify(Array.isArray(event.gallery) ? event.gallery.map(cleanText).filter(Boolean) : []),
          day1: event.day1 ?? true,
          day2: event.day2 ?? true,
          published: event.published ?? true,
          sortOrder: Number.isFinite(event.sortOrder) ? Number(event.sortOrder) : nextSortOrder++,
        };

        if (isExisting) {
          await tx.event.update({ where: { id: event.id }, data });
          updated++;
        } else {
          await tx.event.create({ data });
          created++;
        }
      }
    });

    return NextResponse.json({ created, updated, total: created + updated });
  } catch (err) {
    console.error("[API /events/sync POST]", err);
    return NextResponse.json({ error: "Database error", detail: String(err) }, { status: 500 });
  }
}
