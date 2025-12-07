export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Terms &amp; Conditions</h1>
        <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">1. Introduction</h2>
          <p className="text-gray-600 leading-relaxed">
            These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of the platform
            (the &quot;Service&quot;). By accessing or using the Service you agree to be bound by these Terms.
            If you do not agree, please do not use the Service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">2. Eligibility</h2>
          <p className="text-gray-600 leading-relaxed">
            You must be at least 18 years old (or the age of majority in your jurisdiction)
            to create an account and use the Service. By using the Service you represent
            and warrant that you meet the eligibility requirements.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">3. Accounts</h2>
          <p className="text-gray-600 leading-relaxed mb-2">
            When you create an account you are responsible for maintaining the security
            of your account credentials and for any activity performed using your account.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We may suspend or terminate accounts that violate these Terms or for suspected fraud.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">4. User Content &amp; Uploads</h2>
          <p className="text-gray-600 leading-relaxed">
            You retain ownership of content you upload, but you grant the Service a
            worldwide, royalty-free license to use, store, process and display that content
            to provide the Service. Do not upload content that infringes others&apos; rights
            or violates applicable laws.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">5. Payments &amp; Rewards</h2>
          <p className="text-gray-600 leading-relaxed">
            Reward amounts, payout schedules, and eligibility rules are described in the
            platform documentation or task details. We reserve the right to withhold
            payments for fraud, poor quality, or policy violations.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">6. Prohibited Conduct</h2>
          <p className="text-gray-600 leading-relaxed">You must not (a) attempt to cheat, defraud or manipulate the Service; (b) interfere with other users&apos; experience; (c) upload malicious content; or (d) use the Service for illegal activities. Violations may result in account suspension. </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">7. Termination</h2>
          <p className="text-gray-600 leading-relaxed">
            We may suspend or terminate your access at any time for violations of these Terms
            or for security reasons. You may also close your account by following the account
            deletion flow in settings.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">8. Disclaimers &amp; Liability</h2>
          <p className="text-gray-600 leading-relaxed mb-2">
            The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind.
            To the maximum extent permitted by law, we disclaim all warranties and limit liability
            for damages arising from use of the Service.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Some jurisdictions do not allow certain liability limitations, so some of the above
            limitations may not apply to you.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">9. Changes to Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update these Terms from time to time. If material changes are made we will
            notify you through the Service or by email. Continued use after changes constitutes acceptance.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">10. Contact</h2>
          <p className="text-gray-600 leading-relaxed">
            For questions about these Terms, contact us at:
            <br />
            <strong>Email:</strong> support@yourproject.com
          </p>
        </section>

        <p className="text-gray-500 text-sm text-center">
          © {new Date().getFullYear()} YourProject. All rights reserved.
        </p>
      </div>
    </main>
  );
}
