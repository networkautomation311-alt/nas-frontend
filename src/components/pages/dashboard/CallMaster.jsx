import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2, X } from "lucide-react";

/**
 * API endpoint for Call Master management.
 */
const API = "http://localhost:5000/api/v1/call-master";

/**
 * Initial form structure.
 */
const INITIAL_FORM = {
  callType: "",
  description: "",
};

/**
 * CallMaster component manages the list of call types and their creation/editing UI.
 */
export default function CallMaster() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  /**
   * Handle input changes for the form.
   */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * Fetches all call master entries from the backend.
   */
  const fetchCallMasters = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API);
      // Defensive: Ensure callTypeCode, callType, and description fields
      const arr = (res.data.data || []).map((item) => ({
        callTypeCode: item.callTypeCode || "",
        callType: item.callType || "",
        description: item.description || "",
        _id: item._id,
      }));
      setData(arr);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch call types."
      );
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // Mount: load data
  useEffect(() => {
    fetchCallMasters();
    // eslint-disable-next-line
  }, []);

  /**
   * Validate form before submitting.
   */
  const validateForm = () => {
    if (!formData.callType.trim()) {
      setError("Call Type is required.");
      return false;
    }
    // ...add other checks here if needed...
    return true;
  };

  /**
   * Handles creating or editing a call type.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, formData);
        setSuccess("Call Type updated successfully.");
      } else {
        // Omit empty fields for backend sanity
        const payload = { ...formData };
        if (!payload.description) delete payload.description;
        await axios.post(API, payload);
        setSuccess("Call Type added successfully.");
      }
      setOpen(false);
      setEditId(null);
      setFormData(INITIAL_FORM);
      await fetchCallMasters();
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 400 ||
          err.response.status === 500)
      ) {
        setError(
          err.response.data?.message ||
            `Failed to save. (${err.response.status}) Please check your input.`
        );
      } else {
        setError("Failed to save. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Prepares form to edit a call type.
   */
  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData({
      callType: item.callType || "",
      description: item.description || "",
    });
    setOpen(true);
    setError(null);
    setSuccess(null);
  };

  /**
   * Deletes a call type by its id, with error handling.
   */
  const handleDelete = async (id) => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      await axios.delete(`${API}/${id}`);
      setSuccess("Call Type deleted successfully.");
      await fetchCallMasters();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete call type."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold">Call Master</h1>
        <button
          onClick={() => {
            setOpen(true);
            setEditId(null);
            setFormData(INITIAL_FORM);
            setError(null);
            setSuccess(null);
          }}
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Add Call Type
        </button>
      </div>

      {/* Feedback messages */}
      {(error || success) && (
        <div
          className={`mb-4 px-4 py-2 rounded ${
            error
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {error || success}
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-auto rounded-xl border">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Call Type</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-3">{item.callTypeCode || "-"}</td>
                  <td className="p-3">{item.callType || "-"}</td>
                  <td className="p-3">{item.description || "-"}</td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600"
                        aria-label="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600"
                        aria-label="Delete"
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

      {/* POPUP */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl p-6 relative">
            {/* CLOSE */}
            <button
              onClick={() => {
                setOpen(false);
                setError(null);
                setSuccess(null);
              }}
              className="absolute top-4 right-4"
              aria-label="Close"
            >
              <X />
            </button>
            <h2 className="text-2xl font-bold mb-5">
              {editId ? "Update Call Type" : "Create Call Type"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                {/* CALL TYPE */}
                <input
                  type="text"
                  name="callType"
                  value={formData.callType}
                  onChange={handleChange}
                  placeholder="Call Type"
                  className="border rounded-lg px-4 py-3"
                  required
                />

                {/* DESCRIPTION */}
                <textarea
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="border rounded-lg px-4 py-3 resize-none"
                />
              </div>

              {/* BUTTON */}
              <div className="flex justify-end mt-5">
                <button
                  type="submit"
                  disabled={loading}
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