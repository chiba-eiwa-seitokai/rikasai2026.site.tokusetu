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

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({ where: { id: params.id } });
    if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(parseEvent(event));
  } catch (err) {
    console.error("[API /events/:id GET]", err);
    return NextResponse.json({ error: "Database error", detail: String(err) }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const event = await prisma.event.update({
      where: { id: params.id },
      data: {
        ...(body.num !== undefined ? { num: body.num } : {}),
        ...(body.grade !== undefined ? { grade: body.grade } : {}),
        ...(body.title !== undefined ? { title: body.title } : {}),
        ...(body.type !== undefined ? { type: body.type } : {}),
        ...(body.emoji !== undefined ? { emoji: body.emoji } : {}),
        ...(body.desc !== undefined ? { desc: body.desc } : {}),
        ...(body.tags !== undefined ? { tags: JSON.stringify(body.tags) } : {}),
        ...(body.info !== undefined ? { infoJson: JSON.stringify(body.info) } : {}),
        ...(body.gallery !== undefined ? { galleryJson: JSON.stringify(body.gallery) } : {}),
        ...(body.thumbUrl !== undefined ? { thumbUrl: body.thumbUrl } : {}),
        ...(body.heroImgUrl !== undefined ? { heroImgUrl: body.heroImgUrl } : {}),
        ...(body.day1 !== undefined ? { day1: body.day1 } : {}),
        ...(body.day2 !== undefined ? { day2: body.day2 } : {}),
        ...(body.published !== undefined ? { published: body.published } : {}),
        ...(body.sortOrder !== undefined ? { sortOrder: body.sortOrder } : {}),
      },
    });

    return NextResponse.json(parseEvent(event));
  } catch (err) {
    console.error("[API /events/:id PUT]", err);
    return NextResponse.json({ error: "Database error", detail: String(err) }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.event.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[API /events/:id DELETE]", err);
    return NextResponse.json({ error: "Database error", detail: String(err) }, { status: 500 });
  }
}
