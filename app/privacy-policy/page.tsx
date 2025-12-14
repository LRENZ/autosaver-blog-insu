export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p>
              When you use AutoSaver to compare car insurance quotes, we may collect certain information
              including but not limited to: your name, contact information, vehicle details, driving history,
              and insurance preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information you provide to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Connect you with insurance providers and generate quotes</li>
              <li>Improve our services and user experience</li>
              <li>Send you relevant information about insurance options</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
            <p>
              We share your information with insurance providers and partners to generate quotes.
              We do not sell your personal information to third parties for their marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from
              unauthorized access, alteration, or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information.
              Contact us if you wish to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us through our website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
