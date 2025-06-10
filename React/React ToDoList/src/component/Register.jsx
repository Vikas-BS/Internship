import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = ({setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.email === email)) {
      toast.error('User already exists');
      return;
    }
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    toast.success('Registered successfully');
    setUser({email});
    navigate('/');
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-green-300 to-teal-500 text-white">
      <div className="bg-white text-black p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-600">Create Account</h2>
        <input
          className="w-full text-white p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full p-3 text-white mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="w-full bg-teal-600 text-white py-3 rounded hover:bg-teal-700 transition" onClick={handleRegister}>
          Register
        </button>
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-teal-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
