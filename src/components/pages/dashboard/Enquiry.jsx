import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "https://networkautomation-in-234510.hostingersite.com/?utm_source=chatgpt.com/api/v1/enquiry";

function EnquiryDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEnquiries = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_BASE}/all`);

      if (response.data.success) {
        setEnquiries(response.data.data);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch enquiries"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
    // eslint-disable-next-line
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_BASE}/update-status/${id}`, { status });
      fetchEnquiries();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEnquiry = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE}/delete/${id}`);
      fetchEnquiries();
    } catch (error) {
      console.log(error);
    }
  };

  // Helper: extract camera count from a message or item, fallback to "-"
  const getCameraCount = (item) => {
    // Try to find camera/cctv count in item (look in service, projectType, or message)
    // Common conventions: message: "... camera: 8 ..." or "...cctv: 16..."
    let messageText = (
      (item.message || "") +
      " " +
      (item.projectType || "") +
      " " +
      (item.service || "")
    ).toLowerCase();

    // Regex for: camera: N or cctv: N (N is a number)
    let regex = /(camera|cctv)[\s:]*([0-9]+)/i;
    let match = messageText.match(regex);
    if (match && match[2]) {
      return match[2];
    }

    // Could be sent directly as item.cameraCount, item.cctvCount
    if (item.cameraCount) return item.cameraCount;
    if (item.cctvCount) return item.cctvCount;

    return "-";
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-xl font-semibold">
        Loading enquiries...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Enquiry Dashboard</h1>
        <div className="bg-red-700 text-white px-5 py-2 rounded-xl">
          Total Enquiries: {enquiries.length}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded-xl mb-5">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-xl rounded-2xl">
        <table className="w-full text-sm">
          <thead className="bg-red-700 text-white">
            <tr>
              <th className="px-4 py-4 text-left">Name</th>
              <th className="px-4 py-4 text-left">Mobile</th>
              <th className="px-4 py-4 text-left">Service</th>
              <th className="px-4 py-4 text-left">Project Type</th>
              <th className="px-4 py-4 text-left">City</th>
              {/* New column for Camera Count */}
              <th className="px-4 py-4 text-left">Camera Count</th>
              <th className="px-4 py-4 text-left">Live Location</th>
              <th className="px-4 py-4 text-left">Status</th>
              <th className="px-4 py-4 text-left">Date</th>
              <th className="px-4 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {enquiries.length > 0 ? (
              enquiries.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="font-semibold text-gray-800">
                      {item.fullName}
                    </div>
                    <div className="text-gray-500 text-xs">{item.email}</div>
                  </td>
                  <td className="px-4 py-4">{item.mobile}</td>
                  <td className="px-4 py-4">{item.service}</td>
                  <td className="px-4 py-4">{item.projectType}</td>
                  <td className="px-4 py-4">{item.city}</td>
                  {/* Camera Count cell */}
                  <td className="px-4 py-4">
                    <span className="font-mono text-base">
                      {getCameraCount(item)}
                    </span>
                  </td>
                  {/* Live Location cell */}
                  <td className="px-4 py-4">
                    {item.location?.latitude && item.location?.longitude ? (
                      <div className="space-y-2">
                        <p className="text-xs text-gray-600">
                          Lat: {item.location.latitude}
                        </p>
                        <p className="text-xs text-gray-600">
                          Lng: {item.location.longitude}
                        </p>
                        <a
                          href={`https://www.google.com/maps?q=${item.location.latitude},${item.location.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded-lg"
                        >
                          View Live Map
                        </a>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">
                        No Location
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <select
                      value={item.status}
                      onChange={(e) => updateStatus(item._id, e.target.value)}
                      className="border rounded-lg px-3 py-2"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-4 py-4">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => alert(item.message)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs"
                      >
                        View
                      </button>
                      <button
                        onClick={() => deleteEnquiry(item._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-10 text-gray-500">
                  No enquiries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EnquiryDashboard;