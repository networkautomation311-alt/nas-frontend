import React, { useState } from "react";
import axios from "axios";

const API_BASE = "https://networkautomation.in/api/v1/auth";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.password) {
      setMessage("Password is required");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/signup`, { email: form.email, password: form.password });
      setMessage(res.data.message || "OTP sent to your email!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed!");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((val) => !val);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="w-full max-w-md px-8 py-10 bg-white rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-semibold text-center mb-7 text-emerald-700">Signup</h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-300"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-300 pr-12"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-600 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                // Eye Off icon (hide)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825a10.05 10.05 0 01-1.875.175C6.813 19 2.823 15.25 1.5 12.999c1.02-1.759 3.33-4.539 7.271-5.84M9.878 9.88A3 3 0 0114.12 14.12M5 5l14 14"
                  />
                </svg>
              ) : (
                // Eye icon (show)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 1.657-3.582 7-9 7s-9-5.343-9-7 3.582-7 9-7 9 5.343 9 7z"
                  />
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
          >
            Signup
          </button>
        </form>
        {message && <p className="text-center mt-6 text-emerald-600">{message}</p>}
      </div>
    </div>
  );
}
