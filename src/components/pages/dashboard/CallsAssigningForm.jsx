// =====================================
// src/components/pages/dashboard/CallsAssigningForm.jsx
// =====================================

import { useState, useEffect } from "react";
import axios from "axios";

// --- Utility function ---
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

// API endpoint for call assignments
const API = "https://networkautomation.in/api/v1/calls-assigning";

const CallsAssigningForm = () => {
  // =====================================
  // STATES
  // =====================================
  const [formData, setFormData] = useState({
    department: "",
    callType: "",
    natureOfCall: "",
    instrument: "",
    problem: "",
    preferredDate: "",
    preferredTime: "",
    assignDate: new Date().toISOString().split("T")[0],
    assignTime: "",
    employee: "",
    customer: "",
    endUser: "",
    remarks: "",
    assignedBy: "",
    // status: "",           // Removed status
    priority: "",
    targetDate: "",
    targetTime: "",
    approxCloseTime: "",
    callNo: "",
    designation: "",
    // amc: "",
    // warranty: "",
    // charges: "",
    // callDate: "",
    // callTime: "",
    // Files handled separately
  });

  const resetFormData = () => ({
    department: "",
    callType: "",
    natureOfCall: "",
    instrument: "",
    problem: "",
    preferredDate: "",
    preferredTime: "",
    assignDate: new Date().toISOString().split("T")[0],
    assignTime: "",
    employee: "",
    customer: "",
    endUser: "",
    remarks: "",
    assignedBy: "",
    // status: "",           // Removed status
    priority: "",
    targetDate: "",
    targetTime: "",
    approxCloseTime: "",
    callNo: "",
    designation: "",
    // amc: "",
    // warranty: "",
    // charges: "",
    // callDate: "",
    // callTime: "",
  });

  // MODAL REMOVED; ADD showForm STATE INSTEAD
  const [showForm, setShowForm] = useState(false);

  const [attachment, setAttachment] = useState(null);
  const [audio, setAudio] = useState(null);

  const [assignments, setAssignments] = useState([]);
  const [editId, setEditId] = useState(null);

  const [calls, setCalls] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [callTypes, setCallTypes] = useState([]);
  const [natures, setNatures] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [problems, setProblems] = useState([]);
  const [employees, setEmployees] = useState([]);
  // const [statuses, setStatuses] = useState([]); // Removed status
  const [priorities, setPriorities] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [endUsers, setEndUsers] = useState([]);
  const [designations, setDesignations] = useState([]);

  // ================================
  // NEW: Technician Names for Assigned By - fetch from technician-master
  // ================================
  const [technicianNames, setTechnicianNames] = useState([]);

  // =====================================
  // FETCH API DATA FOR ALL MASTERS
  // =====================================

  const fetchMasters = async () => {
    try {
      // fetching functions
      const fetchAndSet = async (url, setFn) => {
        const res = await axios.get(url);
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
            ? res.data.data
            : [];
        setFn(data);
      };

      await Promise.all([
        fetchAndSet("https://networkautomation.in/api/v1/call-entry-form", setCalls),
        fetchAndSet("https://networkautomation.in/api/v1/department", setDepartments),
        fetchAndSet("https://networkautomation.in/api/v1/call-master", setCallTypes),
        (async () => {
          const res = await axios.get("https://networkautomation.in/api/v1/call-nature-master");
          const data = Array.isArray(res.data)
            ? res.data
            : Array.isArray(res.data.data)
              ? res.data.data
              : [];
          setNatures(data);
        })(),
        fetchAndSet("https://networkautomation.in/api/v1/instrument-master", setInstruments),
        fetchAndSet("https://networkautomation.in/api/v1/problem", setProblems),
        fetchAndSet("https://networkautomation.in/api/v1/employee-master", setEmployees),
        // fetchAndSet("https://networkautomation.in/api/v1/status-master", setStatuses), // Removed status
        fetchAndSet("https://networkautomation.in/api/v1/call-urgency", setPriorities),
        fetchAndSet("https://networkautomation.in/api/v1/customer-master", setCustomers),
        fetchAndSet("https://networkautomation.in/api/v1/end-user-master", setEndUsers),
        fetchAndSet("https://networkautomation.in/api/v1/designation-master", setDesignations),
        // Fetch technician names for "Assigned By" from Technician Master
        (async () => {
          const res = await axios.get("https://networkautomation.in/api/v1/technician-master");
          // Use technicianName (or name) as option value
          let technicians =
            Array.isArray(res.data)
              ? res.data
              : Array.isArray(res.data.data)
              ? res.data.data
              : [];
          // Deduplicate by name if needed
          technicians = technicians.filter(
            (item, idx, arr) =>
              arr.findIndex(
                (el) => (el.technicianName || el.name) === (item.technicianName || item.name)
              ) === idx
          );
          setTechnicianNames(technicians);
        })(),
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  // --- CALL ENTRY FORM DETAILS FETCHER ---
  // Fetch CallType from call entry form (amc, warranty, charges, callDate, callTime are now IGNOREd)
  const fetchCallEntryFormDetails = async (callNoId) => {
    if (!callNoId) return;
    try {
      const res = await axios.get(
        `https://networkautomation.in/api/v1/call-entry-form/${callNoId}`
      );
      // data model: { data: { ... } } or just { ... }
      const data =
        res.data && res.data.data
          ? res.data.data
          : res.data || {};
      setFormData((prev) => ({
        ...prev,
        callNo: data._id || prev.callNo,
        callType: data.callType?._id || data.callType || "", // Link callType from call entry form
        // amc: data.amc || "",
        // warranty: data.warranty || "",
        // charges: data.charges || "",
        // callDate: data.callDate?.split("T")[0] || "",
        // callTime: data.callTime || "",
      }));
    } catch (error) {
      console.error("Call Entry Form fetch failed:", error);
    }
  };

  const fetchAssignments = async () => {
    try {
      // Not changing fetch; backend needs to use populate("designation")
      const res = await axios.get(API);
      const arr = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
          ? res.data.data
          : [];
      setAssignments(arr);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMasters();
    fetchAssignments();
    // eslint-disable-next-line
  }, []);

  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange = (e) => {
    if (e.target.type === "file") {
      if (e.target.name === "attachment") {
        setAttachment(e.target.files[0]);
      }
      if (e.target.name === "audio") {
        setAudio(e.target.files[0]);
      }
    } else if (e.target.name === "callNo") {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
      fetchCallEntryFormDetails(e.target.value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  // =====================================
  // SUBMIT FORM
  // =====================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.employee || !formData.callNo || !formData.approxCloseTime) {
      alert("Please fill Employee, Call No and Approx Close Time (all required).");
      return;
    }
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (
          formData[key] !== "" &&
          formData[key] !== null &&
          formData[key] !== undefined
        ) {
          submitData.append(key, formData[key]);
        }
      });
      if (attachment) submitData.append("attachment", attachment);
      if (audio) submitData.append("audio", audio);

      if (editId) {
        await axios.put(`${API}/${editId}`, submitData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Assignment Updated Successfully");
      } else {
        await axios.post(API, submitData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Assignment Created Successfully");
      }
      fetchAssignments();
      setEditId(null);
      setFormData(resetFormData());
      setAttachment(null);
      setAudio(null);
      setShowForm(false);
    } catch (error) {
      console.error(error.response?.data || error);
      alert("Failed to save assignment");
    }
  };

  // =====================================
  // EDIT HANDLER
  // =====================================

  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData({
      department: item.department?._id || item.department || "",
      callType: item.callType?._id || item.callType || "",
      natureOfCall: item.natureOfCall?._id || item.natureOfCall || "",
      instrument: item.instrument?._id || item.instrument || "",
      problem: item.problem?._id || item.problem || "",
      preferredDate: item.preferredDate?.split("T")[0] || "",
      preferredTime: item.preferredTime || "",
      assignDate: item.assignDate?.split("T")[0] || "",
      assignTime: item.assignTime || "",
      employee: item.employee?._id || item.employee || "",
      customer: item.customer?._id || item.customer || "",
      endUser: item.endUser?._id || item.endUser || "",
      remarks: item.remarks || "",
      assignedBy: item.assignedBy || "",
      // status: item.status?._id || item.status || "",  // Removed status
      priority: item.priority?._id || item.priority || "",
      targetDate: item.targetDate?.split("T")[0] || "",
      targetTime: item.targetTime || "",
      approxCloseTime: item.approxCloseTime || "",
      callNo: item.callNo?._id || item.callNo || "",
      designation: item.designation?._id || item.designation || "",
      // amc: item.amc || "",
      // warranty: item.warranty || "",
      // charges: item.charges || "",
      // callDate: item.callDate ? item.callDate.split("T")[0] : "",
      // callTime: item.callTime || "",
    });
    setAttachment(null);
    setAudio(null);
    setShowForm(true);
  };

  // =====================================
  // DELETE HANDLER
  // =====================================

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchAssignments();
      alert("Deleted Successfully");
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  // =====================================
  // Helper functions for safe rendering
  // =====================================
  function renderDepartment(dept) {
    return typeof dept === "object"
      ? dept?.departmentName || dept?.name || dept?._id || "-"
      : dept || "-";
  }

  function renderCallType(callType) {
    return typeof callType === "object"
      ? callType?.callType ||
        callType?.typeName ||
        callType?.name ||
        callType?._id ||
        "-"
      : callType || "-";
  }

  function renderNatureOfCall(nature) {
    return typeof nature === "object"
      ? nature?.callNatureName ||
        nature?.natureOfCall ||
        nature?.callNature ||
        nature?.nature ||
        nature?.natureName ||
        nature?.name ||
        nature?._id ||
        "-"
      : nature || "-";
  }

  function renderInstrument(inst) {
    return typeof inst === "object"
      ? inst?.instrumentName || inst?.name || inst?._id || "-"
      : inst || "-";
  }

  function renderProblem(problem) {
    return typeof problem === "object"
      ? problem?.problemName || problem?.name || problem?._id || "-"
      : problem || "-";
  }

  function renderEmployee(emp) {
    return typeof emp === "object"
      ? emp?.employeeName || emp?.name || emp?._id || "-"
      : emp || "-";
  }

  function renderCustomer(customer) {
    return typeof customer === "object"
      ? customer?.customerName || customer?.name || customer?._id || "-"
      : customer || "-";
  }

  function renderEndUser(endUser) {
    return typeof endUser === "object"
      ? endUser?.endUserName || endUser?.name || endUser?._id || "-"
      : endUser || "-";
  }

  // Removed renderStatus

  function renderPriority(priority) {
    return typeof priority === "object"
      ? priority?.urgencyType ||
        priority?.urgencyLevel ||
        priority?.name ||
        priority?._id ||
        "-"
      : priority || "-";
  }

  function renderCallNo(callNo) {
    return typeof callNo === "object"
      ? callNo?.callNo || callNo?.name || callNo?._id || "-"
      : callNo || "-";
  }

  function renderDesignation(designation) {
    if (!designation) return "-";
    if (typeof designation === "object") {
      return designation.designationName ||
        designation.name ||
        designation.title ||
        designation._id ||
        "-";
    }
    // Sometimes backend may return string id
    // Try to look up name from designations list
    const found =
      Array.isArray(designations) &&
      designations.find((d) => d._id === designation);
    if (found) return found.designationName || found.name || found.title || found._id;
    return designation;
  }

  // =====================================
  // RENDER
  // =====================================
  return (
    <div>
      {/* Add Assignment Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setEditId(null);
            setFormData(resetFormData());
            setAttachment(null);
            setAudio(null);
            setShowForm(true);
          }}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1 rounded-xl shadow transition"
        >
          Assign Call
        </button>
      </div>

      {/* FORM SECTION - No Modal, show only if showForm is true */}
      {showForm && (
        <div className="bg-white w-full max-w-3xl mx-auto mb-8 rounded-2xl shadow-2xl p-0 relative flex flex-col overflow-hidden transition-all duration-300">
          {/* Close Button for Form Card */}
          <button
            onClick={() => setShowForm(false)}
            className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-orange-500 transition"
            aria-label="Close"
            type="button"
          >
            ×
          </button>
          {/* Form Header */}
          <div className="px-6 pt-6 pb-0 border-b border-gray-100 flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{editId ? "Edit Assignment" : "Assign Call"}</h1>
            <p className="text-gray-500">Assign calls to employee</p>
          </div>
          {/* Form - scrollable */}
          <div className="overflow-y-auto p-6 flex-1">
            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-5"
              encType="multipart/form-data"
            >
              {/* Assign Date */}
              <div>
                <label className="block mb-2 font-medium">
                  Assign Date
                </label>
                <input
                  type="date"
                  name="assignDate"
                  value={formData.assignDate}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                />
              </div>
              {/* Assign Time */}
              <div>
                <label className="block mb-2 font-medium">
                  Assign Time
                </label>
                <input
                  type="time"
                  name="assignTime"
                  value={formData.assignTime}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                />
                {formData.assignTime && (
                  <p className="text-sm text-green-600 mt-1">
                    {formatTime24to12(formData.assignTime)}
                  </p>
                )}
              </div>
              {/* Department Dropdown */}
              <div>
                <label className="block mb-2 font-medium">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                >
                  <option value="">Select Department</option>
                  {departments.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.departmentName || item.name || item.title || item._id}
                    </option>
                  ))}
                </select>
              </div>
              {/* Call Type Dropdown */}
              <div>
                <label className="block mb-2 font-medium">
                  Call Type
                </label>
                <select
                  name="callType"
                  value={formData.callType}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                  // callType auto-linked from callEntryForm selection
                >
                  <option value="">Select Call Type</option>
                  {callTypes.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.callType || item.typeName || item.name || item.title || item._id}
                    </option>
                  ))}
                </select>
              </div>
              {/* Nature of Call Dropdown */}
              <div>
                <label className="block mb-2 font-medium">
                  Nature of Call
                </label>
                <select
                  name="natureOfCall"
                  value={formData.natureOfCall}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                >
                  <option value="">
                    Select Nature of Call
                  </option>
                  {natures.map((item) => (
                    <option
                      key={item._id}
                      value={item._id}
                    >
                      {
                        item.callNatureName ||
                        item.natureOfCall ||
                        item.callNature ||
                        item.nature ||
                        item.natureName ||
                        item.name ||
                        item.title ||
                        item._id
                      }
                    </option>
                  ))}
                </select>
              </div>
              {/* Instrument Dropdown */}
              <div>
                <label className="block mb-2 font-medium">
                  Instrument
                </label>
                <select
                  name="instrument"
                  value={formData.instrument}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                >
                  <option value="">Select Instrument</option>
                  {instruments.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.instrumentName || item.name || item.title || item._id}
                    </option>
                  ))}
                </select>
              </div>
              {/* Problem Dropdown */}
              <div>
                <label className="block mb-2 font-medium">
                  Problem
                </label>
                <select
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                >
                  <option value="">Select Problem</option>
                  {problems.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.problemName || item.name || item.title || item._id}
                    </option>
                  ))}
                </select>
              </div>
              {/* Customer Dropdown */}
              <div>
                <label className="block mb-2 font-medium">
                  Customer
                </label>
                <select
                  name="customer"
                  value={formData.customer}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                >
                  <option value="">Select Customer</option>
                  {customers.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.customerName || item.name || item.title || item._id}
                    </option>
                  ))}
                </select>
              </div>
              {/* End User Dropdown */}
              <div>
                <label className="block mb-2 font-medium">
                  End User
                </label>
                <select
                  name="endUser"
                  value={formData.endUser}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                >
                  <option value="">Select End User</option>
                  {endUsers.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.endUserName || item.name || item.title || item._id}
                    </option>
                  ))}
                </select>
              </div>
              {/* Designation Dropdown */}
              <div>
                <label className="block mb-2 font-medium">
                  Designation
                </label>
                <select
                  name="designation"
                  value={formData.designation || ""}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                >
                  <option value="">Select Designation</option>
                  {designations.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.designationName || item.name || item.title || item._id}
                    </option>
                  ))}
                </select>
              </div>
              {/* Preferred Date Input */}
              <div>
                <label className="block mb-2 font-medium">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                />
              </div>
              {/* Preferred Time Input */}
              <div>
                <label className="block mb-2 font-medium">
                  Preferred Time
                </label>
                <input
                  type="time"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                />
                {formData.preferredTime && (
                  <p className="text-sm text-green-600 mt-1">
                    {formatTime24to12(formData.preferredTime)}
                  </p>
                )}
              </div>
              {/* Target Date Input */}
              <div>
                <label className="block mb-2 font-medium">
                  Target Date
                </label>
                <input
                  type="date"
                  name="targetDate"
                  value={formData.targetDate}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                />
              </div>
              {/* Target Time Input */}
              <div>
                <label className="block mb-2 font-medium">
                  Target Time
                </label>
                <input
                  type="time"
                  name="targetTime"
                  value={formData.targetTime}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                />
                {formData.targetTime && (
                  <p className="text-sm text-green-600 mt-1">
                    {formatTime24to12(formData.targetTime)}
                  </p>
                )}
              </div>
              {/* Approx. Time to Close Call (Mandatory Text Input) */}
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">
                  Approx. Time to Close Call <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="approxCloseTime"
                  value={formData.approxCloseTime}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                  required
                  placeholder="e.g. 2 hours, 1 day"
                />
              </div>
              {/* Call No Dropdown */}
              <div>
                <label className="block mb-2 font-medium">
                  Call No
                </label>
                <select
                  name="callNo"
                  value={formData.callNo}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                  required
                >
                  <option value="">Select Call</option>
                  {calls.map((call) => (
                    <option key={call._id} value={call._id}>
                      {call.callNo}
                    </option>
                  ))}
                </select>
              </div>
              {/* Assign To (Technician) Dropdown */}
              <div>
                <label className="block mb-2 font-medium">
                  Assign To (Technician)
                </label>
                <select
                  name="employee"
                  value={formData.employee}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                  required
                >
                  <option value="">Select Technician</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeName}
                    </option>
                  ))}
                </select>
              </div>
              {/* Status Dropdown - REMOVED */}
              {/* Priority Dropdown */}
              <div>
                <label className="block mb-2 font-medium">Call Urgency</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                >
                  <option value="">Select Priority</option>
                  {priorities.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.urgencyType ||
                        item.urgencyLevel ||
                        item.name ||
                        item.title ||
                        "Priority"}
                    </option>
                  ))}
                </select>
              </div>
              {/* Assigned By - Changed to dropdown with technician names (from technician-master) */}
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">
                  Assigned By
                </label>
                <select
                  name="assignedBy"
                  value={formData.assignedBy}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                >
                  <option value="">Select Technician</option>
                  {technicianNames.map((tech) => (
                    <option key={tech._id} value={tech.technicianName || tech.name}>
                      {tech.technicianName || tech.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Remarks Textarea */}
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">
                  Remarks
                </label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                  rows={2}
                />
              </div>
              {/* Image Attachment / Upload */}
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">
                  Attachment (Image or File)
                </label>
                <input
                  type="file"
                  name="attachment"
                  accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx"
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                />
                {attachment && (
                  <p className="text-sm text-blue-600 mt-1">
                    Selected: {attachment.name}
                  </p>
                )}
              </div>
              {/* Voice/Audio Upload */}
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">
                  Voice Note / Audio (optional)
                </label>
                <input
                  type="file"
                  name="audio"
                  accept="audio/*"
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                />
                {audio && (
                  <p className="text-sm text-green-700 mt-1">
                    Selected: {audio.name}
                  </p>
                )}
              </div>
              {/* Submit Button */}
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {editId ? "Update Assignment" : "Save Assignment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CRUD TABLE - List of Assigned Calls */}
      <div className="bg-white rounded-2xl shadow p-6 mt-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Assigned Calls</h2>
        <table className="w-full min-w-max border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Call Type</th>
              <th className="p-3 text-left">Nature of Call</th>
              <th className="p-3 text-left">Instrument</th>
              <th className="p-3 text-left">Problem</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">End User</th>
              <th className="p-3 text-left">Designation</th>
              {/* Removed: Call Date, Call Time, AMC, Warranty, Charges */}
              <th className="p-3 text-left">Preferred Date</th>
              <th className="p-3 text-left">Preferred Time</th>
              <th className="p-3 text-left">Assign Date</th>
              <th className="p-3 text-left">Assign Time</th>
              <th className="p-3 text-left">Target Date</th>
              <th className="p-3 text-left">Target Time</th>
              <th className="p-3 text-left">Approx. Time to Close</th>
              <th className="p-3 text-left">Call No</th>
              <th className="p-3 text-left">Assign To</th>
              {/* <th className="p-3 text-left">Status</th> status removed */}
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Assigned By</th>
              <th className="p-3 text-left">Remarks</th>
              <th className="p-3 text-left">Attachment</th>
              <th className="p-3 text-left">Voice/Audio</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  {renderDepartment(item.department)}
                </td>
                <td className="p-3">
                  {renderCallType(item.callType)}
                </td>
                <td className="p-3">
                  {renderNatureOfCall(item.natureOfCall)}
                </td>
                <td className="p-3">
                  {renderInstrument(item.instrument)}
                </td>
                <td className="p-3">
                  {renderProblem(item.problem)}
                </td>
                <td className="p-3">
                  {renderCustomer(item.customer)}
                </td>
                <td className="p-3">
                  {renderEndUser(item.endUser)}
                </td>
                <td className="p-3">
                  {renderDesignation(item.designation)}
                </td>
                {/* Removed: Call Date */}
                {/* Removed: Call Time */}
                {/* Removed: AMC */}
                {/* Removed: Warranty */}
                {/* Removed: Charges */}
                <td className="p-3">
                  {item.preferredDate ? new Date(item.preferredDate).toLocaleDateString() : "-"}
                </td>
                <td className="p-3">
                  {item.preferredTime ? formatTime24to12(item.preferredTime) : "-"}
                </td>
                <td className="p-3">
                  {item.assignDate ? new Date(item.assignDate).toLocaleDateString() : "-"}
                </td>
                <td className="p-3">
                  {item.assignTime ? formatTime24to12(item.assignTime) : "-"}
                </td>
                <td className="p-3">
                  {item.targetDate ? new Date(item.targetDate).toLocaleDateString() : "-"}
                </td>
                <td className="p-3">
                  {item.targetTime ? formatTime24to12(item.targetTime) : "-"}
                </td>
                <td className="p-3">{item.approxCloseTime || "-"}</td>
                <td className="p-3">
                  {renderCallNo(item.callNo)}
                </td>
                <td className="p-3">
                  {renderEmployee(item.employee)}
                </td>
                {/* <td className="p-3">
                  {renderStatus(item.status)}
                </td> */}
                <td className="p-3">
                  {renderPriority(item.priority)}
                </td>
                <td className="p-3">
                  {item.assignedBy || "-"}
                </td>
                <td className="p-3">
                  {item.remarks || "-"}
                </td>
                <td className="p-3">
                  {item.attachment?.url ? (
                    /\.(jpg|jpeg|png|gif|webp)$/i.test(item.attachment.url) ? (
                      <img
                        src={item.attachment.url}
                        alt="Attachment"
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <a
                        href={item.attachment.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        Download
                      </a>
                    )
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-3">
                  {item.audio?.url ? (
                    <audio controls className="w-40">
                      <source src={item.audio.url} />
                    </audio>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-3 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CallsAssigningForm;