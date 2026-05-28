import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE =
  "http://localhost:5000/api/v1/client-history";

const ClientHistory = () => {
  const [histories, setHistories] = useState([]);

  const [clients, setClients] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [incomes, setIncomes] = useState([]);

  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [form, setForm] = useState({
    clientId: "",
    invoiceId: "",
    incomeId: "",

    workType: "",

    serviceDetails: "",
    productDetails: "",

    totalAmount: "",
    receivedAmount: "",
    dueAmount: "",

    paymentStatus: "Pending",

    serviceDate: "",
    nextServiceDate: "",

    remarks: "",
  });

  // ================= FETCH HISTORY =================

  const fetchHistories = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API_BASE);

      setHistories(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH CLIENTS =================

  const fetchClients = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/client"
      );

      setClients(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= FETCH INVOICES =================

  const fetchInvoices = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/invoice"
      );

      setInvoices(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= FETCH INCOMES =================

  const fetchIncomes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/income"
      );

      setIncomes(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistories();
    fetchClients();
    fetchInvoices();
    fetchIncomes();
  }, []);

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,

        totalAmount:
          Number(form.totalAmount) || 0,

        receivedAmount:
          Number(form.receivedAmount) || 0,

        dueAmount:
          Number(form.dueAmount) || 0,
      };

      await axios.post(API_BASE, payload);

      alert(
        "Client History Created Successfully"
      );

      fetchHistories();

      setShowModal(false);

      setForm({
        clientId: "",
        invoiceId: "",
        incomeId: "",

        workType: "",

        serviceDetails: "",
        productDetails: "",

        totalAmount: "",
        receivedAmount: "",
        dueAmount: "",

        paymentStatus: "Pending",

        serviceDate: "",
        nextServiceDate: "",

        remarks: "",
      });
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message
      );
    }
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-3xl font-bold">
            Client History Management
          </h1>

          <p className="text-gray-500">
            Manage client service history
          </p>
        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl"
        >
          + Add History
        </button>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">
                Client
              </th>

              <th className="p-3 text-left">
                Company
              </th>

              <th className="p-3 text-left">
                Work Type
              </th>

              <th className="p-3 text-left">
                Total
              </th>

              <th className="p-3 text-left">
                Received
              </th>

              <th className="p-3 text-left">
                Due
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Service Date
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="8"
                  className="p-5 text-center"
                >
                  Loading...
                </td>
              </tr>
            ) : histories.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="p-5 text-center"
                >
                  No Client History Found
                </td>
              </tr>
            ) : (
              histories.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">
                    {
                      item.clientId
                        ?.clientName
                    }
                  </td>

                  <td className="p-3">
                    {
                      item.clientId
                        ?.companyName
                    }
                  </td>

                  <td className="p-3">
                    {item.workType}
                  </td>

                  <td className="p-3">
                    ₹{item.totalAmount}
                  </td>

                  <td className="p-3">
                    ₹
                    {
                      item.receivedAmount
                    }
                  </td>

                  <td className="p-3">
                    ₹{item.dueAmount}
                  </td>

                  <td className="p-3">
                    {item.paymentStatus}
                  </td>

                  <td className="p-3">
                    {item.serviceDate
                      ? new Date(
                          item.serviceDate
                        ).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-5">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-lg p-5 max-h-[90vh] overflow-y-auto">
            {/* HEADER */}

            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold">
                Add Client History
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="text-red-500 text-xl"
              >
                ✕
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-4"
            >
              {/* CLIENT */}

              <select
                name="clientId"
                className="input"
                value={form.clientId}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Client
                </option>

                {clients.map((item) => (
                  <option
                    key={item._id}
                    value={item._id}
                  >
                    {item.clientName}
                  </option>
                ))}
              </select>

              {/* INVOICE */}

              <select
                name="invoiceId"
                className="input"
                value={form.invoiceId}
                onChange={handleChange}
              >
                <option value="">
                  Select Invoice
                </option>

                {invoices.map((item) => (
                  <option
                    key={item._id}
                    value={item._id}
                  >
                    {item.invoiceNumber}
                  </option>
                ))}
              </select>

              {/* INCOME */}

              <select
                name="incomeId"
                className="input"
                value={form.incomeId}
                onChange={handleChange}
              >
                <option value="">
                  Select Income
                </option>

                {incomes.map((item) => (
                  <option
                    key={item._id}
                    value={item._id}
                  >
                    {item.clientName}
                  </option>
                ))}
              </select>

              {/* WORK TYPE */}

              <select
                name="workType"
                className="input"
                value={form.workType}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Work Type
                </option>

                <option value="Installation">
                  Installation
                </option>

                <option value="Maintenance">
                  Maintenance
                </option>

                <option value="Service">
                  Service
                </option>

                <option value="AMC">
                  AMC
                </option>

                <option value="Project">
                  Project
                </option>
              </select>

              {/* SERVICE DETAILS */}

              <textarea
                name="serviceDetails"
                placeholder="Service Details"
                className="input md:col-span-2"
                value={form.serviceDetails}
                onChange={handleChange}
              />

              {/* PRODUCT DETAILS */}

              <textarea
                name="productDetails"
                placeholder="Product Details"
                className="input md:col-span-2"
                value={form.productDetails}
                onChange={handleChange}
              />

              {/* AMOUNTS */}

              <input
                type="number"
                name="totalAmount"
                placeholder="Total Amount"
                className="input"
                value={form.totalAmount}
                onChange={handleChange}
              />

              <input
                type="number"
                name="receivedAmount"
                placeholder="Received Amount"
                className="input"
                value={
                  form.receivedAmount
                }
                onChange={handleChange}
              />

              <input
                type="number"
                name="dueAmount"
                placeholder="Due Amount"
                className="input"
                value={form.dueAmount}
                onChange={handleChange}
              />

              {/* PAYMENT STATUS */}

              <select
                name="paymentStatus"
                className="input"
                value={
                  form.paymentStatus
                }
                onChange={handleChange}
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="Partial">
                  Partial
                </option>

                <option value="Paid">
                  Paid
                </option>

                <option value="Overdue">
                  Overdue
                </option>
              </select>

              {/* DATES */}

              <input
                type="date"
                name="serviceDate"
                className="input"
                value={form.serviceDate}
                onChange={handleChange}
              />

              <input
                type="date"
                name="nextServiceDate"
                className="input"
                value={
                  form.nextServiceDate
                }
                onChange={handleChange}
              />

              {/* REMARKS */}

              <textarea
                name="remarks"
                placeholder="Remarks"
                className="input md:col-span-2"
                value={form.remarks}
                onChange={handleChange}
              />

              {/* BUTTONS */}

              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-5 rounded-xl"
                >
                  Save History
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="bg-gray-300 hover:bg-gray-400 py-3 px-5 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

export default ClientHistory;