import React from "react";

const BalanceCard = ({ totalIncome }) => {
  return (
    <div className="bg-white text-black rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-4">Balance</h3>
      <div className="text-3xl font-bold mb-4">{totalIncome.toFixed(2)}</div>
      
    </div>
  );
};

export default BalanceCard;
