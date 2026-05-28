import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/v1/income";

// Field mapping for model (nas-backend/src/models/income-model.js)
const incomeFormInitialState = {
  date: "",
  owner: "",
  partyName: "",
  mobileNumber: "",
  workType: "",
  productDetails: "",
  purchaseAmount: "",
  saleAmount: "",
  serviceCharge: "",
  totalAmount: "",
  actualProfit: "",
  receiptAmount: "",
  dueAmount: "",
  dueDate: "",
  paymentMode: "",
  invoiceNumber: "",
  remarks: "",
};

const IncomeManagement = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ ...incomeFormInitialState });

  // ================= FETCH =================

  const fetchIncome = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE);
      setIncomes(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncome();
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
      // Cast numerics as needed (from model)
      const payload = {
        ...form,
        purchaseAmount: form.purchaseAmount ? Number(form.purchaseAmount) : 0,
        saleAmount: form.saleAmount ? Number(form.saleAmount) : 0,
        serviceCharge: form.serviceCharge ? Number(form.serviceCharge) : 0,
        totalAmount: form.totalAmount ? Number(form.totalAmount) : 0,
        actualProfit: form.actualProfit ? Number(form.actualProfit) : 0,
        receiptAmount: form.receiptAmount ? Number(form.receiptAmount) : 0,
        dueAmount: form.dueAmount ? Number(form.dueAmount) : 0,
      };

      await axios.post(API_BASE, payload);

      alert("Income Created Successfully");
      fetchIncome();

      setShowModal(false);
      setForm({ ...incomeFormInitialState });
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message);
    }
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-3xl font-bold">Income Management</h1>
          <p className="text-gray-500">Manage daily income and payments</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl"
        >
          + Add Income
        </button>
      </div>
      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Party Name</th>
              <th className="p-3 text-left">Work Type</th>
              <th className="p-3 text-left">Product Details</th>
              <th className="p-3 text-left">Sale Amount</th>
              <th className="p-3 text-left">Receipt</th>
              <th className="p-3 text-left">Due</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="p-5 text-center">
                  Loading...
                </td>
              </tr>
            ) : incomes.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-5 text-center">
                  No Income Found
                </td>
              </tr>
            ) : (
              incomes.map((item) => {
                let paymentStatus = "Unpaid";
                if (item.dueAmount === 0) paymentStatus = "Paid";
                else if (
                  item.receiptAmount > 0 &&
                  item.receiptAmount < item.totalAmount
                )
                  paymentStatus = "Partial";

                return (
                  <tr key={item._id} className="border-b">
                    <td className="p-3">
                      {item.date
                        ? new Date(item.date).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="p-3">{item.partyName}</td>
                    <td className="p-3">{item.workType}</td>
                    <td className="p-3">{item.productDetails}</td>
                    <td className="p-3">
                      ₹ {item.saleAmount?.toLocaleString?.() ?? 0}
                    </td>
                    <td className="p-3">
                      ₹ {item.receiptAmount?.toLocaleString?.() ?? 0}
                    </td>
                    <td className="p-3">
                      ₹ {item.dueAmount?.toLocaleString?.() ?? 0}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-xs ${
                          paymentStatus === "Paid"
                            ? "bg-green-500"
                            : paymentStatus === "Partial"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      >
                        {paymentStatus}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl max-h-[95vh] overflow-y-auto">
            {/* HEADER */}
            <div className="flex justify-between items-center border-b p-5 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold">Add Income</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-red-500 text-2xl"
              >
                ×
              </button>
            </div>
            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-4 p-5"
            >
              <input
                type="date"
                name="date"
                className="input"
                value={form.date}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="owner"
                placeholder="Owner"
                className="input"
                value={form.owner}
                onChange={handleChange}
              />
              <input
                type="text"
                name="partyName"
                placeholder="Party Name"
                className="input"
                value={form.partyName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="mobileNumber"
                placeholder="Mobile Number"
                className="input"
                value={form.mobileNumber}
                onChange={handleChange}
              />
              <input
                type="text"
                name="workType"
                placeholder="Work Type"
                className="input"
                value={form.workType}
                onChange={handleChange}
              />
              <input
                type="text"
                name="productDetails"
                placeholder="Product Details"
                className="input"
                value={form.productDetails}
                onChange={handleChange}
              />
              <input
                type="number"
                name="purchaseAmount"
                placeholder="Purchase Amount"
                className="input"
                value={form.purchaseAmount}
                onChange={handleChange}
              />
              <input
                type="number"
                name="saleAmount"
                placeholder="Sale Amount"
                className="input"
                value={form.saleAmount}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="serviceCharge"
                placeholder="Service Charge"
                className="input"
                value={form.serviceCharge}
                onChange={handleChange}
              />
              <input
                type="number"
                name="totalAmount"
                placeholder="Total Amount"
                className="input"
                value={form.totalAmount}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="actualProfit"
                placeholder="Actual Profit"
                className="input"
                value={form.actualProfit}
                onChange={handleChange}
              />
              <input
                type="number"
                name="receiptAmount"
                placeholder="Receipt Amount"
                className="input"
                value={form.receiptAmount}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="dueAmount"
                placeholder="Due Amount"
                className="input"
                value={form.dueAmount}
                onChange={handleChange}
              />
              <input
                type="date"
                name="dueDate"
                className="input"
                value={form.dueDate}
                onChange={handleChange}
              />
              <select
                name="paymentMode"
                className="input"
                value={form.paymentMode}
                onChange={handleChange}
              >
                <option value="">Select Payment Mode</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cheque">Cheque</option>
                <option value="Card">Card</option>
              </select>
              <input
                type="text"
                name="invoiceNumber"
                placeholder="Invoice Number"
                className="input"
                value={form.invoiceNumber}
                onChange={handleChange}
              />
              <textarea
                name="remarks"
                placeholder="Remarks"
                className="input md:col-span-2"
                value={form.remarks}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl md:col-span-2"
              >
                Save Income
              </button>
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

export default IncomeManagement;