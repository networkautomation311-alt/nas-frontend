import { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

// The API matches the intended endpoint
const API = "https://nas-backend-7f28.onrender.com/api/v1/division-master";

// Matches schema: divisionName (required), remarks (optional), no divisionCode input
const INITIAL_FORM = {
  divisionName: "",
  remarks: "",
};

export default function DivisionMaster() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);

  // Handle input change for form fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fetch all divisions
  const fetchDivisions = async () => {
    try {
      const res = await axios.get(API);
      setData(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDivisions();
  }, []);

  // Create or update a division
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editId) {
        // Update: send only allowed fields (divisionName, remarks)
        await axios.put(`${API}/${editId}`, {
          divisionName: formData.divisionName,
          remarks: formData.remarks,
        });
      } else {
        // Create: send only allowed fields (divisionName, remarks)
        await axios.post(API, {
          divisionName: formData.divisionName,
          remarks: formData.remarks,
        });
      }

      setOpen(false);
      setEditId(null);
      setFormData(INITIAL_FORM);
      fetchDivisions();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Start editing a division
  const handleEdit = (item) => {
    setEditId(item._id);

    setFormData({
      divisionName: item.divisionName || "",
      remarks: item.remarks || "",
    });

    setOpen(true);
  };

  // Delete a division
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchDivisions();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold">
          Division Master
        </h1>
        <button
          onClick={() => {
            setOpen(true);
            setEditId(null);
            setFormData(INITIAL_FORM);
          }}
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Add Division
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-auto rounded-xl border">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Division Name</th>
              <th className="p-3 text-left">Remarks</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3">{item.divisionCode}</td>
                <td className="p-3">{item.divisionName}</td>
                <td className="p-3">{item.remarks}</td>
                <td className="p-3">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
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
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>
            <h2 className="text-2xl font-bold mb-5">
              {editId ? "Update Division" : "Create Division"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                {/* DIVISION NAME */}
                <input
                  type="text"
                  name="divisionName"
                  value={formData.divisionName}
                  onChange={handleChange}
                  placeholder="Division Name"
                  className="border rounded-lg px-4 py-3"
                  required
                />
                {/* REMARKS */}
                <textarea
                  rows={4}
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="Remarks"
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