import React, { useState } from "react";

const Enquiry = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    setError("");
    try {
      // Replace this with your API call or email service
      // For demo, just wait a moment
      await new Promise((res) => setTimeout(res, 1200));
      setSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      setError("Failed to send enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2 text-center text-red-700">Enquiry Form</h1>
      <p className="mb-6 text-center text-gray-600">
        Please fill out the form below and our team will get back to you soon.
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 space-y-4"
        autoComplete="off"
      >
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            required
            name="name"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            required
            name="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Phone
          </label>
          <input
            name="phone"
            type="tel"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Phone Number (optional)"
            value={form.phone}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            name="message"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400 min-h-[100px] resize-vertical"
            placeholder="Type your message here"
            value={form.message}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && (
          <div className="text-green-600 text-sm font-semibold">
            Thank you! Your enquiry has been sent.
          </div>
        )}
        <button
          type="submit"
          className={`w-full bg-gradient-to-r from-red-700 to-red-500 text-white py-2 rounded font-semibold transition-shadow duration-150 shadow-md hover:shadow-lg disabled:opacity-60`}
          disabled={submitting}
        >
          {submitting ? "Sending..." : "Send Enquiry"}
        </button>
      </form>
    </div>
  );
};

export default Enquiry;