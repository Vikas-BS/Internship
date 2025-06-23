import React, { useEffect, useState } from "react";

const IncomeCard = ({ onTotalChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Salary",
    description: "",
  });
  const [total, setTotal] = useState(0);

  const fetchIncome = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:4000/api/income", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    
      const data = await res.json();
      if (res.ok) {
        const total = data.reduce((acc, item) => acc + item.amount, 0);
        setTotal(total);
        onTotalChange(total);
      } else {
        console.error("Failed to fetch income:", data.message);
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:4000/api/income", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      await fetchIncome(); 
      handleCloseModal();
    } else {
      const err = await res.json();
      console.error("Failed to add income:", err.message);
    }
  };

  useEffect(() => {
    fetchIncome(); 
  }, []);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ title: "", amount: "", category: "Salary", description: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="bg-white rounded-xl p-6 shadow-md relative">
        <div className="flex justify-between items-start">
          <h3 className="text-md text-gray-700 font-medium">Income</h3>
          <button
            onClick={handleOpenModal}
            className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm  text-center rounded-full hover:bg-gray-100"

          >
            ...
          </button>
        </div>
        <div className="text-2xl font-semibold text-gray-900 mt-3">
          {total.toFixed(2)}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Income</h2>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="w-full p-2 border rounded mb-3"
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            >
              <option>Salary</option>
              <option>Business</option>
              <option>Investments</option>
              <option>Freelancing</option>
              <option>Others</option>
            </select>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description (optional)"
              className="w-full p-2 border rounded mb-3"
            />
            <div className="flex justify-end gap-2">
              <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IncomeCard;
