import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const API_BASE = "https://nas-backend.onrender.com/api/v1/notes";

// Mapping for displaying file size in a human readable format
function humanFileSize(sizeKB) {
  if (!sizeKB || sizeKB < 1) return "0 KB";
  if (sizeKB >= 1024) return `${(sizeKB / 1024).toFixed(2)} MB`;
  return `${sizeKB} KB`;
}

const DEFAULT_FORM = {
  title: "",
  url: "",
  desc: "",
  category: "",
  tags: "",
  img: "",
  file: null, // for upload only
  imgFile: null, // for image upload
};

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ ...DEFAULT_FORM });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const fileInputRef = useRef(null);
  const imgInputRef = useRef(null);

  // Fetch (all) notes
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setNotes(res.data?.data || []);
    } catch (err) {
      console.error("Fetch notes error:", err);
      alert("Failed to fetch notes — check console for details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name === "file" && type === "file") {
      setForm((prev) => ({ ...prev, file: files[0] || null }));
    } else if (name === "imgFile" && type === "file") {
      setForm((prev) => ({ ...prev, imgFile: files[0] || null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setFormError("");
  };

  // Validate form before submit
  const validate = () => {
    if (!form.title.trim()) return "Title is required";
    if (!editId && !form.file) return "File (PDF) is required";
    if (form.url && !/^https?:\/\//.test(form.url)) return "URL must be valid (http(s)://...)";
    // Optionally, image validation can go here
    return "";
  };

  // Submit Create/Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) return setFormError(error);

    setFormError("");
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("desc", form.desc || "");
    formData.append("category", form.category);
    formData.append("tags", form.tags);
    // The img (url, text input) only if not uploading an image file
    if (!form.imgFile) {
      formData.append("img", form.img || "");
    }
    // url is handled on backend as file upload endpoint, so omit url on upload
    if (form.file) formData.append("file", form.file);
    // If imgFile present, append for upload
    if (form.imgFile) formData.append("imgFile", form.imgFile);

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in.");
        setSubmitting(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (editId) {
        // UPDATE
        const res = await axios.put(`${API_BASE}/${editId}`, formData, config);
        const updated = res.data?.data;
        if (updated) {
          setNotes((prev) => prev.map((n) => (n._id === editId ? updated : n)));
        } else {
          fetchNotes();
        }
      } else {
        // CREATE
        const res = await axios.post(API_BASE, formData, config);
        const newNote = res.data?.data || null;
        if (newNote) {
          setNotes((prev) => [newNote, ...prev]);
        } else {
          fetchNotes();
        }
      }

      setForm({ ...DEFAULT_FORM });
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (imgInputRef.current) imgInputRef.current.value = "";
      setShowForm(false);
      setEditId(null);
    } catch (err) {
      console.error("Note submit error:", err?.response || err);
      const serverMessage =
        err.response?.data?.message ||
        (typeof err.response?.data === "string" ? err.response.data : "") ||
        err.message;
      if (err.response?.status === 401) {
        alert("Unauthorized: Please login.");
      } else {
        alert("Failed to submit note: " + serverMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Delete note
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to delete a note.");
        return;
      }
      await axios.delete(`${API_BASE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Delete note error:", err);
      const serverMessage = err.response?.data?.message || err.message;
      if (err.response?.status === 401) alert("Unauthorized: Please login.");
      else alert("Failed to delete note: " + serverMessage);
    }
  };

  // Edit note - populates form with Note fields except file/url/imgFile (file/img uploads cannot be re-populated)
  const handleEdit = (note) => {
    setForm({
      title: note.title || "",
      desc: note.desc || "",
      category: note.category || "",
      tags: (note.tags || []).join(", "),
      img: note.img || "",
      url: note.url || "",
      file: null,
      imgFile: null,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (imgInputRef.current) imgInputRef.current.value = "";
    setEditId(note._id);
    setShowForm(true);
    setFormError("");
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setForm({ ...DEFAULT_FORM });
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (imgInputRef.current) imgInputRef.current.value = "";
    setFormError("");
  };

  // CHANGES: 
  // - Make background color white and remove max-width constraint for full width
  // - make main container use w-full, bg-white, remove max-w-3xl, mx-auto, and adjust padding to px-0 for full width

  return (
    <div className="w-full bg-white px-0 py-8 min-h-screen">
      <div className="flex items-center justify-between mb-6 px-4">
        <h2 className="text-2xl font-bold text-gray-800">Notes</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded shadow transition text-sm"
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setForm({ ...DEFAULT_FORM });
            if (fileInputRef.current) fileInputRef.current.value = "";
            if (imgInputRef.current) imgInputRef.current.value = "";
            setFormError("");
          }}
        >
          Add Note
        </button>
      </div>

      {/* Popup Modal for Note Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={handleCancel}
              aria-label="Close"
              type="button"
            >
              &times;
            </button>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              {editId ? "Update Note" : "Add New Note"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={form.title}
                  maxLength={120}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <textarea
                  name="desc"
                  placeholder="Short Description"
                  value={form.desc}
                  maxLength={400}
                  onChange={handleChange}
                  rows={2}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="category"
                  placeholder="Category (e.g. subject/course name)"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="tags"
                  placeholder="Tags (comma separated)"
                  value={form.tags}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <input
                  ref={imgInputRef}
                  type="file"
                  name="imgFile"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700"
                />
                <div className="text-xs text-gray-400 mb-2">
                  Or, provide an image URL below (the uploaded image will override):
                </div>
                <input
                  type="text"
                  name="img"
                  placeholder="Cover Image URL (optional)"
                  value={form.img}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {form.imgFile && (
                  <div className="mt-1 text-xs text-green-600">
                    {form.imgFile.name} selected for upload
                  </div>
                )}
              </div>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  name="file"
                  accept="application/pdf"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700"
                />
                {editId && (
                  <div className="text-xs text-gray-500 mt-1">
                    Leave blank to keep existing PDF file.
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
                  className="px-3 py-1.5 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60 text-sm"
                  disabled={submitting}
                >
                  {submitting ? (editId ? "Updating..." : "Adding...") : editId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <svg className="animate-spin h-6 w-6 text-blue-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <span className="text-gray-600">Loading notes...</span>
        </div>
      ) : (
        <div className="w-full px-4">
          {notes.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No notes found.</div>
          ) : (
            <div className="grid gap-6">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="relative bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col gap-2"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {note.img && (
                      <img
                        src={note.img}
                        alt={note.title}
                        className="h-28 w-20 object-cover rounded border"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">{note.title}</h3>
                      <div className="text-sm text-gray-500 mb-1">
                        {note.category && <span className="px-2 py-0.5 border border-blue-200 bg-blue-50 rounded mr-2">{note.category}</span>}
                        {Array.isArray(note.tags)
                          ? note.tags.map((tag) =>
                              tag ? (
                                <span key={tag} className="border bg-gray-50 text-gray-600 px-2 rounded mr-1 text-xs">{tag}</span>
                              ) : null)
                          : null}
                      </div>
                      <p className="text-gray-600 mb-2 whitespace-pre-line">{note.desc || <span className="italic text-gray-400">(No description)</span>}</p>
                      <div className="flex items-center flex-wrap gap-2 text-sm">
                        <a
                          href={note.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-blue-600 hover:underline font-medium"
                        >
                          {note.url ? "View PDF" : "No PDF"}
                        </a>
                        {note.fileMeta && (
                          <span className="bg-gray-100 border rounded text-gray-500 px-2">{humanFileSize(note.fileMeta.sizeKB)}{note.fileMeta.pages ? ` • ${note.fileMeta.pages} pg` : ""}</span>
                        )}
                        <span className="text-gray-500 ml-2">
                          Views: {note.stats?.views ?? 0} • Downloads: {note.stats?.downloads ?? 0}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Uploaded: {note.createdAt ? new Date(note.createdAt).toLocaleString() : "—"}
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(note)}
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1.5 shadow transition"
                      title="Update"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow transition"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
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
      `}</style>
    </div>
  );
};

export default Notes;
