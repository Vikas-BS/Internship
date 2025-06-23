
import React, { useState } from "react";
import BalanceCard from "../components/BalanceCard";
import IncomeCard from "../components/IncomeCard";
import ExpenseCard from "../components/ExpenseCard";

const DashboardCards = () => {
  const [totalIncome, setTotalIncome] = useState(0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
      <BalanceCard totalIncome={totalIncome} />
      <IncomeCard onTotalChange={setTotalIncome} />
      <ExpenseCard />
    </div>
  );
};

export default DashboardCards;
