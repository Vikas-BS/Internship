import React, { useState } from "react";
import Pagination from "./Pagination";

const App = () => {
  const items = [
    "Alice", "Bob", "Charlie", "David", "Eve",
    "Frank", "Grace", "Hank", "Ivy", "Jack",
    "Karen", "Leo", "Mona", "Nina", "Oscar"
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = items.slice(indexOfFirst, indexOfLast);

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Pagination Example</h1>
      
      <ul className="mb-4">
        {currentItems.map((item, idx) => (
          <li key={idx} className="py-1 border-b">{item}</li>
        ))}
      </ul>

      <Pagination
        totalItems={items.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default App;
