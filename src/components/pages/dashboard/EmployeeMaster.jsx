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
  "https://nas-backend-7f28.onrender.com/api/v1/employee-master";

const DIVISION_API =
  "https://nas-backend-7f28.onrender.com/api/v1/division-master";

const DEPARTMENT_API =
  "https://nas-backend-7f28.onrender.com/api/v1/department";

const DESIGNATION_API =
  "https://nas-backend-7f28.onrender.com/api/v1/designation-master";

const INITIAL_FORM = {
  title: "Mr.",
  employeeName: "",
  fatherOrHusbandName: "",
  division: "",
  dob: "",
  education: "",
  permanentAddress: "",
  presentAddress: "",
  designation: "",
  department: "",
  dateOfJoining: "",
  gender: "Male",
  emailId: "",
  phoneMobile: "",
  maritalStatus: "Single",
  weddingAnniversaryDate: "",
  noOfChilds: 0,
  workExperience: "",
};

export default function EmployeeMaster() {
  const [employees, setEmployees] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  // =====================================
  // DEBUG: Department API Response Logging
  // =====================================

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API);
      setEmployees(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMasters = async () => {
    try {
      const [
        divisionRes,
        departmentRes,
        designationRes,
      ] = await Promise.all([
        axios.get(DIVISION_API),
        axios.get(DEPARTMENT_API),
        axios.get(DESIGNATION_API),
      ]);

      setDivisionList(divisionRes.data.data || []);

      // --- Debug department API structure
      console.log("Department API response:", departmentRes.data);

      // Use departmentName directly (fix)
      let departmentArr = [];

      if (Array.isArray(departmentRes.data.data)) {
        departmentArr = departmentRes.data.data;
      }
      setDepartmentList(departmentArr);

      setDesignationList(designationRes.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchMasters();
  }, []);

  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // =====================================
  // HANDLE SUBMIT
  // =====================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, form);
      } else {
        await axios.post(API, form);
      }

      fetchEmployees();

      setForm(INITIAL_FORM);

      setEditingId(null);

      setShowModal(false);
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message);
    }
  };

  // =====================================
  // HANDLE EDIT
  // =====================================

  const handleEdit = (item) => {
    setForm({
      ...item,
      division: item?.division?._id,
      department: item?.department?._id,
      designation: item?.designation?._id,
      dob: item?.dob ? item.dob.split("T")[0] : "",
      dateOfJoining:
        item?.dateOfJoining ? item.dateOfJoining.split("T")[0] : "",
      weddingAnniversaryDate:
        item?.weddingAnniversaryDate
          ? item.weddingAnniversaryDate.split("T")[0]
          : "",
    });

    setEditingId(item._id);

    setShowModal(true);
  };

  // =====================================
  // DELETE
  // =====================================

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  // =====================================
  // FILTERED DATA
  // =====================================

  const filteredEmployees = employees.filter((item) =>
    item.employeeName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">
          Employee Master
        </h1>

        <button
          onClick={() => {
            setForm(INITIAL_FORM);
            setEditingId(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={18} />
          Add Employee
        </button>
      </div>

      {/* SEARCH */}

      <div className="mb-4 relative">
        <Search className="absolute left-3 top-3" size={18} />

        <input
          type="text"
          placeholder="Search Employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border w-full pl-10 p-2 rounded"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-auto bg-white rounded shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Code</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Division</th>
              <th className="p-3 border">Department</th>
              <th className="p-3 border">Designation</th>
              <th className="p-3 border">Mobile</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((item) => (
              <tr key={item._id}>
                <td className="p-3 border">{item.employeeCode}</td>
                <td className="p-3 border">
                  {item.title} {item.employeeName}
                </td>
                <td className="p-3 border">
                  {item?.division?.divisionName}
                </td>
                <td className="p-3 border">
                  {/* Show departmentName directly */}
                  {item?.department?.departmentName}
                </td>
                <td className="p-3 border">
                  {item?.designation?.designationName}
                </td>
                <td className="p-3 border">{item.phoneMobile}</td>
                <td className="p-3 border">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 text-white p-2 rounded"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 text-white p-2 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-5xl rounded-lg p-5 max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold">
                {editingId ? "Edit Employee" : "Add Employee"}
              </h2>
              <button onClick={() => setShowModal(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
              <select
                name="title"
                value={form.title}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option>Mr.</option>
                <option>Ms.</option>
                <option>Mrs.</option>
              </select>

              <input
                type="text"
                name="employeeName"
                placeholder="Employee Name"
                value={form.employeeName}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <input
                type="text"
                name="fatherOrHusbandName"
                placeholder="Father/Husband Name"
                value={form.fatherOrHusbandName}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              {/* DIVISION */}
              <select
                name="division"
                value={form.division}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              >
                <option value="">Select Division</option>
                {divisionList.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.divisionName}
                  </option>
                ))}
              </select>

              {/* DEPARTMENT */}
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              >
                <option value="">Select Department</option>
                {departmentList.length === 0 && (
                  <option disabled>No Department Found</option>
                )}
                {departmentList.map((item) => (
                  <option key={item._id} value={item._id}>
                    {/* Show departmentName directly */}
                    {item.departmentName}
                  </option>
                ))}
              </select>

              {/* DESIGNATION */}
              <select
                name="designation"
                value={form.designation}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              >
                <option value="">Select Designation</option>
                {designationList.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.designationName}
                  </option>
                ))}
              </select>

              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <input
                type="text"
                name="education"
                placeholder="Education"
                value={form.education}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <input
                type="text"
                name="phoneMobile"
                placeholder="Mobile"
                value={form.phoneMobile}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <input
                type="email"
                name="emailId"
                placeholder="Email"
                value={form.emailId}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <input
                type="date"
                name="dateOfJoining"
                value={form.dateOfJoining}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option>Male</option>
                <option>Female</option>
              </select>

              <select
                name="maritalStatus"
                value={form.maritalStatus}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option>Single</option>
                <option>Married</option>
              </select>

              <input
                type="date"
                name="weddingAnniversaryDate"
                value={form.weddingAnniversaryDate}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <input
                type="number"
                name="noOfChilds"
                placeholder="No Of Childs"
                value={form.noOfChilds}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <input
                type="text"
                name="workExperience"
                placeholder="Work Experience"
                value={form.workExperience}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <textarea
                name="permanentAddress"
                placeholder="Permanent Address"
                value={form.permanentAddress}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <textarea
                name="presentAddress"
                placeholder="Present Address"
                value={form.presentAddress}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <div className="col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-5 py-2 rounded"
                >
                  {editingId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}