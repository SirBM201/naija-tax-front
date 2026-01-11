import Link from "next/link";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2347034941158";

export default function HowItWorksPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">How it Works</h1>

      <ol className="list-decimal pl-5 space-y-3 text-gray-800">
        <li>Choose a subscription plan (Monthly, Quarterly, or Yearly).</li>
        <li>Complete payment securely via Paystack.</li>
        <li>Your subscription activates automatically; then ask questions on WhatsApp.</li>
      </ol>

      <div className="border rounded p-5">
        <div className="font-semibold">Examples of questions you can ask</div>
        <ul className="list-disc pl-5 mt-2 text-gray-800 space-y-1">
          <li>How do I register for TIN and what documents do I need?</li>
          <li>What taxes apply to small businesses and freelancers?</li>
          <li>How do VAT and withholding tax work in simple terms?</li>
          <li>What is the penalty for late filing, and how do I correct mistakes?</li>
        </ul>
      </div>

      <div className="flex gap-3 flex-wrap">
        <a
          className="border px-4 py-2 rounded"
          href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi, I want to subscribe to Naija Tax Guide")}`}
          target="_blank"
          rel="noreferrer"
        >
          Start on WhatsApp
        </a>
        <Link className="border px-4 py-2 rounded" href="/pricing">
          Subscribe on Web
        </Link>
      </div>
    </div>
  );
}
