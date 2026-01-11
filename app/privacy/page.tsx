export default function PrivacyPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Privacy Policy</h1>
      <p className="text-gray-700">
        We collect minimal information required to provide the service, including your WhatsApp number,
        subscription status, and messages sent to the assistant. We use this to deliver responses, manage
        subscriptions, improve quality, and prevent abuse.
      </p>
      <ul className="list-disc pl-5 text-gray-700 space-y-1">
        <li>We do not sell personal information.</li>
        <li>Payments are processed securely via Paystack.</li>
        <li>You may contact us to request deletion of your data where applicable.</li>
      </ul>
    </div>
  );
}
