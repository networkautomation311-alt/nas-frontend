import React, { useState } from "react";

export default function Support() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the form data to your backend or support system
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl rounded-lg p-6 ml-0">
      <h1 className="text-2xl font-bold mb-4">Support</h1>
      <p className="mb-6 text-gray-600">
        Need help? Fill out the form below and our support team will get back to you as soon as possible.
      </p>
      {submitted ? (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded mb-4">
          Thank you for contacting support! We have received your message.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="message">
              Message
            </label>
            <textarea
              className="w-full border rounded px-3 py-2"
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      )}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Other ways to get help</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>
            Visit our <a href="/faq" className="text-blue-600 hover:underline">FAQ</a> page
          </li>
          <li>
            Email us directly at{" "}
            <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
              support@example.com
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
