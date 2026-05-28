import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

const API =
  "http://localhost:5000/api/v1/servicecall";

const ServiceCall = () => {
  // ===========================================
  // STATES
  // ===========================================

  const [serviceCalls, setServiceCalls] = useState([]);

  const [departments, setDepartments] = useState([]);

  const [categories, setCategories] = useState([]); // All categories

  const [categoryOptions, setCategoryOptions] = useState([]); // Shown in Category select
  const [productTypes, setProductTypes] = useState([]); // Shown in Product Type select

  const [form, setForm] = useState({
    customerName: "",
    companyName: "",
    contactNumber: "",
    email: "",
    address: "",

    department: "",
    category: "",
    productType: "",

    callDate: "",
    callStartTime: "",
    callEndTime: "",
    totalWorkingHour: "",

    workType: "",

    wiringDetails: "",
    productDetails: "",
    serviceDescription: "",
    problemDescription: "",
    errorDetails: "",

    priorityLevel: "Low",

    workStatus: "Pending",

    charges: {
      serviceCharges: "",
      totalAmount: "",
      paymentMode: "",
      paymentStatus: "Pending",
    },

    assignedEngineer: "",
    technicianName: "",

    customerRemark: "",
    technicianRemarks: "",
    internalRemarks: "",

    loggedBy: "",
  });

  // ===========================================
  // FETCH SERVICE CALLS
  // ===========================================

  const fetchServiceCalls = async () => {
    try {
      const res = await axios.get(API);
      setServiceCalls(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================================
  // FETCH DEPARTMENTS
  // ===========================================

  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/department");
      setDepartments(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================================
  // FETCH CATEGORIES
  // ===========================================

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/category");
      setCategories(res.data.data);
      setCategoryOptions(res.data.data); // By default show all categories
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================================
  // FETCH PRODUCT TYPES BY CATEGORY
  // ===========================================

  const fetchProductTypesByCategory = async (categoryId) => {
    // For demo, assuming each category has a "products" array.
    // If your API gives /category/:id/product, fetch from there.
    try {
      if (!categoryId) {
        setProductTypes([]);
        return;
      }
      const category = categories.find((cat) => cat._id === categoryId);
      if (category && Array.isArray(category.products)) {
        setProductTypes(category.products);
      } else {
        // Otherwise, fetch from API if available
        const res = await axios.get(
          `http://localhost:5000/api/v1/category/${categoryId}/product`
        );
        setProductTypes(res.data.data || []);
      }
    } catch (error) {
      setProductTypes([]);
    }
  };

  useEffect(() => {
    fetchServiceCalls();
    fetchDepartments();
    fetchCategories();
  }, []);

  // ===========================================
  // HANDLE CHANGE
  // ===========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Charges handling
    if (name.startsWith("charges.")) {
      const key = name.split(".")[1];

      setForm((prev) => ({
        ...prev,
        charges: {
          ...prev.charges,
          [key]: value,
        },
      }));
    }
    // Dependency: Department > Category, Category > Product Type
    else if (name === "department") {
      setForm((prev) => ({
        ...prev,
        department: value,
        category: "",
        productType: "",
      }));

      // Filter categories by department
      if (value) {
        setCategoryOptions(
          categories.filter((cat) => cat.department === value)
        );
      } else {
        setCategoryOptions(categories);
      }
      setProductTypes([]); // Reset
    }
    else if (name === "category") {
      setForm((prev) => ({
        ...prev,
        category: value,
        productType: "",
      }));

      if (value) {
        fetchProductTypesByCategory(value);
      } else {
        setProductTypes([]);
      }
    }
    else if (name === "productType") {
      setForm((prev) => ({
        ...prev,
        productType: value,
      }));
    }
    else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ===========================================
  // SUBMIT
  // ===========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(API, form);

      alert("Service Call Created Successfully");

      fetchServiceCalls();

      // RESET FORM

      setForm({
        customerName: "",
        companyName: "",
        contactNumber: "",
        email: "",
        address: "",

        department: "",
        category: "",
        productType: "",

        callDate: "",
        callStartTime: "",
        callEndTime: "",
        totalWorkingHour: "",

        workType: "",

        wiringDetails: "",
        productDetails: "",
        serviceDescription: "",
        problemDescription: "",
        errorDetails: "",

        priorityLevel: "Low",

        workStatus: "Pending",

        charges: {
          serviceCharges: "",
          totalAmount: "",
          paymentMode: "",
          paymentStatus: "Pending",
        },

        assignedEngineer: "",
        technicianName: "",

        customerRemark: "",
        technicianRemarks: "",
        internalRemarks: "",

        loggedBy: "",
      });

      setCategoryOptions(categories);
      setProductTypes([]);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}

      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Service Call Management
        </h1>

        <p className="text-gray-500">
          Manage all service
          calls
        </p>
      </div>

      {/* FORM */}

      <div className="bg-white rounded-2xl shadow p-6">
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >
          {/* CUSTOMER */}

          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            className="input"
            value={form.customerName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            className="input"
            value={form.companyName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            className="input"
            value={form.contactNumber}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            className="input md:col-span-2"
            value={form.address}
            onChange={handleChange}
          />

          {/* DEPARTMENT */}
          <select
            name="department"
            className="input"
            value={form.department}
            onChange={handleChange}
          >
            <option value="">
              Select Department
            </option>
            {departments.map((item) => (
              <option
                key={item._id}
                value={item._id}
              >
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
            disabled={!form.department}
          >
            <option value="">
              Select Category
            </option>
            {categoryOptions.map((item) => (
              <option
                key={item._id}
                value={item._id}
              >
                {item.name}
              </option>
            ))}
          </select>

          {/* PRODUCT TYPE */}
          <select
            name="productType"
            className="input"
            value={form.productType}
            onChange={handleChange}
            disabled={!form.category}
          >
            <option value="">
              Select Product Type
            </option>
            {productTypes && productTypes.length > 0 ? (
              productTypes.map((item, idx) =>
                // item may be { _id, name } or just string
                typeof item === "object" ? (
                  <option key={item._id || idx} value={item._id || item.name}>
                    {item.name}
                  </option>
                ) : (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                )
              )
            ) : null}
          </select>

          {/* DATE */}

          <input
            type="date"
            name="callDate"
            className="input"
            value={form.callDate}
            onChange={handleChange}
          />

          {/* START TIME */}

          <input
            type="time"
            name="callStartTime"
            className="input"
            value={form.callStartTime}
            onChange={handleChange}
          />

          {/* END TIME */}

          <input
            type="time"
            name="callEndTime"
            className="input"
            value={form.callEndTime}
            onChange={handleChange}
          />

          {/* WORKING HOURS */}

          <input
            type="text"
            name="totalWorkingHour"
            placeholder="Total Working Hour"
            className="input"
            value={form.totalWorkingHour}
            onChange={handleChange}
          />

          {/* WORK TYPE */}

          <select
            name="workType"
            className="input"
            value={form.workType}
            onChange={handleChange}
          >
            <option value="">
              Select Work Type
            </option>
            <option value="New Installation">
              New Installation
            </option>
            <option value="Service Call">
              Service Call
            </option>
            <option value="Maintenance">
              Maintenance
            </option>
            <option value="AMC Visit">
              AMC Visit
            </option>
            <option value="Inspection">
              Inspection
            </option>
          </select>

          {/* PRIORITY */}

          <select
            name="priorityLevel"
            className="input"
            value={form.priorityLevel}
            onChange={handleChange}
          >
            <option value="Low">
              Low
            </option>
            <option value="Medium">
              Medium
            </option>
            <option value="High">
              High
            </option>
            <option value="Urgent">
              Urgent
            </option>
          </select>

          {/* STATUS */}

          <select
            name="workStatus"
            className="input"
            value={form.workStatus}
            onChange={handleChange}
          >
            <option value="Pending">
              Pending
            </option>
            <option value="In Progress">
              In Progress
            </option>
            <option value="Completed">
              Completed
            </option>
            <option value="Closed">
              Closed
            </option>
            <option value="Hold">
              Hold
            </option>
            <option value="Cancelled">
              Cancelled
            </option>
          </select>

          {/* DETAILS */}

          <textarea
            name="wiringDetails"
            placeholder="Wiring Details"
            className="input md:col-span-2"
            value={form.wiringDetails}
            onChange={handleChange}
          />

          <textarea
            name="productDetails"
            placeholder="Product Details"
            className="input md:col-span-2"
            value={form.productDetails}
            onChange={handleChange}
          />

          <textarea
            name="serviceDescription"
            placeholder="Service Description"
            className="input md:col-span-2"
            value={form.serviceDescription}
            onChange={handleChange}
          />

          <textarea
            name="problemDescription"
            placeholder="Problem Description"
            className="input md:col-span-2"
            value={form.problemDescription}
            onChange={handleChange}
          />

          {/* CHARGES */}

          <input
            type="number"
            name="charges.serviceCharges"
            placeholder="Service Charges"
            className="input"
            value={form.charges.serviceCharges}
            onChange={handleChange}
          />

          <input
            type="number"
            name="charges.totalAmount"
            placeholder="Total Amount"
            className="input"
            value={form.charges.totalAmount}
            onChange={handleChange}
          />

          {/* PAYMENT MODE */}

          <select
            name="charges.paymentMode"
            className="input"
            value={form.charges.paymentMode}
            onChange={handleChange}
          >
            <option value="">
              Select Payment Mode
            </option>
            <option value="Cash">
              Cash
            </option>
            <option value="UPI">
              UPI
            </option>
            <option value="Card">
              Card
            </option>
            <option value="Bank Transfer">
              Bank Transfer
            </option>
            <option value="Cheque">
              Cheque
            </option>
          </select>

          {/* PAYMENT STATUS */}

          <select
            name="charges.paymentStatus"
            className="input"
            value={form.charges.paymentStatus}
            onChange={handleChange}
          >
            <option value="Pending">
              Pending
            </option>
            <option value="Paid">
              Paid
            </option>
          </select>

          {/* ENGINEER */}

          <input
            type="text"
            name="assignedEngineer"
            placeholder="Assigned Engineer"
            className="input"
            value={form.assignedEngineer}
            onChange={handleChange}
          />

          <input
            type="text"
            name="technicianName"
            placeholder="Technician Name"
            className="input"
            value={form.technicianName}
            onChange={handleChange}
          />

          {/* REMARKS */}

          <textarea
            name="customerRemark"
            placeholder="Customer Remark"
            className="input md:col-span-2"
            value={form.customerRemark}
            onChange={handleChange}
          />

          <textarea
            name="technicianRemarks"
            placeholder="Technician Remarks"
            className="input md:col-span-2"
            value={form.technicianRemarks}
            onChange={handleChange}
          />

          <textarea
            name="internalRemarks"
            placeholder="Internal Remarks"
            className="input md:col-span-2"
            value={form.internalRemarks}
            onChange={handleChange}
          />

          {/* LOGGED BY */}

          <input
            type="text"
            name="loggedBy"
            placeholder="Logged By"
            className="input"
            value={form.loggedBy}
            onChange={handleChange}
          />

          {/* BUTTON */}

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl md:col-span-2"
          >
            Save Service Call
          </button>
        </form>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-2xl shadow mt-6 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">
                Call No
              </th>

              <th className="p-3 text-left">
                Customer
              </th>

              <th className="p-3 text-left">
                Company
              </th>

              <th className="p-3 text-left">
                Work Type
              </th>

              <th className="p-3 text-left">
                Priority
              </th>

              <th className="p-3 text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {serviceCalls.map((item) => (
              <tr
                key={item._id}
                className="border-b"
              >
                <td className="p-3">
                  {item.callSheetNumber}
                </td>
                <td className="p-3">
                  {item.customerName}
                </td>
                <td className="p-3">
                  {item.companyName}
                </td>
                <td className="p-3">
                  {item.workType}
                </td>
                <td className="p-3">
                  {item.priorityLevel}
                </td>
                <td className="p-3">
                  {item.workStatus}
                </td>
              </tr>
            ))}
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
        }

        .input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79,70,229,0.2);
        }
      `}</style>
    </div>
  );
};

export default ServiceCall;