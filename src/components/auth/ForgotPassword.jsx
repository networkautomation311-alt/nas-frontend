import React, { useState } from "react";
import axios from "axios";

const API_BASE = "https://portfolio-backend-3nr9.onrender.com/api/v1/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/forgot-password`, { email });
      setMessage(res.data.message || "OTP sent successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending OTP!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-amber-100">
      <div className="w-full max-w-md px-8 py-10 bg-white rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-semibold text-center mb-7 text-amber-700">Forgot Password</h2>
        <form onSubmit={handleForgot} className="space-y-6">
          <input
            type="email"
            placeholder="Enter registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-300"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 transition"
          >
            Send OTP
          </button>
        </form>
        {message && <p className="text-center mt-6 text-amber-600">{message}</p>}
      </div>
    </div>
  );
}
