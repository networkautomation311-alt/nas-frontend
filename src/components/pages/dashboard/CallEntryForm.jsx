// =====================================
// src/components/pages/dashboard/CallEntryForm.jsx
// =====================================

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function formatTime24to12(time24) {
  if (!time24) return "";
  const parts = time24.split(":");
  const hour = parts[0];
  const min = parts[1] ?? "00";
  let h = parseInt(hour, 10);
  const m = min;
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m.padStart(2, "0")} ${ampm}`;
}

const API = "https://networkautomation.in/api/v1/call-entry-form";

const CallEntryForm = () => {
  // ==== STATES ====
  const [form, setForm] = useState({
    callDate: new Date().toISOString().split("T")[0],
    callTime: "",
    customer: "",
    customerType: "",
    endUser: "",
    department: "",
    callLoggedBy: "",
    warrantyInformation: "",
    callType: "",
    chargeAmount: 0,
    natureOfCall: "",
    instrument: "",
    problemDetails: "",
    preferredDate: "",
    preferredTimings: "",
    callAttempt: 1,
    callUrgency: "",
    callNotedBy: "",
    attachment: null,
  });

  const [attachment, setAttachment] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timingError, setTimingError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [callEntries, setCallEntries] = useState([]);
  const [editId, setEditId] = useState(null);

  // For file view modal
  const [fileViewUrl, setFileViewUrl] = useState(null);
  const [fileViewType, setFileViewType] = useState(null);
  const [showFileModal, setShowFileModal] = useState(false);

  // Dropdowns
  const [customers, setCustomers] = useState([]);
  const [customerTypes, setCustomerTypes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [callTypes, setCallTypes] = useState([]);
  const [urgencies, setUrgencies] = useState([]);
  const [problems, setProblems] = useState([]);

  // Daily Call Sheet state
  const [showDailySheet, setShowDailySheet] = useState(false);

  const navigate = useNavigate();

  // ==== FETCH MASTERS ====
  const fetchMasters = async () => {
    try {
      const [
        customerRes,
        customerTypeRes,
        departmentRes,
        callTypeRes,
        urgencyRes,
        problemRes,
      ] = await Promise.all([
        axios.get("https://networkautomation.in/api/v1/customer-master"),
        axios.get("https://networkautomation.in/api/v1/customer-type-master"),
        axios.get("https://networkautomation.in/api/v1/department"),
        axios.get("https://networkautomation.in/api/v1/call-master"),
        axios.get("https://networkautomation.in/api/v1/call-urgency"),
        axios.get("https://networkautomation.in/api/v1/problem"),
      ]);

      setCustomers(Array.isArray(customerRes.data) ? customerRes.data : customerRes.data.data || []);
      setCustomerTypes(Array.isArray(customerTypeRes.data) ? customerTypeRes.data : customerTypeRes.data.data || []);
      setDepartments(Array.isArray(departmentRes.data) ? departmentRes.data : departmentRes.data.data || []);
      setCallTypes(Array.isArray(callTypeRes.data) ? callTypeRes.data : callTypeRes.data.data || []);
      setUrgencies(Array.isArray(urgencyRes.data) ? urgencyRes.data : urgencyRes.data.data || []);
      setProblems(Array.isArray(problemRes.data) ? problemRes.data : problemRes.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ==== CRUD Fetch all call entries ====
  const fetchCallEntries = async () => {
    try {
      const res = await axios.get(API);
      setCallEntries(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMasters();
    fetchCallEntries();
  }, []);

  // Preferred Timings advanced handling
  useEffect(() => {
    if (form.preferredTimings && form.preferredTimings.includes("-")) { }
    // eslint-disable-next-line
  }, [form.preferredTimings]);

  function handleTimingsChange(type, value) {
    setTimingError("");
    let newStart = type === "start" ? value : startTime;
    let newEnd = type === "end" ? value : endTime;
    setStartTime(newStart);
    setEndTime(newEnd);

    if (newStart && newEnd) {
      if (newEnd <= newStart) {
        setTimingError("End Time must be after Start Time");
        setForm((f) => ({ ...f, preferredTimings: "" }));
        return;
      }
      const pretty = `${formatTime24to12(newStart)} - ${formatTime24to12(newEnd)}`;
      setForm((f) => ({ ...f, preferredTimings: pretty }));
    } else {
      setForm((f) => ({ ...f, preferredTimings: "" }));
    }
  }

  useEffect(() => {
    if (!showForm) {
      setStartTime("");
      setEndTime("");
      setTimingError("");
      setAttachment(null);
      setForm((form) => ({ ...form, preferredTimings: "" }));
      setEditId(null);
    }
  }, [showForm]);

  // ==== Handle Change ====
  const handleChange = (e) => {
    if (e.target.type === "file" && e.target.name === "attachment") {
      setAttachment(e.target.files[0]);
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  // ==== Submit Handler ====
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startTime || !endTime) {
      setTimingError("Please select valid start and end time.");
      return;
    }

    try {
      const cleanedData = {
        ...form,
        endUser: form.endUser || null,
        department: form.department || null,
        natureOfCall: form.natureOfCall || null,
        instrument: form.instrument || null,
        problemDetails: form.problemDetails || null,
        callUrgency: form.callUrgency || null,
      };

      if (attachment) {
        const submitData = new FormData();
        Object.keys(cleanedData).forEach((key) => {
          if (cleanedData[key] !== "" && cleanedData[key] !== null && cleanedData[key] !== undefined) {
            submitData.append(key, cleanedData[key]);
          }
        });
        submitData.append("attachment", attachment);

        if (editId) {
          await axios.put(`${API}/${editId}`, submitData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          alert("Call Entry Updated Successfully");
        } else {
          await axios.post(API, submitData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          alert("Call Entry Created Successfully");
        }
      } else {
        if (editId) {
          await axios.put(`${API}/${editId}`, cleanedData);
          alert("Call Entry Updated Successfully");
        } else {
          await axios.post(API, cleanedData);
          alert("Call Entry Created Successfully");
        }
      }

      fetchCallEntries();

      setEditId(null);
      setStartTime("");
      setEndTime("");
      setTimingError("");
      setAttachment(null);

      setForm({
        callDate: new Date().toISOString().split("T")[0],
        callTime: "",
        customer: "",
        customerType: "",
        endUser: "",
        department: "",
        callLoggedBy: "",
        warrantyInformation: "",
        callType: "",
        chargeAmount: 0,
        natureOfCall: "",
        instrument: "",
        problemDetails: "",
        preferredDate: "",
        preferredTimings: "",
        callAttempt: 1,
        callUrgency: "",
        callNotedBy: "",
        attachment: null,
      });

      setShowForm(false);
    } catch (error) {
      console.log(error.response?.data || error);
      alert("Failed to save call entry");
    }
  };

  // ==== Edit Handler ====
  const handleEdit = (item) => {
    setEditId(item._id);

    setForm({
      callDate: item.callDate?.split("T")[0] || "",
      callTime: item.callTime || "",
      customer: item.customer?._id || "",
      customerType: item.customerType?._id || "",
      endUser: item.endUser?._id || "",
      department: item.department?._id || "",
      callLoggedBy: item.callLoggedBy || "",
      warrantyInformation: item.warrantyInformation || "",
      callType: item.callType?._id || "",
      chargeAmount: item.chargeAmount || 0,
      natureOfCall: item.natureOfCall?._id || "",
      instrument: item.instrument?._id || "",
      problemDetails: item.problemDetails?._id || "",
      preferredDate: item.preferredDate?.split("T")[0] || "",
      preferredTimings: item.preferredTimings || "",
      callAttempt: item.callAttempt || 1,
      callUrgency: item.callUrgency?._id || "",
      callNotedBy: item.callNotedBy || "",
    });

    setAttachment(null);

    if (item.preferredTimings && item.preferredTimings.includes("-")) {
      const [from, to] = item.preferredTimings.split("-").map((s) => s.trim());
      const parseTo24 = (str) => {
        if (!str) return "";
        const [hm, ampm] = str.split(" ");
        if (!hm || !ampm) return "";
        let [h, m] = hm.split(":");
        h = parseInt(h, 10);
        if (ampm.toLowerCase() === "pm" && h !== 12) h += 12;
        if (ampm.toLowerCase() === "am" && h === 12) h = 0;
        return `${String(h).padStart(2, "0")}:${m.padStart(2, "0")}`;
      };
      setStartTime(parseTo24(from));
      setEndTime(parseTo24(to));
    } else {
      setStartTime("");
      setEndTime("");
    }

    setShowForm(true);
  };

  // ==== Delete Handler ====
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this call entry?")) {
      return;
    }
    try {
      await axios.delete(`${API}/${id}`);
      fetchCallEntries();
      alert("Deleted Successfully");
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  // ==== File View Handler ====
  const handleFileView = (item) => {
    if (item.attachment?.url) {
      const url = item.attachment.url;
      if (/\.(jpg|jpeg|png|gif|webp)$/i.test(url)) {
        setFileViewType("image");
      } else {
        setFileViewType("doc");
      }
      setFileViewUrl(url);
      setShowFileModal(true);
    }
  };

  // ==== Daily Call Sheet Handler ====
  const handleShowDailyCallSheet = () => {
    setShowDailySheet(true);
  };
  const handleCloseDailyCallSheet = () => {
    setShowDailySheet(false);
  };

  // Generate today's call entries
  const todayDate = new Date().toISOString().split("T")[0];
  const dailyEntries = callEntries.filter(
    (item) => (item.callDate && item.callDate.split("T")[0] === todayDate)
  );

  // ==== RENDER ==========
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(125deg, #f94144 0%, #f3722c 100%)",
        padding: "30px 0",
      }}
      className="min-h-screen"
    >
      {/* Top gradient header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white shadow-sm drop-shadow-sm">
            📞 Call Entry Management
          </h1>
          <div className="flex gap-2 mt-3 md:mt-0">
            {/* Add Call Entry */}
            <button
              onClick={() => {
                setEditId(null);
                setForm({
                  callDate: new Date().toISOString().split("T")[0],
                  callTime: "",
                  customer: "",
                  customerType: "",
                  endUser: "",
                  department: "",
                  callLoggedBy: "",
                  warrantyInformation: "",
                  callType: "",
                  chargeAmount: 0,
                  natureOfCall: "",
                  instrument: "",
                  problemDetails: "",
                  preferredDate: "",
                  preferredTimings: "",
                  callAttempt: 1,
                  callUrgency: "",
                  callNotedBy: "",
                  attachment: null,
                });
                setStartTime("");
                setEndTime("");
                setTimingError("");
                setAttachment(null);
                setShowForm(true);
              }}
              // SMALLER BUTTON
              className="bg-gradient-to-r from-red-500 to-orange-400 hover:from-orange-500 hover:to-red-500 text-white px-3 py-1.5 rounded-full font-semibold shadow transition flex items-center gap-2 text-sm"
            >
              <span style={{ fontWeight: 600 }}>+ Add Call Entry</span>
            </button>
            {/* Daily Call Sheet Button */}
            <button
              onClick={handleShowDailyCallSheet}
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-orange-700 hover:to-orange-400 text-white px-3 py-1.5 rounded-full font-semibold shadow transition text-sm"
              type="button"
            >
              Daily Call Sheet
            </button>
            {/* Calls Assigning Form */}
            <button
              onClick={() => {
                navigate("/dashboard/calls-assigning-form");
              }}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-600 hover:to-orange-400 text-white px-3 py-1.5 rounded-full font-semibold shadow transition text-sm"
              type="button"
            >
              Calls Assigning Form
            </button>
          </div>
        </div>

        {/* Daily Call Sheet Modal */}
        {showDailySheet && (
          <div
            className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60"
            onClick={handleCloseDailyCallSheet}
            style={{ background: "rgba(0,0,0,0.68)", cursor: "pointer" }}
          >
            <div
              className="bg-white rounded-xl p-5 pb-3 max-w-4xl w-full flex flex-col shadow-2xl"
              style={{ minHeight: 220, maxHeight: "90vh" }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={handleCloseDailyCallSheet}
                className="mb-2 ml-auto text-2xl text-red-400 hover:text-red-700"
                style={{ background: "none", border: 0, outline: 0 }}
              >
                ×
              </button>
              <h2 className="text-2xl font-bold text-red-600 mb-3">
                Today's Call Sheet ({todayDate})
              </h2>
              <div className="overflow-auto" style={{ maxHeight: "70vh" }}>
                {dailyEntries.length ? (
                  <table className="w-full min-w-max border-collapse rounded mb-4">
                    <thead>
                      <tr style={{ background: "#fff0f0" }}>
                        <th className="p-2 text-left text-red-600 font-semibold">Call No</th>
                        <th className="p-2 text-left text-red-600 font-semibold">Customer</th>
                        <th className="p-2 text-left text-red-600 font-semibold">Problem</th>
                        <th className="p-2 text-left text-red-600 font-semibold">Call Time</th>
                        <th className="p-2 text-left text-red-600 font-semibold">Preferred Timings</th>
                        <th className="p-2 text-left text-red-600 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dailyEntries.map((item) => (
                        <tr key={item._id} className="even:bg-red-50 odd:bg-white">
                          <td className="p-2 font-semibold text-red-700">{item.callNo}</td>
                          <td className="p-2">
                            {
                              item.customer?.customerName ||
                              item.customer?.name ||
                              item.customer?.customer ||
                              item.customer?.title ||
                              "-"
                            }
                          </td>
                          <td className="p-2">{item.problemDetails?.problemName || "-"}</td>
                          <td className="p-2">{item.callTime ? formatTime24to12(item.callTime) : "-"}</td>
                          <td className="p-2">{item.preferredTimings || "-"}</td>
                          <td className="p-2">
                            {/* Placeholder for status, update as per requirement */}
                            Pending
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-red-500 font-semibold opacity-60 p-8 text-center">
                    No calls for today.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {showForm && (
          <div
            className="w-full max-w-3xl mx-auto rounded-2xl relative flex flex-col overflow-hidden transition-all duration-300 border-0"
            style={{
              background: "linear-gradient(135deg, #ffe5e0 7%, #fff3ed 100%)",
              boxShadow: "0 6px 30px 0 rgba(239, 68, 68, 0.18)",
              border: "2px solid #ffe6e6",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-3xl text-red-400 hover:text-red-600 font-semibold transition"
              aria-label="Close"
              type="button"
              style={{ background: "none", border: 0 }}
            >
              ×
            </button>
            {/* Header */}
            <div className="px-8 pt-8 pb-0 border-b-0 flex flex-col gap-1 mb-0">
              <h2 className="text-3xl font-bold text-red-500/90">Call Entry Form</h2>
              <p className="text-gray-500 text-base mb-4">Service Call Management</p>
            </div>
            {/* Form */}
            <div className="overflow-y-auto px-8 pb-8 pt-1 flex-1">
              <form
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-5"
                autoComplete="off"
              >
                {/* CALL DATE */}
                <div>
                  <label className="block mb-2 font-medium text-red-700">
                    Call Date
                  </label>
                  <input
                    type="date"
                    name="callDate"
                    value={form.callDate}
                    onChange={handleChange}
                    className="w-full border-2 border-red-200 focus:border-red-400 bg-white p-3 rounded-xl outline-none transition"
                  />
                </div>
                {/* CALL TIME */}
                <div>
                  <label className="block mb-2 font-medium text-red-700">
                    Call Time
                  </label>
                  <input
                    type="time"
                    name="callTime"
                    value={form.callTime}
                    onChange={handleChange}
                    className="w-full border-2 border-red-200 focus:border-red-400 bg-white p-3 rounded-xl outline-none transition"
                  />
                  {form.callTime && (
                    <p className="text-xs text-red-500 mt-1 font-semibold">
                      {formatTime24to12(form.callTime)}
                    </p>
                  )}
                </div>
                {/* CUSTOMER */}
                <div>
                  <label className="block mb-2 font-medium text-red-700">
                    Customer
                  </label>
                  <select
                    name="customer"
                    value={form.customer}
                    onChange={handleChange}
                    className="w-full border-2 border-red-200 focus:border-red-400 bg-white p-3 rounded-xl"
                    required
                  >
                    <option value="">Select Customer</option>
                    {customers.map((item) => {
                      const label =
                        item.customerName ||
                        item.name ||
                        item.customer ||
                        item.title ||
                        `Customer (${item._id || "?"})`;
                      return (
                        <option
                          key={item._id || item.id || item.value || label}
                          value={item._id || item.id || item.value || label}
                        >
                          {label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {/* CUSTOMER TYPE */}
                <div>
                  <label className="block mb-2 font-medium text-red-700">
                    Customer Type
                  </label>
                  <select
                    name="customerType"
                    value={form.customerType}
                    onChange={handleChange}
                    className="w-full border-2 border-red-200 focus:border-red-400 bg-white p-3 rounded-xl"
                    required
                  >
                    <option value="">Select Type</option>
                    {customerTypes.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.customerTypeName}
                      </option>
                    ))}
                  </select>
                </div>
                {/* DEPARTMENT */}
                <div>
                  <label className="block mb-2 font-medium text-red-700">
                    Department
                  </label>
                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    className="w-full border-2 border-red-200 focus:border-red-400 bg-white p-3 rounded-xl"
                  >
                    <option value="">Select Department</option>
                    {departments.map((item) => {
                      const label =
                        item.departmentName ||
                        item.name ||
                        item.department ||
                        item.title ||
                        `Department (${item._id || "?"})`;
                      return (
                        <option
                          key={item._id || item.id || item.value || label}
                          value={item._id || item.id || item.value || label}
                        >
                          {label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {/* CALL TYPE */}
                <div>
                  <label className="block mb-2 font-medium text-red-700">
                    Call Type
                  </label>
                  <select
                    name="callType"
                    value={form.callType}
                    onChange={handleChange}
                    className="w-full border-2 border-red-200 focus:border-red-400 bg-white p-3 rounded-xl"
                    required
                  >
                    <option value="">Select Call Type</option>
                    {callTypes.map((item) => {
                      const label =
                        item.callTypeName ||
                        item.name ||
                        item.callType ||
                        item.title ||
                        `Call Type (${item._id || "?"})`;
                      return (
                        <option
                          key={item._id || item.id || item.value || label}
                          value={item._id || item.id || item.value || label}
                        >
                          {label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {/* CHARGE */}
                <div>
                  <label className="block mb-2 font-medium text-red-700">
                    Charge Amount
                  </label>
                  <input
                    type="number"
                    name="chargeAmount"
                    value={form.chargeAmount}
                    onChange={handleChange}
                    className="w-full border-2 border-red-200 focus:border-red-400 bg-white p-3 rounded-xl"
                  />
                </div>
                {/* PREFERRED DATE */}
                <div>
                  <label className="block mb-2 font-medium text-red-700">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={form.preferredDate}
                    onChange={handleChange}
                    className="w-full border-2 border-red-200 focus:border-red-400 bg-white p-3 rounded-xl"
                  />
                </div>
                {/* ADVANCED PREFERRED TIMINGS FIELD */}
                <div className="flex flex-col space-y-2">
                  <label className="block font-medium mb-1 text-red-700">
                    Preferred Timings <span className="font-bold text-red-800">*</span>
                  </label>
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex flex-col w-1/2">
                      <span className="text-xs text-red-500 mb-1">Start Time</span>
                      <input
                        type="time"
                        value={startTime}
                        onChange={e => handleTimingsChange("start", e.target.value)}
                        className="border-2 border-red-200 focus:border-red-400 bg-white rounded-xl p-3 w-full focus:ring-red-200 transition"
                        required
                      />
                    </div>
                    <span className="text-lg font-semibold text-red-400 select-none">—</span>
                    <div className="flex flex-col w-1/2">
                      <span className="text-xs text-red-500 mb-1">End Time</span>
                      <input
                        type="time"
                        value={endTime}
                        onChange={e => handleTimingsChange("end", e.target.value)}
                        className="border-2 border-red-200 focus:border-red-400 bg-white rounded-xl p-3 w-full focus:ring-red-200 transition"
                        required
                        min={startTime || undefined}
                      />
                    </div>
                  </div>
                  {form.preferredTimings && !timingError && (
                    <div className="text-red-700 text-sm mt-1 italic">
                      {form.preferredTimings}
                    </div>
                  )}
                  {timingError && (
                    <div className="text-red-600 text-sm mt-1">
                      {timingError}
                    </div>
                  )}
                </div>
                {/* CALL ATTEMPT */}
                <div>
                  <label className="block mb-2 font-medium text-red-700">
                    Call Attempt
                  </label>
                  <input
                    type="number"
                    name="callAttempt"
                    value={form.callAttempt}
                    onChange={handleChange}
                    className="w-full border-2 border-red-200 focus:border-red-400 bg-white p-3 rounded-xl"
                  />
                </div>
                {/* CALL URGENCY */}
                <div>
                  <label className="block mb-2 font-medium text-red-700">
                    Call Urgency
                  </label>
                  <select
                    name="callUrgency"
                    value={form.callUrgency}
                    onChange={handleChange}
                    className="w-full border-2 border-red-200 focus:border-red-400 bg-white p-3 rounded-xl"
                  >
                    <option value="">Select Urgency</option>
                    {urgencies.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.urgencyType || item.urgencyLevel || item.name || item.title || "Urgency"}
                      </option>
                    ))}
                  </select>
                </div>
                {/* CALL LOGGED BY */}
                <div>
                  <label className="block mb-2 font-medium text-red-700">
                    Call Logged By
                  </label>
                  <input
                    type="text"
                    name="callLoggedBy"
                    value={form.callLoggedBy}
                    onChange={handleChange}
                    className="w-full border-2 border-red-200 focus:border-red-400 bg-white p-3 rounded-xl"
                  />
                </div>
                {/* CALL NOTED BY */}
                <div>
                  <label className="block mb-2 font-medium text-red-700">
                    Call Noted By
                  </label>
                  <input
                    type="text"
                    name="callNotedBy"
                    value={form.callNotedBy}
                    onChange={handleChange}
                    className="w-full border-2 border-red-200 focus:border-red-400 bg-white p-3 rounded-xl"
                  />
                </div>
                {/* WARRANTY */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium text-red-700">
                    Warranty Information
                  </label>
                  <textarea
                    name="warrantyInformation"
                    value={form.warrantyInformation}
                    onChange={handleChange}
                    className="w-full border-2 border-red-200 focus:border-red-400 bg-white p-3 rounded-xl"
                    rows={3}
                  />
                </div>
                {/* PROBLEM DETAILS */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium text-red-700">
                    Problem Details
                  </label>
                  <select
                    name="problemDetails"
                    value={form.problemDetails}
                    onChange={handleChange}
                    className="w-full border-2 border-red-200 focus:border-red-400 bg-white p-3 rounded-xl"
                  >
                    <option value="">Select Problem</option>
                    {problems.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.problemName}
                      </option>
                    ))}
                  </select>
                </div>
                {/* ATTACHMENT */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium text-red-700">
                    Attachment (Image or File)
                  </label>
                  <input
                    type="file"
                    name="attachment"
                    accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx"
                    onChange={handleChange}
                    className="w-full border-2 border-red-200 focus:border-red-400 bg-white p-3 rounded-xl"
                  />
                  {attachment && (
                    <p className="text-sm text-red-600 mt-1 font-semibold">
                      Selected: {attachment.name}
                    </p>
                  )}
                </div>
                {/* SUBMIT BUTTON */}
                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-red-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white px-5 py-2 rounded-xl font-semibold shadow transition disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                    disabled={!startTime || !endTime || !!timingError || endTime <= startTime}
                  >
                    {editId ? "Update Call Entry" : "Save Call Entry"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* FILE VIEW MODAL */}
        {showFileModal && (
          <div
            className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60"
            onClick={() => setShowFileModal(false)}
            style={{ background: "rgba(0,0,0,0.68)", cursor:"pointer" }}
          >
            <div
              className="bg-white rounded-xl p-5 pb-3 flex flex-col items-center max-w-xl w-full shadow-2xl"
              style={{ minHeight: fileViewType === "image" ? 300 : 160 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowFileModal(false)}
                className="mb-4 ml-auto text-2xl text-red-400 hover:text-red-700"
                style={{ background: "none", border: 0, outline: 0 }}
              >
                ×
              </button>
              {fileViewType === "image" ? (
                <img
                  src={fileViewUrl}
                  alt="Attachment View"
                  className="max-w-full max-h-[60vh] rounded shadow"
                  style={{ background: "#fff" }}
                />
              ) : fileViewType === "doc" ? (
                /\.(pdf)$/i.test(fileViewUrl) ? (
                  <iframe
                    src={fileViewUrl}
                    title="File View"
                    className="w-full"
                    style={{ minHeight: 440, maxHeight: "68vh" }}
                  ></iframe>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <p className="mb-2 text-sm text-red-700 font-semibold">File cannot be previewed. Please download to view.</p>
                    <a
                      href={fileViewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-1.5 bg-gradient-to-r from-red-500 to-orange-400 text-white rounded-xl font-semibold shadow hover:from-orange-600 hover:to-red-500 transition text-sm"
                    >
                      Download File
                    </a>
                  </div>
                )
              ) : null}
            </div>
          </div>
        )}

        {/* CRUD TABLE */}
        <div
          className="rounded-2xl shadow-xl p-6 mt-10 overflow-x-auto"
          style={{
            background: "linear-gradient(120deg, #fff1f1 70%, #ffe5e0 100%)",
            border: "1.5px solid #ffe5e0",
            boxShadow: "0 4px 32px 0 #f9414420"
          }}
        >
          <h2 className="text-2xl font-bold mb-4 text-red-600">
            Call Entry List
          </h2>
          <table className="w-full min-w-max border-collapse rounded">
            <thead>
              <tr style={{ background: "linear-gradient(90deg,#fa5252,#fd7e14, #fff2e6)" }}>
                <th className="p-3 text-left text-white font-semibold">Call No</th>
                <th className="p-3 text-left text-white font-semibold">Call Date</th>
                <th className="p-3 text-left text-white font-semibold">Call Time</th>
                <th className="p-3 text-left text-white font-semibold">Customer</th>
                <th className="p-3 text-left text-white font-semibold">Customer Type</th>
                <th className="p-3 text-left text-white font-semibold">Department</th>
                <th className="p-3 text-left text-white font-semibold">Call Type</th>
                <th className="p-3 text-left text-white font-semibold">Problem</th>
                <th className="p-3 text-left text-white font-semibold">Urgency</th>
                <th className="p-3 text-left text-white font-semibold">Charge Amount</th>
                <th className="p-3 text-left text-white font-semibold">Preferred Date</th>
                <th className="p-3 text-left text-white font-semibold">Preferred Timings</th>
                <th className="p-3 text-left text-white font-semibold">Call Attempt</th>
                <th className="p-3 text-left text-white font-semibold">Call Logged By</th>
                <th className="p-3 text-left text-white font-semibold">Call Noted By</th>
                <th className="p-3 text-left text-white font-semibold">Warranty Information</th>
                <th className="p-3 text-left text-white font-semibold">Attachment</th>
                <th className="p-3 text-center text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {callEntries.map((item, idx) => (
                <tr
                  key={item._id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-red-50/50 hover:bg-orange-50"}
                  style={{
                    transition: "background 0.22s cubic-bezier(.77,.05,.34,1.06)",
                  }}
                >
                  <td className="p-3 font-semibold text-red-700">{item.callNo}</td>
                  <td className="p-3">{item.callDate ? new Date(item.callDate).toLocaleDateString() : "-"}</td>
                  <td className="p-3">
                    {item.callTime ? formatTime24to12(item.callTime) : "-"}
                  </td>
                  <td className="p-3">
                    {
                      item.customer?.customerName ||
                      item.customer?.name ||
                      item.customer?.customer ||
                      item.customer?.title ||
                      "-"
                    }
                  </td>
                  <td className="p-3">
                    {
                      item.customerType?.customerTypeName ||
                      item.customerType?.name ||
                      item.customerType?.title ||
                      "-"
                    }
                  </td>
                  <td className="p-3">
                    {item.department?.departmentName || "-"}
                  </td>
                  <td className="p-3">
                    {item.callType?.callType || "-"}
                  </td>
                  <td className="p-3">
                    {item.problemDetails?.problemName || "-"}
                  </td>
                  <td className="p-3">
                    {
                      item.callUrgency?.urgencyType ||
                      item.callUrgency?.urgencyLevel ||
                      item.callUrgency?.name ||
                      item.callUrgency?.title ||
                      "-"
                    }
                  </td>
                  <td className="p-3 font-bold text-red-600">
                    ₹{item.chargeAmount || 0}
                  </td>
                  <td className="p-3">
                    {item.preferredDate
                      ? new Date(item.preferredDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="p-3">
                    {item.preferredTimings || "-"}
                  </td>
                  <td className="p-3">{item.callAttempt || "-"}</td>
                  <td className="p-3">{item.callLoggedBy || "-"}</td>
                  <td className="p-3">{item.callNotedBy || "-"}</td>
                  <td className="p-3 max-w-xs break-words">{item.warrantyInformation || "-"}</td>
                  {/* ATTACHMENT */}
                  <td className="p-3">
                    {item.attachment?.url ? (
                      <span
                        style={{ cursor: "pointer", color: "#dc2626", textDecoration: "underline", fontWeight: 600 }}
                        title="View Attachment"
                        onClick={() => handleFileView(item)}
                        tabIndex={0}
                        onKeyDown={e => {
                          if (e.key === "Enter" || e.key === " ") handleFileView(item);
                        }}
                      >
                        {/\.(jpg|jpeg|png|gif|webp)$/i.test(item.attachment.url)
                          ? "View Image"
                          : "View File"}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-gradient-to-r from-red-600 to-orange-400 hover:to-red-700 text-white px-2 py-1 rounded-lg flex items-center gap-1 font-semibold shadow text-sm"
                      style={{ minWidth: "32px" }}
                      title="Edit"
                    >
                      <FaRegEdit aria-label="edit" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-gradient-to-r from-orange-400 to-red-600 hover:from-red-600 hover:to-orange-500 text-white px-2 py-1 rounded-lg flex items-center gap-1 font-semibold shadow text-sm"
                      style={{ minWidth: "32px" }}
                      title="Delete"
                    >
                      <RiDeleteBin6Line aria-label="delete" />
                    </button>
                  </td>
                </tr>
              ))}
              {callEntries.length === 0 && (
                <tr>
                  <td colSpan={18} className="text-center p-8 text-red-400 font-semibold text-lg opacity-60">
                    No Call Entries Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CallEntryForm;