"use client";

import { useMemo, useState } from "react";
import { initializePaystack } from "@/lib/paystack";

type PlanKey = "monthly" | "quarterly" | "yearly";

const PLANS: Array<{
  key: PlanKey;
  title: string;
  priceNgn: number;
  duration: string;
  features: string[];
}> = [
  {
    key: "monthly",
    title: "Monthly",
    priceNgn: 3000,
    duration: "30 days access",
    features: [
      "Unlimited WhatsApp tax questions (fair-use policy)",
      "Instant answers + guidance",
      "Priority support via WhatsApp",
    ],
  },
  {
    key: "quarterly",
    title: "Quarterly",
    priceNgn: 8000,
    duration: "90 days access",
    features: [
      "Everything in Monthly",
      "Better value for frequent users",
      "Recommended for business owners",
    ],
  },
  {
    key: "yearly",
    title: "Yearly",
    priceNgn: 30000,
    duration: "365 days access",
    features: [
      "Everything in Quarterly",
      "Best value plan",
      "Ideal for professionals & SMEs",
    ],
  },
];

export default function PricingPage() {
  const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "info@thecre8hub.com";
  const SUPPORT_PHONE = process.env.NEXT_PUBLIC_SUPPORT_PHONE || "+2347034941158";
  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Naija Hustle Tax Guide";

  const [waPhone, setWaPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<PlanKey>("monthly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedPlan = useMemo(() => PLANS.find((p) => p.key === selected)!, [selected]);

  async function onPay() {
    setError("");

    const wa = waPhone.replace(/\s+/g, "").replace(/^\+/, "");
    if (!wa || wa.length < 8) {
      setError("Enter a valid WhatsApp number (e.g., 234xxxxxxxxxx).");
      return;
    }
    if (!email || !email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await initializePaystack({
        wa_phone: wa,
        email,
        plan: selected,
      });

      if (!res.ok) {
        setError(res.error || "Payment initialization failed.");
        return;
      }

      // Redirect to Paystack checkout
      window.location.href = res.authorization_url;
    } catch (e: any) {
      setError(e?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold">{APP_NAME} — Subscription Plans</h1>
        <p className="text-gray-600">
          Subscribe to access the WhatsApp assistant. After successful payment, your WhatsApp number is activated automatically.
        </p>
        <p className="text-gray-600">
          Support: <span className="font-medium">{SUPPORT_EMAIL}</span> | <span className="font-medium">{SUPPORT_PHONE}</span>
        </p>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {PLANS.map((p) => (
          <button
            key={p.key}
            onClick={() => setSelected(p.key)}
            className={[
              "rounded-2xl border p-5 text-left shadow-sm transition",
              selected === p.key ? "border-black" : "border-gray-200 hover:border-gray-400",
            ].join(" ")}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{p.title}</h2>
              {selected === p.key && <span className="text-sm font-medium">Selected</span>}
            </div>
            <div className="mt-3 text-3xl font-bold">₦{p.priceNgn.toLocaleString()}</div>
            <div className="mt-1 text-sm text-gray-600">{p.duration}</div>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              {p.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
          </button>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Checkout details</h3>
        <p className="mt-1 text-sm text-gray-600">
          Enter the WhatsApp number you want activated and your email. Then proceed to secure Paystack payment.
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium">WhatsApp Number</label>
            <input
              value={waPhone}
              onChange={(e) => setWaPhone(e.target.value)}
              placeholder="2348012345678"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-black"
            />
            <p className="text-xs text-gray-500">
              Use international format, no plus sign. Example: 234xxxxxxxxxx
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-black"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-gray-700">
            Selected plan: <span className="font-semibold">{selectedPlan.title}</span> —{" "}
            <span className="font-semibold">₦{selectedPlan.priceNgn.toLocaleString()}</span>
          </div>

          <button
            onClick={onPay}
            disabled={loading}
            className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Redirecting..." : "Proceed to Paystack"}
          </button>
        </div>

        {error ? <p className="mt-3 text-sm font-medium text-red-600">{error}</p> : null}

        <p className="mt-4 text-xs text-gray-500">
          By proceeding, you agree to our Terms and Privacy Policy. Refunds (if applicable) follow our Refund Policy page.
        </p>
      </section>
    </main>
  );
}
