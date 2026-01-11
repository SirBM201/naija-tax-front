import Link from "next/link";

const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "info@thecre8hub.com";
const SUPPORT_PHONE = process.env.NEXT_PUBLIC_SUPPORT_PHONE || "+2347034941158";
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2347034941158";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold">
          Naija Tax Guide — WhatsApp Tax Assistant (Subscription Service)
        </h1>
        <p className="text-gray-700 max-w-3xl">
          Naija Tax Guide is a subscription-based tax guidance service delivered primarily through WhatsApp.
          Users subscribe to a plan and can then ask tax-related questions and receive practical explanations,
          examples, and guidance tailored to individuals and small businesses in Nigeria.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            className="border px-4 py-2 rounded"
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi, I want to subscribe to Naija Tax Guide")}`}
            target="_blank"
            rel="noreferrer"
          >
            Start on WhatsApp
          </a>
          <Link className="border px-4 py-2 rounded" href="/pricing">
            View Pricing & Subscribe
          </Link>
          <Link className="border px-4 py-2 rounded" href="/how-it-works">
            How it Works
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Who it’s for",
            body: "Individuals, freelancers, SMEs, and anyone needing clear tax guidance and reminders.",
          },
          {
            title: "What you get",
            body: "Tax explanations, compliance guidance, examples, and practical next steps.",
          },
          {
            title: "How it’s delivered",
            body: "Via WhatsApp (primary), with optional web access as the platform expands.",
          },
        ].map((c) => (
          <div key={c.title} className="border rounded p-5">
            <div className="font-semibold">{c.title}</div>
            <div className="text-gray-700 mt-2">{c.body}</div>
          </div>
        ))}
      </section>

      <section className="border rounded p-6">
        <h2 className="text-xl font-semibold">Support & Contact</h2>
        <p className="text-gray-700 mt-2">For support, billing, or questions:</p>
        <ul className="mt-3 text-gray-800">
          <li>Email: {SUPPORT_EMAIL}</li>
          <li>Phone: {SUPPORT_PHONE}</li>
        </ul>
      </section>
    </div>
  );
}
