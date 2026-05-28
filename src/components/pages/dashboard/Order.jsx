import { useEffect, useState, useMemo } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/v1/order";
const CLIENT_API = "http://localhost:5000/api/v1/client";
const CATEGORY_API = "http://localhost:5000/api/v1/category";

// --- ERP ORDER STATUS SYSTEM ---
const ORDER_STATUS_LIST = [
  "Incoming",
  "In-Hand",
  "Running",
  "Completed",
  "Cancelled",
];
const ORDER_STATUS_TABS = [
  { key: "all", label: "All" },
  { key: "Incoming", label: "Incoming" },
  { key: "In-Hand", label: "In-Hand" },
  { key: "Running", label: "Running" },
  { key: "Completed", label: "Completed" },
];

// Add default as 'Incoming'
const initialFormState = {
  client: "",
  mobileNumber: "",
  companyName: "",
  address: "",
  orderSource: "Call",
  category: "",
  serviceDetails: "",
  quantity: "",
  rate: "",
  discount: "",
  discountType: "Percent",
  discountRemarks: "",
  tax: "",
  taxType: "Percent",
  taxRemarks: "",
  advanceAmount: "",
  receivedAmount: "",
  paymentStatus: "Pending", // default
  orderStatus: "Incoming", // default
  remarks: "",
  date: "",
};

const orderSourceOptions = [
  "Call",
  "WhatsApp",
  "Website",
  "Reference",
  "Walk-In",
  "Facebook",
  "Instagram",
  "Justdial",
];

const discountTypeOptions = ["Percent", "Flat"];
const taxTypeOptions = ["Percent", "Flat"];
const paymentStatusOptions = ["Paid", "Partial", "Pending"];
const orderStatusOptions = [...ORDER_STATUS_LIST];

// --- BADGES ---
const PaymentStatusBadge = ({ status }) => {
  let color, text;
  switch (status) {
    case "Paid":
      color = "bg-green-100 text-green-700 border-green-400";
      text = "Paid";
      break;
    case "Partial":
      color = "bg-yellow-100 text-yellow-700 border-yellow-500";
      text = "Partial";
      break;
    case "Pending":
    default:
      color = "bg-red-100 text-red-700 border-red-400";
      text = "Pending";
      break;
  }
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${color}`}>
      {text}
    </span>
  );
};

const OrderStatusBadge = ({ status }) => {
  let color, text;
  switch (status) {
    case "Incoming":
      color = "bg-yellow-100 text-yellow-800 border-yellow-400";
      text = "Incoming";
      break;
    case "In-Hand":
      color = "bg-purple-100 text-purple-700 border-purple-400";
      text = "In-Hand";
      break;
    case "Running":
      color = "bg-blue-100 text-blue-700 border-blue-400";
      text = "Running";
      break;
    case "Completed":
      color = "bg-green-100 text-green-700 border-green-400";
      text = "Completed";
      break;
    case "Cancelled":
      color = "bg-gray-200 text-gray-700 border-gray-400";
      text = "Cancelled";
      break;
    default:
      color = "bg-gray-100 text-gray-700 border-gray-400";
      text = status || "Unknown";
      break;
  }
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${color}`}>
      {text}
    </span>
  );
};

// --- FILTER TABS ---
const StatusTabs = ({ active, setActive, counts }) => {
  return (
    <div className="flex gap-3 md:gap-6 mt-6 mb-6">
      {ORDER_STATUS_TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActive(tab.key)}
          className={`px-4 py-2 rounded-full font-semibold flex items-center gap-1 transition ${
            active === tab.key
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
          }`}
        >
          {tab.label}
          <span className="inline-block bg-white text-gray-600 rounded-full px-2 ml-1 shadow text-xs border">{counts[tab.key] || 0}</span>
        </button>
      ))}
    </div>
  );
};

// --- DASHBOARD CARDS ---
const SummaryCard = ({ title, value, color, extra }) => (
  <div className={`bg-white rounded-xl shadow flex-1 min-w-[160px] flex flex-col p-5 border-l-4 ${color}`}>
    <span className="uppercase text-xs text-gray-400 font-bold tracking-wider">{title}</span>
    <span className="mt-2 text-2xl font-extrabold text-gray-800">{value}</span>
    {extra && <div className="mt-1">{extra}</div>}
  </div>
);

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialFormState);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Clients and Categories
  const [clients, setClients] = useState([]);
  const [categories, setCategories] = useState([]);

  // Search and Filter state
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Fetchers
  const fetchClients = async () => {
    try {
      const res = await axios.get(CLIENT_API);
      setClients(res.data?.data || []);
    } catch {
      setClients([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_API);
      setCategories(res.data?.data || []);
    } catch {
      setCategories([]);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setOrders(res.data?.data || []);
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to fetch orders");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchClients();
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  // ---- HANDLE FORM CHANGE WITH AUTOFILL ----
  const handleChange = (e) => {
    const { name, value } = e.target;

    // When client changes, autofill mobileNumber, companyName, address
    if (name === "client") {
      const selectedClient = clients.find((c) => c._id === value);
      if (selectedClient) {
        setForm((prev) => ({
          ...prev,
          client: value,
          mobileNumber: selectedClient.mobileNumber || "",
          companyName: selectedClient.companyName || "",
          address: selectedClient.address || "",
        }));
        return;
      }
    }
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --- Proper final amount calculation logic ---
  // Subtotal = quantity * rate
  const subtotal = (Number(form.quantity) || 0) * (Number(form.rate) || 0);

  // Discount Amount based on type (percent/flat)
  const discountAmount =
    form.discountType === "Percent"
      ? ((subtotal * Number(form.discount || 0)) / 100)
      : Number(form.discount || 0);

  // Taxable = subtotal - discount
  const taxableAmount = subtotal - discountAmount;

  // Tax Amount based on type
  const taxAmount =
    form.taxType === "Percent"
      ? ((taxableAmount * Number(form.tax || 0)) / 100)
      : Number(form.tax || 0);

  // Final Amount = taxable + tax
  const finalAmount = taxableAmount + taxAmount;

  // -------------- SUBMIT/EDIT LOGIC -----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.client ||
      !form.category ||
      !form.quantity.toString().trim() ||
      !form.rate.toString().trim()
    ) {
      alert("Client, Category, Quantity, and Rate are required.");
      return;
    }

    const payload = {
      ...form,
      quantity: form.quantity === "" ? 0 : Number(form.quantity),
      rate: form.rate === "" ? 0 : Number(form.rate),
      finalAmount: finalAmount, // as per backend
      discount: form.discount === "" ? 0 : Number(form.discount),
      tax: form.tax === "" ? 0 : Number(form.tax),
      advanceAmount: form.advanceAmount === "" ? 0 : Number(form.advanceAmount),
      receivedAmount: form.receivedAmount === "" ? 0 : Number(form.receivedAmount),
    };

    try {
      setLoading(true);
      const res = await axios.post(API_BASE, payload);
      if (res.data.success) {
        alert(res.data.message);
        setForm(initialFormState);
        setShowModal(false);
        fetchOrders();
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to create order");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.client ||
      !form.category ||
      !form.quantity.toString().trim() ||
      !form.rate.toString().trim()
    ) {
      alert("Client, Category, Quantity, and Rate are required.");
      return;
    }
    const payload = {
      ...form,
      quantity: form.quantity === "" ? 0 : Number(form.quantity),
      rate: form.rate === "" ? 0 : Number(form.rate),
      finalAmount: finalAmount,
      discount: form.discount === "" ? 0 : Number(form.discount),
      tax: form.tax === "" ? 0 : Number(form.tax),
      advanceAmount: form.advanceAmount === "" ? 0 : Number(form.advanceAmount),
      receivedAmount: form.receivedAmount === "" ? 0 : Number(form.receivedAmount),
    };
    try {
      setLoading(true);
      const res = await axios.put(`${API_BASE}/${selectedOrder._id}`, payload);
      if (res.data.success) {
        alert(res.data.message);
        setForm(initialFormState);
        setShowEditModal(false);
        setSelectedOrder(null);
        fetchOrders();
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to update order");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ----------------- MODAL HANDLERS ----------------
  const handleView = (order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setForm({
      ...order,
      client: order.client?._id || order.client || "",
      category: order.category?._id || order.category || "",
      date: order.date ? new Date(order.date).toISOString().substring(0, 10) : "",
    });
    setShowEditModal(true);
  };

  const handleInvoice = (order) => {
    setSelectedOrder(order);
    setShowInvoiceModal(true);
  };

  const handlePayment = (order) => {
    setSelectedOrder(order);
    setShowPaymentModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      setLoading(true);
      const res = await axios.delete(`${API_BASE}/${id}`);
      alert(res.data.message);
      fetchOrders();
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to delete order");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ----------- FILTERING LOGIC --------------
  // Filter orders by tab and search
  const filteredOrders = useMemo(() => {
    let filtered = orders;
    if (activeTab !== "all") {
      filtered = filtered.filter((o) => o.orderStatus === activeTab);
    }
    if (search.trim()) {
      const lower = search.toLowerCase();
      filtered = filtered.filter((o) => {
        // Search by client name, category, orderId, mobile, status
        return (
          (o.client?.clientName || "").toLowerCase().includes(lower) ||
          (o.category?.categoryName || "").toLowerCase().includes(lower) ||
          (o.orderId || "").toLowerCase().includes(lower) ||
          (o.mobileNumber || "").toLowerCase().includes(lower) ||
          (o.orderStatus || "").toLowerCase().includes(lower) ||
          (o.paymentStatus || "").toLowerCase().includes(lower)
        );
      });
    }
    return filtered;
  }, [orders, activeTab, search]);

  // ------------- DASHBOARD CARD CALCS ----------------
  const dashCounts = useMemo(() => {
    const statusCounts = {
      Incoming: 0,
      "In-Hand": 0,
      Running: 0,
      Completed: 0,
      Cancelled: 0,
    };
    let totalRevenue = 0;
    let pendingPayments = 0;
    orders.forEach((order) => {
      statusCounts[order.orderStatus] = (statusCounts[order.orderStatus] || 0) + 1;
      totalRevenue += Number(order.finalAmount || 0);
      const pendingAmt =
        (Number(order.finalAmount) || 0) - (Number(order.receivedAmount) || 0);
      if (
        order.paymentStatus === "Pending" ||
        order.paymentStatus === "Partial"
      ) {
        pendingPayments += pendingAmt > 0 ? pendingAmt : 0;
      }
    });
    return {
      totalIncoming: statusCounts["Incoming"] || 0,
      totalInHand: statusCounts["In-Hand"] || 0,
      totalRunning: statusCounts["Running"] || 0,
      totalCompleted: statusCounts["Completed"] || 0,
      totalRevenue,
      pendingPayments,
      tabCounts: {
        all: orders.length,
        Incoming: statusCounts["Incoming"] || 0,
        "In-Hand": statusCounts["In-Hand"] || 0,
        Running: statusCounts["Running"] || 0,
        Completed: statusCounts["Completed"] || 0,
      },
    };
  }, [orders]);

  // --- BADGE COLOR HELPERS FOR CARDS (if needed) ---
  const statusColors = {
    incoming: "border-yellow-400",
    inHand: "border-purple-400",
    running: "border-blue-400",
    completed: "border-green-400",
    revenue: "border-indigo-500",
    pending: "border-red-400",
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-indigo-50 to-white p-2 md:p-5">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-1">
            ERP Order Management System
          </h1>
          <p className="text-gray-500 text-[15px]">Modern ERP order dashboard</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold shadow active:scale-95 transition"
        >
          + Add Order
        </button>
      </div>

      {/* DASHBOARD SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 mb-6">
        <SummaryCard
          title="Incoming Orders"
          value={dashCounts.totalIncoming}
          color={statusColors.incoming}
        />
        <SummaryCard
          title="In-Hand Orders"
          value={dashCounts.totalInHand}
          color={statusColors.inHand}
        />
        <SummaryCard
          title="Running Orders"
          value={dashCounts.totalRunning}
          color={statusColors.running}
        />
        <SummaryCard
          title="Completed Orders"
          value={dashCounts.totalCompleted}
          color={statusColors.completed}
        />
        <SummaryCard
          title="Total Revenue"
          value={<span>₹{Number(dashCounts.totalRevenue).toLocaleString("en-IN")}</span>}
          color={statusColors.revenue}
        />
        <SummaryCard
          title="Pending Payments"
          value={<span>₹{Number(dashCounts.pendingPayments).toLocaleString("en-IN")}</span>}
          color={statusColors.pending}
        />
      </div>

      {/* ORDER STATUS FILTER TABS */}
      <StatusTabs
        active={activeTab}
        setActive={setActiveTab}
        counts={dashCounts.tabCounts}
      />

      {/* SEARCH */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex-1 flex">
          <input
            type="text"
            placeholder="Search by Client / Category / Order ID / Mobile / Status"
            className="input max-w-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* =========== ADD ORDER MODAL ============ */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-5">Add New Order</h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              {/* CLIENT */}
              <select
                name="client"
                className="input"
                value={form.client}
                onChange={handleChange}
                required
              >
                <option value="">Select Client</option>
                {clients.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.clientName}
                  </option>
                ))}
              </select>
              {/* CATEGORY */}
              <select
                name="category"
                className="input"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.categoryName}
                  </option>
                ))}
              </select>
              {/* MOBILE NUMBER */}
              <input
                type="text"
                name="mobileNumber"
                placeholder="Mobile Number"
                className="input"
                value={form.mobileNumber}
                onChange={handleChange}
              />
              {/* COMPANY NAME */}
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                className="input"
                value={form.companyName}
                onChange={handleChange}
              />
              {/* ADDRESS */}
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="input"
                value={form.address}
                onChange={handleChange}
              />
              {/* ORDER SOURCE */}
              <select
                name="orderSource"
                className="input"
                value={form.orderSource}
                onChange={handleChange}
              >
                {orderSourceOptions.map((os) => (
                  <option key={os} value={os}>
                    {os}
                  </option>
                ))}
              </select>
              {/* SERVICE DETAILS */}
              <input
                type="text"
                name="serviceDetails"
                placeholder="Service Details"
                className="input"
                value={form.serviceDetails}
                onChange={handleChange}
              />
              {/* QUANTITY */}
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                className="input"
                value={form.quantity}
                onChange={handleChange}
                required
                min={0}
              />
              {/* RATE */}
              <input
                type="number"
                name="rate"
                placeholder="Rate"
                className="input"
                value={form.rate}
                onChange={handleChange}
                required
                min={0}
              />
              {/* AMOUNT (Computed as FinalAmount and readonly) */}
              <input
                type="number"
                name="finalAmount"
                placeholder="Final Amount"
                className="input"
                value={finalAmount}
                disabled
                readOnly
              />
              {/* ADVANCE AMOUNT */}
              <input
                type="number"
                name="advanceAmount"
                placeholder="Advance Amount"
                className="input"
                value={form.advanceAmount}
                onChange={handleChange}
                min={0}
              />
              {/* RECEIVED AMOUNT */}
              <input
                type="number"
                name="receivedAmount"
                placeholder="Received Amount"
                className="input"
                value={form.receivedAmount}
                onChange={handleChange}
                min={0}
              />
              {/* PAYMENT STATUS */}
              <select
                name="paymentStatus"
                className="input"
                value={form.paymentStatus}
                onChange={handleChange}
              >
                {paymentStatusOptions.map((ps) => (
                  <option key={ps} value={ps}>
                    {ps}
                  </option>
                ))}
              </select>
              {/* ORDER STATUS */}
              <select
                name="orderStatus"
                className="input"
                value={form.orderStatus}
                onChange={handleChange}
              >
                {orderStatusOptions.map((os) => (
                  <option key={os} value={os}>
                    {os}
                  </option>
                ))}
              </select>
              {/* REMARKS */}
              <input
                type="text"
                name="remarks"
                placeholder="Remarks"
                className="input"
                value={form.remarks}
                onChange={handleChange}
              />
              {/* DATE */}
              <input
                type="date"
                name="date"
                className="input"
                value={form.date}
                onChange={handleChange}
              />

              {/* DISPLAY BREAKDOWN */}
              <div className="md:col-span-2 flex flex-col gap-1 text-sm text-gray-600 border-t pt-2 mt-2">
                <span>
                  <strong>Subtotal:</strong> ₹{Number(subtotal).toLocaleString("en-IN")}
                </span>
                <span>
                  <strong>Discount:</strong> ₹{Number(discountAmount).toLocaleString("en-IN")}
                </span>
                <span>
                  <strong>Taxable Amount:</strong> ₹{Number(taxableAmount).toLocaleString("en-IN")}
                </span>
                <span>
                  <strong>Tax:</strong> ₹{Number(taxAmount).toLocaleString("en-IN")}
                </span>
                <span>
                  <strong>Final Amount:</strong> <span className="font-semibold text-indigo-600">₹{Number(finalAmount).toLocaleString("en-IN")}</span>
                </span>
              </div>

              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Order"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setForm(initialFormState);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-black py-3 px-6 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========== EDIT ORDER MODAL ============ */}
      {showEditModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowEditModal(false);
                setSelectedOrder(null);
                setForm(initialFormState);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-5">
              Edit Order
            </h2>
            <form
              onSubmit={handleEditSubmit}
              className="grid md:grid-cols-2 gap-4"
            >
              {/* CLIENT */}
              <select
                name="client"
                className="input"
                value={form.client}
                onChange={handleChange}
                required
              >
                <option value="">Select Client</option>
                {clients.map((c) => (
                  <option key={c._id} value={c._id}>{c.clientName}</option>
                ))}
              </select>
              {/* CATEGORY */}
              <select
                name="category"
                className="input"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.categoryName}</option>
                ))}
              </select>
              {/* MOBILE NUMBER */}
              <input
                type="text"
                name="mobileNumber"
                placeholder="Mobile Number"
                className="input"
                value={form.mobileNumber}
                onChange={handleChange}
              />
              {/* COMPANY NAME */}
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                className="input"
                value={form.companyName}
                onChange={handleChange}
              />
              {/* ADDRESS */}
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="input"
                value={form.address}
                onChange={handleChange}
              />
              {/* ORDER SOURCE */}
              <select
                name="orderSource"
                className="input"
                value={form.orderSource}
                onChange={handleChange}
              >
                {orderSourceOptions.map((os) => (
                  <option key={os} value={os}>{os}</option>
                ))}
              </select>
              {/* SERVICE DETAILS */}
              <input
                type="text"
                name="serviceDetails"
                placeholder="Service Details"
                className="input"
                value={form.serviceDetails}
                onChange={handleChange}
              />
              {/* QUANTITY */}
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                className="input"
                value={form.quantity}
                onChange={handleChange}
                required
                min={0}
              />
              {/* RATE */}
              <input
                type="number"
                name="rate"
                placeholder="Rate"
                className="input"
                value={form.rate}
                onChange={handleChange}
                required
                min={0}
              />
              {/* AMOUNT (Computed as FinalAmount and readonly) */}
              <input
                type="number"
                name="finalAmount"
                placeholder="Final Amount"
                className="input"
                value={finalAmount}
                disabled
                readOnly
              />
              {/* DISCOUNT */}
              <div className="flex gap-2">
                <input
                  type="number"
                  name="discount"
                  placeholder="Discount"
                  className="input"
                  value={form.discount}
                  onChange={handleChange}
                  min={0}
                />
                <select
                  name="discountType"
                  className="input"
                  value={form.discountType}
                  onChange={handleChange}
                >
                  {discountTypeOptions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              {/* DISCOUNT REMARKS */}
              <input
                type="text"
                name="discountRemarks"
                placeholder="Discount Remarks"
                className="input"
                value={form.discountRemarks}
                onChange={handleChange}
              />
              {/* TAX */}
              <div className="flex gap-2">
                <input
                  type="number"
                  name="tax"
                  placeholder="Tax"
                  className="input"
                  value={form.tax}
                  onChange={handleChange}
                  min={0}
                />
                <select
                  name="taxType"
                  className="input"
                  value={form.taxType}
                  onChange={handleChange}
                >
                  {taxTypeOptions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              {/* TAX REMARKS */}
              <input
                type="text"
                name="taxRemarks"
                placeholder="Tax Remarks"
                className="input"
                value={form.taxRemarks}
                onChange={handleChange}
              />
              {/* ADVANCE AMOUNT */}
              <input
                type="number"
                name="advanceAmount"
                placeholder="Advance Amount"
                className="input"
                value={form.advanceAmount}
                onChange={handleChange}
                min={0}
              />
              {/* RECEIVED AMOUNT */}
              <input
                type="number"
                name="receivedAmount"
                placeholder="Received Amount"
                className="input"
                value={form.receivedAmount}
                onChange={handleChange}
                min={0}
              />
              {/* PAYMENT STATUS */}
              <select
                name="paymentStatus"
                className="input"
                value={form.paymentStatus}
                onChange={handleChange}
              >
                {paymentStatusOptions.map((ps) => (
                  <option key={ps} value={ps}>{ps}</option>
                ))}
              </select>
              {/* ORDER STATUS */}
              <select
                name="orderStatus"
                className="input"
                value={form.orderStatus}
                onChange={handleChange}
              >
                {orderStatusOptions.map((os) => (
                  <option key={os} value={os}>{os}</option>
                ))}
              </select>
              {/* REMARKS */}
              <input
                type="text"
                name="remarks"
                placeholder="Remarks"
                className="input"
                value={form.remarks}
                onChange={handleChange}
              />
              {/* DATE */}
              <input
                type="date"
                name="date"
                className="input"
                value={form.date}
                onChange={handleChange}
              />

              {/* DISPLAY BREAKDOWN */}
              <div className="md:col-span-2 flex flex-col gap-1 text-sm text-gray-600 border-t pt-2 mt-2">
                <span>
                  <strong>Subtotal:</strong> ₹{Number(subtotal).toLocaleString("en-IN")}
                </span>
                <span>
                  <strong>Discount:</strong> ₹{Number(discountAmount).toLocaleString("en-IN")}
                </span>
                <span>
                  <strong>Taxable Amount:</strong> ₹{Number(taxableAmount).toLocaleString("en-IN")}
                </span>
                <span>
                  <strong>Tax:</strong> ₹{Number(taxAmount).toLocaleString("en-IN")}
                </span>
                <span>
                  <strong>Final Amount:</strong> <span className="font-semibold text-indigo-600">₹{Number(finalAmount).toLocaleString("en-IN")}</span>
                </span>
              </div>

              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Order"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedOrder(null);
                    setForm(initialFormState);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-black py-3 px-6 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========== VIEW ORDER MODAL ============ */}
      {showViewModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowViewModal(false);
                setSelectedOrder(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-5">Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Order ID:</strong> {selectedOrder.orderId || "-"}
              </div>
              <div>
                <strong>Client:</strong>{" "}
                {selectedOrder.client?.clientName || "-"}
              </div>
              <div>
                <strong>Mobile:</strong> {selectedOrder.mobileNumber || "-"}
              </div>
              <div>
                <strong>Category:</strong>{" "}
                {selectedOrder.category?.categoryName || "-"}
              </div>
              <div>
                <strong>Employee:</strong>{" "}
                {selectedOrder.assignedTo?.employeeName || "-"}
              </div>
              <div>
                <strong>Qty:</strong> {selectedOrder.quantity}
              </div>
              <div>
                <strong>Rate:</strong> ₹
                {Number(selectedOrder.rate || 0).toLocaleString("en-IN")}
              </div>
              <div>
                <strong>Final Amount:</strong>{" "}
                <span className="font-semibold text-indigo-600">
                  ₹{Number(selectedOrder.finalAmount || 0).toLocaleString("en-IN")}
                </span>
              </div>
              <div>
                <strong>Amount Received:</strong>{" "}
                <span>
                  ₹{Number(selectedOrder.receivedAmount || 0).toLocaleString("en-IN")}
                </span>
              </div>
              <div>
                <strong>Pending Amount:</strong>{" "}
                <span>
                  ₹{Math.max(
                    Number(selectedOrder.finalAmount || 0) -
                      Number(selectedOrder.receivedAmount || 0),
                    0
                  ).toLocaleString("en-IN")}
                </span>
              </div>
              <div>
                <strong>Payment Status:</strong>{" "}
                <PaymentStatusBadge status={selectedOrder.paymentStatus} />
              </div>
              <div>
                <strong>Order Status:</strong>{" "}
                <OrderStatusBadge status={selectedOrder.orderStatus} />
              </div>
              <div>
                <strong>Date:</strong>{" "}
                {selectedOrder.date
                  ? new Date(selectedOrder.date).toLocaleDateString()
                  : "-"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========== INVOICE MODAL ============ */}
      {showInvoiceModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowInvoiceModal(false);
                setSelectedOrder(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-5">
              Invoice Preview
            </h2>
            <div>
              <p>
                <strong>Invoice for:</strong>{" "}
                {selectedOrder.client?.clientName || "-"}
              </p>
              <p>
                <strong>Order ID:</strong> {selectedOrder.orderId}
              </p>
              <hr className="my-3" />
              <p>
                <strong>Service:</strong> {selectedOrder.serviceDetails}
              </p>
              <p>
                <strong>Quantity:</strong> {selectedOrder.quantity}
              </p>
              <p>
                <strong>Rate:</strong> ₹
                {Number(selectedOrder.rate || 0).toLocaleString("en-IN")}
              </p>
              <p>
                <strong>Discount:</strong> {selectedOrder.discount || 0} (
                {selectedOrder.discountType})
              </p>
              <p>
                <strong>Tax:</strong> {selectedOrder.tax || 0} (
                {selectedOrder.taxType})
              </p>
              <p>
                <strong>Final Amount:</strong> <span className="font-semibold text-indigo-600">
                  ₹{Number(selectedOrder.finalAmount || 0).toLocaleString("en-IN")}
                </span>
              </p>
              <p>
                <strong>Received:</strong> <span>
                  ₹{Number(selectedOrder.receivedAmount || 0).toLocaleString("en-IN")}
                </span>
              </p>
              <p>
                <strong>Pending:</strong> <span>
                  ₹{Math.max(
                    Number(selectedOrder.finalAmount || 0) -
                      Number(selectedOrder.receivedAmount || 0),
                    0
                  ).toLocaleString("en-IN")}
                </span>
              </p>
              <p>
                <strong>Payment Status:</strong>{" "}
                <PaymentStatusBadge status={selectedOrder.paymentStatus} />
              </p>
              <p>
                <strong>Order Status:</strong>{" "}
                <OrderStatusBadge status={selectedOrder.orderStatus} />
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {selectedOrder.date
                  ? new Date(selectedOrder.date).toLocaleDateString()
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========== PAYMENT MODAL ============ */}
      {showPaymentModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowPaymentModal(false);
                setSelectedOrder(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-5">
              Update Payment
            </h2>
            <p className="mb-2">
              Current Status: <PaymentStatusBadge status={selectedOrder.paymentStatus} />
            </p>
            <p>
              <span className="block mb-1">
                <strong>Final Amount:</strong>{" "}
                ₹{Number(selectedOrder.finalAmount || 0).toLocaleString("en-IN")}
              </span>
              <span className="block mb-1">
                <strong>Amount Received:</strong>{" "}
                ₹{Number(selectedOrder.receivedAmount || 0).toLocaleString("en-IN")}
              </span>
              <span className="block mb-2">
                <strong>Pending Amount:</strong>{" "}
                ₹{Math.max(
                  Number(selectedOrder.finalAmount || 0) -
                    Number(selectedOrder.receivedAmount || 0),
                  0
                ).toLocaleString("en-IN")}
              </span>
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <button
                className="bg-green-600 text-white px-6 py-3 rounded-xl"
                onClick={async () => {
                  try {
                    setLoading(true);
                    await axios.put(`${API_BASE}/${selectedOrder._id}`, {
                      ...selectedOrder,
                      paymentStatus: "Paid",
                      receivedAmount: selectedOrder.finalAmount,
                    });
                    alert("Payment marked as Paid.");
                    setShowPaymentModal(false);
                    setSelectedOrder(null);
                    fetchOrders();
                  } catch (e) {
                    alert("Failed to update payment.");
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading || Number(selectedOrder.receivedAmount || 0) >= Number(selectedOrder.finalAmount || 0)}
              >
                Mark as Paid
              </button>
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-xl"
                onClick={async () => {
                  const amt = prompt("Enter partial received amount", selectedOrder.receivedAmount || "");
                  if (amt == null || isNaN(amt) || Number(amt) < 0) return;
                  try {
                    setLoading(true);
                    await axios.put(`${API_BASE}/${selectedOrder._id}`, {
                      ...selectedOrder,
                      paymentStatus: "Partial",
                      receivedAmount: Number(amt),
                    });
                    alert("Partial payment updated.");
                    setShowPaymentModal(false);
                    setSelectedOrder(null);
                    fetchOrders();
                  } catch (e) {
                    alert("Failed to update payment.");
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading}
              >
                Mark as Partial
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-3 rounded-xl"
                onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedOrder(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================== MAIN TABLE =================== */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto pb-2">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Mobile</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Employee</th>
              <th className="p-3 text-left">Qty</th>
              <th className="p-3 text-left">Rate</th>
              <th className="p-3 text-left">Final Amount</th>
              <th className="p-3 text-left">Received</th>
              <th className="p-3 text-left">Pending</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Order Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="15" className="p-5 text-center">
                  Loading...
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="15" className="p-5 text-center">
                  No Orders Found
                </td>
              </tr>
            ) : (
              // Use filteredOrders per new requirements
              filteredOrders.map((item) => {
                const pendingAmount =
                  Math.max(Number(item.finalAmount || 0) - Number(item.receivedAmount || 0), 0);
                return (
                  <tr key={item._id} className="border-b hover:bg-indigo-50 transition">
                    <td className="p-3" title={item.orderId}>
                      {item.orderId}
                    </td>
                    <td className="p-3">{item.client?.clientName || "-"}</td>
                    <td className="p-3">{item.mobileNumber || "-"}</td>
                    <td className="p-3">
                      {item.category?.categoryName || "-"}
                    </td>
                    <td className="p-3">{item.assignedTo?.employeeName || "-"}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">
                      ₹{Number(item.rate || 0).toLocaleString("en-IN")}
                    </td>
                    <td className="p-3 font-semibold text-indigo-700">
                      ₹{Number(item.finalAmount || 0).toLocaleString("en-IN")}
                    </td>
                    <td className="p-3">
                      ₹{Number(item.receivedAmount || 0).toLocaleString("en-IN")}
                    </td>
                    <td className="p-3">
                      <span className={pendingAmount > 0 ? "text-red-600 font-semibold" : "text-green-600 font-semibold"}>
                        ₹{pendingAmount.toLocaleString("en-IN")}
                      </span>
                    </td>
                    <td className="p-3 capitalize">
                      <PaymentStatusBadge status={item.paymentStatus} />
                    </td>
                    <td className="p-3">
                      <OrderStatusBadge status={item.orderStatus} />
                    </td>
                    <td className="p-3">
                      {item.date
                        ? new Date(item.date).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex flex-col md:flex-row gap-1 md:gap-2 justify-center">
                        <button
                          onClick={() => handleView(item)}
                          className="bg-sky-200 hover:bg-sky-300 text-blue-700 px-4 py-2 rounded-lg"
                          title="View"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-yellow-200 hover:bg-yellow-300 text-yellow-900 px-4 py-2 rounded-lg"
                          title="Edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleInvoice(item)}
                          className="bg-purple-200 hover:bg-purple-300 text-purple-900 px-4 py-2 rounded-lg"
                          title="Invoice"
                        >
                          Invoice
                        </button>
                        <button
                          onClick={() => handlePayment(item)}
                          className="bg-green-200 hover:bg-green-300 text-green-900 px-4 py-2 rounded-lg"
                          title="Payment"
                        >
                          Pay
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                          title="Delete"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {/* STYLE */}
      <style>{`
        .input {
          width: 100%;
          border: 1px solid #d1d5db;
          padding: 12px;
          border-radius: 12px;
          outline: none;
          transition: 0.3s;
        }
        .input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79,70,229,0.2);
        }
      `}</style>
    </div>
  );
};

export default Order;