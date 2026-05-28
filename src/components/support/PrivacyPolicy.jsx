import React from "react";

const PrivacyPolicy = () => (
  <div className="min-h-screen flex flex-col">
    <div className="flex-grow">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold mb-6 text-red-700">Privacy Policy</h1>
        <p className="mb-4 text-gray-700">
          NAS (“we”, “us”, or “our”) is committed to safeguarding your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our website and services.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-2 text-gray-800">1. Information We Collect</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700 space-y-1">
          <li>
            <span className="font-semibold">Personal Info:</span> Name, email address, phone number, and other info you voluntarily provide through forms or contact points.
          </li>
          <li>
            <span className="font-semibold">Usage Data:</span> Pages viewed, time spent on pages, browser info, IP address, device type, and cookies.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-2 text-gray-800">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700 space-y-1">
          <li>To respond to your inquiries or requests.</li>
          <li>To improve our website and services.</li>
          <li>To send you updates about services or promotions (if opted in).</li>
          <li>To ensure security and prevent fraud.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-2 text-gray-800">3. Data Sharing</h2>
        <p className="mb-4 text-gray-700">
          We do not sell or rent your personal information. We may share it with trusted partners/service providers as required to deliver our services or comply with law.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-2 text-gray-800">4. Cookies & Tracking</h2>
        <p className="mb-4 text-gray-700">
          Our website may use cookies for essential functionality, analytics, and performance. You can set your browser to refuse cookies, but some site features may not work properly.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-2 text-gray-800">5. Your Rights</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700 space-y-1">
          <li>Request access, correction, or deletion of your data.</li>
          <li>Opt out of marketing communications at any time by contacting us.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-2 text-gray-800">6. Third-Party Links</h2>
        <p className="mb-4 text-gray-700">
          Our site may contain links to external websites. We are not responsible for the privacy practices of those sites.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-2 text-gray-800">7. Changes to Policy</h2>
        <p className="mb-4 text-gray-700">
          We may occasionally update this Privacy Policy. Changes will be posted on this page with a revised effective date.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-2 text-gray-800">8. Contact Us</h2>
        <p className="mb-8 text-gray-700">
          If you have questions or would like to exercise your rights regarding your personal information, please contact us at <a href="mailto:info@nas.com" className="text-red-600 hover:underline">info@nas.com</a>.
        </p>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;