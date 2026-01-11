export default function TermsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Terms of Use</h1>
      <p className="text-gray-700">
        Naija Tax Guide provides general tax guidance and educational information. We do not replace
        professional legal or accounting services. Users are responsible for compliance decisions and
        for verifying actions taken based on guidance.
      </p>
      <ul className="list-disc pl-5 text-gray-700 space-y-1">
        <li>Subscriptions grant access for the paid period (monthly/quarterly/yearly).</li>
        <li>Abuse, spamming, or attempts to exploit the service may result in suspension.</li>
        <li>We may update the service and policies to improve quality and compliance.</li>
      </ul>
    </div>
  );
}
