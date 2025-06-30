import React, { useState, useRef, useEffect, use } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';


const Navbar = () => {
  const location = useLocation();
  const hideOn = ["/", "/login", "/signup"];
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName , setUserName] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect (() =>{
    const fetchUser = async () =>{
      const token = localStorage.getItem('token');
      if(!token)return;

      try{
        const res = await fetch("http://localhost:4000/api/home",{
          headers:{
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if(res.ok && data.user?.name){
          setUserName(data.user.name)
        }
      }catch(err){
        console.error("Failed tpo fetch user" , err)
      }
    }
    fetchUser();
  },[location.pathname]);
 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  if (hideOn.includes(location.pathname)) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="bg-white text-black px-6 py-3 shadow-lg flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-blue-400 hover:bg-blue-700 p-2 rounded-md transition"
            title="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold tracking-wide">
            Hi, Welcome back {userName || "User"} 👋🏻
          </h1>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 bg-white hover:bg-gray-100 rounded-full transition"
            title="Profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
              />
            </svg>
          </button>

          {open && (
            <ul className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-xl z-50 py-2 text-sm text-gray-700 animate-fadeIn">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
