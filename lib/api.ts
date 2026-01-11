export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || "";

export type InitializeResponse =
  | { ok: true; authorization_url: string; access_code: string; reference: string }
  | { ok: false; error: string };

export async function initializePaystack(params: {
  wa_phone: string;
  plan: "monthly" | "quarterly" | "yearly";
  email: string;
}): Promise<InitializeResponse> {
  if (!API_BASE) return { ok: false, error: "API base URL not set" };

  const res = await fetch(`${API_BASE}/paystack/initialize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  const data = (await res.json()) as InitializeResponse;
  return data;
}

export function normalizePhone(input: string) {
  return input.replace(/\+/g, "").replace(/\s+/g, "").trim();
}
