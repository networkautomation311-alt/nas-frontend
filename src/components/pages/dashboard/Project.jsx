import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const API_BASE = "http://localhost:5000/api/v1/project";
const CATEGORY_API_BASE = "http://localhost:5000/api/v1/category";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formError, setFormError] = useState("");

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setProducts(res.data?.data || []);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH CATEGORIES =================
  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_API_BASE);
      setCategories(res.data?.data || []);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchProducts();
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

    if (!form.name.trim()) {
      return setFormError("Product name is required");
    }

    if (!form.description.trim()) {
      return setFormError("Description is required");
    }

    if (!form.category.trim()) {
      return setFormError("Category is required");
    }

    if (!form.price) {
      return setFormError("Price is required");
    }

    if (!form.stock) {
      return setFormError("Stock is required");
    }

    const body = {
      name: form.name,
      description: form.description,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    try {
      setSubmitting(true);

      if (editId) {
        // UPDATE
        const res = await axios.put(
          `${API_BASE}/${editId}`,
          body
        );

        const updatedProduct = res.data?.data;

        setProducts((prev) =>
          prev.map((item) =>
            item._id === editId
              ? updatedProduct
              : item
          )
        );
      } else {
        // CREATE
        const res = await axios.post(
          API_BASE,
          body
        );

        const newProduct = res.data?.data;

        setProducts((prev) => [
          newProduct,
          ...prev,
        ]);
      }

      // RESET
      setForm({
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
      });

      setEditId(null);
      setShowForm(false);

    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        "Failed to save product"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ================= HANDLE DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) {
      return;
    }

    try {
      await axios.delete(`${API_BASE}/${id}`);

      setProducts((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  // ================= HANDLE EDIT =================
  const handleEdit = (product) => {
    setForm({
      name: product.name || "",
      description: product.description || "",
      category: product.category || "",
      price: product.price || "",
      stock: product.stock || "",
    });

    setEditId(product._id);

    setShowForm(true);
  };

  // ================= HANDLE CANCEL =================
  const handleCancel = () => {
    setShowForm(false);

    setEditId(null);

    setForm({
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
    });

    setFormError("");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Products
          </h1>

          <button
            onClick={() => {
              setShowForm(true);
              setEditId(null);
            }}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg"
          >
            Add Product
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
                  ? "Update Product"
                  : "Add Product"}
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={form.name}
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

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option
                      key={category._id}
                      value={category._id}
                    >
                      {category.categoryName}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                />

                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={form.stock}
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
        ) : products.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No Products Found
          </div>
        ) : (
          <div className="grid gap-5">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white border rounded-xl p-5 shadow-sm relative"
              >
                {/* ACTION BUTTONS */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
                  >
                    <FaRegEdit />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(product._id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                  >
                    <RiDeleteBin5Line />
                  </button>
                </div>

                {/* PRODUCT INFO */}
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h2>

                <p className="text-gray-600 mb-3">
                  {product.description}
                </p>

                <div className="space-y-1 text-sm">
                  <div>
                    <span className="font-semibold">
                      Category:
                    </span>{" "}
                    {categories.find((cat) => cat._id === product.category)?.categoryName ||
                      product.category}
                  </div>

                  <div>
                    <span className="font-semibold">
                      Price:
                    </span>{" "}
                    ₹{product.price}
                  </div>

                  <div>
                    <span className="font-semibold">
                      Stock:
                    </span>{" "}
                    {product.stock}
                  </div>

                  <div>
                    <span className="font-semibold">
                      Status:
                    </span>{" "}
                    {product.isActive
                      ? "Active"
                      : "Inactive"}
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

export default Product;