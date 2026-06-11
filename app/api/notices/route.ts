import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const all =
    request.nextUrl.searchParams.get("all") === "true" &&
    checkAdminAuth(request);

  try {
    const notices = await prisma.notice.findMany({
      where: { published: all ? undefined : true },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(notices);
  } catch (err) {
    console.error("[API /notices GET]", err);
    return NextResponse.json({ error: "Database error", detail: String(err) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const notice = await prisma.notice.create({
      data: {
        badge: body.badge ?? "INFO",
        text: body.text,
        linkUrl: body.linkUrl ?? null,
        linkLabel: body.linkLabel ?? null,
        published: body.published ?? true,
        sortOrder: body.sortOrder ?? 0,
      },
    });

    return NextResponse.json(notice, { status: 201 });
  } catch (err) {
    console.error("[API /notices POST]", err);
    return NextResponse.json({ error: "Database error", detail: String(err) }, { status: 500 });
  }
}
