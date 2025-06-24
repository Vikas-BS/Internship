import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/home';
import Navbar from './pages/Navbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [userName, setUserName] = useState("");

  return (
    <Router>
      <Navbar userName={userName} />
      <ToastContainer position="top-right" autoClose={3000} />
  
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home/>} setUserName={setUserName} />
      </Routes>
    </Router>
  );
}

export default App;
