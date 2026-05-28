import { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

// =====================================
// API
// =====================================

const API =
  "https://networkautomation-in-234510.hostingersite.com/?utm_source=chatgpt.com/api/v1/customer-master";

const SUPPORT_API =
  "https://networkautomation-in-234510.hostingersite.com/?utm_source=chatgpt.com/api/v1/support-period-master";

// =====================================
// INITIAL FORM
// =====================================

const INITIAL_FORM = {
  name: "",
  address1: "",
  address2: "",
  landmark: "",
  city: "",
  state: "",
  phone1: "",
  phone2: "",
  faxNumber: "",
  email: "",
  website: "",
  supportPeriod: "",
  warrantyStartDate: "",
  warrantyEndDate: "",
};

export default function CustomerMaster() {
  const [data, setData] = useState([]);
  const [supportPeriods, setSupportPeriods] =
    useState([]);

  const [form, setForm] =
    useState(INITIAL_FORM);

  const [open, setOpen] = useState(false);

  const [editingId, setEditingId] =
    useState(null);

  // =====================================
  // FETCH CUSTOMERS
  // =====================================

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(API);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // =====================================
  // FETCH SUPPORT PERIODS
  // =====================================

  const fetchSupportPeriods = async () => {
    try {
      const res = await axios.get(SUPPORT_API);
      setSupportPeriods(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchSupportPeriods();
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
  // SUBMIT
  // =====================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `${API}/${editingId}`,
          form
        );
      } else {
        await axios.post(API, form);
      }

      fetchCustomers();

      setOpen(false);

      setForm(INITIAL_FORM);

      setEditingId(null);
    } catch (error) {
      console.log(error);
    }
  };

  // =====================================
  // EDIT
  // =====================================

  const handleEdit = (item) => {
    setEditingId(item._id);

    setForm({
      ...item,
      supportPeriod:
        item.supportPeriod?._id || "",
      warrantyStartDate:
        item.warrantyStartDate?.split(
          "T"
        )[0] || "",
      warrantyEndDate:
        item.warrantyEndDate?.split(
          "T"
        )[0] || "",
    });

    setOpen(true);
  };

  // =====================================
  // DELETE
  // =====================================

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure want to delete?"
      )
    )
      return;

    try {
      await axios.delete(`${API}/${id}`);
      fetchCustomers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}

      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">
          Customer Master
        </h1>

        <button
          onClick={() => {
            setOpen(true);
            setForm(INITIAL_FORM);
            setEditingId(null);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={18} />
          Add Customer
        </button>
      </div>

      {/* TABLE */}

      <div className="overflow-auto border rounded-lg">
        <table className="w-full border-collapse min-w-[1200px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Address 1</th>
              <th className="p-3 border">Address 2</th>
              <th className="p-3 border">Landmark</th>
              <th className="p-3 border">City</th>
              <th className="p-3 border">State</th>
              <th className="p-3 border">Phone 1</th>
              <th className="p-3 border">Phone 2</th>
              <th className="p-3 border">Fax Number</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Website</th>
              <th className="p-3 border">Support Period</th>
              <th className="p-3 border">Warranty Start Date</th>
              <th className="p-3 border">Warranty End Date</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td className="p-3 border">{item.name}</td>
                <td className="p-3 border">{item.address1}</td>
                <td className="p-3 border">{item.address2}</td>
                <td className="p-3 border">{item.landmark}</td>
                <td className="p-3 border">{item.city}</td>
                <td className="p-3 border">{item.state}</td>
                <td className="p-3 border">{item.phone1}</td>
                <td className="p-3 border">{item.phone2}</td>
                <td className="p-3 border">{item.faxNumber}</td>
                <td className="p-3 border">{item.email}</td>
                <td className="p-3 border">{item.website}</td>
                <td className="p-3 border">
                  {item.supportPeriod?.supportPeriodName}
                </td>
                <td className="p-3 border">
                  {item.warrantyStartDate
                    ? new Date(item.warrantyStartDate).toLocaleDateString()
                    : ""}
                </td>
                <td className="p-3 border">
                  {item.warrantyEndDate
                    ? new Date(item.warrantyEndDate).toLocaleDateString()
                    : ""}
                </td>
                <td className="p-3 border">
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil
                        size={18}
                        className="text-blue-600"
                      />
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                    >
                      <Trash2
                        size={18}
                        className="text-red-600"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-4xl rounded-lg p-6 relative max-h-[90vh] overflow-auto">
            {/* CLOSE */}

            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-5">
              {editingId
                ? "Edit Customer"
                : "Add Customer"}
            </h2>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Customer Name"
                value={form.name}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <input
                type="text"
                name="address1"
                placeholder="Address 1"
                value={form.address1}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <input
                type="text"
                name="address2"
                placeholder="Address 2"
                value={form.address2}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <input
                type="text"
                name="landmark"
                placeholder="Landmark"
                value={form.landmark}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <input
                type="text"
                name="phone1"
                placeholder="Phone 1"
                value={form.phone1}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <input
                type="text"
                name="phone2"
                placeholder="Phone 2"
                value={form.phone2}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <input
                type="text"
                name="faxNumber"
                placeholder="Fax Number"
                value={form.faxNumber}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <input
                type="text"
                name="website"
                placeholder="Website"
                value={form.website}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              {/* SUPPORT PERIOD */}

              <select
                name="supportPeriod"
                value={form.supportPeriod}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              >
                <option value="">
                  Select Support Period
                </option>

                {supportPeriods.map((item) => (
                  <option
                    key={item._id}
                    value={item._id}
                  >
                    {item.supportPeriodName}
                  </option>
                ))}
              </select>

              {/* WARRANTY DATES */}

              <input
                type="date"
                name="warrantyStartDate"
                value={
                  form.warrantyStartDate
                }
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <input
                type="date"
                name="warrantyEndDate"
                value={
                  form.warrantyEndDate
                }
                onChange={handleChange}
                className="border p-2 rounded"
              />

              {/* BUTTON */}

              <div className="col-span-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-5 py-2 rounded"
                >
                  {editingId
                    ? "Update Customer"
                    : "Create Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}