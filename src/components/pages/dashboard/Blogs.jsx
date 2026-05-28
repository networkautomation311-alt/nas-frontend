import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const API_BASE = "https://portfolio-backend-3nr9.onrender.com/api/v1/blog";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    tagline: "",
    description: "",
    link: "",
    image: null,
  });
  const [loading, setLoading] = useState(false); // for fetching list
  const [submitting, setSubmitting] = useState(false); // for form submit
  const [formError, setFormError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null); // null means add, otherwise update
  const fileInputRef = useRef(null);

  // Fetch blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setBlogs(res.data?.data || []);
    } catch (err) {
      console.error("Fetch blogs error:", err);
      alert("Failed to fetch blogs — check console for details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name === "image" && type === "file") {
      setForm((prev) => ({ ...prev, image: files[0] || null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // client-side validation
    if (!form.title.trim()) return setFormError("Title is required");
    if (!form.tagline.trim()) return setFormError("Tagline is required");
    if (!form.description.trim()) return setFormError("Description is required");
    if (!form.link.trim()) return setFormError("Link is required");
    if (!editId && !form.image) return setFormError("Image is required");

    setFormError("");
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("tagline", form.tagline);
    formData.append("description", form.description);
    formData.append("link", form.link);
    // only append image if user selected one (for update we allow leaving blank)
    if (form.image) formData.append("image", form.image);

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to add or update a blog.");
        setSubmitting(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          // do NOT set 'Content-Type' manually for FormData; let browser set boundary
        },
      };

      if (editId) {
        // UPDATE case
        const res = await axios.put(`${API_BASE}/${editId}`, formData, config);

        // If backend returns updated blog in res.data.data (common), update list locally:
        const updatedBlog = res.data?.data || null;
        if (updatedBlog) {
          setBlogs((prev) => prev.map((b) => (b._id === editId ? updatedBlog : b)));
        } else {
          fetchBlogs();
        }
      } else {
        // CREATE case
        const res = await axios.post(API_BASE, formData, config);
        const newBlog = res.data?.data || null;
        if (newBlog) {
          setBlogs((prev) => [newBlog, ...prev]);
        } else {
          fetchBlogs();
        }
      }

      // reset form
      setForm({ title: "", tagline: "", description: "", link: "", image: null });
      if (fileInputRef.current) fileInputRef.current.value = "";
      setShowForm(false);
      setEditId(null);
    } catch (err) {
      console.error("Blog submit error:", err?.response || err);
      const serverMessage =
        err.response?.data?.message ||
        (typeof err.response?.data === "string" ? err.response.data : "") ||
        err.message;
      if (err.response?.status === 401) {
        alert("Unauthorized: Please login to add or update a blog.");
      } else {
        alert("Failed to submit blog: " + serverMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to delete a blog.");
        return;
      }
      await axios.delete(`${API_BASE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Delete blog error:", err);
      const serverMessage = err.response?.data?.message || err.message;
      if (err.response?.status === 401) alert("Unauthorized: Please login.");
      else alert("Failed to delete blog: " + serverMessage);
    }
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title || "",
      tagline: blog.tagline || "",
      description: blog.description || "",
      link: blog.link || "",
      image: null, // Don't prefill file input
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
    setEditId(blog._id);
    setShowForm(true);
    setFormError("");
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setForm({ title: "", tagline: "", description: "", link: "", image: null });
    if (fileInputRef.current) fileInputRef.current.value = "";
    setFormError("");
  };

  return (
    <div className="w-full min-h-screen bg-white px-0 py-0">
      <div className="w-full max-w-6xl mx-auto px-2 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Blogs</h2>
          <button
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-3 py-1.5 rounded shadow transition text-sm"
            onClick={() => {
              setShowForm(true);
              setEditId(null);
              setForm({ title: "", tagline: "", description: "", link: "", image: null });
              if (fileInputRef.current) fileInputRef.current.value = "";
              setFormError("");
            }}
          >
            Add Blog
          </button>
        </div>

        {/* Popup Modal for Blog Form */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fade-in">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold h-8 w-8 flex items-center justify-center"
                onClick={handleCancel}
                aria-label="Close"
                type="button"
                style={{ lineHeight: 1 }}
              >
                &times;
              </button>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                {editId ? "Update Blog" : "Add New Blog"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="tagline"
                    placeholder="Tagline"
                    value={form.tagline}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <div>
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="link"
                    placeholder="Link"
                    value={form.link}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-pink-50 file:text-pink-700"
                  />
                  {editId && (
                    <div className="text-xs text-gray-500 mt-1">
                      {`Leave blank to keep existing image.`}
                    </div>
                  )}
                </div>
                {formError && <div className="text-red-600 text-sm">{formError}</div>}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-sm"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded bg-pink-600 text-white font-semibold hover:bg-pink-700 transition disabled:opacity-60 text-sm"
                    disabled={submitting}
                  >
                    {submitting ? (editId ? "Updating..." : "Adding...") : editId ? "Update Blog" : "Add Blog"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <svg className="animate-spin h-6 w-6 text-pink-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span className="text-gray-600">Loading blogs...</span>
          </div>
        ) : (
          <div>
            {blogs.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No blogs found.</div>
            ) : (
              <div className="grid gap-6">
                {blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="relative border border-gray-200 bg-white rounded-lg transition p-6 flex flex-col md:flex-row gap-4 w-full"
                  >
                    {/* Buttons top, away from image */}
                    <div className="flex w-full justify-end gap-2 mb-2 md:mb-0 md:absolute md:top-2 md:right-2 z-10">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1.5 shadow transition h-8 w-8 flex items-center justify-center"
                        title="Update"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow transition h-8 w-8 flex items-center justify-center"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex flex-col md:flex-row w-full gap-4">
                      {blog.image && (
                        <div className="flex-shrink-0 w-full md:w-48 flex items-center justify-center">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="rounded-md object-cover w-full h-auto"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">{blog.title}</h3>
                        {blog.tagline && <p className="text-pink-600 font-medium mb-1">{blog.tagline}</p>}
                        <p className="text-gray-600 mb-2">{blog.description}</p>
                        <a
                          href={blog.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-pink-600 hover:underline font-medium"
                        >
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* Simple fade-in animation for modal */}
        <style>{`
          .animate-fade-in {
            animation: fadeIn 0.2s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98);}
            to { opacity: 1; transform: scale(1);}
          }
          @media (max-width: 767px) {
            /* For small screens, remove absolute and keep flex at top with margin */
            .blog-action-btns {
              position: static !important;
              margin-bottom: 0.5rem !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Blog;
