import React, { useState, useEffect } from "react";
import BalanceCard from "./BalanceCard";
import IncomeCard from "./IncomeCard";
import ExpenseCard from "./ExpenseCard";

const DashboardCards = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 ">
      <BalanceCard balance={balance} />
      <IncomeCard onTotalChange={setTotalIncome} />
      <ExpenseCard onTotalChange={setTotalExpense} />
    </div>
  );
};

export default DashboardCards;
