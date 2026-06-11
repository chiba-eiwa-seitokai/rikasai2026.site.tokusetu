import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const notice = await prisma.notice.findUnique({ where: { id: params.id } });
  if (!notice) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(notice);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const notice = await prisma.notice.update({
    where: { id: params.id },
    data: {
      ...(body.badge !== undefined ? { badge: body.badge } : {}),
      ...(body.text !== undefined ? { text: body.text } : {}),
      ...(body.linkUrl !== undefined ? { linkUrl: body.linkUrl } : {}),
      ...(body.linkLabel !== undefined ? { linkLabel: body.linkLabel } : {}),
      ...(body.published !== undefined ? { published: body.published } : {}),
      ...(body.sortOrder !== undefined ? { sortOrder: body.sortOrder } : {}),
    },
  });

  return NextResponse.json(notice);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.notice.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
