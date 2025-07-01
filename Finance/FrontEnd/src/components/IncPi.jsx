import { useEffect, useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BASE_COLORS = [
  "#4CAF50", "#2196F3", "#FF9800", "#9C27B0",
  "#F44336", "#00BCD4", "#FFEB3B", "#795548",
  "#03A9F4", "#8BC34A", "#FF5722", "#E91E63",
];

const IncomePieChart = ({ trigger }) => {
  const [incomeData, setIncomeData] = useState([]);
  const [categoryColorMap, setCategoryColorMap] = useState({});

  const fetchIncome = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:4000/api/income", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await res.json();
    const rawData = Array.isArray(result) ? result : result.data || [];

    const categoryMap = {};
    rawData.forEach((item) => {
      const category = item.category;
      const amount = Number(item.amount);
      categoryMap[category] = (categoryMap[category] || 0) + amount;
    });

    const chartData = Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
    }));

   
    const newColorMap = { ...categoryColorMap };
    let colorIndex = Object.keys(newColorMap).length;

    chartData.forEach((item) => {
      if (!newColorMap[item.name]) {
        newColorMap[item.name] =
          BASE_COLORS[colorIndex % BASE_COLORS.length];
        colorIndex++;
      }
    });

    setCategoryColorMap(newColorMap);
    setIncomeData(chartData);
  };

  useEffect(() => {
    fetchIncome();
  }, [trigger]);

  return (
    <div className="w-full h-[400px] flex flex-col">
      <h3 className="text-lg font-semibold mb-4 text-black">
        Income by Category
      </h3>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={incomeData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              
            >
              {incomeData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={categoryColorMap[entry.name] || "#ccc"}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomePieChart;
