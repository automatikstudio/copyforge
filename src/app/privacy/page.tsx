export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-heading font-bold text-4xl text-brand-text mb-8">
        Privacy Policy
      </h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
        <p className="text-sm text-gray-400">Last updated: February 2026</p>

        <section>
          <h2 className="font-heading font-bold text-xl text-brand-text mt-8 mb-3">
            1. Information We Collect
          </h2>
          <p>
            CopyForge collects minimal information necessary to provide our service.
            When you use our product description generator, we process the product
            information you provide (product names, features, categories) to generate
            descriptions. We do not store generated content beyond the session.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-brand-text mt-8 mb-3">
            2. How We Use Information
          </h2>
          <p>We use the information to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Generate product descriptions as requested</li>
            <li>Improve our AI models and service quality</li>
            <li>Monitor usage to enforce fair use limits</li>
            <li>Communicate important service updates</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-brand-text mt-8 mb-3">
            3. Data Sharing
          </h2>
          <p>
            We do not sell your data. Product information you submit is sent to our
            AI provider (Anthropic) for processing. We do not share your data with
            third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-brand-text mt-8 mb-3">
            4. Cookies & Analytics
          </h2>
          <p>
            We use minimal analytics to understand how our service is used. We may
            use cookies for essential functionality. No third-party advertising
            cookies are used.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-brand-text mt-8 mb-3">
            5. Data Retention
          </h2>
          <p>
            Generated descriptions are not stored on our servers after delivery.
            Usage logs are retained for up to 90 days for service improvement and
            abuse prevention.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-brand-text mt-8 mb-3">
            6. Your Rights
          </h2>
          <p>
            You have the right to access, correct, or delete any personal data we
            hold. Contact us at privacy@automatik.studio for any data-related
            requests.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-brand-text mt-8 mb-3">
            7. Contact
          </h2>
          <p>
            For questions about this privacy policy, please contact us at{" "}
            <a
              href="mailto:privacy@automatik.studio"
              className="text-brand-blue hover:underline"
            >
              privacy@automatik.studio
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
