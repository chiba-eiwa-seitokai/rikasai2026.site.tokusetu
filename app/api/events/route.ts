import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/auth";

function parseEvent(e: {
  id: string;
  num: string;
  grade: string;
  title: string;
  type: string;
  emoji: string;
  desc: string;
  tags: string;
  infoJson: string;
  thumbUrl: string | null;
  heroImgUrl: string | null;
  galleryJson: string;
  day1: boolean;
  day2: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    ...e,
    tags: JSON.parse(e.tags) as string[],
    info: JSON.parse(e.infoJson) as { k: string; v: string }[],
    gallery: JSON.parse(e.galleryJson) as string[],
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type = searchParams.get("type");
  const q = searchParams.get("q")?.toLowerCase();
  const day = searchParams.get("day");
  const all = searchParams.get("all") === "true" && checkAdminAuth(request);

  try {
    const events = await prisma.event.findMany({
      where: {
        published: all ? undefined : true,
        ...(type ? { type } : {}),
        ...(day === "1" ? { day1: true } : {}),
        ...(day === "2" ? { day2: true } : {}),
      },
      orderBy: { sortOrder: "asc" },
    });

    let result = events.map(parseEvent);

    if (q) {
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.grade.toLowerCase().includes(q) ||
          e.desc.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("[API /events GET]", err);
    return NextResponse.json({ error: "Database error", detail: String(err) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const event = await prisma.event.create({
      data: {
        num: body.num,
        grade: body.grade,
        title: body.title,
        type: body.type,
        emoji: body.emoji ?? "🎉",
        desc: body.desc,
        tags: JSON.stringify(body.tags ?? []),
        infoJson: JSON.stringify(body.info ?? []),
        galleryJson: JSON.stringify(body.gallery ?? []),
        thumbUrl: body.thumbUrl ?? null,
        heroImgUrl: body.heroImgUrl ?? null,
        day1: body.day1 ?? true,
        day2: body.day2 ?? true,
        published: body.published ?? true,
        sortOrder: body.sortOrder ?? 0,
      },
    });

    return NextResponse.json(parseEvent(event), { status: 201 });
  } catch (err) {
    console.error("[API /events POST]", err);
    return NextResponse.json({ error: "Database error", detail: String(err) }, { status: 500 });
  }
}
