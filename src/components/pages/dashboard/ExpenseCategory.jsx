import { useEffect, useState, useCallback } from "react";
import axios from "axios";

// Modal component for Add/Edit Category
function ExpenseCategoryModal({
  isOpen,
  onClose,
  onSubmit,
  loading,
  error,
  initialData,
  mode,
}) {
  const [form, setForm] = useState({
    categoryName: "",
    description: "",
    isActive: true,
  });
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({
        categoryName: initialData.categoryName || "",
        description: initialData.description || "",
        isActive:
          typeof initialData.isActive === "boolean"
            ? initialData.isActive
            : !!initialData.isActive,
      });
    } else {
      setForm({
        categoryName: "",
        description: "",
        isActive: true,
      });
    }
    setLocalError("");
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setLocalError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.categoryName.trim()) {
      setLocalError("Category Name is required.");
      return;
    }
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
      <div className="relative bg-white rounded-xl w-full max-w-md mx-2 shadow-lg p-8 animate-[fadeIn_0.13s]">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <path
              d="M18 6L6 18"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            />
            <path
              d="M6 6l12 12"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-7 text-center">
          {mode === "edit" ? "Edit Category" : "Add Category"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          {/* Category Name */}
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="categoryName"
            >
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={form.categoryName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500 transition"
              required
              disabled={loading}
              maxLength={50}
              autoComplete="off"
              placeholder="Ex: Transport"
            />
          </div>
          {/* Description */}
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500 transition min-h-[60px]"
              disabled={loading}
              maxLength={150}
            />
          </div>
          {/* Status */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              disabled={loading}
              className="form-checkbox h-5 w-5 text-blue-600 border-gray-300"
            />
            <label htmlFor="isActive" className="font-medium text-gray-700 select-none">
              Active
            </label>
          </div>
          <div className="flex gap-2 mt-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg text-gray-700 border border-gray-300 bg-gray-100 hover:bg-gray-200 font-semibold transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white font-semibold transition shadow ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading
                ? "Saving..."
                : mode === "edit"
                ? "Update Category"
                : "Add Category"}
            </button>
          </div>
          <div className="h-6 mt-1 min-h-[1.5rem]">
            {localError && <div className="text-red-500">{localError}</div>}
            {error && <div className="text-red-500">{error}</div>}
          </div>
        </form>
      </div>
    </div>
  );
}

const API = "http://localhost:5000/api/v1/expense-category";

function ExpenseCategory() {
  // States for list, modal, edit, loading
  const [categories, setCategories] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' | 'edit'
  const [editData, setEditData] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all categories
  const fetchCategories = useCallback(async () => {
    setTableLoading(true);
    try {
      const res = await axios.get(API);
      setCategories(res.data.data || []);
    } catch (err) {
      setCategories([]);
    } finally {
      setTableLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Open Add modal
  const openAddModal = () => {
    setModalMode("add");
    setEditData(null);
    setModalError("");
    setSuccess("");
    setModalOpen(true);
  };

  // Open Edit modal
  const openEditModal = (cat) => {
    setModalMode("edit");
    setEditData(cat);
    setModalError("");
    setSuccess("");
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setEditData(null);
    setModalError("");
  };

  // Add/Edit submit
  const handleModalSubmit = async (form) => {
    setModalLoading(true);
    setModalError("");
    try {
      if (modalMode === "add") {
        await axios.post(API, form);
        setSuccess("Category created successfully!");
      } else if (modalMode === "edit" && editData && editData._id) {
        await axios.put(`${API}/${editData._id}`, form);
        setSuccess("Category updated successfully!");
      }
      // Refresh table, close modal
      await fetchCategories();
      setTimeout(() => setSuccess(""), 2500);
      setModalOpen(false);
      setEditData(null);
    } catch (err) {
      setModalError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong."
      );
    } finally {
      setModalLoading(false);
    }
  };

  // Delete Category
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;
    setTableLoading(true);
    try {
      await axios.delete(`${API}/${id}`);
      setSuccess("Expense category deleted successfully!");
      await fetchCategories();
      setTimeout(() => setSuccess(""), 2500);
    } catch (err) {
      setSuccess("");
      alert(
        err.response?.data?.message ||
          err.message ||
          "Error deleting category"
      );
    } finally {
      setTableLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-3 sm:px-6">
      {/* Title + Add Button */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl text-gray-800 font-bold tracking-tight">
            Expense Category Management
          </h1>
          <p className="mt-1 text-gray-500">Manage your ERP expense categories</p>
        </div>
        <button
          onClick={openAddModal}
          className="mt-5 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-xl shadow transition"
          type="button"
        >
          <span className="text-lg font-bold leading-none">+</span> Add Category
        </button>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-5 bg-green-100 text-green-800 px-5 py-2 rounded-lg font-medium shadow-inner">
          {success}
        </div>
      )}

      {/* Table Card */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden transition hover:shadow-2xl">
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Expense Categories
          </h2>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full text-sm md:text-base">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-5 py-3 font-semibold tracking-wide text-gray-600 w-1/4">
                  Category Name
                </th>
                <th className="px-5 py-3 font-semibold tracking-wide text-gray-600 w-1/2">
                  Description
                </th>
                <th className="px-5 py-3 font-semibold tracking-wide text-gray-600 w-1/6 text-center">
                  Status
                </th>
                <th className="px-5 py-3 font-semibold tracking-wide text-gray-600 w-1/5 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tableLoading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-400 italic">
                    No categories found
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr
                    key={cat._id}
                    className="border-t bg-white hover:bg-gray-50 transition group"
                  >
                    <td className="px-5 py-3 font-medium text-gray-900 truncate max-w-xs">
                      {cat.categoryName}
                    </td>
                    <td className="px-5 py-3 text-gray-700 truncate max-w-2xl">
                      {cat.description ? cat.description : <span className="text-gray-400">-</span>}
                    </td>
                    <td className="px-5 py-3 text-center">
                      {cat.isActive ? (
                        <span className="inline-block bg-green-100 text-green-700 font-semibold px-4 py-1 rounded-full text-xs md:text-sm">
                          Active
                        </span>
                      ) : (
                        <span className="inline-block bg-red-100 text-red-600 font-semibold px-4 py-1 rounded-full text-xs md:text-sm">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-center whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(cat)}
                        className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg font-semibold text-xs md:text-sm mr-2 shadow transition disabled:opacity-60"
                        disabled={tableLoading}
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg font-semibold text-xs md:text-sm shadow transition disabled:opacity-60"
                        disabled={tableLoading}
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CATEGORY MODAL */}
      <ExpenseCategoryModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
        loading={modalLoading}
        error={modalError}
        initialData={editData}
        mode={modalMode}
      />
    </div>
  );
}

export default ExpenseCategory;