// =====================================
// src/components/InvoiceModal.jsx
// =====================================

import {
  generateInvoicePdf,
} from "./utils/generateInvoicePdf";

const InvoiceModal = ({ invoice, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-5xl rounded-xl p-6 overflow-y-auto max-h-[95vh]">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">TAX INVOICE</h1>
            <p className="text-gray-500">
              {invoice.invoiceNumber}
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">NAS TECHNOLOGY</h2>
            <p>Chhatarpur, Madhya Pradesh</p>
            <p>GST: 22AAAAA0000A1Z5</p>
          </div>
        </div>

        {/* CUSTOMER */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-bold mb-2">Bill To</h3>
            <p>{invoice.client?.clientName}</p>
            <p>{invoice.client?.mobileNumber}</p>
            <p>{invoice.client?.address}</p>
          </div>
          <div className="text-right">
            <p>
              <strong>Invoice Date:</strong>{" "}
              {new Date(invoice.invoiceDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Payment:</strong>{" "}
              {invoice.paymentStatus}
            </p>
          </div>
        </div>

        {/* ITEMS */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Product</th>
                <th className="border p-2">Qty</th>
                <th className="border p-2">Rate</th>
                <th className="border p-2">GST</th>
                <th className="border p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items?.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{item.productName}</td>
                  <td className="border p-2">{item.quantity}</td>
                  <td className="border p-2">₹{item.rate}</td>
                  <td className="border p-2">{item.gst}%</td>
                  <td className="border p-2">₹{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOTALS */}
        <div className="flex justify-end mb-6">
          <div className="w-full md:w-80 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{invoice.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>GST</span>
              <span>₹{invoice.gstAmount}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Grand Total</span>
              <span>₹{invoice.grandTotal}</span>
            </div>
          </div>
        </div>

        {/* SIGNATURE */}
        <div className="flex justify-between mt-12">
          <div>
            <p className="border-t pt-2">Customer Signature</p>
          </div>
          <div>
            <p className="border-t pt-2">Authorized Signature</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 justify-end mt-8">
          <button
            onClick={handlePrint}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
          >
            Print
          </button>
          <button
            onClick={() => generateInvoicePdf(invoice)}
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Download PDF
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;