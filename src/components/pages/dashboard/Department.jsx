import { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

const API =
  "https://networkautomation-in-234510.hostingersite.com/api/v1/department";

const INITIAL_FORM = {
  departmentName: "",
  remark: "",
};

export default function Department() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] =
    useState(false);

  const [editId, setEditId] =
    useState(null);

  const [formData, setFormData] =
    useState(INITIAL_FORM);

  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =====================================
  // FETCH DATA
  // =====================================

  const fetchDepartments =
    async () => {
      try {
        const res = await axios.get(API);

        setData(res.data.data || []);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // =====================================
  // CREATE / UPDATE
  // =====================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editId) {
        await axios.put(
          `${API}/${editId}`,
          formData
        );
      } else {
        await axios.post(
          API,
          formData
        );
      }

      setOpen(false);
      setEditId(null);

      setFormData(INITIAL_FORM);

      fetchDepartments();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // EDIT
  // =====================================

  const handleEdit = (item) => {
    setEditId(item._id);

    setFormData({
      departmentName:
        item.departmentName || "",
      remark: item.remark || "",
    });

    setOpen(true);
  };

  // =====================================
  // DELETE
  // =====================================

  const handleDelete = async (
    id
  ) => {
    try {
      await axios.delete(
        `${API}/${id}`
      );

      fetchDepartments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5">
      {/* HEADER */}

      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold">
          Department Master
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
          Add Department
        </button>
      </div>

      {/* TABLE */}

      <div className="overflow-auto rounded-xl border">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">
                Code
              </th>

              <th className="p-3 text-left">
                Department Name
              </th>

              <th className="p-3 text-left">
                Remark
              </th>

              <th className="p-3 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item._id}
                className="border-t"
              >
                <td className="p-3">
                  {
                    item.departmentCode
                  }
                </td>

                <td className="p-3">
                  {
                    item.departmentName
                  }
                </td>

                <td className="p-3">
                  {item.remark}
                </td>

                <td className="p-3">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() =>
                        handleEdit(item)
                      }
                      className="text-blue-600"
                    >
                      <Pencil
                        size={18}
                      />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          item._id
                        )
                      }
                      className="text-red-600"
                    >
                      <Trash2
                        size={18}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center p-5"
                >
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
              onClick={() =>
                setOpen(false)
              }
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold mb-5">
              {editId
                ? "Update Department"
                : "Create Department"}
            </h2>

            <form
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 gap-4">
                {/* DEPARTMENT NAME */}

                <input
                  type="text"
                  name="departmentName"
                  value={
                    formData.departmentName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Department Name"
                  className="border rounded-lg px-4 py-3"
                  required
                />

                {/* REMARK */}

                <textarea
                  rows={4}
                  name="remark"
                  value={
                    formData.remark
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Remark"
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