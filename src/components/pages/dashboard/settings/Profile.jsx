import React, { useState } from "react";
import { FiEdit2, FiFacebook, FiLinkedin, FiX, FiMail, FiEye, FiEyeOff } from "react-icons/fi";

export default function ProfileSettings() {
  // Simulate user data from localStorage or API
  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    user = {};
  }
  const [profile, setProfile] = useState({
    firstName: user?.firstName || "Rakesh",
    lastName: user?.lastName || "Saunr",
    email: user?.email || "randomexample@gmail.com",
    phone: user?.phone || "+91 8570922334",
    role: user?.role || "Team Manager",
    location: user?.location || "Arizona, United States",
    photoURL: user?.photoURL || "/image/profile.png",
    country: user?.country || "United States",
    cityState: user?.cityState || "Phoenix, Arizona, United States",
    postalCode: user?.postalCode || "EXT 2489",
    address: user?.address || "A-0456548A",
  });

  // Edit state for each section
  const [editProfile, setEditProfile] = useState(false);
  const [editPersonal, setEditPersonal] = useState(false);
  // Address section removed: editAddress state removed
  const [editPassword, setEditPassword] = useState(false);

  // For password change
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  // For file upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, photoURL: url }));
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Save handlers (simulate save)
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setEditProfile(false);
    try {
      localStorage.setItem("user", JSON.stringify(profile));
    } catch {
      // Ignore storage error for demo
    }
  };
  const handleSavePersonal = (e) => {
    e.preventDefault();
    setEditPersonal(false);
    try {
      localStorage.setItem("user", JSON.stringify(profile));
    } catch {
      // Ignore storage error for demo
    }
  };
  // handleSaveAddress and its use removed because address section is removed

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
        <span>Home</span>
        <span className="mx-1">{">"}</span>
        <span>Profile</span>
      </div>

      {/* Profile Card */}
      <div className="rounded-xl p-6 mb-6">
        <form onSubmit={handleSaveProfile}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={profile.photoURL}
                  alt="Profile"
                  className="h-16 w-16 rounded-full object-cover border"
                />
                {editProfile && (
                  <label className="absolute bottom-0 right-0 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                    <span className="bg-blue-600 text-white rounded-full p-1 text-xs">
                      <FiEdit2 />
                    </span>
                  </label>
                )}
              </div>
              <div>
                <div className="font-semibold text-lg">
                  {editProfile ? (
                    <>
                      <input
                        type="text"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 mr-1 text-sm"
                        style={{ width: 90 }}
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 text-sm"
                        style={{ width: 110 }}
                      />
                    </>
                  ) : (
                    <>
                      {profile.firstName} {profile.lastName}
                    </>
                  )}
                </div>
                <div className="text-gray-500 text-sm">
                  {editProfile ? (
                    <input
                      type="text"
                      name="role"
                      value={profile.role}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 text-sm"
                      style={{ width: 120 }}
                    />
                  ) : (
                    profile.role
                  )}
                </div>
                <div className="text-gray-400 text-xs">
                  {editProfile ? (
                    <input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 text-xs"
                      style={{ width: 160 }}
                    />
                  ) : (
                    profile.location
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-600" title="Facebook">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600" title="Mail">
                <FiMail size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600" title="LinkedIn">
                <FiLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600" title="Close">
                <FiX size={20} />
              </a>
              <button
                type="button"
                className="ml-2 bg-gray-100 hover:bg-gray-200 rounded-full p-2"
                onClick={() => setEditProfile((v) => !v)}
                aria-label="Edit Profile"
              >
                <FiEdit2 size={18} />
              </button>
            </div>
          </div>
          {editProfile && (
            <div className="mt-4 flex gap-2">
              <button
                type="submit"
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Save
              </button>
              <button
                type="button"
                className="px-4 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
                onClick={() => setEditProfile(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Personal Information */}
      <div className="rounded-xl p-6 mb-6">
        <form onSubmit={handleSavePersonal}>
          <div className="flex justify-between items-center mb-4">
            <div className="font-semibold text-lg">Personal Information</div>
            <button
              type="button"
              className="bg-gray-100 hover:bg-gray-200 rounded-full p-2"
              onClick={() => setEditPersonal((v) => !v)}
              aria-label="Edit Personal Info"
            >
              <FiEdit2 size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            {["firstName", "lastName", "email", "phone", "role", "location"].map(
              (field) => (
                <div key={field}>
                  <div className="text-xs text-gray-400 capitalize">
                    {field.replace(/([A-Z])/g, " $1").replace(/^./, (m) => m.toUpperCase())}
                  </div>
                  {editPersonal ? (
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={profile[field]}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-1 text-sm"
                    />
                  ) : (
                    <div className="font-medium">{profile[field]}</div>
                  )}
                </div>
              )
            )}
          </div>
          {editPersonal && (
            <div className="mt-4 flex gap-2">
              <button
                type="submit"
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Save
              </button>
              <button
                type="button"
                className="px-4 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
                onClick={() => setEditPersonal(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Address */}
      {/* Address section removed */}

      {/* Change Password Section */}
      <div className="rounded-xl p-6 mb-6">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setMessage("");
            if (passwords.newPassword !== passwords.confirmPassword) {
              return setMessage("❌ New passwords do not match!");
            }
            if (!passwords.currentPassword || !passwords.newPassword) {
              setMessage("❌ Please fill required fields.");
              return;
            }
            try {
              setLoading(true);
              const token = localStorage.getItem("token");
              const res = await fetch(
                "https://portfolio-backend-3nr9.onrender.com/api/v1/auth",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : "",
                  },
                  body: JSON.stringify({
                    currentPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword,
                  }),
                }
              );

              const data = await res.json();
              if (!res.ok) {
                throw new Error(data.message || "Password change failed");
              }
              setMessage("✅ Password changed successfully!");
              setPasswords({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              });
              setEditPassword(false);
            } catch (err) {
              setMessage(err.message);
            } finally {
              setLoading(false);
            }
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="font-semibold text-lg">Change Password</div>
            <button
              type="button"
              className="bg-gray-100 hover:bg-gray-200 rounded-full p-2"
              onClick={() => setEditPassword((v) => !v)}
              aria-label="Edit Password"
            >
              <FiEdit2 size={18} />
            </button>
          </div>

          {editPassword ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
              <div>
                <div className="text-xs text-gray-400">Current Password</div>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full border rounded px-3 py-1 text-sm pr-10"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-gray-600"
                    tabIndex={-1}
                    onClick={() => setShowCurrentPassword((show) => !show)}
                    aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                  >
                    {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">New Password</div>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full border rounded px-3 py-1 text-sm pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-gray-600"
                    tabIndex={-1}
                    onClick={() => setShowNewPassword((show) => !show)}
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Confirm New Password</div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full border rounded px-3 py-1 text-sm pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-gray-600"
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword((show) => !show)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              For your account security, you can update your password here.
            </p>
          )}

          {editPassword && (
            <div className="mt-4 flex gap-2">
              <button
                type="submit"
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                disabled={loading}
              >
                {loading ? "Changing..." : "Save"}
              </button>
              <button
                type="button"
                className="px-4 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
                onClick={() => setEditPassword(false)}
              >
                Cancel
              </button>
            </div>
          )}

          {message && (
            <p className="mt-4 text-sm text-center text-gray-700">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
