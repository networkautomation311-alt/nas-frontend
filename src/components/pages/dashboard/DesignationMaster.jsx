import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://networkautomation-in-234510.hostingersite.com/?utm_source=chatgpt.com/api/v1/designation-master";

const initialDesignation = {
  designationName: "",
  remark: "",
  comments: [],
};

function DesignationMaster() {
  const [designations, setDesignations] = useState([]);
  const [form, setForm] = useState(initialDesignation);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch designations
  const fetchDesignations = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setDesignations(res.data.data || []);
    } catch (err) {
      setError("Failed to fetch designations.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDesignations();
  }, []);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Handle comments input
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

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setForm(initialDesignation);
      setEditingId(null);
      fetchDesignations();
    } catch (err) {
      setError("Save failed. Please ensure all fields are valid.");
    }
    setLoading(false);
  };

  // Edit designation
  const handleEdit = (designation) => {
    setForm({
      designationName: designation.designationName || "",
      remark: designation.remark || "",
      comments: Array.isArray(designation.comments) ? designation.comments : [],
    });
    setEditingId(designation._id);
  };

  // Delete designation
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this designation?")) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchDesignations();
    } catch (err) {
      setError("Delete failed.");
    }
    setLoading(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setForm(initialDesignation);
    setEditingId(null);
    setError(null);
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Designation Master</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-6 mb-8 space-y-4"
      >
        <div>
          <label className="block font-medium mb-1">Designation Name*</label>
          <input
            type="text"
            name="designationName"
            value={form.designationName}
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
        {error && (
          <div className="text-red-500">{error}</div>
        )}
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            disabled={loading}
          >
            {editingId ? "Update Designation" : "Add Designation"}
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

      {/* Designation List */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="font-semibold text-lg mb-4">Designation List</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Code</th>
                <th className="p-2 border">Designation Name</th>
                <th className="p-2 border">Remark</th>
                <th className="p-2 border">Comments</th>
                <th className="p-2 border">Created At</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {designations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-3">
                    No designations found.
                  </td>
                </tr>
              ) : (
                designations.map((dsg) => (
                  <tr key={dsg._id} className="hover:bg-gray-50">
                    <td className="p-2 border">{dsg.code || dsg.designationCode}</td>
                    <td className="p-2 border">{dsg.designationName}</td>
                    <td className="p-2 border">{dsg.remark}</td>
                    <td className="p-2 border">
                      {(dsg.comments || []).map((c, idx) => (
                        <div key={idx}>{c}</div>
                      ))}
                    </td>
                    <td className="p-2 border">
                      {dsg.createdAt
                        ? new Date(dsg.createdAt).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="p-2 border">
                      <button
                        className="mr-2 text-blue-600 underline"
                        onClick={() => handleEdit(dsg)}
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 underline"
                        onClick={() => handleDelete(dsg._id)}
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

export default DesignationMaster;