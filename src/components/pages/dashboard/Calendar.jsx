import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const API_BASE = "https://nas-backend.onrender.com/api/v1/calendar";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setEvents(res.data?.data || []);
    } catch (err) {
      console.error("Fetch events error:", err);
      alert("Failed to fetch events — check console for details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // client-side validation
    if (!form.title.trim()) return setFormError("Title is required");
    if (!form.date.trim()) return setFormError("Date is required");
    if (!form.time.trim()) return setFormError("Time is required");

    setFormError("");

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to add or update an event.");
        setSubmitting(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (editId) {
        // UPDATE case
        const res = await axios.put(`${API_BASE}/${editId}`, form, config);
        const updatedEvent = res.data?.data || null;
        if (updatedEvent) {
          setEvents((prev) => prev.map((ev) => (ev._id === editId ? updatedEvent : ev)));
        } else {
          fetchEvents();
        }
      } else {
        // CREATE case
        const res = await axios.post(API_BASE, form, config);
        const newEvent = res.data?.data || null;
        if (newEvent) {
          setEvents((prev) => [newEvent, ...prev]);
        } else {
          fetchEvents();
        }
      }

      // reset form
      setForm({ title: "", date: "", time: "", description: "" });
      setShowForm(false);
      setEditId(null);
    } catch (err) {
      console.error("Event submit error:", err?.response || err);
      const serverMessage =
        err.response?.data?.message ||
        (typeof err.response?.data === "string" ? err.response.data : "") ||
        err.message;
      if (err.response?.status === 401) {
        alert("Unauthorized: Please login to add or update an event.");
      } else {
        alert("Failed to submit event: " + serverMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to delete an event.");
        return;
      }
      await axios.delete(`${API_BASE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents((prev) => prev.filter((ev) => ev._id !== id));
    } catch (err) {
      console.error("Delete event error:", err);
      const serverMessage = err.response?.data?.message || err.message;
      if (err.response?.status === 401) alert("Unauthorized: Please login.");
      else alert("Failed to delete event: " + serverMessage);
    }
  };

  const handleEdit = (event) => {
    setForm({
      title: event.title || "",
      date: event.date ? event.date.slice(0, 10) : "",
      time: event.time || "",
      description: event.description || "",
    });
    setEditId(event._id);
    setShowForm(true);
    setFormError("");
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setForm({ title: "", date: "", time: "", description: "" });
    setFormError("");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Calendar</h2>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded shadow transition"
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setForm({ title: "", date: "", time: "", description: "" });
            setFormError("");
          }}
        >
          Add Event
        </button>
      </div>

      {/* Popup Modal for Event Form */}
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
              {editId ? "Update Event" : "Add New Event"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                />
              </div>
              {formError && <div className="text-red-600 text-sm">{formError}</div>}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
                  disabled={submitting}
                >
                  {submitting ? (editId ? "Updating..." : "Adding...") : editId ? "Update Event" : "Add Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <svg className="animate-spin h-6 w-6 text-indigo-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <span className="text-gray-600">Loading events...</span>
        </div>
      ) : (
        <div>
          {events.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No events found.</div>
          ) : (
            <div className="grid gap-6">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="relative bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col gap-2"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{event.title}</h3>
                    <div className="text-indigo-600 font-medium mb-1">
                      {event.date ? new Date(event.date).toLocaleDateString() : ""}{" "}
                      {event.time}
                    </div>
                    {event.description && <p className="text-gray-600 mb-2">{event.description}</p>}
                  </div>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow transition"
                      title="Update"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow transition"
                      title="Delete"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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

export default Calendar;
