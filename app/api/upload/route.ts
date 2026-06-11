import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/auth";
import { uploadToStorage } from "@/lib/supabase-storage";
import { randomUUID } from "crypto";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};
const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const ext = ALLOWED_TYPES[file.type];
    if (!ext) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: jpeg, png, webp, gif" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Max 5MB" },
        { status: 400 }
      );
    }

    const path = `events/misc/${randomUUID()}.${ext}`;
    const data = await file.arrayBuffer();
    const url = await uploadToStorage(path, data, file.type);

    return NextResponse.json({ url });
  } catch (err) {
    console.error("[API /upload POST]", err);
    return NextResponse.json(
      { error: "Upload failed", detail: String(err) },
      { status: 500 }
    );
  }
}
