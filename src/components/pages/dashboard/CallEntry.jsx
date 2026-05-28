import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, X } from "lucide-react";

const API = "http://localhost:5000/api/v1/call-entry";

const INITIAL_FORM = {
  company: "",
  endUserName: "",
  callDate: "",
  callTime: "",
  product: "CCTV",
  callType: "Warranty",
  nature: "Breakdown",
  callDetails: "",
  notedBy: "",
  receivedBy: "KS",
  auditedBy: "",
  sign: "",
};

const PRODUCT_OPTIONS = [
  "CCTV",
  "TA/AC",
  "PC/NW",
  "EPABX",
  "Others",
];

const CALLTYPE_OPTIONS = [
  "Warranty",
  "Chargeable",
  "FOC",
  "Inhouse",
  "Site Survey",
];

const NATURE_OPTIONS = [
  "Breakdown",
  "Proactive",
  "Preventive",
  "Courtesy",
  "Demo",
];

const RECEIVEDBY_OPTIONS = ["KS", "VB"];

function formatDate(dateStr) {
  if (!dateStr) return "";

  const d = new Date(dateStr);

  return d.toLocaleDateString("en-IN");
}

export default function CallGeneration() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] =
    useState(INITIAL_FORM);

  // =====================================
  // AUTO DATE + TIME
  // =====================================

  useEffect(() => {
    const now = new Date();

    const currentDate = now
      .toISOString()
      .split("T")[0];

    const currentTime = now.toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );

    setFormData((prev) => ({
      ...prev,
      callDate: currentDate,
      callTime: currentTime,
    }));
  }, [open]);

  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =====================================
  // GET DATA
  // =====================================

  const fetchData = async () => {
    try {
      const res = await axios.get(API);

      setData(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // =====================================
  // CREATE
  // =====================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Omit callNumber on POST
      const { callNumber, ...postData } = formData;
      await axios.post(API, postData);

      setOpen(false);

      setFormData(INITIAL_FORM);

      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      {/* HEADER */}

      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold">
          Call Generation
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Add Call
        </button>
      </div>

      {/* TABLE */}

      <div className="overflow-auto rounded-xl border">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">
                Call No
              </th>

              <th className="p-3 text-left">
                Company
              </th>

              <th className="p-3 text-left">
                Product
              </th>

              <th className="p-3 text-left">
                Call Type
              </th>

              <th className="p-3 text-left">
                Nature
              </th>

              <th className="p-3 text-left">
                Received
              </th>

              <th className="p-3 text-left">
                Date
              </th>

              <th className="p-3 text-left">
                Time
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item._id}
                className="border-t"
              >
                <td className="p-3">
                  {item.callNumber}
                </td>

                <td className="p-3">
                  {item.company}
                </td>

                <td className="p-3">
                  {item.product}
                </td>

                <td className="p-3">
                  {item.callType}
                </td>

                <td className="p-3">
                  {item.nature}
                </td>

                <td className="p-3">
                  {item.receivedBy}
                </td>

                <td className="p-3">
                  {formatDate(item.callDate)}
                </td>

                <td className="p-3">
                  {item.callTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* POPUP */}

      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            {/* CLOSE */}

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            <h2 className="text-3xl font-bold mb-6">
              Create Call Generation
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {/* CALL NUMBER */}
                {/* (REMOVED FIELD) */}

                {/* CALL DATE */}

                <input
                  type="date"
                  name="callDate"
                  value={formData.callDate}
                  onChange={handleChange}
                  className="border rounded-lg px-2 py-2"
                  required
                />

                {/* CALL TIME */}

                <input
                  type="text"
                  name="callTime"
                  value={formData.callTime}
                  onChange={handleChange}
                  placeholder="Call Time"
                  className="border rounded-lg px-2 py-2"
                />

                {/* COMPANY */}

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="border rounded-lg px-2 py-2"
                  required
                />

                {/* END USER */}

                <input
                  type="text"
                  name="endUserName"
                  value={formData.endUserName}
                  onChange={handleChange}
                  placeholder="End User Name"
                  className="border rounded-lg px-2 py-2"
                />

                {/* PRODUCT */}

                <select
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="border rounded-lg px-2 py-2"
                >
                  {PRODUCT_OPTIONS.map((opt) => (
                    <option
                      key={opt}
                      value={opt}
                    >
                      {opt}
                    </option>
                  ))}
                </select>

                {/* CALL TYPE */}

                <select
                  name="callType"
                  value={formData.callType}
                  onChange={handleChange}
                  className="border rounded-lg px-2 py-2"
                >
                  {CALLTYPE_OPTIONS.map((opt) => (
                    <option
                      key={opt}
                      value={opt}
                    >
                      {opt}
                    </option>
                  ))}
                </select>

                {/* NATURE */}

                <select
                  name="nature"
                  value={formData.nature}
                  onChange={handleChange}
                  className="border rounded-lg px-2 py-2"
                >
                  {NATURE_OPTIONS.map((opt) => (
                    <option
                      key={opt}
                      value={opt}
                    >
                      {opt}
                    </option>
                  ))}
                </select>

                {/* RECEIVED */}

                <select
                  name="receivedBy"
                  value={formData.receivedBy}
                  onChange={handleChange}
                  className="border rounded-lg px-2 py-2"
                >
                  {RECEIVEDBY_OPTIONS.map((opt) => (
                    <option
                      key={opt}
                      value={opt}
                    >
                      {opt}
                    </option>
                  ))}
                </select>

                {/* NOTED */}

                <input
                  type="text"
                  name="notedBy"
                  value={formData.notedBy}
                  onChange={handleChange}
                  placeholder="Noted By"
                  className="border rounded-lg px-2 py-2"
                />

                {/* AUDITED */}

                <input
                  type="text"
                  name="auditedBy"
                  value={formData.auditedBy}
                  onChange={handleChange}
                  placeholder="Audited By"
                  className="border rounded-lg px-2 py-2"
                />

                {/* SIGN */}

                <input
                  type="text"
                  name="sign"
                  value={formData.sign}
                  onChange={handleChange}
                  placeholder="Sign"
                  className="border rounded-lg px-2 py-2"
                />

                {/* DETAILS */}

                <textarea
                  rows={4}
                  name="callDetails"
                  value={formData.callDetails}
                  onChange={handleChange}
                  placeholder="Call Details"
                  className="border rounded-lg px-2 py-2 col-span-2 resize-none"
                />
              </div>

              {/* BUTTON */}

              <div className="flex justify-end mt-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white px-6 py-3 rounded-lg"
                >
                  {loading
                    ? "Saving..."
                    : "Save Call"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}