import React from "react";

const BalanceCard = ({ balance }) => {
  const amount = typeof balance === "number" ? balance.toLocaleString("en-IN", { minimumFractionDigits: 2 }) : "0.00";

  return (
    <div className="bg-white text-black rounded-2xl p-6  border border-gray-200 transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 w-full max-w-sm">
      <h3 className="text-xl font-semibold mb-3 text-gray-700">Balance</h3>
      <div className="text-3xl font-bold break-words truncate max-w-full">₹ {amount}</div>
    </div>
  );
};

export default BalanceCard;