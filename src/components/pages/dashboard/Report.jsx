import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/v1/report";

const ReportManagement = () => {
  const [reports, setReports] = useState([]);

  const [formData, setFormData] = useState({
    reportType: "daily",
    totalIncome: "",
    totalExpense: "",
    totalProfit: "",
    totalDue: "",
    growth: "",
  });

  // ===============================
  // FETCH REPORTS
  // ===============================
  const fetchReports = async () => {
    try {
      const res = await axios.get(API);

      setReports(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // ===============================
  // HANDLE CHANGE
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedData = {
      ...formData,
      [name]: value,
    };

    // AUTO PROFIT CALCULATION
    const income =
      Number(updatedData.totalIncome || 0);

    const expense =
      Number(updatedData.totalExpense || 0);

    updatedData.totalProfit = income - expense;

    setFormData(updatedData);
  };

  // ===============================
  // CREATE REPORT
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(API, formData);

      alert("Report Created");

      setFormData({
        reportType: "daily",
        totalIncome: "",
        totalExpense: "",
        totalProfit: "",
        totalDue: "",
        growth: "",
      });

      fetchReports();
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  // ===============================
  // DELETE REPORT
  // ===============================
  const deleteReport = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);

      fetchReports();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">
          REPORT MANAGEMENT
        </h2>

        {/* ================= FORM ================= */}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Report Type</label>

              <select
                name="reportType"
                value={formData.reportType}
                onChange={handleChange}
                className="form-control"
              >
                <option value="daily">
                  Daily
                </option>

                <option value="monthly">
                  Monthly
                </option>

                <option value="yearly">
                  Yearly
                </option>
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label>Total Income</label>

              <input
                type="number"
                name="totalIncome"
                value={formData.totalIncome}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Income"
              />
            </div>

            <div className="col-md-4 mb-3">
              <label>Total Expense</label>

              <input
                type="number"
                name="totalExpense"
                value={formData.totalExpense}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Expense"
              />
            </div>

            <div className="col-md-4 mb-3">
              <label>Total Profit</label>

              <input
                type="number"
                name="totalProfit"
                value={formData.totalProfit}
                className="form-control"
                readOnly
              />
            </div>

            <div className="col-md-4 mb-3">
              <label>Total Due</label>

              <input
                type="number"
                name="totalDue"
                value={formData.totalDue}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Due"
              />
            </div>

            <div className="col-md-4 mb-3">
              <label>Growth %</label>

              <input
                type="number"
                name="growth"
                value={formData.growth}
                onChange={handleChange}
                className="form-control"
                placeholder="Growth Percentage"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            CREATE REPORT
          </button>
        </form>
      </div>

      {/* ================= TABLE ================= */}

      <div className="card shadow mt-4 p-3">
        <h3 className="mb-3">
          ALL REPORTS
        </h3>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Income</th>
                <th>Expense</th>
                <th>Profit</th>
                <th>Due</th>
                <th>Growth</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>

                  <td>
                    {item.reportType}
                  </td>

                  <td>
                    ₹ {item.totalIncome}
                  </td>

                  <td>
                    ₹ {item.totalExpense}
                  </td>

                  <td>
                    ₹ {item.totalProfit}
                  </td>

                  <td>
                    ₹ {item.totalDue}
                  </td>

                  <td>
                    {item.growth}%
                  </td>

                  <td>
                    {new Date(
                      item.reportDate
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteReport(item._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {reports.length === 0 && (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center"
                  >
                    No Reports Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportManagement;