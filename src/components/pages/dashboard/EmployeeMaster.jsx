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
  "http://localhost:5000/api/v1/employee-master";

const DIVISION_API =
  "http://localhost:5000/api/v1/division-master";

const DEPARTMENT_API =
  "http://localhost:5000/api/v1/department";

const DESIGNATION_API =
  "http://localhost:5000/api/v1/designation-master";

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

            {/* -- Labels Added, each field has a label describing its name -- */}
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
              {/* Title */}
              <div className="flex flex-col">
                <label htmlFor="title" className="mb-1 font-medium">
                  Title
                </label>
                <select
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option>Mr.</option>
                  <option>Ms.</option>
                  <option>Mrs.</option>
                </select>
              </div>
              
              {/* Employee Name */}
              <div className="flex flex-col">
                <label htmlFor="employeeName" className="mb-1 font-medium">
                  Employee Name
                </label>
                <input
                  id="employeeName"
                  type="text"
                  name="employeeName"
                  placeholder="Employee Name"
                  value={form.employeeName}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
              </div>

              {/* Father/Husband Name */}
              <div className="flex flex-col">
                <label htmlFor="fatherOrHusbandName" className="mb-1 font-medium">
                  Father/Husband Name
                </label>
                <input
                  id="fatherOrHusbandName"
                  type="text"
                  name="fatherOrHusbandName"
                  placeholder="Father/Husband Name"
                  value={form.fatherOrHusbandName}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              </div>

              {/* Division */}
              <div className="flex flex-col">
                <label htmlFor="division" className="mb-1 font-medium">
                  Division
                </label>
                <select
                  id="division"
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
              </div>

              {/* Department */}
              <div className="flex flex-col">
                <label htmlFor="department" className="mb-1 font-medium">
                  Department
                </label>
                <select
                  id="department"
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
                      {item.departmentName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Designation */}
              <div className="flex flex-col">
                <label htmlFor="designation" className="mb-1 font-medium">
                  Designation
                </label>
                <select
                  id="designation"
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
              </div>

              {/* DOB */}
              <div className="flex flex-col">
                <label htmlFor="dob" className="mb-1 font-medium">
                  Date of Birth
                </label>
                <input
                  id="dob"
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              </div>

              {/* Education */}
              <div className="flex flex-col">
                <label htmlFor="education" className="mb-1 font-medium">
                  Education
                </label>
                <input
                  id="education"
                  type="text"
                  name="education"
                  placeholder="Education"
                  value={form.education}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              </div>

              {/* Mobile */}
              <div className="flex flex-col">
                <label htmlFor="phoneMobile" className="mb-1 font-medium">
                  Mobile
                </label>
                <input
                  id="phoneMobile"
                  type="text"
                  name="phoneMobile"
                  placeholder="Mobile"
                  value={form.phoneMobile}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label htmlFor="emailId" className="mb-1 font-medium">
                  Email
                </label>
                <input
                  id="emailId"
                  type="email"
                  name="emailId"
                  placeholder="Email"
                  value={form.emailId}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              </div>

              {/* Date of Joining */}
              <div className="flex flex-col">
                <label htmlFor="dateOfJoining" className="mb-1 font-medium">
                  Date of Joining
                </label>
                <input
                  id="dateOfJoining"
                  type="date"
                  name="dateOfJoining"
                  value={form.dateOfJoining}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              </div>

              {/* Gender */}
              <div className="flex flex-col">
                <label htmlFor="gender" className="mb-1 font-medium">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              {/* Marital Status */}
              <div className="flex flex-col">
                <label htmlFor="maritalStatus" className="mb-1 font-medium">
                  Marital Status
                </label>
                <select
                  id="maritalStatus"
                  name="maritalStatus"
                  value={form.maritalStatus}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option>Single</option>
                  <option>Married</option>
                </select>
              </div>

              {/* Wedding Anniversary Date */}
              <div className="flex flex-col">
                <label htmlFor="weddingAnniversaryDate" className="mb-1 font-medium">
                  Wedding Anniversary Date
                </label>
                <input
                  id="weddingAnniversaryDate"
                  type="date"
                  name="weddingAnniversaryDate"
                  value={form.weddingAnniversaryDate}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              </div>

              {/* No Of Childs */}
              <div className="flex flex-col">
                <label htmlFor="noOfChilds" className="mb-1 font-medium">
                  No Of Childs
                </label>
                <input
                  id="noOfChilds"
                  type="number"
                  name="noOfChilds"
                  placeholder="No Of Childs"
                  value={form.noOfChilds}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              </div>

              {/* Work Experience */}
              <div className="flex flex-col">
                <label htmlFor="workExperience" className="mb-1 font-medium">
                  Work Experience
                </label>
                <input
                  id="workExperience"
                  type="text"
                  name="workExperience"
                  placeholder="Work Experience"
                  value={form.workExperience}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              </div>

              {/* Permanent Address */}
              <div className="flex flex-col">
                <label htmlFor="permanentAddress" className="mb-1 font-medium">
                  Permanent Address
                </label>
                <textarea
                  id="permanentAddress"
                  name="permanentAddress"
                  placeholder="Permanent Address"
                  value={form.permanentAddress}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              </div>

              {/* Present Address */}
              <div className="flex flex-col">
                <label htmlFor="presentAddress" className="mb-1 font-medium">
                  Present Address
                </label>
                <textarea
                  id="presentAddress"
                  name="presentAddress"
                  placeholder="Present Address"
                  value={form.presentAddress}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              </div>

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