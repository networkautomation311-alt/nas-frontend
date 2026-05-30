import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FiLock } from "react-icons/fi"; // Import FiLock
const API_BASE = "http://localhost:5000/api/v1/auth";


// Linear gradient style for text
const auroraGradient = {
  background: "linear-gradient(270deg, #FF0000, #FF4D4D, #B20000)", // Changed to red gradient
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
  transition: "background 0.2s",
};

// Example jungle background image (replace the URL as needed)
const jungleBackgroundUrl =
  "https://res.cloudinary.com/dz4zdzuaj/image/upload/q_auto/f_auto/v1779083115/bg2_vytmuk.jpg";

// SVG icons for input fields
const EmailIcon = () => (
  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect width="20" height="16" x="2" y="4" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M2 6l10 7 10-7" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const PasswordIcon = () => (
  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect width="16" height="10" x="4" y="11" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M8 11V7a4 4 0 118 0v4" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

// Gradient Button style for linear-gradient(270deg, #FF0000, #FF4D4D, #B20000) (changed to red gradient)
const auroraButtonGradient =
  "linear-gradient(270deg, #FF0000, #FF4D4D, #B20000)";

// Animation CSS for FaArrowRight
const arrowAnimStyles = `
@keyframes arrowMove {
  0% { transform: translateX(0); }
  60% { transform: translateX(6px); }
  100% { transform: translateX(0); }
}
`;

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  // 2FA enable/verify state (now unused, but keeping for simplicity)
  const [enabling2fa] = useState(false);
  // Remove qr, secret, hovered2faBtn, hoveredVerifyBtn state
  const [hoveredBtn, setHoveredBtn] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setUser(null);

    try {
      const res = await axios.post(`${API_BASE}/login`, form);
      const { user, token } = res.data || {};

      if (user && token) {
        setUser(user);

        if (user.twoFactorEnabled === true) {
          localStorage.setItem("tempUser", JSON.stringify(user));
          localStorage.setItem("tempToken", token);
          // 2FA enabled, go to verify-2fa screen
          navigate("/verify-2fa");
        } else {
          // 2FA not enabled, store credentials & go to dashboard
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", token);
          navigate("/dashboard");
        }
      } else {
        setMessage("Unexpected response from server. Please try again.");
      }
    } catch (err) {
      setMessage(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Button Arrow Animation Style Inject */}
      <style>{arrowAnimStyles}</style>
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url('${jungleBackgroundUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        {/* Overlay gradient for improved readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(270deg, rgba(255,0,0,0.18), rgba(255,77,77,0.11), rgba(178,0,0,0.10))",
            zIndex: 1,
          }}
          aria-hidden="true"
        />
        <div
          className="w-full max-w-sm bg-white shadow-xl rounded-2xl px-8 py-10 border border-slate-200"
          style={{
            background: "rgba(255,255,255,0.90)",
            backdropFilter: "saturate(160%) blur(2.5px)",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div className="flex flex-col items-center mb-7">
            <div className="w-16 h-16 mb-3 rounded-full flex items-center justify-center bg-gradient-to-l from-[#B20000] via-[#FF4D4D] to-[#FF0000]">
              {/* Change to admin icon <FiLock /> */}
              <FiLock className="w-9 h-9 text-white" />
            </div>
            {/* Add "Welcome Back" in bold big letters */}
            <h1 className="text-2xl font-medium mb-1 text-gray-900">Welcome Back</h1>
            {/* Add "Sign in to your account to continue" as subheading */}
            <p className="text-sm text-gray-500 mb-2">Sign in to your account to continue</p>
            {/* Removed "Sign in" heading as per instruction */}
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-red-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <EmailIcon />
                </span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-10 py-3 rounded-lg border border-red-300 focus:ring-2 focus:ring-red-200 outline-none text-sm"
                  autoComplete="email"
                  spellCheck={false}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-red-700 mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <PasswordIcon />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-10 py-3 rounded-lg border border-red-300 focus:ring-2 focus:ring-red-200 outline-none text-sm"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-700"
                  onClick={() => setShowPassword((x) => !x)}
                  aria-label="Toggle show password"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7 0-1.543.78-2.977 2.1-4.26m2.03-1.72A8.963 8.963 0 0112 5c5 0 9 4 9 7 0 1.08-.343 2.185-.994 3.272M15 12A3 3 0 119 12a3 3 0 016 0Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M3 3l18 18" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0Zm9 0c0 3-4 7-9 7s-9-4-9-7 4-7 9-7 9 4 9 7Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-md transition font-semibold text-white text-sm hover:-translate-y-0.5 hover:shadow-lg inline-flex items-center justify-center gap-2 group"
              style={
                loading
                  ? {
                      background: auroraButtonGradient,
                      opacity: 0.6,
                      cursor: "not-allowed",
                    }
                  : {
                      background: auroraButtonGradient,
                    }
              }
              onMouseEnter={() => setHoveredBtn(true)}
              onMouseLeave={() => setHoveredBtn(false)}
            >
              {loading ? (
                <span className="inline-flex items-center">
                  <svg className="animate-spin w-5 h-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-30"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-90"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4A8 8 0 104 12z"
                    ></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                <>
                  Sign in
                  <span
                    className="ml-1 flex items-center"
                    style={hoveredBtn ? { animation: "arrowMove 0.5s" } : undefined}
                  >
                    <FaArrowRight />
                  </span>
                </>
              )}
            </button>
          </form>

          {message && (
            <div className="mt-7 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 border border-red-300 text-red-800 text-sm shadow-sm">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
                </svg>
                {message}
              </div>
            </div>
          )}

          {/* Enable 2FA Button removed */}
        </div>
      </div>
    </>
  );
}
