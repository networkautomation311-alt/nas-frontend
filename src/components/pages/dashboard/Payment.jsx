// =====================================
// src/components/pages/dashboard/DuePayment.jsx
// =====================================

import { useEffect, useState } from "react";
import axios from "axios";
import ReceivePaymentModal from "./ReceivePaymentModal";

const API = "http://localhost:5000/api/v1/payment";

const DuePayment = () => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [receiveModal, setReceiveModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [editPayment, setEditPayment] = useState(null);

  // Fetch payments from new API
  const fetchPayments = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(API);
      setPayments(res.data.data || []);
    } catch (error) {
      setPayments([]);
      // Optionally show error message
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line
  }, []);

  // DELETE handler
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete payment?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchPayments();
    } catch (error) {
      // Optionally show error message
    }
  };

  // Dashboard summaries
  const totalPending = payments.reduce(
    (sum, item) => sum + (item.pendingAmount || 0),
    0
  );
  const totalPaid = payments.reduce(
    (sum, item) => sum + (item.receivedAmount || 0),
    0
  );
  const overduePayments = payments.filter(
    (item) => item.status === "Overdue"
  ).length;

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Due Payment Management</h1>
          <p className="text-gray-500">ERP Payment Tracking</p>
        </div>
        {/* No "+ Add Payment" button as payments are auto populated from invoices */}
      </div>

      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500 text-sm">Total Pending</p>
          <h2 className="text-3xl font-bold text-red-600">
            ₹{totalPending.toLocaleString("en-IN")}
          </h2>
        </div>
        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500 text-sm">Total Paid</p>
          <h2 className="text-3xl font-bold text-green-600">
            ₹{totalPaid.toLocaleString("en-IN")}
          </h2>
        </div>
        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500 text-sm">Overdue Payments</p>
          <h2 className="text-3xl font-bold text-yellow-600">
            {overduePayments}
          </h2>
        </div>
        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500 text-sm">Total Records</p>
          <h2 className="text-3xl font-bold">{payments.length}</h2>
        </div>
      </div>

      {/* MAIN TABLE */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-10 text-center text-gray-500 font-medium">
              Loading payments...
            </div>
          ) : payments.length === 0 ? (
            <div className="p-10 text-center text-gray-500 font-medium">
              No due payments found
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">Client</th>
                  <th className="p-4 text-left">Invoice</th>
                  <th className="p-4 text-left">Order</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Received</th>
                  <th className="p-4 text-left">Pending</th>
                  <th className="p-4 text-left">Due Date</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((item) => {
                  const statusBadge = (() => {
                    if (item.status === "Paid")
                      return "bg-green-100 text-green-700";
                    if (item.status === "Pending")
                      return "bg-yellow-100 text-yellow-700";
                    return "bg-red-100 text-red-700";
                  })();
                  return (
                    <tr key={item._id} className="border-t">
                      <td className="p-4">
                        {item.client?.clientName || "-"}
                      </td>
                      <td className="p-4">
                        {item.invoice?.invoiceNumber || "-"}
                      </td>
                      <td className="p-4">
                        {item.order?.orderId ||
                          (item.order?._id && item.order._id) ||
                          "-"}
                      </td>
                      <td className="p-4">
                        ₹{item.totalAmount !== undefined ? item.totalAmount : "-"}
                      </td>
                      <td className="p-4 text-green-600">
                        ₹
                        {item.receivedAmount !== undefined
                          ? item.receivedAmount
                          : "-"}
                      </td>
                      <td className="p-4 text-red-600">
                        ₹
                        {item.pendingAmount !== undefined
                          ? item.pendingAmount
                          : "-"}
                      </td>
                      <td className="p-4">
                        {item.dueDate
                          ? new Date(item.dueDate).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2 flex-wrap">
                          {/* RECEIVE */}
                          <button
                            onClick={() => {
                              setSelectedPayment(item);
                              setReceiveModal(true);
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg text-sm"
                          >
                            Receive
                          </button>

                          {/* EDIT */}
                          <button
                            onClick={() => {
                              setEditPayment(item);
                              // Place for future edit modal, if required
                              // Or reuse receive modal for editing
                              setSelectedPayment(item);
                              setReceiveModal(true);
                            }}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg text-sm"
                          >
                            Edit
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* RECEIVE PAYMENT MODAL */}
      {receiveModal && (
        <ReceivePaymentModal
          payment={selectedPayment}
          onClose={() => {
            setReceiveModal(false);
            setEditPayment(null);
          }}
          refreshPayments={fetchPayments}
        />
      )}
    </div>
  );
};

export default DuePayment;