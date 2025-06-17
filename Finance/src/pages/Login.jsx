import React from 'react';
import AuthForm from '../components/AuthForm';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const handleLogin = (data) => {
    console.log('Logging in with:', data);
    
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 sm:px-6 md:px-10 py-6">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 sm:p-8 space-y-6 bg-neutral-50 rounded-lg shadow-md transition-all duration-300">
        <AuthForm type="login" onSubmit={handleLogin} />
        <p className="text-sm text-center text-gray-600">
          Don't have an account? <Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
