import React from "react";

const ExpenseCard = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md relative">
      <div className="flex justify-between items-start">
        <h3 className="text-md text-gray-700 font-medium">Expenses</h3>
        <button  className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm  text-center rounded-full hover:bg-gray-100">...</button>
      </div>
      <div className="text-2xl font-semibold text-gray-900 mt-3">$0.00</div>
    </div>
  );
};

export default ExpenseCard;
