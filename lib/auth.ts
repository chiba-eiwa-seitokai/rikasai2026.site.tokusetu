import { createHash } from "crypto";

function computeToken(secret: string): string {
  return createHash("sha256").update(secret).digest("hex");
}

export function checkAdminAuth(request: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;

  const auth = request.headers.get("Authorization");
  if (auth?.startsWith("Bearer ")) {
    const token = auth.slice(7);
    return timingSafeEqual(token, computeToken(secret));
  }

  const cookie = request.headers.get("Cookie") ?? "";
  const match = cookie.match(/admin_token=([^;]+)/);
  if (match) {
    return timingSafeEqual(match[1], computeToken(secret));
  }

  return false;
}

export function getAdminToken(): string {
  const secret = process.env.ADMIN_SECRET ?? "";
  return computeToken(secret);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
