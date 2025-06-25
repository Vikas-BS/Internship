import React, { useEffect, useState } from "react";
import DashboardCards from "../components/Dashboardcards";


const Home = () =>{
    const [user , setUser] = useState(null);

    const [balance, setBalance] = useState(0);
    const fetchUser = async() =>{
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:4000/api/home", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    <div className="min-h-screen w-screen flex items-center justify-center">
      {user ? (
        <div className="text-center min-h-screen w-screen bg-slate-100">
          <DashboardCards/>

        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Home;
