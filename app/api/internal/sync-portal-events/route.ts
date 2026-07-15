import { createHash, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { syncPortalEvents } from "@/lib/portal-events";

const TOKEN_HASH = "a7ea42a4dd190b0c59dd65a61d40941f6808e0c475bc7e713b465865711acd43";

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
    console.error("[sync-portal-events]", error);
    return NextResponse.json(
      { error: "Sync failed", detail: String(error) },
      { status: 500 }
    );
  }
}
