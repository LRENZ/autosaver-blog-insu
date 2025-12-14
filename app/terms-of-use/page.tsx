export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Use</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using AutoSaver, you accept and agree to be bound by these Terms of Use.
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
            <p>
              AutoSaver is a car insurance comparison platform that connects users with insurance
              providers. We provide information and facilitate quote comparisons but do not provide
              insurance directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
            <p>
              You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Keep your account information secure</li>
              <li>Use the service only for lawful purposes</li>
              <li>Not misuse or abuse the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Disclaimer</h2>
            <p>
              Insurance quotes and rates are estimates and may vary based on final underwriting.
              We do not guarantee specific rates or coverage. All insurance decisions are made by
              the insurance providers, not by AutoSaver.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
            <p>
              AutoSaver is not liable for any damages arising from your use of the service or
              from any insurance policy you obtain through our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the service
              after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Information</h2>
            <p>
              For questions about these Terms of Use, please contact us through our website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
