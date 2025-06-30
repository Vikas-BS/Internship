import React from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from "react-toastify";

const Login = ({ setUserName }) => {
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
        if (result.user && result.user.name) {
          setUserName(result.user.name);
        }
        navigate('/home');
        toast.success('Loggedin Successfuly!!!');
      } else {
        toast.error('Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error during login');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch('http://localhost:4000/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential })
      });

      const result = await res.json();
      if (res.ok) {
        localStorage.setItem('token', result.token);
        if (result.user && result.user.name) {
          setUserName(result.user.name);
        }if (!result.user.hasPassword) {
          navigate("/set-password");
        } else {
          toast.success('Loggedin Succesfuly!!!');
          navigate("/home");
        }
      } else {
        toast.error( 'Google login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error during Google login');
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-slate-900 ">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-xl p-6 sm:p-8 space-y-6 bg-slate-800  rounded-lg shadow-md transition-all duration-300">
        <AuthForm type="login" onSubmit={handleLogin} />
        <div className="flex justify-center ">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log('Google login failed')}
          
          />
        </div>

        <p className="text-md text-center  text-slate-500">
          Don't have an account?{' '}
          <a href="/signup" className="text-indigo-600 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
