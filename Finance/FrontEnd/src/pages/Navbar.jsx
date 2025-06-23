import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar  from './Sidebar';
const Navbar = () => {
  const location = useLocation();
  const hideOn = ["/", "/login", "/signup"];
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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
    navigate("/login") ;
  };

  return (
    <>
    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

    <div className="w-full bg-white px-4 py-3 pr-8 shadow-md flex items-center justify-between">
      <button onClick={() => setSidebarOpen(true)} className="fill-white flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="10px"
          y="10px"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path d="M 3 5 A 1.0001 1.0001 0 1 0 3 7 L 21 7 A 1.0001 1.0001 0 1 0 21 5 L 3 5 z M 3 11 A 1.0001 1.0001 0 1 0 3 13 L 21 13 A 1.0001 1.0001 0 1 0 21 11 L 3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19 L 21 19 A 1.0001 1.0001 0 1 0 21 17 L 3 17 z"></path>
        </svg>
      </button>

      <div className="relative" ref={dropdownRef}>
        <button onClick={() => setOpen(!open)} className="fill-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
            />
          </svg>
        </button>

        {open && (
          <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
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
