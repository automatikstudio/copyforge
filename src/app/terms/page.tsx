export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-heading font-bold text-4xl text-brand-text mb-8">
        Terms of Service
      </h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
        <p className="text-sm text-gray-400">Last updated: February 2026</p>

        <section>
          <h2 className="font-heading font-bold text-xl text-brand-text mt-8 mb-3">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using CopyForge (&quot;the Service&quot;), you agree to be
            bound by these Terms of Service. If you do not agree to these terms,
            please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-brand-text mt-8 mb-3">
            2. Service Description
          </h2>
          <p>
            CopyForge is an AI-powered tool that generates product descriptions,
            bullet points, and SEO meta content for e-commerce platforms. The
            Service uses artificial intelligence and the output may require human
            review and editing.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-brand-text mt-8 mb-3">
            3. Usage Limits
          </h2>
          <p>
            Free users are limited to 10 product descriptions per month. Usage
            exceeding your plan&apos;s limits may result in temporary service
            restrictions. We reserve the right to modify usage limits with
            reasonable notice.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-brand-text mt-8 mb-3">
            4. Generated Content
          </h2>
          <p>
            You retain full ownership of the product descriptions generated using
            our Service. We do not claim any intellectual property rights over the
            generated content. However, we do not guarantee that generated content
            is unique or free from similarity to other existing content.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-brand-text mt-8 mb-3">
            5. Acceptable Use
          </h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use the Service for illegal or unauthorized purposes</li>
            <li>Generate misleading or fraudulent product descriptions</li>
            <li>Attempt to bypass usage limits or rate limiting</li>
            <li>Reverse engineer or attempt to extract our AI models</li>
            <li>Resell generated content as an automated service</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-brand-text mt-8 mb-3">
            6. Disclaimer
          </h2>
          <p>
            The Service is provided &quot;as is&quot; without warranties of any kind.
            AI-generated content should be reviewed before publishing. We are not
            responsible for any inaccuracies, errors, or consequences resulting
            from the use of generated descriptions.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-brand-text mt-8 mb-3">
            7. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use
            of the Service after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-brand-text mt-8 mb-3">
            8. Contact
          </h2>
          <p>
            For questions about these terms, contact us at{" "}
            <a
              href="mailto:legal@automatik.studio"
              className="text-brand-blue hover:underline"
            >
              legal@automatik.studio
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
