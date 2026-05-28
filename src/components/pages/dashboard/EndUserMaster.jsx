import { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
} from "lucide-react";

const API =
  "https://networkautomation.in/api/v1/end-user-master";

const CUSTOMER_API =
  "https://networkautomation.in/api/v1/customer-master";

const DEPARTMENT_API =
  "https://networkautomation.in/api/v1/department";

const DESIGNATION_API =
  "https://networkautomation.in/api/v1/designation-master";

const INITIAL_FORM = {
  endUserName: "",
  customer: "",
  department: "",
  designation: "",
  mobileNumber: "",
  emailAddress: "",
  phone: "",
  dob: "",
  remark: "",
};

export default function EndUserMaster() {
  const [data, setData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================
  // FETCH END USER DATA
  // =====================================

  const fetchData = async () => {
    try {
      const res = await axios.get(API);
      setData(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // =====================================
  // FETCH CUSTOMERS
  // =====================================

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(CUSTOMER_API);
      setCustomers(res.data.data || []);
    } catch (error) {      
      console.log(error);
    }
  };

  // =====================================
  // FETCH DEPARTMENTS
  // =====================================

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(DEPARTMENT_API);
      setDepartments(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // =====================================
  // FETCH DESIGNATIONS
  // =====================================

  const fetchDesignations = async () => {
    try {
      const res = await axios.get(DESIGNATION_API);
      setDesignations(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // =====================================
  // USE EFFECT
  // =====================================

  useEffect(() => {
    fetchData();
    fetchCustomers();
    fetchDepartments();
    fetchDesignations();
  }, []);

  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =====================================
  // HANDLE SUBMIT (Optimistic UI Update)
  // =====================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let res;
      if (editingId) {
        res = await axios.put(
          `${API}/${editingId}`,
          form
        );
        alert("End User Updated Successfully");
      } else {
        res = await axios.post(API, form);
        alert("End User Created Successfully");
      }

      // Optimistic UI update (update local state instead of fetchData)
      const savedData = res.data.data || res.data;

      // Ensure references for populated display (customer, department, designation)
      const populatedData = {
        ...savedData,

        customer:
          customers.find((c) => c._id === savedData.customer) || savedData.customer,

        department:
          departments.find((d) => d._id === savedData.department) || savedData.department,

        designation:
          designations.find((d) => d._id === savedData.designation) || savedData.designation,
      };

      if (editingId) {
        setData((prev) =>
          prev.map((item) =>
            item._id === editingId
              ? populatedData
              : item
          )
        );
      } else {
        setData((prev) => [populatedData, ...prev]);
      }

      setForm(INITIAL_FORM);
      setEditingId(null);
      setShowModal(false);
    } catch (error) {
      console.log(error);
      alert(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // HANDLE EDIT
  // =====================================

  const handleEdit = (item) => {
    setEditingId(item._id);

    setForm({
      endUserName: item.endUserName || "",
      customer: item.customer?._id || "",
      department: item.department?._id || "",
      designation: item.designation?._id || "",
      mobileNumber: item.mobileNumber || "",
      emailAddress: item.emailAddress || "",
      phone: item.phone || "",
      dob: item.dob ? item.dob.split("T")[0] : "",
      remark: item.remark || "",
    });

    setShowModal(true);
  };

  // =====================================
  // HANDLE DELETE (You may also wish to do optimistic delete as improvement)
  // =====================================

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      // Optimistic delete
      setData((prev) => prev.filter((item) => item._id !== id));
      alert("Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // =====================================
  // SEARCH FILTER
  // =====================================

  const filteredData = data.filter(
    (item) =>
      item.endUserName?.toLowerCase().includes(search.toLowerCase()) ||
      item.endUserCode?.toLowerCase().includes(search.toLowerCase()) ||
      item.mobileNumber?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5">
      {/* HEADER */}

      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold">
          End User Master
        </h1>

        <button
          onClick={() => {
            setShowModal(true);
            setEditingId(null);
            setForm(INITIAL_FORM);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Add End User
        </button>
      </div>

      {/* SEARCH */}

      <div className="mb-5 relative">
        <Search
          className="absolute left-3 top-3 text-gray-500"
          size={18}
        />

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="border w-full pl-10 p-3 rounded-lg"
        />
      </div>

      {/* TABLE */}

      <div className="overflow-auto rounded-xl border">
        <table className="w-full min-w-max">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">
                Code
              </th>

              <th className="border p-3">
                Name
              </th>

              <th className="border p-3">
                Customer
              </th>

              <th className="border p-3">
                Department
              </th>

              <th className="border p-3">
                Designation
              </th>

              <th className="border p-3">
                Mobile
              </th>

              <th className="border p-3">
                Email
              </th>

              {/* New: Date Of Birth */}
              <th className="border p-3">
                Date Of Birth
              </th>

              {/* New: Remark */}
              <th className="border p-3">
                Remark
              </th>

              <th className="border p-3">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map(
                (item) => (
                  <tr key={item._id}>
                    <td className="border p-3">
                      {item.endUserCode}
                    </td>

                    <td className="border p-3">
                      {item.endUserName}
                    </td>

                    <td className="border p-3">
                      {item.customer?.customerName ||
                        item.customer?.name ||
                        "-"}
                    </td>

                    <td className="border p-3">
                      {item.department?.departmentName ||
                        item.department?.name ||
                        "-"}
                    </td>

                    <td className="border p-3">
                      {item.designation?.designationName ||
                        "-"}
                    </td>

                    <td className="border p-3">
                      {item.mobileNumber}
                    </td>

                    <td className="border p-3">
                      {item.emailAddress}
                    </td>

                    {/* New: Date Of Birth */}
                    <td className="border p-3">
                      {item.dob
                        ? new Date(item.dob).toLocaleDateString("en-GB")
                        : "-"}
                    </td>

                    {/* New: Remark */}
                    <td className="border p-3 max-w-xs break-words">
                      {item.remark || "-"}
                    </td>

                    <td className="border p-3">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() =>
                            handleEdit(item)
                          }
                          className="bg-yellow-500 text-white p-2 rounded"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(item._id)
                          }
                          className="bg-red-600 text-white p-2 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="text-center p-5"
                >
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl p-6 relative">
            {/* CLOSE */}
            <button
              onClick={() =>
                setShowModal(false)
              }
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold mb-5">
              {editingId
                ? "Update End User"
                : "Add End User"}
            </h2>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* END USER NAME */}
              <div>
                <label className="block mb-1 font-medium">
                  End User Name
                </label>

                <input
                  type="text"
                  name="endUserName"
                  value={form.endUserName}
                  onChange={handleChange}
                  className="border w-full p-3 rounded-lg"
                  required
                />
              </div>

              {/* CUSTOMER */}
              <div>
                <label className="block mb-1 font-medium">
                  Customer
                </label>

                <select
                  name="customer"
                  value={form.customer}
                  onChange={handleChange}
                  className="border w-full p-3 rounded-lg"
                  required
                >
                  <option value="">
                    Select Customer
                  </option>

                  {customers.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.customerName || item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* DEPARTMENT */}
              <div>
                <label className="block mb-1 font-medium">
                  Department
                </label>

                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="border w-full p-3 rounded-lg"
                  required
                >
                  <option value="">
                    Select Department
                  </option>

                  {departments.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.departmentName || item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* DESIGNATION */}
              <div>
                <label className="block mb-1 font-medium">
                  Designation
                </label>

                <select
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                  className="border w-full p-3 rounded-lg"
                  required
                >
                  <option value="">
                    Select Designation
                  </option>

                  {designations.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.designationName}
                    </option>
                  ))}
                </select>
              </div>

              {/* MOBILE */}
              <div>
                <label className="block mb-1 font-medium">
                  Mobile Number
                </label>

                <input
                  type="text"
                  name="mobileNumber"
                  value={form.mobileNumber}
                  onChange={handleChange}
                  className="border w-full p-3 rounded-lg"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block mb-1 font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  name="emailAddress"
                  value={form.emailAddress}
                  onChange={handleChange}
                  className="border w-full p-3 rounded-lg"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="block mb-1 font-medium">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="border w-full p-3 rounded-lg"
                />
              </div>

              {/* DOB */}
              <div>
                <label className="block mb-1 font-medium">
                  Date Of Birth
                </label>

                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  className="border w-full p-3 rounded-lg"
                />
              </div>

              {/* REMARK */}
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium">
                  Remark
                </label>

                <textarea
                  name="remark"
                  value={form.remark}
                  onChange={handleChange}
                  className="border w-full p-3 rounded-lg"
                  rows="3"
                />
              </div>

              {/* BUTTON */}
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                >
                  {loading
                    ? "Saving..."
                    : editingId
                    ? "Update"
                    : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}