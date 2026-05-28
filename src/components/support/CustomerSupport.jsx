import React from "react";

const CustomerSupport = () => (
  <div className="flex flex-col min-h-screen bg-neutral-50">
    <div className="flex-grow max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Customer Support
      </h1>
      <p className="mb-6 text-lg text-gray-700 text-center">
        We're here to help! Find answers, get support, and reach out to us for any service or product assistance.
      </p>
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3 text-gray-800">How Can We Help?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            <span className="font-semibold">Product Issues:</span> Trouble with your device or system? Let us diagnose and resolve it.
          </li>
          <li>
            <span className="font-semibold">Service Requests:</span> Need maintenance, upgrades, or AMC support? We're just a call away.
          </li>
          <li>
            <span className="font-semibold">Installation Help:</span> Assistance for installation, setup, or migration.
          </li>
          <li>
            <span className="font-semibold">Account & Billing:</span> Questions about your account, invoices, or payments.
          </li>
          <li>
            <span className="font-semibold">Other Queries:</span> Any other concerns? We're always ready to assist you.
          </li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3 text-gray-800">Contact Methods</h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div className="rounded-lg border border-gray-200 p-6 bg-white">
            <h3 className="font-semibold text-lg mb-2">Phone Support</h3>
            <p>
              <span className="font-medium">Call:</span>{" "}
              <a href="tel:+911234567890" className="text-red-600 hover:underline">
                +91 12345 67890
              </a>
              <br />
              <span className="text-xs text-gray-500">(Mon-Sat, 10am-7pm)</span>
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-6 bg-white">
            <h3 className="font-semibold text-lg mb-2">Email Support</h3>
            <p>
              <span className="font-medium">Write to:</span>{" "}
              <a href="mailto:support@nas.com" className="text-red-600 hover:underline">
                support@nas.com
              </a>
              <br />
              <span className="text-xs text-gray-500">We reply within 1 business day</span>
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-6 bg-white md:col-span-2">
            <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
            <p>
              NAS, Your Address Here,<br />
              City, State, PINCODE, Country
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Office visits by appointment only.
            </p>
          </div>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3 text-gray-800">Frequently Asked Questions (FAQs)</h2>
        <div className="space-y-5">
          <details className="bg-white border rounded-lg p-4 group" open>
            <summary className="font-medium cursor-pointer outline-none">
              How do I raise a service request?
            </summary>
            <div className="mt-2 text-gray-700">
              Call us or email <a href="mailto:support@nas.com" className="text-red-600 hover:underline">support@nas.com</a> with your details. You’ll get a docket number and expected resolution timeline.
            </div>
          </details>
          <details className="bg-white border rounded-lg p-4 group">
            <summary className="font-medium cursor-pointer outline-none">
              What is your response time for support?
            </summary>
            <div className="mt-2 text-gray-700">
              We acknowledge email queries within 1 business day. Phone support is available Mon-Sat, 10am-7pm. Onsite interventions are scheduled as per urgency and coverage.
            </div>
          </details>
          <details className="bg-white border rounded-lg p-4 group">
            <summary className="font-medium cursor-pointer outline-none">
              Do you offer remote/online troubleshooting?
            </summary>
            <div className="mt-2 text-gray-700">
              Yes, our engineers can troubleshoot or resolve many issues remotely. Describe your problem by email/phone, and we’ll guide you.
            </div>
          </details>
          <details className="bg-white border rounded-lg p-4 group">
            <summary className="font-medium cursor-pointer outline-none">
              Can I get priority support?
            </summary>
            <div className="mt-2 text-gray-700">
              Priority (SLA-based) and 24/7 support are available for eligible AMC/service contract holders. Contact us to know more or upgrade your plan.
            </div>
          </details>
        </div>
      </section>
      <div className="text-center text-gray-600 text-sm">
        Need further assistance?<br/>
        <a href="mailto:support@nas.com" className="text-red-600 font-medium hover:underline">Contact our support team</a>
      </div>
    </div>
  </div>
);

export default CustomerSupport;