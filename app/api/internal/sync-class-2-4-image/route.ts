import { createHash, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { syncPortalEvents } from "@/lib/portal-events";

const TOKEN_HASH = "186ecce4c61aa1d2fba1ac5df4fa526f72f9ab10f00bb402c24067b0c1c62639";

function isAuthorized(request: NextRequest): boolean {
  const token = request.headers.get("x-sync-token") ?? "";
  const actual = Buffer.from(createHash("sha256").update(token).digest("hex"));
  const expected = Buffer.from(TOKEN_HASH);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await syncPortalEvents(prisma);
    return NextResponse.json({
      updatedCount: result.updated.length,
      createdCount: result.created.length,
      ...result,
    });
  } catch (error) {
    console.error("[sync-class-2-4-image]", error);
    return NextResponse.json(
      { error: "Sync failed", detail: String(error) },
      { status: 500 }
    );
  }
}
