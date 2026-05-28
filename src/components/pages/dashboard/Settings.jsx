import React from "react";

export default function Settings() {
  return (
    <div className="max-w-2xl rounded-lg p-6 ml-8">
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-lg font-semibold mb-2">Profile</h2>
          <p className="text-gray-600 mb-2">
            Update your personal information and change your password.
          </p>
          <a
            href="/dashboard/settings/profile"
            className="inline-block px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
          >
            Edit Profile
          </a>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">Security</h2>
          <p className="text-gray-600 mb-2">
            Manage your password and account security.
          </p>
          <a
            href="/dashboard/settings/security"
            className="inline-block px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
          >
            Security Settings
          </a>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">Support</h2>
          <p className="text-gray-600 mb-2">
            Need help? Visit our support page.
          </p>
          <a
            href="/dashboard/support"
            className="inline-block px-3 py-1.5 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition text-sm"
          >
            Go to Support
          </a>
        </section>
      </div>
    </div>
  );
}
