import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MoreVertical } from "lucide-react";

const IncomeCard = ({ onTotalChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", amount: "", category: "", description: "" });
  const [total, setTotal] = useState(0);

  const fetchIncome = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:4000/api/income", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        const total = data.reduce((acc, item) => acc + Number(item.amount), 0);
        setTotal(total);
        onTotalChange(total);
      } else {
        toast.error(data.message || "Failed to fetch income.");
      }
    } catch (err) {
      toast.error("Fetch error: " + err.message);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!formData.title || !formData.amount || !formData.category) {
      toast.error("Please fill all required fields.");
      return;
    }
    try {
      const res = await fetch("http://localhost:4000/api/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, amount: Number(formData.amount) }),
      });
      const data = await res.json();
      if (res.ok) {
        await fetchIncome();
        handleCloseModal();
        toast.success("Income added successfully!");
      } else {
        toast.error(data.message || "Failed to add income.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => { fetchIncome(); }, []);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ title: "", amount: "", category: "", description: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="bg-white text-black rounded-2xl p-6 shadow-2xl border border-gray-200 transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 w-full max-w-sm">
        <div className="flex justify-between items-start">
          <h3 className="text-md text-gray-700 font-medium">Income</h3>
          <button onClick={handleOpenModal} className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
            title="Add Expense"
          >
            <MoreVertical className="text-gray-600 hover:text-blue-600" size={18} />
            </button>
        </div>
        <div className="text-2xl font-semibold text-green-600 mt-3 truncate break-words max-w-full">
          ₹ {total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Income</h2>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded mb-3" />
            <input name="amount" type="number" value={formData.amount} onChange={handleChange} placeholder="Amount" className="w-full p-2 border rounded mb-3" />
            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded mb-3">
              <option value="" disabled>Select Category</option>
              <option>Salary</option>
              <option>Business</option>
              <option>Investments</option>
              <option>Freelancing</option>
              <option>Others</option>
            </select>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description (optional)" className="w-full p-2 border rounded mb-3" />
            <div className="flex justify-end gap-2">
              <button onClick={handleCloseModal} className="px-4 py-2 text-black bg-gray-100 rounded">Cancel</button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Add</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IncomeCard;
