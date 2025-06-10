import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './component/Login';
import Register from './component/Register';
import Profile from './component/Profile';
import TaskDetails from './component/TaskDetails';
import Parent from './component/Parent'; 

const App = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={user ? <Parent user={user} setUser={setUser} /> : <Navigate to="/login" />} />
        <Route path="/task/:index" element={<TaskDetails />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/todo" element={user ? <Parent user={user} setUser={setUser} /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
