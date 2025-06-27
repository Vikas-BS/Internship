import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import Profile from './pages/Profile';
import SetPassword from './pages/SetPassword';
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from '@react-oauth/google';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [userName, setUserName] = useState("");

  return (
    <GoogleOAuthProvider clientId="149634613993-g967k1d67f27sf2th9dl685k527ar9k2.apps.googleusercontent.com">
      <Router>
        <ToastContainer position="top-right" autoClose={2000} reverseOrder={false}  />
        <Navbar userName={userName} />
        <Routes>
          <Route path="/" element={<Login setUserName={setUserName} />} />
          <Route path="/login" element={<Login setUserName={setUserName} />} />
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="/signup" element={<Signup setUserName={setUserName} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
