import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/v1/customer";

const Customer = () => {
  // STATES
  const [customers, setCustomers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    companyName: "",
    contactNumber: "",
    alternateNumber: "",
    email: "",
    website: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    customerType: "Residential",
    department: "",
    category: "",
    gstNumber: "",
    status: "Active",
    remarks: "",
    createdBy: "",
  });

  // CUSTOMER FETCHING
  const fetchCustomers = async () => {
    try {
      const res = await axios.get(API);
      setCustomers(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // DEPARTMENT FETCHING
  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/department");
      setDepartments(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // CATEGORY FETCHING: optionally by department
  const fetchCategories = async (departmentId = null) => {
    try {
      let url = "http://localhost:5000/api/v1/category";
      if (departmentId && departmentId !== "") {
        // Assuming your API supports filtering by departmentId
        url += `?department=${departmentId}`;
      }
      const res = await axios.get(url);
      setCategories(res.data.data);
    } catch (error) {
      console.error(error);
      setCategories([]);
    }
  };

  // Side effect: initial fetch
  useEffect(() => {
    fetchCustomers();
    fetchDepartments();
    fetchCategories();
  }, []);

  // HANDLE FORM FIELD CHANGE (for department/category change trigger category fetch)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If department field is changed, fetch categories for that department and clear current category
    if (name === "department") {
      setForm((prev) => ({ ...prev, category: "" })); // clear category when department changes
      fetchCategories(value);
    }

    // If category selected (onChange), just normal update happens
  };

  // SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API, form);
      alert("Customer Created Successfully");
      fetchCustomers();
      setForm({
        customerName: "",
        companyName: "",
        contactNumber: "",
        alternateNumber: "",
        email: "",
        website: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        customerType: "Residential",
        department: "",
        category: "",
        gstNumber: "",
        status: "Active",
        remarks: "",
        createdBy: "",
      });
      setShowPopup(false);
      // Refresh categories on form reset
      fetchCategories();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error");
    }
  };

  // POPUP FORM COMPONENT
  const PopupForm = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto">
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500"
          type="button"
        >
          ×
        </button>
        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-6">Add Customer</h2>
        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CUSTOMER NAME */}
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            className="input"
            value={form.customerName}
            onChange={handleChange}
            required
          />
          {/* COMPANY NAME */}
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            className="input"
            value={form.companyName}
            onChange={handleChange}
          />
          {/* CONTACT NUMBER */}
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            className="input"
            value={form.contactNumber}
            onChange={handleChange}
          />
          {/* ALTERNATE NUMBER */}
          <input
            type="text"
            name="alternateNumber"
            placeholder="Alternate Number"
            className="input"
            value={form.alternateNumber}
            onChange={handleChange}
          />
          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input"
            value={form.email}
            onChange={handleChange}
          />
          {/* WEBSITE */}
          <input
            type="text"
            name="website"
            placeholder="Website"
            className="input"
            value={form.website}
            onChange={handleChange}
          />
          {/* CITY */}
          <input
            type="text"
            name="city"
            placeholder="City"
            className="input"
            value={form.city}
            onChange={handleChange}
          />
          {/* STATE */}
          <input
            type="text"
            name="state"
            placeholder="State"
            className="input"
            value={form.state}
            onChange={handleChange}
          />
          {/* PINCODE */}
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            className="input"
            value={form.pincode}
            onChange={handleChange}
          />
          {/* CUSTOMER TYPE */}
          <select
            name="customerType"
            className="input"
            value={form.customerType}
            onChange={handleChange}
          >
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Corporate">Corporate</option>
            <option value="Government">Government</option>
          </select>
          {/* DEPARTMENT */}
          <select
            name="department"
            className="input"
            value={form.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            {departments.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          {/* CATEGORY */}
          <select
            name="category"
            className="input"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          {/* GST NUMBER */}
          <input
            type="text"
            name="gstNumber"
            placeholder="GST Number"
            className="input"
            value={form.gstNumber}
            onChange={handleChange}
          />
          {/* STATUS */}
          <select
            name="status"
            className="input"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          {/* CREATED BY */}
          <input
            type="text"
            name="createdBy"
            placeholder="Created By"
            className="input"
            value={form.createdBy}
            onChange={handleChange}
          />
          {/* ADDRESS */}
          <textarea
            name="address"
            placeholder="Address"
            className="input md:col-span-2"
            rows="2"
            value={form.address}
            onChange={handleChange}
          />
          {/* REMARKS */}
          <textarea
            name="remarks"
            placeholder="Remarks"
            className="input md:col-span-2"
            rows="2"
            value={form.remarks}
            onChange={handleChange}
          />
          {/* BUTTON */}
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold md:col-span-2"
          >
            Save Customer
          </button>
        </form>
      </div>
    </div>
  );

  // RETURN
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Customer Management</h1>
          <p className="text-gray-500">Manage customers and companies</p>
        </div>
        <button
          onClick={() => setShowPopup(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow"
        >
          + Add Customer
        </button>
      </div>

      {/* POPUP */}
      {showPopup && <PopupForm />}

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Contact</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(customers) && customers.length > 0 ? (
              customers.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{item.customerName || "-"}</td>
                  <td className="p-4">{item.companyName || "-"}</td>
                  <td className="p-4">{item.contactNumber || "-"}</td>
                  <td className="p-4">{item.department?.name || "-"}</td>
                  <td className="p-4">{item.category?.name || "-"}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-400">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* STYLE */}
      <style>{`
        .input {
          width: 100%;
          border: 1px solid #d1d5db;
          padding: 12px;
          border-radius: 12px;
          outline: none;
          transition: 0.2s;
        }
        .input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79,70,229,0.15);
        }
      `}</style>
    </div>
  );
};

export default Customer;