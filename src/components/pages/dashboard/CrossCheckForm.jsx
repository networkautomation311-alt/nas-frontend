// =====================================
// src/components/pages/dashboard/CustomerCallingForm.jsx
// =====================================

import React, {
    useEffect,
    useState,
} from "react";

import axios from "axios";

const API =
    "http://localhost:5000/api/v1/customer-calling";

const CustomerCallingForm = () => {
    // =====================================
    // STATES
    // =====================================

    const [formData, setFormData] =
        useState({
            callNo: "",
            customerName: "",
            personToContact: "",
            department: "",
            personContacted: "",
            dateOfCalling: "",
            timeOfCalling: "",
            crossCheckedBy: "",
            status: "",
            customerResponse: "",
            remarks: "",
        });

    const [data, setData] = useState([]);

    const [calls, setCalls] = useState(
        []
    );

    const [customers, setCustomers] =
        useState([]);

    const [departments, setDepartments] =
        useState([]);

    const [employees, setEmployees] =
        useState([]);

    const [statuses, setStatuses] =
        useState([]);

    const [editId, setEditId] =
        useState(null);

    const [showForm, setShowForm] =
        useState(false);

    // =====================================
    // FETCH DATA
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
    // FETCH MASTERS
    // =====================================

    const fetchMasters = async () => {
        try {
            const [
                callRes,
                customerRes,
                deptRes,
                empRes,
                statusRes,
            ] = await Promise.all([
                axios.get(
                    "http://localhost:5000/api/v1/call-entry-form"
                ),

                axios.get(
                    "http://localhost:5000/api/v1/customer-master"
                ),

                axios.get(
                    "http://localhost:5000/api/v1/department"
                ),

                axios.get(
                    "http://localhost:5000/api/v1/employee-master"
                ),

                axios.get(
                    "http://localhost:5000/api/v1/status-master"
                ),
            ]);

            setCalls(callRes.data.data || []);

            setCustomers(
                customerRes.data.data || []
            );

            setDepartments(
                deptRes.data.data || []
            );

            setEmployees(
                empRes.data.data || []
            );

            setStatuses(
                statusRes.data.data || []
            );
        } catch (error) {
            console.log(error);
        }
    };

    // =====================================
    // USE EFFECT
    // =====================================

    useEffect(() => {
        fetchData();

        fetchMasters();
    }, []);

    // =====================================
    // HANDLE CHANGE
    // =====================================

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    // =====================================
    // SUBMIT
    // =====================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId) {
                await axios.put(
                    `${API}/${editId}`,
                    formData
                );

                alert("Updated Successfully");
            } else {
                await axios.post(
                    API,
                    formData
                );

                alert("Created Successfully");
            }

            fetchData();

            setShowForm(false);

            setEditId(null);

            setFormData({
                callNo: "",
                customerName: "",
                personToContact: "",
                department: "",
                personContacted: "",
                dateOfCalling: "",
                timeOfCalling: "",
                crossCheckedBy: "",
                status: "",
                customerResponse: "",
                remarks: "",
            });
        } catch (error) {
            console.log(error);

            alert("Failed");
        }
    };

    // =====================================
    // EDIT
    // =====================================

    const handleEdit = (item) => {
        setEditId(item._id);

        setFormData({
            callNo:
                item.callNo?._id || "",

            customerName:
                item.customerName?._id || "",

            personToContact:
                item.personToContact || "",

            department:
                item.department?._id || "",

            personContacted:
                item.personContacted || "",

            dateOfCalling:
                item.dateOfCalling
                    ?.split("T")[0] || "",

            timeOfCalling:
                item.timeOfCalling || "",

            crossCheckedBy:
                item.crossCheckedBy?._id ||
                "",

            status:
                item.status?._id || "",

            customerResponse:
                item.customerResponse || "",

            remarks:
                item.remarks || "",
        });

        setShowForm(true);
    };

    // =====================================
    // DELETE
    // =====================================

    const handleDelete = async (id) => {
        if (
            !window.confirm(
                "Delete this record?"
            )
        )
            return;

        try {
            await axios.delete(
                `${API}/${id}`
            );

            fetchData();

            alert("Deleted");
        } catch (error) {
            console.log(error);
        }
    };

    // =====================================
    // CLOSE MODAL
    // =====================================

    const closeModal = () => {
        setShowForm(false);
        setEditId(null);
        setFormData({
            callNo: "",
            customerName: "",
            personToContact: "",
            department: "",
            personContacted: "",
            dateOfCalling: "",
            timeOfCalling: "",
            crossCheckedBy: "",
            status: "",
            customerResponse: "",
            remarks: "",
        });
    };

    // =====================================
    // RENDER
    // =====================================

    return (
        <div className="p-6">

            {/* HEADER */}

            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    Cross Check Form
                </h1>

                <p className="text-gray-500">
                    Customer Calling Entry Form
                </p>
            </div>

            {/* ADD BUTTON */}

            <div className="flex justify-end mb-4">
                <button
                    onClick={() => {
                        setShowForm(true);
                        setEditId(null);
                        setFormData({
                            callNo: "",
                            customerName: "",
                            personToContact: "",
                            department: "",
                            personContacted: "",
                            dateOfCalling: "",
                            timeOfCalling: "",
                            crossCheckedBy: "",
                            status: "",
                            customerResponse: "",
                            remarks: "",
                        });
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl shadow transition duration-200"
                >
                    Cross Check Form
                </button>
            </div>

            {/* MODAL BACKDROP */}

            {showForm && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">

                    {/* MODAL CARD */}

                    <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl relative max-h-[95vh] overflow-y-auto">

                        {/* HEADER WITH CLOSE BUTTON */}

                        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center rounded-t-2xl">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {editId ? "Edit Customer Calling" : "Add Customer Calling"}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-3xl text-gray-500 hover:text-gray-700 transition"
                            >
                                ×
                            </button>
                        </div>

                        {/* FORM CONTENT */}

                        <form
                            onSubmit={handleSubmit}
                            className="p-6 grid md:grid-cols-2 gap-5"
                        >

                            {/* CALL NO */}

                            <div>
                                <label className="block mb-2 font-medium text-gray-700">
                                    Call No
                                </label>

                                <select
                                    name="callNo"
                                    value={formData.callNo}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                >
                                    <option value="">
                                        Select Call
                                    </option>

                                    {calls.map((item) => (
                                        <option
                                            key={item._id}
                                            value={item._id}
                                        >
                                            {item.callNo}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* CUSTOMER */}

                            <div>
                                <label className="block mb-2 font-medium text-gray-700">
                                    Customer Name
                                </label>

                                <select
                                    name="customerName"
                                    value={
                                        formData.customerName
                                    }
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                >
                                    <option value="">
                                        Select Customer
                                    </option>

                                    {customers.map((item) => (
                                        <option
                                            key={item._id}
                                            value={item._id}
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* PERSON TO CONTACT */}

                            <div>
                                <label className="block mb-2 font-medium text-gray-700">
                                    Person To Contact
                                </label>

                                <input
                                    type="text"
                                    name="personToContact"
                                    value={
                                        formData.personToContact
                                    }
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* DEPARTMENT */}

                            <div>
                                <label className="block mb-2 font-medium text-gray-700">
                                    Department
                                </label>

                                <select
                                    name="department"
                                    value={
                                        formData.department
                                    }
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">
                                        Select Department
                                    </option>

                                    {departments.map(
                                        (item) => (
                                            <option
                                                key={item._id}
                                                value={item._id}
                                            >
                                                {
                                                    item.departmentName
                                                }
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            {/* PERSON CONTACTED */}

                            <div>
                                <label className="block mb-2 font-medium text-gray-700">
                                    Person Contacted
                                </label>

                                <input
                                    type="text"
                                    name="personContacted"
                                    value={
                                        formData.personContacted
                                    }
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* DATE */}

                            <div>
                                <label className="block mb-2 font-medium text-gray-700">
                                    Date Of Calling
                                </label>

                                <input
                                    type="date"
                                    name="dateOfCalling"
                                    value={
                                        formData.dateOfCalling
                                    }
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* TIME */}

                            <div>
                                <label className="block mb-2 font-medium text-gray-700">
                                    Time Of Calling
                                </label>

                                <input
                                    type="time"
                                    name="timeOfCalling"
                                    value={
                                        formData.timeOfCalling
                                    }
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* CROSS CHECKED */}

                            <div>
                                <label className="block mb-2 font-medium text-gray-700">
                                    Cross Checked By
                                </label>

                                <select
                                    name="crossCheckedBy"
                                    value={
                                        formData.crossCheckedBy
                                    }
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">
                                        Select Employee
                                    </option>

                                    {employees.map((item) => (
                                        <option
                                            key={item._id}
                                            value={item._id}
                                        >
                                            {item.employeeName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* STATUS */}

                            <div>
                                <label className="block mb-2 font-medium text-gray-700">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">
                                        Select Status
                                    </option>

                                    {statuses.map((item) => (
                                        <option
                                            key={item._id}
                                            value={item._id}
                                        >
                                            {item.statusName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* CUSTOMER RESPONSE */}

                            <div className="md:col-span-2">
                                <label className="block mb-2 font-medium text-gray-700">
                                    Customer Response
                                </label>

                                <textarea
                                    name="customerResponse"
                                    value={
                                        formData.customerResponse
                                    }
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* REMARKS */}

                            <div className="md:col-span-2">
                                <label className="block mb-2 font-medium text-gray-700">
                                    Remarks
                                </label>

                                <textarea
                                    name="remarks"
                                    value={formData.remarks}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* BUTTONS */}

                            <div className="md:col-span-2 flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition duration-200"
                                >
                                    {editId
                                        ? "Update"
                                        : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* TABLE */}

            <div className="bg-white shadow rounded-2xl overflow-x-auto">

                <table className="w-full border-collapse">

                    <thead>
                        <tr className="bg-gray-100">

                            <th className="p-3 text-left font-semibold text-gray-700">
                                S.No
                            </th>

                            <th className="p-3 text-left font-semibold text-gray-700">
                                Call No
                            </th>

                            <th className="p-3 text-left font-semibold text-gray-700">
                                Customer
                            </th>

                            <th className="p-3 text-left font-semibold text-gray-700">
                                Person To Contact
                            </th>

                            <th className="p-3 text-left font-semibold text-gray-700">
                                Department
                            </th>

                            {/* New columns as per request */}
                            <th className="p-3 text-left font-semibold text-gray-700">
                                Person Contacted
                            </th>
                            <th className="p-3 text-left font-semibold text-gray-700">
                                Cross Checked By
                            </th>
                            <th className="p-3 text-left font-semibold text-gray-700">
                                Date Of Calling
                            </th>
                            <th className="p-3 text-left font-semibold text-gray-700">
                                Customer Response
                            </th>
                            <th className="p-3 text-left font-semibold text-gray-700">
                                Remarks
                            </th>

                            <th className="p-3 text-left font-semibold text-gray-700">
                                Status
                            </th>

                            <th className="p-3 text-left font-semibold text-gray-700">
                                Actions
                            </th>

                        </tr>
                    </thead>

                    <tbody>

                        {data.map((item, index) => (
                            <tr
                                key={item._id}
                                className="border-b hover:bg-gray-50 transition"
                            >

                                <td className="p-3 text-gray-700">
                                    {index + 1}
                                </td>

                                <td className="p-3 text-gray-700">
                                    {
                                        item.callNo
                                            ?.callNo
                                    }
                                </td>

                                <td className="p-3 text-gray-700">
                                    {
                                        item.customerName
                                            ?.name
                                    }
                                </td>

                                <td className="p-3 text-gray-700">
                                    {
                                        item.personToContact
                                    }
                                </td>

                                <td className="p-3 text-gray-700">
                                    {
                                        item.department
                                            ?.departmentName
                                    }
                                </td>

                                {/* New columns */}
                                <td className="p-3 text-gray-700">
                                    {item.personContacted}
                                </td>
                                <td className="p-3 text-gray-700">
                                    {item.crossCheckedBy?.employeeName || ""}
                                </td>
                                <td className="p-3 text-gray-700">
                                    {item.dateOfCalling
                                        ? new Date(item.dateOfCalling).toLocaleDateString("en-CA")
                                        : ""}
                                </td>
                                <td className="p-3 text-gray-700">
                                    {item.customerResponse}
                                </td>
                                <td className="p-3 text-gray-700">
                                    {item.remarks}
                                </td>

                                <td className="p-3">
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                        {
                                            item.status
                                                ?.statusName
                                        }
                                    </span>
                                </td>

                                <td className="p-3 flex gap-2">

                                    <button
                                        onClick={() =>
                                            handleEdit(item)
                                        }
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg text-sm transition duration-200"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                item._id
                                            )
                                        }
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm transition duration-200"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

                {data.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        No records found
                    </div>
                )}

            </div>
        </div>
    );
};

export default CustomerCallingForm;
