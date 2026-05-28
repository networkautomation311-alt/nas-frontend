import React from "react";

const TermsAndCondition = () => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <div className="flex-grow max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Terms &amp; Conditions</h1>

        <h2 className="text-2xl font-bold mb-2 mt-8 text-gray-800">1. Acceptance of Terms</h2>
        <p className="mb-4 text-gray-700">
          By accessing or using the NAS website, products, or services, you agree to comply with and be bound by these Terms &amp; Conditions. If you do not agree, please do not use our services.
        </p>

        <h2 className="text-2xl font-bold mb-2 mt-8 text-gray-800">2. Use of Services</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700 space-y-1">
          <li>Use our website and services lawfully and only for intended purposes.</li>
          <li>You must not misuse, disrupt, or attempt unauthorized access to any part of the website or services.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-2 mt-8 text-gray-800">3. Intellectual Property</h2>
        <p className="mb-4 text-gray-700">
          All content, trademarks, logos, images, and materials on this website are the property of NAS unless otherwise stated. Unauthorized use, copying, or distribution is prohibited.
        </p>

        <h2 className="text-2xl font-bold mb-2 mt-8 text-gray-800">4. Limitation of Liability</h2>
        <p className="mb-4 text-gray-700">
          NAS is not liable for any direct, indirect, incidental, consequential, or punitive damages resulting from your use of our website or services.
        </p>

        <h2 className="text-2xl font-bold mb-2 mt-8 text-gray-800">5. Third-Party Links</h2>
        <p className="mb-4 text-gray-700">
          Our website may contain links to third-party websites. NAS is not responsible for the content, privacy policies, or practices of any linked site.
        </p>

        <h2 className="text-2xl font-bold mb-2 mt-8 text-gray-800">6. Modifications</h2>
        <p className="mb-4 text-gray-700">
          We reserve the right to update or change these Terms &amp; Conditions at any time. Updates will be posted on this page with revised dates.
        </p>

        <h2 className="text-2xl font-bold mb-2 mt-8 text-gray-800">7. Governing Law</h2>
        <p className="mb-4 text-gray-700">
          These Terms &amp; Conditions are governed in accordance with the laws of the jurisdiction where NAS operates.
        </p>

        <h2 className="text-2xl font-bold mb-2 mt-8 text-gray-800">8. Contact Us</h2>
        <p className="mb-8 text-gray-700">
          If you have any questions about these Terms &amp; Conditions, feel free to reach out to us at <a href="mailto:info@nas.com" className="text-red-600 hover:underline">info@nas.com</a>.
        </p>
      </div>
    </div>
  );
};

export default TermsAndCondition;