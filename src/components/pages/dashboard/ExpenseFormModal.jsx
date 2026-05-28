// =====================================
// src/components/pages/dashboard/ExpenseFormModal.jsx
// =====================================

import {
    useEffect,
    useState,
  } from "react";
  
  import axios from "axios";
  
  const EXPENSE_API =
    "http://localhost:5000/api/v1/expense";
  
  const CATEGORY_API =
    "http://localhost:5000/api/v1/expense-category";
  
  const ExpenseFormModal = ({
    onClose,
    refreshExpenses,
  }) => {
  
    const [categories,
      setCategories] =
      useState([]);
  
    const [formData,
      setFormData] =
      useState({
  
        expenseCategory: "",
  
        amount: "",
  
        paymentMode: "Cash",
  
        description: "",
  
        remark: "",
      });
  
    // FETCH CATEGORIES
  
    useEffect(() => {
  
      const fetchCategories =
        async () => {
  
          try {
  
            const res =
              await axios.get(
                CATEGORY_API
              );
  
            setCategories(
              res.data.data || []
            );
  
          } catch (error) {
  
            console.log(error);
          }
        };
  
      fetchCategories();
  
    }, []);
  
    // HANDLE CHANGE
  
    const handleChange =
      (e) => {
  
        setFormData({
          ...formData,
          [e.target.name]:
            e.target.value,
        });
      };
  
    // SUBMIT
  
    const handleSubmit =
      async (e) => {
  
        e.preventDefault();
  
        try {
  
          await axios.post(
            EXPENSE_API,
            formData
          );
  
          refreshExpenses();
  
          onClose();
  
        } catch (error) {
  
          console.log(error);
        }
      };
  
    return (
  
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
  
        <div className="bg-white rounded-xl w-full max-w-2xl p-6">
  
          <h2 className="text-2xl font-bold mb-6">
  
            Add Expense
  
          </h2>
  
          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4"
          >
  
            {/* CATEGORY */}
  
            <select
              name="expenseCategory"
              value={
                formData.expenseCategory
              }
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            >
  
              <option value="">
                Select Category
              </option>
  
              {categories.map(
                (item) => (
  
                  <option
                    key={item._id}
                    value={item._id}
                  >
  
                    {
                      item.categoryName
                    }
  
                  </option>
                )
              )}
  
            </select>
  
            {/* AMOUNT */}
  
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={
                formData.amount
              }
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />
  
            {/* PAYMENT MODE */}
  
            <select
              name="paymentMode"
              value={
                formData.paymentMode
              }
              onChange={handleChange}
              className="border p-3 rounded-lg"
            >
  
              <option value="Cash">
                Cash
              </option>
  
              <option value="UPI">
                UPI
              </option>
  
              <option value="Bank Transfer">
                Bank Transfer
              </option>
  
              <option value="Card">
                Card
              </option>
  
            </select>
  
            {/* DESCRIPTION */}
  
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={
                formData.description
              }
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />
  
            {/* REMARK */}
  
            <textarea
              name="remark"
              placeholder="Remark"
              value={
                formData.remark
              }
              onChange={handleChange}
              className="border p-3 rounded-lg md:col-span-2"
            />
  
            {/* BUTTONS */}
  
            <div className="md:col-span-2 flex justify-end gap-3">
  
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
  
              <button
                type="submit"
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
              >
                Save Expense
              </button>
  
            </div>
  
          </form>
  
        </div>
  
      </div>
    );
  };
  
  export default ExpenseFormModal;