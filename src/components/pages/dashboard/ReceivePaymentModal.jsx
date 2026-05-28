// =====================================
// src/components/pages/dashboard/ReceivePaymentModal.jsx
// =====================================

import {
  useState,
} from "react";

import axios from "axios";

const API =
  "http://localhost:5000/api/v1/payment";

const ReceivePaymentModal = ({
  payment,
  onClose,
  refreshPayments,
}) => {

  const [amount,
    setAmount] =
    useState("");

  const [paymentMode,
    setPaymentMode] =
    useState("Cash");

  const [remark,
    setRemark] =
    useState("");

  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        // =====================================
        // VALIDATION
        // =====================================

        if (
          Number(amount) <= 0
        ) {

          alert(
            "Please enter valid amount"
          );

          return;
        }

        if (
          Number(amount) >
          payment.pendingAmount
        ) {

          alert(
            "Amount cannot exceed pending amount"
          );

          return;
        }

        // =====================================
        // CALCULATIONS
        // =====================================

        const newReceived =
          Number(
            payment.receivedAmount
          ) +
          Number(amount);

        const newPending =
          Number(
            payment.totalAmount
          ) - newReceived;

        // =====================================
        // STATUS
        // =====================================

        let status =
          "Pending";

        if (
          newPending <= 0
        ) {

          status =
            "Paid";
        }

        // =====================================
        // PAYMENT HISTORY
        // =====================================

        const updatedHistory = [

          ...(payment.paymentHistory || []),

          {
            amount:
              Number(amount),

            paymentDate:
              new Date(),

            paymentMode,

            remark,
          },
        ];

        // =====================================
        // UPDATE API
        // =====================================

        await axios.put(

          `${API}/${payment._id}`,

          {
            receivedAmount:
              newReceived,

            pendingAmount:
              newPending,

            status,

            paymentHistory:
              updatedHistory,
          }
        );

        // =====================================
        // SUCCESS
        // =====================================

        alert(
          "Payment received successfully"
        );

        refreshPayments();

        onClose();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to receive payment"
        );
      }
    };

  return (

    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

      <div className="bg-white rounded-xl w-full max-w-xl p-6">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-2xl font-bold">

              Receive Payment

            </h2>

            <p className="text-gray-500 text-sm">

              Update customer payment

            </p>

          </div>

          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >

            Close

          </button>

        </div>

        {/* INFO CARDS */}

        <div className="grid grid-cols-2 gap-4 mb-6">

          <div className="bg-gray-100 p-4 rounded-lg">

            <p className="text-sm text-gray-500">

              Total Amount

            </p>

            <h3 className="text-2xl font-bold">

              ₹
              {
                payment.totalAmount
              }

            </h3>

          </div>

          <div className="bg-red-100 p-4 rounded-lg">

            <p className="text-sm text-gray-500">

              Pending Amount

            </p>

            <h3 className="text-2xl font-bold text-red-600">

              ₹
              {
                payment.pendingAmount
              }

            </h3>

          </div>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* RECEIVE AMOUNT */}

          <div>

            <label className="block mb-2 font-medium">

              Receive Amount

            </label>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
              className="w-full border p-3 rounded-lg"
              required
            />

          </div>

          {/* PAYMENT MODE */}

          <div>

            <label className="block mb-2 font-medium">

              Payment Mode

            </label>

            <select
              value={paymentMode}
              onChange={(e) =>
                setPaymentMode(
                  e.target.value
                )
              }
              className="w-full border p-3 rounded-lg"
            >

              <option>
                Cash
              </option>

              <option>
                UPI
              </option>

              <option>
                Bank Transfer
              </option>

              <option>
                Card
              </option>

            </select>

          </div>

          {/* REMARK */}

          <div>

            <label className="block mb-2 font-medium">

              Remark

            </label>

            <textarea
              placeholder="Payment remark"
              value={remark}
              onChange={(e) =>
                setRemark(
                  e.target.value
                )
              }
              className="w-full border p-3 rounded-lg"
              rows={4}
            />

          </div>

          {/* ACTION BUTTONS */}

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
            >

              Cancel

            </button>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
            >

              Receive Payment

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ReceivePaymentModal;