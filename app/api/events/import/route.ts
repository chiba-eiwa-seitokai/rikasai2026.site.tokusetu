import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/auth";

type ImportEvent = {
  num: string;
  grade: string;
  title: string;
  type: string;
  emoji: string;
  desc: string;
  tags: string[];
  location: string;
  hours: string;
  price: string;
  day1: boolean;
  day2: boolean;
  sortOrder: number;
};

export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!Array.isArray(body.events)) {
      return NextResponse.json(
        { error: "Invalid body: events must be an array" },
        { status: 400 }
      );
    }

    const events: ImportEvent[] = body.events;
    let created = 0;
    const errors: string[] = [];

    for (let i = 0; i < events.length; i++) {
      const e = events[i];
      try {
        const info: { k: string; v: string }[] = [
          ...(e.location ? [{ k: "場所", v: e.location }] : []),
          ...(e.hours ? [{ k: "営業時間", v: e.hours }] : []),
          ...(e.price ? [{ k: "料金", v: e.price }] : []),
        ];

        await prisma.event.create({
          data: {
            num: e.num ?? "",
            grade: e.grade,
            title: e.title,
            type: e.type,
            emoji: e.emoji || "🎉",
            desc: e.desc,
            tags: JSON.stringify(e.tags ?? []),
            infoJson: JSON.stringify(info),
            galleryJson: "[]",
            day1: e.day1 ?? true,
            day2: e.day2 ?? true,
            published: false,
            sortOrder: e.sortOrder ?? 0,
          },
        });
        created++;
      } catch (err) {
        errors.push(`行${i + 2}: ${e.title ?? "不明"} — ${String(err).slice(0, 80)}`);
      }
    }

    return NextResponse.json({ created, errors });
  } catch (err) {
    console.error("[API /events/import POST]", err);
    return NextResponse.json(
      { error: "Database error", detail: String(err) },
      { status: 500 }
    );
  }
}
