import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/v1/call-entry";

export default function CallSlipPage() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch call entries
  const fetchCalls = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API);
      setCalls(response.data.data || []);
    } catch (error) {
      console.error("Error fetching call slips:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold">Call Slip List</h1>
      </div>

      <div className="bg-white rounded-xl shadow overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Call No</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Urgency</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Problem Details</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center p-5">
                  Loading...
                </td>
              </tr>
            ) : calls.length > 0 ? (
              calls.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="p-3">{item.callNumber}</td>
                  <td className="p-3">
                    {item.callDate
                      ? new Date(item.callDate).toLocaleDateString()
                      : ""}
                  </td>
                  <td className="p-3">{item.customerName}</td>
                  <td className="p-3">{item.department}</td>
                  <td className="p-3">{item.callType}</td>
                  <td className="p-3">{item.callUrgency}</td>
                  <td className="p-3">{item.status}</td>
                  <td className="p-3">{item.problemDetails}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-5">
                  No Call Slips Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}