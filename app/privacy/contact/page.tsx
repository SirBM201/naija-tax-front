const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "info@thecre8hub.com";
const SUPPORT_PHONE = process.env.NEXT_PUBLIC_SUPPORT_PHONE || "+2347034941158";

export default function ContactPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Contact & Support</h1>
      <p className="text-gray-700">
        For support, billing, subscription issues, or refund requests:
      </p>
      <ul className="text-gray-800 space-y-1">
        <li>Email: {SUPPORT_EMAIL}</li>
        <li>Phone: {SUPPORT_PHONE}</li>
      </ul>
      <p className="text-gray-700">
        Include your WhatsApp number and (if applicable) your Paystack reference.
      </p>
    </div>
  );
}
