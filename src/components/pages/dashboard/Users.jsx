import { useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

// API BASE - adjust per deployment/configuration
const API_BASE = "https://networkautomation-in-234510.hostingersite.com/?utm_source=chatgpt.com/api/v1/auth";

// These should match the backend auth-model.js schema
const ROLES = ["Admin", "Owner", "Staff", "Accountant"];

const initialFormState = {
  name: "",
  email: "",
  password: "",
  role: "Staff",
  isActive: true,
  // Note: fields like 2FA are not handled here for simplicity
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ ...initialFormState });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ==================== FETCH USERS ====================
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/users`);
      setUsers(res.data?.data || []);
    } catch {
      setFormError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  // ==================== HANDLE FORM INPUT ====================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ==================== HANDLE SUBMIT ====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");

    // Only send password if set, and do not send on edit if blank
    const submitData = { ...form };
    if (editId && submitData.password === "") {
      delete submitData.password;
    }

    try {
      if (editId) {
        // Update User
        await axios.put(`${API_BASE}/users/${editId}`, submitData);
      } else {
        // Add New User
        await axios.post(`${API_BASE}/signup`, submitData);
      }
      fetchUsers();
      setShowForm(false);
      setEditId(null);
      setForm({ ...initialFormState });
    } catch (err) {
      setFormError(
        err?.response?.data?.message ||
        "Error occurred while saving the user."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==================== HANDLE EDIT ====================
  const handleEdit = (user) => {
    setEditId(user._id);
    setForm({
      name: user.name || "",
      email: user.email || "",
      password: "",
      role: user.role || "Staff",
      isActive: typeof user.isActive === "boolean" ? user.isActive : true,
    });
    setShowForm(true);
  };

  // ==================== HANDLE DELETE ====================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`${API_BASE}/users/${id}`);
      fetchUsers();
    } catch {
      alert("Failed to delete user");
    }
  };

  // ==================== FORM UI ====================
  return (
    <div className="p-6 bg-white rounded shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">Users</h2>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setShowForm((prev) => !prev);
            setEditId(null);
            setForm({ ...initialFormState });
          }}
        >
          {showForm ? "Close" : "Add User"}
        </button>
      </div>
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 bg-gray-100 p-4 rounded space-y-3"
        >
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Password{editId ? " (Leave blank to keep unchanged)" : ""}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full pr-10"
                required={!editId}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-2 text-xs text-gray-600"
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            >
              {ROLES.map((roleOpt) => (
                <option key={roleOpt} value={roleOpt}>
                  {roleOpt}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={handleChange}
              name="isActive"
              id="isActive"
              className="mr-2"
            />
            <label htmlFor="isActive" className="font-medium text-sm">
              Active
            </label>
          </div>
          {formError && (
            <div className="text-red-500 text-sm">{formError}</div>
          )}
          <button
            type="submit"
            className="bg-red-600 text-white px-5 py-2 rounded"
            disabled={submitting}
          >
            {submitting
              ? editId
                ? "Updating..."
                : "Adding..."
              : editId
              ? "Update User"
              : "Add User"}
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Active?</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="py-2 px-4 border">{user.name}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border">{user.role}</td>
                  <td className="py-2 px-4 border">
                    {user.isActive ? "Yes" : "No"}
                  </td>
                  <td className="py-2 px-4 border flex space-x-2">
                    <button
                      title="Edit"
                      className="text-blue-600"
                      onClick={() => handleEdit(user)}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      title="Delete"
                      className="text-red-600"
                      onClick={() => handleDelete(user._id)}
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;