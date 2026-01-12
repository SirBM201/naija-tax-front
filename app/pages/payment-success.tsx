"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function PaymentSuccessInner() {
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

    async function run() {
      if (!reference) {
        if (!cancelled) {
          setStatus("failed");
          setMessage("Missing payment reference.");
        }
        return;
      }

      try {
        const backend = (process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "").replace(/\/$/, "");
        if (!backend) throw new Error("NEXT_PUBLIC_BACKEND_BASE_URL not set");

        const r = await fetch(`${backend}/paystack/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference }),
          cache: "no-store",
        });

        const data = await r.json().catch(() => ({}));

        if (!cancelled) {
          if (r.ok && data?.ok) {
            setStatus("ok");
            setMessage("Payment verified. Subscription activated.");
          } else {
            setStatus("failed");
            setMessage(data?.error || "Verification failed. If you paid, please contact support.");
          }
        }
      } catch (e: any) {
        if (!cancelled) {
          setStatus("failed");
          setMessage(e?.message || "Error verifying payment.");
        }
      }
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

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div style={{ maxWidth: 720, margin: "40px auto", padding: 20 }}>Loading...</div>}>
      <PaymentSuccessInner />
    </Suspense>
  );
}
