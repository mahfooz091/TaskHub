export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            1. Introduction
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We value your privacy and are committed to protecting your personal
            information. This Privacy Policy explains how we collect, use,
            store, and safeguard your data when you use our platform.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            2. Information We Collect
          </h2>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed">
            <li>Name, email address, and contact details</li>
            <li>Account login information</li>
            <li>Uploaded files and task submissions</li>
            <li>Technical information such as IP address, device type, etc.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            3. How We Use Your Information
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            We use your information to:
          </p>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed">
            <li>Provide and improve platform services</li>
            <li>Process your tasks and payouts</li>
            <li>Communicate updates, support, and notifications</li>
            <li>Maintain account security and prevent fraud</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            4. Sharing of Information
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We do not sell your data. Your information is shared only with:
          </p>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed mt-2">
            <li>Trusted third-party services necessary for operations</li>
            <li>Legal authorities when required by law</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            5. Data Security
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We use encryption, secure servers, and modern authentication
            mechanisms to protect your information from unauthorized access.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            6. Your Rights
          </h2>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed">
            <li>Access your personal data</li>
            <li>Request correction or deletion</li>
            <li>Withdraw consent anytime</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            7. Contact Us
          </h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about this Privacy Policy, contact us at:
            <br />
            <strong>Email:</strong> support@yourproject.com
          </p>
        </section>

        <p className="text-gray-500 text-sm mt-10 text-center">
          © {new Date().getFullYear()} TaskHub — All rights reserved.
        </p>
      </div>
    </main>
  );
}
