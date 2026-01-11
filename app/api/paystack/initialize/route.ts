import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const wa_phone = String(body?.wa_phone || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const plan = String(body?.plan || "").trim().toLowerCase();

    if (!wa_phone || !email || !plan) {
      return NextResponse.json(
        { ok: false, error: "wa_phone, email, plan required" },
        { status: 400 }
      );
    }

    const backend = process.env.BACKEND_BASE_URL?.replace(/\/$/, "");
    if (!backend) {
      return NextResponse.json(
        { ok: false, error: "BACKEND_BASE_URL not set" },
        { status: 500 }
      );
    }

    const r = await fetch(`${backend}/paystack/initialize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wa_phone, email, plan }),
      cache: "no-store",
    });

    const raw = await r.json().catch(() => ({}));

    // Normalize backend response to what the UI should trust
    const authorization_url =
      raw?.authorization_url || raw?.data?.authorization_url || null;
    const reference = raw?.reference || raw?.data?.reference || null;

    // If backend returned auth url, treat as success even if it didn't send "ok"
    if (r.ok && authorization_url && reference) {
      return NextResponse.json(
        { ok: true, authorization_url, reference },
        { status: 200 }
      );
    }

    // Backend error or unexpected shape
    return NextResponse.json(
      {
        ok: false,
        error: raw?.error || raw?.message || "payment_initialize_failed",
        detail: raw,
      },
      { status: r.status || 502 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
