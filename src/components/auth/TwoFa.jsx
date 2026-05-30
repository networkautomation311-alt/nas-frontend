import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://nas-backend.onrender.com/api/v1/auth";

export default function Verify2FA() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const tempUser = JSON.parse(localStorage.getItem("tempUser"));
    const email = tempUser?.email;

    if (!email) {
      setMessage("No user found in session.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/2fa/verify`, { email, token });

      if (res.data?.ok) {
        localStorage.removeItem("tempUser");
        localStorage.setItem("user", JSON.stringify(tempUser));
        setMessage("✅ 2FA Verified Successfully!");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage(res.data?.message || "Invalid code");
      }
    } catch (err) {
      setMessage(err?.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-emerald-200 via-blue-200 to-indigo-200">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-5 text-gray-800">
          Two-Factor Authentication
        </h2>
        <p className="text-sm text-gray-600 mb-5 text-center">
          Enter the 6-digit code from your Google Authenticator app.
        </p>

        <form onSubmit={handleVerify} className="space-y-5">
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit code"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-center text-lg tracking-widest font-mono"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md text-white font-semibold transition-all"
            style={{
              background: loading
                ? "linear-gradient(270deg, #00B25C, #0076D6, #1F66CC)"
                : "linear-gradient(270deg, #00B25C, #0076D6, #1F66CC)",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-5 text-center text-sm ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
