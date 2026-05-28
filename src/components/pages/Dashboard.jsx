// Dashboard.jsx
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import * as FaIcons from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

// ----------- API URLs -----------
const API_DASHBOARD = "http://localhost:5000/api/v1/dashboard";
const API_TRANSACTIONS = "http://localhost:5000/api/v1/payment";
const API_TOPCUSTOMERS = "http://localhost:5000/api/v1/customer";
const API_EXPENSES = "http://localhost:5000/api/v1/expense";
const API_ENQUIRIES = "http://localhost:5000/api/v1/enquiry";

// ------------- Dashboard Cards (B) Configuration ---------------
const dashboardCardsConfig = [
  {
    title: "Total Amount",
    key: "totalAmountCalc",
    icon: "FaCalculator",
    gradient: "from-yellow-100 to-yellow-50",
    iconColor: "text-yellow-600 text-4xl",
    formulaHelp: "Total = Sale + Service Charge",
  },
  {
    title: "Actual Profit",
    key: "actualProfitCalc",
    icon: "FaMoneyCheckAlt",
    gradient: "from-green-100 to-green-50",
    iconColor: "text-green-700 text-4xl",
    formulaHelp: "Profit = Total - Purchase",
  },
  {
    title: "Due Amount",
    key: "dueAmountCalc",
    icon: "FaFileInvoiceDollar",
    gradient: "from-orange-100 to-orange-50",
    iconColor: "text-orange-600 text-4xl",
    formulaHelp: "Due = Total - Receipt",
  },
  {
    title: "Final Balance",
    key: "finalBalanceCalc",
    icon: "FaBalanceScale",
    gradient: "from-blue-100 to-blue-50",
    iconColor: "text-blue-600 text-4xl",
    formulaHelp: "Final Balance = Old Balance + New Income",
  },
];

// CSV Export Helper
function exportCSV(data = [], filename = "export.csv") {
  if (!Array.isArray(data) || data.length === 0) {
    toast("Nothing to export");
    return;
  }
  const keys = Object.keys(data[0]);
  const rows = [keys.join(",")].concat(
    data.map((row) =>
      keys
        .map((k) => {
          const val = row[k] === null || row[k] === undefined ? "" : String(row[k]);
          return `"${val.replace(/"/g, '""')}"`;
        })
        .join(",")
    )
  );
  const csv = rows.join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast.success("Exported CSV");
}

const Dashboard = () => {
  // States for summary data/cards
  const [dashboard, setDashboard] = useState({});
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [expenseSummary, setExpenseSummary] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return false;
    }
  });

  // Search states
  const [transQuery, setTransQuery] = useState("");
  const [clientQuery, setClientQuery] = useState("");
  const [enquiryQuery, setEnquiryQuery] = useState("");

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [modalType, setModalType] = useState("");

  const nowDateString = useMemo(() => new Date().toLocaleDateString(), []);

  useEffect(() => {
    const el = document.documentElement;
    if (dark) el.classList.add("dark");
    else el.classList.remove("dark");
  }, [dark]);

  async function fetchAll(showToast = false) {
    setLoading(true);
    try {
      // Dashboard summary/statistics
      const dashRes = await axios.get(API_DASHBOARD);
      setDashboard(dashRes.data || {});

      // Recent transactions
      const transRes = await axios.get(API_TRANSACTIONS);
      setRecentTransactions(
        Array.isArray(transRes.data?.transactions)
          ? transRes.data.transactions.slice(0, 10)
          : []
      );

      // Top customers
      const topRes = await axios.get(API_TOPCUSTOMERS);
      setTopCustomers(
        Array.isArray(topRes.data?.customers) ? topRes.data.customers : []
      );

      // Expense summary for chart
      const expRes = await axios.get(API_EXPENSES);
      setExpenseSummary(
        Array.isArray(expRes.data?.summary) ? expRes.data.summary : []
      );

      // Enquiries
      const enquiryRes = await axios.get(API_ENQUIRIES);
      setEnquiries(Array.isArray(enquiryRes.data?.enquiries) ? enquiryRes.data.enquiries : []);

      if (showToast) toast.success("Dashboard updated");
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line
  }, []);

  const handleRefresh = async () => {
    setFetching(true);
    await fetchAll(true);
    setFetching(false);
  };

  const toggleDark = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    const isDark = el.classList.contains("dark");
    setDark(isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {}
    toast(isDark ? "Switched to Dark mode" : "Switched to Light mode");
  };

  // Filtered lists
  const filteredTransactions = useMemo(() => {
    if (!transQuery) return recentTransactions;
    return recentTransactions.filter((t) =>
      (t.remark || t.customerName || t.reference || "")
        .toString()
        .toLowerCase()
        .includes(transQuery.toLowerCase())
    );
  }, [transQuery, recentTransactions]);

  const filteredClients = useMemo(() => {
    if (!clientQuery) return topCustomers;
    return topCustomers.filter((c) =>
      (c.customerName || c.name || c.email || "")
        .toString()
        .toLowerCase()
        .includes(clientQuery.toLowerCase())
    );
  }, [clientQuery, topCustomers]);

  const filteredEnquiries = useMemo(() => {
    if (!enquiryQuery) return enquiries;
    return enquiries.filter((e) =>
      (
        e.fullName ||
        e.name ||
        e.email ||
        e.mobile ||
        e.phone ||
        e.message ||
        e.city ||
        e.service ||
        ""
      )
        .toString()
        .toLowerCase()
        .includes(enquiryQuery.toLowerCase())
    );
  }, [enquiryQuery, enquiries]);

  // Expense Pie Chart Data/colors
  const expensePieData = useMemo(() => {
    if (!Array.isArray(expenseSummary)) return [];
    return expenseSummary.map((item) => ({
      name: item.category,
      value: item.amount,
    }));
  }, [expenseSummary]);
  const pieColors = ["#4f46e5", "#ec4899", "#f59e42", "#10b981", "#6366f1", "#a21caf"];

  // Derived values according to Formula Logic:
  // TotalAmount: Sale + ServiceCharge
  // ActualProfit: TotalAmount - Purchase
  // DueAmount: TotalAmount - Receipt
  // FinalBalance: OldBalance + NewIncome

  // Get basic financials from dashboard (default to 0)
  const sale = Number(dashboard.sale || dashboard.totalSale || 0);
  const serviceCharge = Number(dashboard.serviceCharge || dashboard.serviceIncome || 0);
  const purchase = Number(dashboard.purchase || dashboard.totalPurchase || 0);
  const receipt = Number(dashboard.receipt || dashboard.totalReceipt || dashboard.todayReceipts || 0); // fallback
  const oldBalance = Number(dashboard.oldBalance || dashboard.openingBalance || 0);
  const newIncome = Number((dashboard.todayIncome ?? 0) + (dashboard.monthlyIncome ?? 0));

  // Calculated metrics
  const totalAmountCalc = sale + serviceCharge;
  const actualProfitCalc = totalAmountCalc - purchase;
  const dueAmountCalc = totalAmountCalc - receipt;
  const finalBalanceCalc = oldBalance + newIncome;

  // Dashboard Features (A): Today Income, Monthly Income, Total Clients
  const dashboardFeatureData = [
    { name: "Today Income", value: dashboard.todayIncome || 0 },
    { name: "Monthly Income", value: dashboard.monthlyIncome || 0 },
    { name: "Total Clients", value: dashboard.totalClients || 0 },
  ];

  // For displaying dashboard cards, returns computed fields
  const getCardValue = (cardKey) => {
    if (cardKey === "totalAmountCalc") return totalAmountCalc;
    if (cardKey === "actualProfitCalc") return actualProfitCalc;
    if (cardKey === "dueAmountCalc") return dueAmountCalc;
    if (cardKey === "finalBalanceCalc") return finalBalanceCalc;
    // Fallback for extra cards
    return dashboard[cardKey];
  };

  const openItemModal = (item, type = "") => {
    setModalItem(item);
    setModalType(type);
    setOpenModal(true);
  };

  const DynamicFaIcon = ({ icon, className }) => {
    const Icon = FaIcons[icon] || FaIcons.FaChartPie;
    return <Icon className={className || ""} />;
  };

  return (
    <div className="min-h-screen px-4 py-6 md:py-10 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-3xl md:text-3xl font-medium tracking-tight font-serif">
              Business Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
              Finance Overview — {nowDateString}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm"
            >
              {dark ? <FaIcons.FaSun /> : <FaIcons.FaMoon />}{" "}
              <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
            </button>
            <button
              onClick={handleRefresh}
              disabled={fetching}
              className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm"
              title="Refresh data"
            >
              <FaIcons.FaRedo className={fetching ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cards & Stats */}
        <div className="lg:col-span-8 space-y-5">
          {/* Dashboard Features (A) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboardFeatureData.map((feature) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="relative overflow-hidden rounded-2xl p-4 md:p-6 border from-gray-50 to-gray-50 border-transparent shadow-sm dark:shadow-lg bg-white dark:bg-gray-900"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="p-2 md:p-3 rounded-lg bg-white/60 dark:bg-black/30">
                    {feature.name === "Today Income" && <FaIcons.FaCalendarDay className="text-purple-700 text-4xl" />}
                    {feature.name === "Monthly Income" && <FaIcons.FaCalendarAlt className="text-blue-600 text-4xl" />}
                    {feature.name === "Total Clients" && <FaIcons.FaUsers className="text-fuchsia-600 text-4xl" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 truncate">
                      {feature.name}
                    </div>
                    <div className="mt-2 text-2xl md:text-3xl font-extrabold">
                      {loading ? (
                        <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                      ) : (
                        feature.value === null ||
                        feature.value === undefined
                          ? "-"
                          : feature.value.toLocaleString()
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dashboard Cards (B) - Formula Based */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
            {dashboardCardsConfig.map((card) => (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.23 }}
                className={`relative overflow-hidden rounded-2xl p-4 md:p-6 border ${card.gradient} border-transparent shadow-sm dark:shadow-lg`}
              >
                <div className="absolute -right-8 -top-8 w-36 h-36 bg-white opacity-8 dark:opacity-5 blur-2xl rounded-full"></div>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="p-2 md:p-3 rounded-lg bg-white/60 dark:bg-black/30">
                    <DynamicFaIcon icon={card.icon} className={card.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <span className="text-sm md:text-base text-gray-600 dark:text-gray-300 truncate">
                        {card.title}
                      </span>
                      {card.formulaHelp && (
                        <span
                          className="ml-2 px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-xs text-gray-400"
                          title={card.formulaHelp}
                        >
                          <FaIcons.FaInfoCircle className="inline mb-0.5 mr-0.5" />
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-2xl md:text-3xl font-extrabold">
                      {loading ? (
                        <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                      ) : (
                        (getCardValue(card.key) === null ||
                          getCardValue(card.key) === undefined ||
                          isNaN(getCardValue(card.key)))
                          ? "-"
                          : getCardValue(card.key).toLocaleString()
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Expense Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.37 }}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 md:p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base md:text-lg font-semibold">🧾 Expense Summary</h3>
              <button
                onClick={() => exportCSV(expenseSummary, "expense-summary.csv")}
                className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center gap-2"
              >
                <FaIcons.FaDownload /> <span className="hidden sm:inline">Export</span>
              </button>
            </div>
            {loading ? (
              <div className="h-48 w-full flex items-center justify-center">
                <div className="animate-pulse w-28 h-28 rounded-full bg-gray-200 dark:bg-gray-700" />
              </div>
            ) : (
              <div style={{ width: "100%", height: 250, minHeight: 170 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={expensePieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      innerRadius={34}
                      fill="#8884d8"
                      label
                    >
                      {expensePieData.map((entry, idx) => (
                        <Cell key={entry.name} fill={pieColors[idx % pieColors.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </motion.div>
        </div>

        {/* Side panels: Transactions + Top Customers + Enquiries */}
        <div className="lg:col-span-4 space-y-5">
          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36 }}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-3 md:p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm md:text-md font-semibold">
                <FaIcons.FaReceipt className="inline-block mr-2" /> Recent Transactions
              </h4>
              <button
                onClick={() => exportCSV(recentTransactions, "recent-transactions.csv")}
                className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center gap-2"
              >
                <FaIcons.FaDownload /> <span className="hidden sm:inline">Export</span>
              </button>
            </div>
            <input
              type="text"
              value={transQuery}
              onChange={(e) => setTransQuery(e.target.value)}
              placeholder="Search transactions..."
              className="w-full mb-2 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent text-sm focus:outline-none"
            />
            <ul className="space-y-2 max-h-56 overflow-auto pr-2">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <li key={i} className="animate-pulse">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </li>
                  ))
                : filteredTransactions.length > 0
                ? filteredTransactions.map((t, idx) => (
                    <li
                      key={t._id || t.id || idx}
                      className="p-2 rounded-md bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 transition text-sm cursor-pointer"
                      onClick={() => openItemModal(t, "transaction")}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium truncate">
                          {t.remark || t.customerName || t.reference || "Transaction"}
                        </span>
                        <span
                          className={`ml-4 font-mono text-xs ${
                            t.amount >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {t.amount >= 0 ? "+" : ""}
                          {t.amount}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {t.date || t.createdAt
                          ? new Date(t.date || t.createdAt).toLocaleDateString()
                          : ""}
                      </div>
                    </li>
                  ))
                : (
                    <li className="text-sm text-gray-500">No transactions found</li>
                  )}
            </ul>
          </motion.div>

          {/* Top Customers */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38 }}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-3 md:p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm md:text-md font-semibold">
                <FaIcons.FaUserTie className="inline-block mr-2" /> Top Customers
              </h4>
              <button
                onClick={() => exportCSV(topCustomers, "top-customers.csv")}
                className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center gap-2"
              >
                <FaIcons.FaDownload /> <span className="hidden sm:inline">Export</span>
              </button>
            </div>
            <input
              type="text"
              value={clientQuery}
              onChange={(e) => setClientQuery(e.target.value)}
              placeholder="Search customers..."
              className="w-full mb-2 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent text-sm focus:outline-none"
            />
            <ul className="space-y-2 max-h-56 overflow-auto pr-2">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <li key={i} className="animate-pulse">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </li>
                  ))
                : filteredClients.length > 0
                ? filteredClients.map((b, idx) => (
                    <li
                      key={b._id || b.id || idx}
                      className="p-2 rounded-md bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 transition text-sm cursor-pointer"
                      onClick={() => openItemModal(b, "customer")}
                    >
                      <div className="font-medium truncate">
                        {b.customerName || b.name || "Unnamed Customer"}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {b.email ? b.email : ""}
                        {b.email && b.phone ? " · " : ""}
                        {b.phone ? b.phone : ""}
                      </div>
                      <div className="text-xs text-gray-700 dark:text-gray-300 font-mono">
                        Total:{" "}
                        <span className="font-semibold">
                          {b.totalAmount ? b.totalAmount.toLocaleString() : "-"}
                        </span>
                      </div>
                    </li>
                  ))
                : (
                    <li className="text-sm text-gray-500">No top customers</li>
                  )}
            </ul>
          </motion.div>

          {/* Enquiries Panel */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38 }}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-3 md:p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm md:text-md font-semibold">
                <FaIcons.FaQuestionCircle className="inline-block mr-2" /> Enquiries
              </h4>
              <button
                onClick={() => exportCSV(enquiries, "enquiries.csv")}
                className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center gap-2"
              >
                <FaIcons.FaDownload /> <span className="hidden sm:inline">Export</span>
              </button>
            </div>
            <input
              type="text"
              value={enquiryQuery}
              onChange={(e) => setEnquiryQuery(e.target.value)}
              placeholder="Search enquiries..."
              className="w-full mb-2 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent text-sm focus:outline-none"
            />
            <ul className="space-y-2 max-h-56 overflow-auto pr-2">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <li key={i} className="animate-pulse">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </li>
                  ))
                : filteredEnquiries.length > 0
                ? filteredEnquiries.map((e, idx) => (
                    <li
                      key={e._id || e.id || idx}
                      className="p-2 rounded-md bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 transition text-sm cursor-pointer"
                      onClick={() => openItemModal(e, "enquiry")}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium truncate">
                          {e.fullName || e.name || e.email || "Enquiry"}
                        </span>
                        <span className="ml-4 text-xs text-gray-400 truncate">
                          {(e.createdAt || e.date)
                            ? new Date(e.createdAt || e.date).toLocaleDateString()
                            : ""}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                        {(e.email || "-") +
                        ((e.email && (e.mobile || e.phone)) ? " · " : "") +
                        (e.mobile || e.phone || "")}
                      </div>
                      <div className="text-xs text-gray-700 dark:text-gray-300 mt-1 truncate">{e.message}</div>
                    </li>
                  ))
                : (
                    <li className="text-sm text-gray-500">No enquiries found</li>
                  )}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Modal for details */}
      {openModal && modalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.18 }}
            className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">
                  {modalType === "transaction" &&
                    (modalItem.remark || modalItem.reference || "Transaction")}
                  {modalType === "customer" &&
                    (modalItem.customerName || modalItem.name || "Customer")}
                  {modalType === "enquiry" &&
                    (modalItem.fullName || modalItem.name || modalItem.email || "Enquiry")}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {modalType === "transaction"
                    ? (
                      <>
                        Transaction details •{" "}
                        {(modalItem.date || modalItem.createdAt)
                          ? new Date(modalItem.date || modalItem.createdAt).toLocaleDateString()
                          : ""}
                      </>
                    )
                    : modalType === "customer"
                    ? <>Customer details</>
                    : modalType === "enquiry"
                    ? (
                        <>
                          Enquiry details{(modalItem.createdAt || modalItem.date)
                            ? ` • ${new Date(modalItem.createdAt || modalItem.date).toLocaleDateString()}`
                            : ""}
                        </>
                      )
                    : null}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setOpenModal(false);
                    setModalItem(null);
                  }}
                  className="px-3 py-1 rounded bg-red-50 hover:bg-red-100 text-red-600 text-sm"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
              <p>
                {modalType === "transaction" &&
                  (modalItem.details ||
                    modalItem.remark ||
                    modalItem.reference ||
                    "No details available.")}
                {modalType === "customer" &&
                  (modalItem.email || modalItem.phone
                    ? `${modalItem.email || ""}${
                        modalItem.email && modalItem.phone ? " · " : ""
                      }${modalItem.phone || ""}`
                    : "No contact information.")}
                {modalType === "enquiry" && (
                  <>
                    <strong>Name:</strong> {modalItem.fullName || modalItem.name || "-"} <br/>
                    <strong>Email:</strong> {modalItem.email || "-"} <br/>
                    <strong>Mobile:</strong> {modalItem.mobile || modalItem.phone || "-"} <br/>
                    <strong>City:</strong> {modalItem.city || "-"} <br/>
                    <strong>Service:</strong> {modalItem.service || "-"} <br/>
                    <strong>Project Type:</strong> {modalItem.projectType || "-"} <br/>
                    <strong>Message:</strong> <br/>
                    <span>{modalItem.message || "No message."}</span>
                  </>
                )}
              </p>
              <details className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                <summary>View raw data</summary>
                <pre className="text-xs max-h-40 overflow-auto mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  {JSON.stringify(modalItem, null, 2)}
                </pre>
              </details>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
