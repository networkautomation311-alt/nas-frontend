import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const API_BASE = "https://networkautomation-in-234510.hostingersite.com/?utm_source=chatgpt.com/api/v1/category";

const Category = () => {

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    categoryName: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formError, setFormError] = useState("");


  // ================= FETCH CATEGORIES =================
  const fetchCategories = async () => {

    setLoading(true);

    try {

      const res = await axios.get(API_BASE);

      setCategories(res.data?.data || []);

    } catch (error) {

      console.error(error);

      alert("Failed to fetch categories");

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormError("");
  };


  // ================= HANDLE SUBMIT =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.categoryName.trim()) {
      return setFormError(
        "Category name is required"
      );
    }

    const body = {
      categoryName: form.categoryName,
      description: form.description,
    };

    try {

      setSubmitting(true);

      if (editId) {

        // UPDATE
        const res = await axios.put(
          `${API_BASE}/${editId}`,
          body
        );

        const updatedCategory =
          res.data?.data;

        setCategories((prev) =>
          prev.map((item) =>
            item._id === editId
              ? updatedCategory
              : item
          )
        );

      } else {

        // CREATE
        const res = await axios.post(
          API_BASE,
          body
        );

        const newCategory =
          res.data?.data;

        setCategories((prev) => [
          newCategory,
          ...prev,
        ]);
      }

      // RESET
      setForm({
        categoryName: "",
        description: "",
      });

      setEditId(null);

      setShowForm(false);

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to save category"
      );

    } finally {

      setSubmitting(false);
    }
  };


  // ================= HANDLE DELETE =================
  const handleDelete = async (id) => {

    if (
      !window.confirm(
        "Delete this category?"
      )
    ) {
      return;
    }

    try {

      await axios.delete(
        `${API_BASE}/${id}`
      );

      setCategories((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );

    } catch (error) {

      console.error(error);

      alert("Failed to delete category");
    }
  };


  // ================= HANDLE EDIT =================
  const handleEdit = (category) => {

    setForm({
      categoryName:
        category.categoryName || "",
      description:
        category.description || "",
    });

    setEditId(category._id);

    setShowForm(true);
  };


  // ================= HANDLE CANCEL =================
  const handleCancel = () => {

    setShowForm(false);

    setEditId(null);

    setForm({
      categoryName: "",
      description: "",
    });

    setFormError("");
  };


  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">

          <h1 className="text-3xl font-bold text-gray-800">
            Categories
          </h1>

          <button
            onClick={() => {
              setShowForm(true);
              setEditId(null);
            }}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg"
          >
            Add Category
          </button>
        </div>


        {/* MODAL */}
        {showForm && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg relative">

              <button
                onClick={handleCancel}
                className="absolute top-3 right-3 text-2xl"
              >
                ×
              </button>

              <h2 className="text-xl font-semibold mb-5">

                {editId
                  ? "Update Category"
                  : "Add Category"}
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                <input
                  type="text"
                  name="categoryName"
                  placeholder="Category Name"
                  value={form.categoryName}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  rows={3}
                  value={form.description}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                />

                {formError && (
                  <div className="text-red-500 text-sm">
                    {formError}
                  </div>
                )}

                <div className="flex justify-end gap-3">

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-200 rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg"
                  >
                    {submitting
                      ? "Saving..."
                      : editId
                      ? "Update"
                      : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


        {/* LOADING */}
        {loading ? (

          <div className="text-center py-10">
            Loading...
          </div>

        ) : categories.length === 0 ? (

          <div className="text-center py-10 text-gray-500">
            No Categories Found
          </div>

        ) : (

          <div className="grid gap-5">

            {categories.map((category) => (

              <div
                key={category._id}
                className="bg-white border rounded-xl p-5 shadow-sm relative"
              >

                {/* ACTION BUTTONS */}
                <div className="absolute top-3 right-3 flex gap-2">

                  <button
                    onClick={() =>
                      handleEdit(category)
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
                  >
                    <FaRegEdit />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(category._id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                  >
                    <RiDeleteBin5Line />
                  </button>
                </div>


                {/* CATEGORY INFO */}
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {category.categoryName}
                </h2>

                <p className="text-gray-600 mb-3">
                  {category.description}
                </p>

                <div className="space-y-1 text-sm">

                  <div>
                    <span className="font-semibold">
                      Status:
                    </span>{" "}
                    {category.isActive
                      ? "Active"
                      : "Inactive"}
                  </div>

                  <div>
                    <span className="font-semibold">
                      Created:
                    </span>{" "}
                    {new Date(
                      category.createdAt
                    ).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;