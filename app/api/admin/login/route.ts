import { NextRequest, NextResponse } from "next/server";
import { getAdminToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const secret = process.env.ADMIN_SECRET;

  if (!secret || body.password !== secret) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = getAdminToken();
  const response = NextResponse.json({ token });
  response.cookies.set("admin_token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("admin_token");
  return response;
}
