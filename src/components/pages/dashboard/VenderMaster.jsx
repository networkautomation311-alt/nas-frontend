import React, { useEffect, useState } from "react";
import axios from "axios";

// NOTE: The API endpoint may expect snake_case: consider 'vendor' instead of 'vender'
const API_URL = "http://localhost:5000/api/v1/vender-master";

const initialVendor = {
  vendorName: "",
  remark: "",
  comments: [],
};

function VenderMaster() {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState(initialVendor);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch vendors: more robust error handling
  const fetchVendors = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_URL);
      setVendors(res.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch vendors."
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Handle individual comment input change
  const handleCommentsChange = (e, idx) => {
    const newComments = [...(form.comments || [])];
    newComments[idx] = e.target.value;
    setForm((f) => ({ ...f, comments: newComments }));
  };

  const addCommentField = () => {
    setForm((f) => ({
      ...f,
      comments: [...(f.comments || []), ""],
    }));
  };

  const removeCommentField = (idx) => {
    setForm((f) => ({
      ...f,
      comments: f.comments.filter((_, i) => i !== idx),
    }));
  };

  // Validate before submit
  const validateForm = () => {
    if (!form.vendorName.trim()) {
      setError("Vendor Name is required.");
      return false;
    }
    return true;
  };

  // Submit form with improved error messaging
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      return;
    }
    setLoading(true);

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
        setSuccess("Vendor updated successfully.");
      } else {
        // If your backend expects only defined fields, no empty arrays, filter/omit if needed:
        const payload = { ...form };
        if (!payload.remark) delete payload.remark;
        if (payload.comments && payload.comments.length === 0)
          delete payload.comments;
        await axios.post(API_URL, payload);
        setSuccess("Vendor added successfully.");
      }
      setForm(initialVendor);
      setEditingId(null);
      await fetchVendors();
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 400 || err.response.status === 500)
      ) {
        setError(
          err.response.data?.message ||
            `Save failed (${err.response.status}). Check required fields or backend errors.`
        );
      } else {
        setError("Save failed. Please ensure all fields are valid.");
      }
    }
    setLoading(false);
  };

  // Edit vendor
  const handleEdit = (vendor) => {
    setError(null);
    setSuccess(null);
    setForm({
      vendorName: vendor.vendorName || "",
      remark: vendor.remark || "",
      comments: Array.isArray(vendor.comments) ? vendor.comments : [],
    });
    setEditingId(vendor._id);
  };

  // Delete vendor
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vendor?")) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setSuccess("Vendor deleted.");
      await fetchVendors();
    } catch (err) {
      setError("Delete failed. Please try again.");
    }
    setLoading(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setForm(initialVendor);
    setEditingId(null);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Vendor Master</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-6 mb-8 space-y-4"
        autoComplete="off"
      >
        <div>
          <label className="block font-medium mb-1">Vendor Name*</label>
          <input
            type="text"
            name="vendorName"
            value={form.vendorName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Remark</label>
          <input
            type="text"
            name="remark"
            value={form.remark}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Comments</label>
          {(form.comments || []).map((c, idx) => (
            <div key={idx} className="flex mb-2">
              <input
                type="text"
                value={c}
                onChange={(e) => handleCommentsChange(e, idx)}
                className="w-full border rounded px-3 py-2"
              />
              <button
                type="button"
                onClick={() => removeCommentField(idx)}
                className="ml-2 text-red-500"
                tabIndex={-1}
                aria-label="Remove comment"
              >
                &#10005;
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addCommentField}
            className="text-sm text-blue-600 mt-1"
          >
            + Add Comment
          </button>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {success && !error && (
          <div className="text-green-600">{success}</div>
        )}
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            disabled={loading}
          >
            {editingId ? "Update Vendor" : "Add Vendor"}
          </button>
          {editingId && (
            <button
              type="button"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Vendor List */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="font-semibold text-lg mb-4">Vendor List</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Vendor Code</th>
                <th className="p-2 border">Vendor Name</th>
                <th className="p-2 border">Remark</th>
                <th className="p-2 border">Comments</th>
                <th className="p-2 border">Created At</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-3">
                    No vendors found.
                  </td>
                </tr>
              ) : (
                vendors.map((vendor) => (
                  <tr key={vendor._id || vendor.vendorCode} className="hover:bg-gray-50">
                    <td className="p-2 border">{vendor.vendorCode}</td>
                    <td className="p-2 border">{vendor.vendorName}</td>
                    <td className="p-2 border">{vendor.remark}</td>
                    <td className="p-2 border">
                      {(vendor.comments || []).map((c, idx) => (
                        typeof c === "string" ? <div key={idx}>{c}</div> : null
                      ))}
                    </td>
                    <td className="p-2 border">
                      {vendor.createdAt
                        ? new Date(vendor.createdAt).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="p-2 border">
                      <button
                        className="mr-2 text-blue-600 underline"
                        onClick={() => handleEdit(vendor)}
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 underline"
                        onClick={() => handleDelete(vendor._id)}
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default VenderMaster;