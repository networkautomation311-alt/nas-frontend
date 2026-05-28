import React, { useState } from "react";
import axios from "axios";

const API_BASE = "https://nas-backend-7f28.onrender.com/api/v1/auth";

export default function ResetPassword() {
  const [form, setForm] = useState({ email: "", otp: "", newPassword: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/reset-password`, {
        email: form.email,
        otp: form.otp,
        newPassword: form.newPassword,
        role: "reset-password",
      });
      setMessage(res.data.message || "Password reset successful!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Reset failed!");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={form.otp}
          onChange={handleChange}
        />
        <input
          type="password"
          name="newPassword"
          placeholder="Enter New Password"
          value={form.newPassword}
          onChange={handleChange}
        />
        <button type="submit">Reset Password</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
