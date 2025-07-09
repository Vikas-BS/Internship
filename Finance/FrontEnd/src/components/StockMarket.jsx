import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

const FINNHUB_API_KEY = "d1n4b09r01qlvnp5f8h0d1n4b09r01qlvnp5f8hg"; // Replace with .env for production

const StockDashboard = () => {
  const [symbols, setSymbols] = useState([]);
  const [input, setInput] = useState("");
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch stocks from backend on mount
  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/stock", {
          credentials: "include",
        });
        const data = await res.json();
        setSymbols(data || []);
      } catch (err) {
        console.error("Failed to fetch symbols:", err);
      }
    };
    fetchSymbols();
  }, []);

  // Fetch stock prices from Finnhub
  const fetchStock = async (symbol) => {
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
      );
      const data = await res.json();
      if (!data || data.c === 0) return null;

      return {
        symbol,
        price: data.c,
        change: data.d,
        percent: data.dp,
        prevClose: data.pc,
      };
    } catch (err) {
      console.error("Error fetching quote for", symbol, err);
      return null;
    }
  };

  const fetchAllStockData = async () => {
    setLoading(true);
    const results = await Promise.all(symbols.map(fetchStock));
    setStockData(results.filter(Boolean));
    setLoading(false);
  };

  useEffect(() => {
    if (symbols.length > 0) fetchAllStockData();
  }, [symbols]);

  // Add new stock symbol
  const handleAdd = async () => {
    const cleanSymbol = input.trim().toUpperCase();
    if (!cleanSymbol || symbols.includes(cleanSymbol)) return;

    try {
      const res = await fetch("http://localhost:4000/api/stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ symbol: cleanSymbol }),
      });

      if (res.ok) {
        setSymbols((prev) => [...prev, cleanSymbol]);
        setInput("");
      }
    } catch (err) {
      console.error("Add stock failed:", err);
    }
  };

  // Remove a stock
  const handleRemove = async (symbol) => {
    try {
      const res = await fetch(`http://localhost:4000/api/stock/${symbol}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setSymbols((prev) => prev.filter((s) => s !== symbol));
      }
    } catch (err) {
      console.error("Remove stock failed:", err);
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* Add Input */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4 mt-2 px-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter stock symbol"
          className="w-full sm:max-w-xs px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-6 px-4 pb-6 w-full max-w-full">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : stockData.length === 0 ? (
          <p className="text-center text-gray-400">No stocks tracked yet.</p>
        ) : (
          stockData.map((stock) => (
            <div
              key={stock.symbol}
              className="relative w-full bg-white border border-gray-200 rounded-xl p-5 shadow-md text-center overflow-hidden"
            >
              <button
                onClick={() => handleRemove(stock.symbol)}
                title="Remove"
                className="absolute top-2 right-2 text-gray-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-200 p-1 rounded-full"
              >
                <Trash2 size={18} strokeWidth={2} />
              </button>

              <h2 className="text-xl font-bold text-gray-800">
                {stock.symbol}
              </h2>
              <p className="text-3xl font-extrabold text-blue-600 mt-2">
                ₹ {stock.price.toFixed(2)}
              </p>
              <p
                className={`mt-1 text-sm ${
                  stock.change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {stock.change >= 0 ? "▲" : "▼"} {stock.change} ({stock.percent}%)
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StockDashboard;
