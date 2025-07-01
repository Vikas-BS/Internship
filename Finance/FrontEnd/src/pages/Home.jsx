import React, { useEffect, useState } from "react";
import DashboardCards from "../components/Dashboardcards";
import IncPi from "../components/IncPi"



const Home = () =>{
    const [user , setUser] = useState(null);

    
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
    <div className="min-h-screen w-screen flex items-center justify-center bg-white">
      {user ? (
        <div className="text-center min-h-screen w-screen bg-white">
          <DashboardCards/>
           

        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Home;
