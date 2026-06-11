export async function uploadToStorage(
  path: string,
  data: ArrayBuffer,
  contentType: string
): Promise<string> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set");
  }

  const url = `${supabaseUrl}/storage/v1/object/event-images/${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": contentType,
    },
    body: data,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Storage upload failed: ${res.status} ${text}`);
  }

  return `${supabaseUrl}/storage/v1/object/public/event-images/${path}`;
}
