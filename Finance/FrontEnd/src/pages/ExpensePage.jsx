import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Income from "./IncomePage";

const categoryIcons = {
  Food: "🍔",
  Transport: "🚗",
  Bills: "💰",
  Shopping: "🛒",
  Entertainment: "🎭",
  Healthcare:"🩺",
  Others:"🧩",
};


const Expense = () =>{
    const [expense , setExpense] = useState([]);
    const [filteredExpense, setFilteredExpense] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const ITEMS_PER_PAGE = 5;

    const fetchexpense = async() =>{
      try{
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:4000/api/expense",{
          headers:{
            Authorization : `Bearer ${token}`
          }
        })
        const data = await res.json();
        if(res.ok){
          const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setExpense(sorted);
          setFilteredExpense(sorted);
          const uniqueCategories = [...new Set(data.map((item) => item.category))]
          setCategories(uniqueCategories);
        }else{
          toast.error(data.message ||"Failed to fetch Expense");
        }
      }catch(err){
        toast.error("Error: "+ err.message);
      }
        
    };
    useEffect(() =>{
      fetchexpense()
    },[]);

    useEffect(()=>{
      let result = [...expense];

      if(selectedCategory){
        result = result.filter((item) => item.category === selectedCategory);
      }
      setFilteredExpense(result);
      setCurrentPage(1);
    },[selectedCategory,expense]);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = filteredExpense.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    const totalPages = Math.ceil(filteredExpense.length / ITEMS_PER_PAGE);

    const clearFilters = () => {
      setSelectedCategory("");
    };


    return (
      <div className="min-h-screen w-screen bg-white py-10 px-4 sm:px-10">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-white text-gray-700 hover:text-black mb-6"
          >
            <ArrowLeft size={20} /> Back
          </button>

          <h1 className="text-2xl font-bold text-red-500 mb-6">
            Expense History
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border rounded-lg w-full sm:w-48 bg-white text-black"
            >
              <option value="">All Categories</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              onClick={clearFilters}
              className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm text-gray-700"
            >
              Clear Filters
            </button>
          </div>

          {currentItems.length === 0 ? (
            <p className="text-gray-500">No income entries found.</p>
          ) : (
            <div className="space-y-4">
              {currentItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl shadow border border-gray-200 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">
                        {categoryIcons[item.category] || "💵"}
                      </span>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {item.title}
                      </h2>
                    </div>
                    <span className="text-red-500 font-bold text-lg">
                      -₹{" "}
                      {Number(item.amount).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Date:{" "}
                    {new Date(item.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-500">
                    Category:{" "}
                    <span className="font-medium text-gray-700">
                      {item.category}
                    </span>
                  </p>
                  {item.description && (
                    <p className="text-sm text-gray-600 mt-1 italic">
                      "{item.description}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-lg border text-sm ${
                    currentPage === i + 1
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
};
export default Expense;
