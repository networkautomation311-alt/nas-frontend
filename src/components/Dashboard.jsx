// Dashboard.jsx
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  FaProjectDiagram,
  FaBlog,
  FaMoon,
  FaSun,
  FaRedo,
  FaDownload,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

/* ---------------------------
  ✅ Configure your API URLs
--------------------------- */
const API_PROJECTS = "https://portfolio-backend-3nr9.onrender.com/api/v1/project";
const API_BLOGS = "https://portfolio-backend-3nr9.onrender.com/api/v1/blog";

/* ---------------------------
  UI Card configuration
--------------------------- */
const CARDS = [
  {
    title: "Total Projects",
    key: "projects",
    icon: <FaProjectDiagram className="text-indigo-500 text-4xl" />,
    gradient: "from-indigo-100 to-indigo-50",
  },
  {
    title: "Total Blogs",
    key: "blogs",
    icon: <FaBlog className="text-rose-500 text-4xl" />,
    gradient: "from-rose-100 to-rose-50",
  },
];

/* ---------------------------
  Helpers
--------------------------- */
function exportCSV(data = [], filename = "export.csv") {
  if (!data || data.length === 0) {
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
  const [counts, setCounts] = useState({ projects: null, blogs: null });
  const [projectsList, setProjectsList] = useState([]);
  const [blogsList, setBlogsList] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return false;
    }
  });

  // search queries
  const [projQuery, setProjQuery] = useState("");
  const [blogQuery, setBlogQuery] = useState("");

  // modal state
  const [openModal, setOpenModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [modalType, setModalType] = useState("project"); // or 'blog'

  useEffect(() => {
    // apply initial theme on mount
    const el = document.documentElement;
    if (dark) el.classList.add("dark");
    else el.classList.remove("dark");
  }, []); // only on mount

  const fetchAll = async (showToast = false) => {
    setLoading(true);
    setError("");
    try {
      const [projectsRes, blogsRes] = await Promise.all([
        axios.get(API_PROJECTS),
        axios.get(API_BLOGS),
      ]);

      const projectsArray =
        Array.isArray(projectsRes.data?.data)
          ? projectsRes.data.data
          : Array.isArray(projectsRes.data)
          ? projectsRes.data
          : projectsRes.data?.projects || [];

      const blogsArray =
        Array.isArray(blogsRes.data?.data)
          ? blogsRes.data.data
          : Array.isArray(blogsRes.data)
          ? blogsRes.data
          : blogsRes.data?.blogs || [];

      setProjectsList(projectsArray);
      setBlogsList(blogsArray);

      setCounts({
        projects: projectsArray.length || 0,
        blogs: blogsArray.length || 0,
      });

      // sort by date desc for recent lists
      const sortByDateDesc = (arr) =>
        [...arr].sort((a, b) => {
          const ta = new Date(a.createdAt || a.created_at || a.date || 0).getTime();
          const tb = new Date(b.createdAt || b.created_at || b.date || 0).getTime();
          return tb - ta;
        });

      setRecentProjects(sortByDateDesc(projectsArray).slice(0, 10));
      setRecentBlogs(sortByDateDesc(blogsArray).slice(0, 10));

      if (showToast) toast.success("Dashboard updated");
    } catch (err) {
      console.error(err);
      setError("⚠️ Unable to fetch data. Check backend or network.");
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
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

  // filtered lists for search
  const filteredProjects = useMemo(() => {
    if (!projQuery) return recentProjects;
    return recentProjects.filter((p) =>
      (p.title || p.name || p.projectName || "")
        .toString()
        .toLowerCase()
        .includes(projQuery.toLowerCase())
    );
  }, [projQuery, recentProjects]);

  const filteredBlogs = useMemo(() => {
    if (!blogQuery) return recentBlogs;
    return recentBlogs.filter((b) =>
      (b.title || b.heading || b.name || "")
        .toString()
        .toLowerCase()
        .includes(blogQuery.toLowerCase())
    );
  }, [blogQuery, recentBlogs]);

  // chart data
  const chartData = useMemo(
    () => [
      { name: "Projects", count: counts.projects || 0 },
      { name: "Blogs", count: counts.blogs || 0 },
    ],
    [counts]
  );

  // open modal with item
  const openItemModal = (item, type = "project") => {
    setModalItem(item);
    setModalType(type);
    setOpenModal(true);
  };

  return (
    <div className="min-h-screen px-4 py-6 md:py-10 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-serif">
              🧭 Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
              Overview — {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm"
            >
              {dark ? <FaSun /> : <FaMoon />}{" "}
              <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
            </button>

            <button
              onClick={handleRefresh}
              disabled={fetching}
              className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm"
              title="Refresh data"
            >
              <FaRedo className={fetching ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* left: cards + chart */}
        <div className="lg:col-span-8 space-y-5">
          {/* cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CARDS.map((card) => (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className={`relative overflow-hidden rounded-2xl p-4 md:p-6 border ${card.gradient} border-transparent shadow-sm dark:shadow-lg`}
              >
                <div className="absolute -right-8 -top-8 w-36 h-36 bg-white opacity-8 dark:opacity-5 blur-2xl rounded-full"></div>

                <div className="flex items-center gap-3 md:gap-4">
                  <div className="p-2 md:p-3 rounded-lg bg-white/60 dark:bg-black/30">
                    {card.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 truncate">
                      {card.title}
                    </div>

                    <div className="mt-2 text-2xl md:text-3xl font-extrabold">
                      {loading ? (
                        <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                      ) : (
                        counts[card.key] ?? "-"
                      )}
                    </div>

                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {card.key === "projects"
                        ? "Projects are managed from Projects section."
                        : "Manage blog posts from Blogs section."}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, delay: 0.04 }}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 md:p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base md:text-lg font-semibold">📈 Content Overview</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {loading ? "Loading..." : `Updated: ${new Date().toLocaleTimeString()}`}
              </div>
            </div>

            <div style={{ width: "100%", height: 220 }}>
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366F1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* right: recent lists + search + export */}
        <div className="lg:col-span-4 space-y-5">
          {/* Recent Projects */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36 }}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-3 md:p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm md:text-md font-semibold">🧩 Recent Projects</h4>
              <button
                onClick={() => exportCSV(projectsList, "projects.csv")}
                className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center gap-2"
              >
                <FaDownload /> <span className="hidden sm:inline">Export</span>
              </button>
            </div>

            <input
              type="text"
              value={projQuery}
              onChange={(e) => setProjQuery(e.target.value)}
              placeholder="Search projects..."
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
                : filteredProjects.length > 0
                ? filteredProjects.map((p, idx) => (
                    <li
                      key={p._id || p.id || idx}
                      className="p-2 rounded-md bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 transition text-sm"
                    >
                      <div className="font-medium truncate">{p.title || p.name || p.projectName || "Untitled Project"}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(p.createdAt || p.created_at || Date.now()).toLocaleDateString()}
                      </div>
                    </li>
                  ))
                : (
                  <li className="text-sm text-gray-500">No projects found</li>
                )}
            </ul>
          </motion.div>

          {/* Recent Blogs */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38 }}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-3 md:p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm md:text-md font-semibold">📰 Recent Blogs</h4>
              <button
                onClick={() => exportCSV(blogsList, "blogs.csv")}
                className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center gap-2"
              >
                <FaDownload /> <span className="hidden sm:inline">Export</span>
              </button>
            </div>

            <input
              type="text"
              value={blogQuery}
              onChange={(e) => setBlogQuery(e.target.value)}
              placeholder="Search blogs..."
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
                : filteredBlogs.length > 0
                ? filteredBlogs.map((b, idx) => (
                    <li
                      key={b._id || b.id || idx}
                      className="p-2 rounded-md bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 transition text-sm"
                    >
                      <div className="font-medium truncate">{b.title || b.heading || b.name || "Untitled Blog"}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(b.createdAt || b.created_at || Date.now()).toLocaleDateString()}
                      </div>
                    </li>
                  ))
                : (
                  <li className="text-sm text-gray-500">No blogs found</li>
                )}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Modal (still available for "view details" if you want) */}
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
                  {modalItem.title || modalItem.name || modalItem.projectName || "Untitled"}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {modalType === "project" ? "Project details" : "Blog details"} •{" "}
                  {new Date(modalItem.createdAt || modalItem.created_at || Date.now()).toLocaleDateString()}
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
                {modalItem.description ||
                  modalItem.content ||
                  modalItem.summary ||
                  "No description available."}
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
