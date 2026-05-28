// =====================================
// src/pages/Invoice.jsx
// =====================================

import { useEffect, useState } from "react";

import axios from "axios";
import InvoiceModal from "./InvoiceModal";

const API = "http://localhost:5000/api/v1/invoice";

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // =====================================
  // FETCH INVOICES
  // =====================================
  useEffect(() => {
    // It's fine to call fetchInvoices asynchronously, but avoid
    // calling setInvoices synchronously in the useEffect itself.
    // Instead, define and invoke an async function.
    const fetchData = async () => {
      try {
        const res = await axios.get(API);
        setInvoices(res.data.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // =====================================
  // DELETE
  // =====================================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete Invoice?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`${API}/${id}`);
      // Refetch after delete
      const res = await axios.get(API);
      setInvoices(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // =====================================
  // TOTALS
  // =====================================

  const totalRevenue = invoices.reduce(
    (sum, item) => sum + (item.grandTotal || 0),
    0
  );

  const pendingAmount = invoices.reduce(
    (sum, item) => sum + (item.pendingAmount || 0),
    0
  );

  return (
    <div className="p-6">
      {/* ===================================== */}
      {/* PAGE HEADER */}
      {/* ===================================== */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Invoice Management</h1>
          <p className="text-gray-500">Manage all invoices</p>
        </div>
      </div>

      {/* ===================================== */}
      {/* DASHBOARD */}
      {/* ===================================== */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Invoices</p>
          <h2 className="text-2xl font-bold">{invoices.length}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Paid</p>
          <h2 className="text-2xl font-bold text-green-600">
            {invoices.filter((i) => i.paymentStatus === "Paid").length}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Pending</p>
          <h2 className="text-2xl font-bold text-red-600">
            {invoices.filter((i) => i.paymentStatus === "Pending").length}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Revenue</p>
          <h2 className="text-2xl font-bold">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Pending Amount</p>
          <h2 className="text-2xl font-bold text-yellow-600">
            ₹{pendingAmount.toLocaleString("en-IN")}
          </h2>
        </div>
      </div>

      {/* ===================================== */}
      {/* TABLE */}
      {/* ===================================== */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Invoice No</th>
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3">{item.invoiceNumber}</td>
                <td className="p-3">{item.client?.clientName}</td>
                <td className="p-3">
                  {item.invoiceDate
                    ? new Date(item.invoiceDate).toLocaleDateString()
                    : ""}
                </td>
                <td className="p-3">₹{item.grandTotal}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : item.paymentStatus === "Partial"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.paymentStatus}
                  </span>
                </td>
                <td className="p-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                    {item.invoiceStatus}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => {
                        setSelectedInvoice(item);
                        setOpenModal(true);
                      }}
                      className="bg-indigo-600 text-white px-3 py-1 rounded text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===================================== */}
      {/* MODAL */}
      {/* ===================================== */}
      {openModal && (
        <InvoiceModal
          invoice={selectedInvoice}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default Invoice;