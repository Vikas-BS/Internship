import React, { useEffect, useState } from "react";
import DashboardCards from "../components/Dashboardcards";
import axios from "../axios";
import { toast } from "react-toastify";



const Home = () =>{
    const [user , setUser] = useState(null);

    
    const fetchUser = async() =>{
        try{
          const res =  await axios.get('/home');
          setUser(res.data.user);
        }catch(err){
          toast.error(err.response?.data?.message || "Failed to fetch user")
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
