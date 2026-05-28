import React, { useState } from "react";
import { FaInstagramSquare } from "react-icons/fa";

const socialLinks = [
  {
    href: "https://www.facebook.com/",
    title: "Facebook",
    svg: (
      <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
        <path d="M22.675 0h-21.35C.594 0 0 .593 0 1.326v21.348C0 23.406.594 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.675 0z" />
      </svg>
    ),
    className: "hover:bg-[#1877f2] text-[#1877f2] hover:text-white",
  },
  // Twitter icon removed
  {
    href: "https://www.linkedin.com/",
    title: "LinkedIn",
    svg: (
      <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
        <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.62c-1.13 0-2.05-.92-2.05-2.05s.92-2.05 2.05-2.05a2.05 2.05 0 1 1 0 4.1zm15.11 12.83h-3.56v-5.62c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.96v5.73H9.3V9h3.42v1.56h.05c.48-.91 1.66-1.87 3.41-1.87 3.65 0 4.32 2.4 4.32 5.51v6.25z" />
      </svg>
    ),
    className: "hover:bg-[#0077b5] text-[#0077b5] hover:text-white",
  },
  {
    href: "https://www.instagram.com/",
    title: "Instagram",
    svg: (
      <FaInstagramSquare size={24} />
    ),
    className:
      "hover:bg-gradient-to-br from-pink-500 to-yellow-400 text-pink-500 hover:text-white",
  },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    // Validate phone (basic, 10+ digits)
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }
    // Validate name (not just whitespace)
    if (form.name.trim() === "") {
      alert("Please enter your name.");
      return;
    }
    // Validate message (not just whitespace)
    if (form.message.trim() === "") {
      alert("Please enter your message.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* LEFT SIDE */}
        <div className="space-y-8">

          {/* CONTACT INFO */}
          <div className="bg-white rounded-[30px] p-8 border border-gray-100">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-600 text-sm font-semibold mb-5">
              Contact Information
            </div>

            <h2 className="text-4xl font-black text-gray-900 leading-tight">
              Let’s Build Something Amazing Together
            </h2>

            <p className="text-gray-600 mt-4 leading-relaxed text-lg">
              We’re here to help your business with automation, networking,
              software, and digital solutions.
            </p>

            <div className="mt-8 space-y-5">

              {/* EMAIL */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-red-50 transition">
                <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center text-red-600">
                  ✉️
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email Us</p>
                  <h4 className="font-bold text-gray-800">
                    info@networkautomations.com
                  </h4>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-green-50 transition">
                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
                  📞
                </div>

                <div>
                  <p className="text-sm text-gray-500">Call Us</p>
                  <h4 className="font-bold text-gray-800">
                    +91 95225 95887
                  </h4>
                </div>
              </div>

              {/* LOCATION */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 transition">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                  📍
                </div>

                <div>
                  <p className="text-sm text-gray-500">Office Location</p>
                  <h4 className="font-bold text-gray-800">
                  311, Asawa Chambers, Sapna Sangeeta Rd, near Lotus Showroom, Indore, Madhya Pradesh 452001
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* MAP SECTION */}
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-red-950 to-black p-[1px] shadow-2xl">

            <div className="relative rounded-[32px] overflow-hidden bg-white">

              {/* TOP BAR */}
              <div className="absolute top-0 left-0 z-20 w-full px-5 py-4 flex items-center justify-between">
                <a
                  href="https://maps.google.com/?q=Network+Automation+Solutions+Indore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-2 text-red-600 px-4 py-2 rounded-xl font-semibold hover:bg-red-50 transition"
                  aria-label="Open Google Maps Location"
                >
                </a>
              </div>

              {/* GOOGLE MAP */}
              <div className="relative h-[320px] md:h-[380px] w-full">
                <iframe
                  title="Our Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.706245531233!2d75.86785537504358!3d22.701976828216527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd1dfc0a9c5f%3A0xc1249fa03fe73dd1!2sNetwork%20Automation%20Solutions!5e0!3m2!1sen!2sin!4v1778578985287!5m2!1sen!2sin"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-white rounded-[30px] p-8 lg:p-10 border border-gray-100">

          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-600 text-sm font-semibold mb-5">
            Send Message
          </div>

          <h2 className="text-4xl font-black text-gray-900">
            Let’s Talk
          </h2>

          <p className="text-gray-600 mt-3">
            Fill the form below and our team will contact you shortly.
          </p>

          {submitted ? (
            <div className="mt-10 bg-green-50 border border-green-200 text-green-700 rounded-2xl p-6 font-semibold">
              ✅ Thank you! Your message has been submitted successfully.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
              <div>
                <label className="block mb-2 font-semibold text-gray-700" htmlFor="contactName">
                  Full Name
                </label>
                <input
                  id="contactName"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full h-14 px-5 rounded-2xl border border-gray-200 focus:border-red-500 outline-none transition"
                  required
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-700" htmlFor="contactPhone">
                  Phone Number
                </label>
                <input
                  id="contactPhone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  className="w-full h-14 px-5 rounded-2xl border border-gray-200 focus:border-red-500 outline-none transition"
                  required
                  autoComplete="tel"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-700" htmlFor="contactEmail">
                  Email Address
                </label>
                <input
                  id="contactEmail"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className="w-full h-14 px-5 rounded-2xl border border-gray-200 focus:border-red-500 outline-none transition"
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-700" htmlFor="contactMessage">
                  Message
                </label>
                <textarea
                  id="contactMessage"
                  rows={5}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-red-500 outline-none resize-none transition"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold text-lg transition-all shadow-lg hover:shadow-red-300"
              >
                Send Message
              </button>
            </form>
          )}

          {/* SOCIAL LINKS */}
          <div className="flex items-center gap-4 mt-10">
            {socialLinks.map(({ href, title, svg, className }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={title}
                className={`w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center transition-all duration-300 ${className}`}
              >
                {svg}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;