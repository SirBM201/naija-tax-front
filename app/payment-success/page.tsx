// app/payment-success/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const sp = useSearchParams();
  const router = useRouter();

  const reference = useMemo(
    () => sp.get("reference") || sp.get("trxref") || "",
    [sp]
  );

  const [status, setStatus] = useState<"checking" | "ok" | "failed">("checking");
  const [message, setMessage] = useState<string>("Verifying payment...");

  useEffect(() => {
    let cancelled = false;

    async function verifyOnce(ref: string) {
      const backend = (process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "").replace(/\/$/, "");
      if (!backend) throw new Error("NEXT_PUBLIC_BACKEND_BASE_URL not set");

      const r = await fetch(`${backend}/paystack/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: ref }),
        cache: "no-store",
      });

      const data = await r.json().catch(() => ({}));
      return { ok: r.ok && data?.ok, data };
    }

    async function run() {
      if (!reference) {
        setStatus("failed");
        setMessage("Missing payment reference.");
        return;
      }

      setStatus("checking");
      setMessage("Verifying payment...");

      const MAX_TRIES = 10;
      const WAIT_MS = 2500;

      for (let i = 1; i <= MAX_TRIES; i++) {
        if (cancelled) return;

        try {
          const { ok, data } = await verifyOnce(reference);

          if (ok) {
            setStatus("ok");
            setMessage("Payment verified. Subscription activated.");
            return;
          }

          // Not ok yet — keep retrying
          setMessage(
            data?.error
              ? `Waiting for confirmation (${i}/${MAX_TRIES}): ${data.error}`
              : `Waiting for confirmation (${i}/${MAX_TRIES})...`
          );
        } catch (e: any) {
          setMessage(`Verification error (${i}/${MAX_TRIES}): ${e?.message || "error"}`);
        }

        // wait then try again
        await new Promise((res) => setTimeout(res, WAIT_MS));
      }

      setStatus("failed");
      setMessage("We could not confirm payment yet. If you paid, please contact support with your reference.");
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [reference]);

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: 20 }}>
      <h1>Payment Status</h1>
      <p><b>Reference:</b> {reference || "—"}</p>
      <p><b>Status:</b> {status}</p>
      <p>{message}</p>

      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <button onClick={() => router.push("/")}>Go Home</button>
        <button onClick={() => router.push("/pricing")}>Back to Pricing</button>
      </div>
    </div>
  );
}
