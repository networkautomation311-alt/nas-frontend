// =====================================
// src/components/pages/dashboard/DuePaymentModal.jsx
// =====================================

import {
    useState,
  } from "react";
  
  import axios from "axios";
  
  const API =
    "http://localhost:5000/api/v1/payment";
  
  const DuePaymentModal = ({
    payment,
    onClose,
    refreshPayments,
  }) => {
  
    const [formData,
      setFormData] =
      useState({
  
        totalAmount:
          payment?.totalAmount || "",
  
        receivedAmount:
          payment?.receivedAmount || "",
  
        dueDate:
          payment?.dueDate
            ? payment.dueDate.slice(
                0,
                10
              )
            : "",
  
        remark:
          payment?.remark || "",
      });
  
    // HANDLE CHANGE
  
    const handleChange =
      (e) => {
  
        setFormData({
          ...formData,
          [e.target.name]:
            e.target.value,
        });
      };
  
    // SUBMIT
  
    const handleSubmit =
      async (e) => {
  
        e.preventDefault();
  
        try {
  
          if (payment?._id) {
  
            await axios.put(
              `${API}/${payment._id}`,
              formData
            );
  
          } else {
  
            await axios.post(
              API,
              formData
            );
          }
  
          refreshPayments();
  
          onClose();
  
        } catch (error) {
  
          console.log(error);
        }
      };
  
    return (
  
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
  
        <div className="bg-white rounded-xl w-full max-w-2xl p-6">
  
          <h2 className="text-2xl font-bold mb-6">
  
            {
              payment
                ? "Edit Payment"
                : "Add Payment"
            }
  
          </h2>
  
          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4"
          >
  
            <input
              type="number"
              name="totalAmount"
              placeholder="Total Amount"
              value={
                formData.totalAmount
              }
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />
  
            <input
              type="number"
              name="receivedAmount"
              placeholder="Received Amount"
              value={
                formData.receivedAmount
              }
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />
  
            <input
              type="date"
              name="dueDate"
              value={
                formData.dueDate
              }
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />
  
            <textarea
              name="remark"
              placeholder="Remark"
              value={
                formData.remark
              }
              onChange={handleChange}
              className="border p-3 rounded-lg md:col-span-2"
            />
  
            <div className="md:col-span-2 flex justify-end gap-3">
  
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
  
              <button
                type="submit"
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
              >
                Save Payment
              </button>
  
            </div>
  
          </form>
  
        </div>
  
      </div>
    );
  };
  
  export default DuePaymentModal;