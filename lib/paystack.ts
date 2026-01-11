export type PaystackInitResponse =
  | { ok: true; authorization_url: string; access_code: string; reference: string }
  | { ok: false; error: string };

export async function initializePaystack(params: {
  wa_phone: string;
  email: string;
  plan: "monthly" | "quarterly" | "yearly";
}): Promise<PaystackInitResponse> {
  const r = await fetch("/api/paystack/initialize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  return (await r.json()) as PaystackInitResponse;
}
