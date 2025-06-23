import React, { useEffect, useState } from "react";
import DashboardCards from "../components/Dashboardcards";


const Home = () =>{
    const [user , setUser] = useState(null);
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [expenseTotal, setExpenseTotal] = useState(0);

    const [balance, setBalance] = useState(0);

    const handleIncomeUpdate = (newTotal) => {
      setIncomeTotal(newTotal);
      setBalance(newTotal - expenseTotal);
    };
    const fetchUser = async() =>{
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:4000/api/home', {
            headers:{
                Authorization: `Bearer ${token}`
            }

        });
        const data = await res.json();
        if(res.ok){
            setUser(data.user)
        }else{
            console.error(data.message)
        }

    };
    
    
    useEffect (()=>{
        fetchUser();
    },[]);



    return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-green-100">
      {user ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black">Welcome</h1>
          <DashboardCards
          balance={balance} 
          income={incomeTotal} 
          expense={expenseTotal} 
          onIncomeChange={handleIncomeUpdate}
          />

        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Home;
