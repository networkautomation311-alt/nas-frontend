import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const API = "https://nas-backend-7f28.onrender.com/api/v1/call-urgency";

const INITIAL_FORM = {
  urgencyLevel: "",
  description: "",
};

export default function CallUrgency() {
  const [urgencies, setUrgencies] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch all call urgencies
  const fetchUrgencies = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API);
      setUrgencies(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch call urgencies."
      );
      setUrgencies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrgencies();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Validate form before submit
  const validateForm = () => {
    if (!formData.urgencyLevel.trim()) {
      setError("Urgency Level is required.");
      return false;
    }
    return true;
  };

  // Handle form submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, formData);
        setSuccess("Urgency updated successfully.");
      } else {
        // Send only defined fields, don't send blank fields
        const payload = {...formData};
        if (!payload.description) delete payload.description;
        await axios.post(API, payload);
        setSuccess("Urgency added successfully.");
      }
      setOpen(false);
      setEditId(null);
      setFormData(INITIAL_FORM);
      await fetchUrgencies();
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
      // Keep modal open for correction
    } finally {
      setLoading(false);
    }
  };

  // Open modal in edit mode with item data
  const handleEdit = (item) => {
    setError(null);
    setSuccess(null);
    setEditId(item._id);
    setFormData({
      urgencyLevel: item.urgencyLevel || "",
      description: item.description || "",
    });
    setOpen(true);
  };

  // Delete urgency
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await axios.delete(`${API}/${id}`);
      setSuccess("Urgency deleted successfully.");
      await fetchUrgencies();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Delete failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Open create modal
  const openCreateModal = () => {
    setError(null);
    setSuccess(null);
    setEditId(null);
    setFormData(INITIAL_FORM);
    setOpen(true);
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold">Call Urgency</h1>
        <button
          onClick={openCreateModal}
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Add Call Urgency
        </button>
      </div>

      {/* Alerts */}
      {!!error && (
        <div className="mb-3 bg-red-100 border border-red-300 rounded p-3 text-red-700">
          {error}
        </div>
      )}
      {!!success && (
        <div className="mb-3 bg-green-100 border border-green-300 rounded p-3 text-green-700">
          {success}
        </div>
      )}

      {/* Table */}
      <div className="overflow-auto rounded-xl border">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Urgency Code</th>
              <th className="p-3 text-left">Urgency Level</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center p-5">
                  Loading...
                </td>
              </tr>
            ) : urgencies.length > 0 ? (
              urgencies.map((item) => (
                <tr key={item._id || item.urgencyCode} className="border-t">
                  <td className="p-3">{item.urgencyCode || "-"}</td>
                  <td className="p-3">{item.urgencyLevel || "-"}</td>
                  <td className="p-3">{item.description || "-"}</td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600"
                        title="Edit"
                        disabled={loading}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600"
                        title="Delete"
                        disabled={loading}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-5">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4"
              type="button"
            >
              <X />
            </button>
            <h2 className="text-2xl font-bold mb-5">
              {editId ? "Update Call Urgency" : "Create Call Urgency"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                {/* urgencyLevel input */}
                <input
                  type="text"
                  name="urgencyLevel"
                  value={formData.urgencyLevel}
                  onChange={handleChange}
                  placeholder="Urgency Level"
                  className="border rounded-lg px-4 py-3"
                  required
                />
                {/* description textarea */}
                <textarea
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="border rounded-lg px-4 py-3 resize-none"
                />
              </div>
              {!!error && (
                <div className="mt-2 bg-red-100 border border-red-300 rounded px-3 py-2 text-red-700">
                  {error}
                </div>
              )}
              <div className="flex justify-end mt-5">
                <button
                  type="submit"
                  disabled={loading || !formData.urgencyLevel.trim()}
                  className="bg-black text-white px-6 py-3 rounded-lg"
                >
                  {loading
                    ? "Saving..."
                    : editId
                    ? "Update"
                    : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}