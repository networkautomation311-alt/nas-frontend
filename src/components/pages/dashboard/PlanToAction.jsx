// =====================================
// src/components/pages/dashboard/PlanToAction.jsx
// =====================================

import React, { useEffect, useState } from "react";
import axios from "axios";

const API =
  "http://localhost:5000/api/v1/plan-to-action";

const PlanToAction = () => {
  // =====================================
  // STATES
  // =====================================

  const [data, setData] = useState([]);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // FETCH DATA
  // =====================================

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API);

      setData(res.data.data || []);
    } catch (error) {
      console.log(error);

      alert(
        "Failed to fetch Plan To Action data"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // USE EFFECT
  // =====================================

  useEffect(() => {
    fetchData();
  }, []);

  // =====================================
  // RENDER
  // =====================================

  return (
    <div className="p-6">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Plan To Action
          </h1>

          <p className="text-gray-500 mt-1">
            Service Call Planning Report
          </p>
        </div>

        <button
          onClick={fetchData}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl shadow"
        >
          Refresh
        </button>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        {loading ? (
          <div className="p-10 text-center text-lg font-medium">
            Loading...
          </div>
        ) : (
          <table className="w-full min-w-max border-collapse">
            <thead>
              <tr className="bg-gray-100 text-sm uppercase">

                <th className="p-3 text-left">
                  S.No
                </th>

                <th className="p-3 text-left">
                  Call No
                </th>

                <th className="p-3 text-left">
                  Attempt No
                </th>

                <th className="p-3 text-left">
                  Assigned By
                </th>

                <th className="p-3 text-left">
                  Customer
                </th>

                <th className="p-3 text-left">
                  Nature Of Call
                </th>

                <th className="p-3 text-left">
                  Instrument
                </th>

                <th className="p-3 text-left">
                  Problem
                </th>

                <th className="p-3 text-left">
                  Department
                </th>

                <th className="p-3 text-left">
                  Preferred Timing
                </th>

                <th className="p-3 text-left">
                  Approx Close Time
                </th>

                <th className="p-3 text-left">
                  End User
                </th>

              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3">
                      {item.sNo}
                    </td>

                    <td className="p-3 font-medium text-indigo-600">
                      {item.callNo || "-"}
                    </td>

                    <td className="p-3">
                    {item.attemptNo || "-"}
                    </td>

                    <td className="p-3">
                      {item.callAssignedBy ||
                        "-"}
                    </td>

                    <td className="p-3">
                      {item.customerName ||
                        "-"}
                    </td>

                    <td className="p-3">
                      {item.natureOfCall ||
                        "-"}
                    </td>

                    <td className="p-3">
                      {item.instrument || "-"}
                    </td>

                    <td className="p-3">
                      {item.problem || "-"}
                    </td>

                    <td className="p-3">
                      {item.endUserDepartment ||
                        "-"}
                    </td>

                    <td className="p-3">
                      {item.preferredTiming ||
                        "-"}
                    </td>

                    <td className="p-3">
                      {item.approxCloseTime ||
                        "-"}
                    </td>

                    <td className="p-3">
                      {item.endUserName ||
                        "-"}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="12"
                    className="text-center p-10 text-gray-500"
                  >
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PlanToAction;