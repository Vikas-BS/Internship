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
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white">
      {user ? (
        <div className="text-center min-h-screen w-screen bg-gradient-to-br from-gray-100 to-white">
          <DashboardCards/>

        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Home;
