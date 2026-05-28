// =====================================
// src/components/pages/dashboard/Expense.jsx
// =====================================

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import ExpenseFormModal from "./ExpenseFormModal";

const API = "http://localhost:5000/api/v1/expense";

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [openModal, setOpenModal] = useState(false); // For adding
  const [openEditModal, setOpenEditModal] = useState(false); // For editing
  const [editExpense, setEditExpense] = useState(null); // Expense to edit

  // FETCH EXPENSES
  const fetchExpenses = async () => {
    try {
      const res = await axios.get(API);
      setExpenses(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch expenses only on mount, using correct approach to avoid cascading renders
  useEffect(() => {
    // Promise can't be directly passed to useEffect, so wrap in function
    let ignore = false;
    const load = async () => {
      try {
        const res = await axios.get(API);
        if (!ignore) {
          setExpenses(res.data.data || []);
        }
      } catch (error) {
        if (!ignore) {
          console.log(error);
        }
      }
    };
    load();
    return () => { ignore = true };
    // eslint-disable-next-line
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete expense?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/${id}`);
      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  // DASHBOARD
  const totalExpense = expenses.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  );

  // Handle Edit
  const handleEdit = (expense) => {
    setEditExpense(expense);
    setOpenEditModal(true);
  };

  // Close Add Modal
  const handleCloseAddModal = () => {
    setOpenModal(false);
  };

  // Close Edit Modal
  const handleCloseEditModal = () => {
    setEditExpense(null);
    setOpenEditModal(false);
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Expense Management</h1>
          <p className="text-gray-500">ERP Expense System</p>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Expense
        </button>
      </div>

      {/* DASHBOARD */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Expense</p>
          <h2 className="text-3xl font-bold">
            ₹
            {totalExpense.toLocaleString("en-IN")}
          </h2>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Entries</p>
          <h2 className="text-3xl font-bold">{expenses.length}</h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3">
                  {item.expenseDate
                    ? new Date(item.expenseDate).toLocaleDateString()
                    : ''}
                </td>
                <td className="p-3">
                  {item.expenseCategory?.categoryName}
                </td>
                <td className="p-3">
                  ₹
                  {item.amount}
                </td>
                <td className="p-3">{item.paymentMode}</td>
                <td className="p-3">{item.description}</td>
                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD MODAL */}
      {openModal && (
        <ExpenseFormModal
          onClose={handleCloseAddModal}
          refreshExpenses={fetchExpenses}
          expense={null}
        />
      )}

      {/* EDIT MODAL */}
      {openEditModal && editExpense && (
        <ExpenseFormModal
          onClose={handleCloseEditModal}
          refreshExpenses={fetchExpenses}
          expense={editExpense}
        />
      )}
    </div>
  );
};

export default Expense;