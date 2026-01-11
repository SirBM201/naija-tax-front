export default function RefundPolicyPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Refund Policy</h1>
      <p className="text-gray-700">
        Naija Tax Guide is a subscription service delivered primarily via WhatsApp. If you were charged
        incorrectly or experienced a verifiable technical issue that prevented service access, you may
        request a review by contacting support within 7 days of payment.
      </p>
      <ul className="list-disc pl-5 text-gray-700 space-y-1">
        <li>Refunds (if approved) are processed back to the original payment method where possible.</li>
        <li>Subscriptions already used extensively may not qualify for a full refund.</li>
        <li>Fraudulent or abusive activity disqualifies refund eligibility.</li>
      </ul>
      <p className="text-gray-700">
        For refund requests, include your WhatsApp number and Paystack reference.
      </p>
    </div>
  );
}
