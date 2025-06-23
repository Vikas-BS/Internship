import React from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      if (res.ok) {
        localStorage.setItem('token', result.token);
        navigate('/home');
      } else {
        alert(result.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error during login');
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-slate-300">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 sm:p-8 space-y-6 bg-white rounded-lg shadow-md transition-all duration-300">
        <AuthForm type="login" onSubmit={handleLogin} />
        <p className="text-sm text-center text-gray-600">
          Don't have an account? <a href="/signup" className="text-indigo-600 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
