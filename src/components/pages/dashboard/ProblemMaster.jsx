import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://networkautomation-in-234510.hostingersite.com/?utm_source=chatgpt.com/api/v1/problem";

const initialProblem = {
  problemName: "",
  remark: "",
  comments: [],
};

function ProblemMaster() {
  const [problems, setProblems] = useState([]);
  const [form, setForm] = useState(initialProblem);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch problems
  const fetchProblems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setProblems(res.data.data || []);
    } catch (err) {
      setError("Failed to fetch problems.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProblems();
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
      setForm(initialProblem);
      setEditingId(null);
      fetchProblems();
    } catch (err) {
      setError("Save failed. Please ensure all fields are valid.");
    }
    setLoading(false);
  };

  // Edit problem
  const handleEdit = (problem) => {
    setForm({
      problemName: problem.problemName || "",
      remark: problem.remark || "",
      comments: Array.isArray(problem.comments) ? problem.comments : [],
    });
    setEditingId(problem._id);
  };

  // Delete problem
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this problem?")) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProblems();
    } catch (err) {
      setError("Delete failed.");
    }
    setLoading(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setForm(initialProblem);
    setEditingId(null);
    setError(null);
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Problem Master</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-6 mb-8 space-y-4"
      >
        <div>
          <label className="block font-medium mb-1">Problem Name*</label>
          <input
            type="text"
            name="problemName"
            value={form.problemName}
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
            {editingId ? "Update Problem" : "Add Problem"}
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

      {/* Problem List */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="font-semibold text-lg mb-4">Problem List</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Problem Code</th>
                <th className="p-2 border">Problem Name</th>
                <th className="p-2 border">Remark</th>
                <th className="p-2 border">Comments</th>
                <th className="p-2 border">Created At</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {problems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-3">
                    No problems found.
                  </td>
                </tr>
              ) : (
                problems.map((problem) => (
                  <tr key={problem._id} className="hover:bg-gray-50">
                    <td className="p-2 border">{problem.problemCode}</td>
                    <td className="p-2 border">{problem.problemName}</td>
                    <td className="p-2 border">{problem.remark}</td>
                    <td className="p-2 border">
                      {(problem.comments || []).map((c, idx) => (
                        <div key={idx}>{c}</div>
                      ))}
                    </td>
                    <td className="p-2 border">
                      {problem.createdAt
                        ? new Date(problem.createdAt).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="p-2 border">
                      <button
                        className="mr-2 text-blue-600 underline"
                        onClick={() => handleEdit(problem)}
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 underline"
                        onClick={() => handleDelete(problem._id)}
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

export default ProblemMaster;