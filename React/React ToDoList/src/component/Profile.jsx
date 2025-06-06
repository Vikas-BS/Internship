import React from 'react';
import { Link } from 'react-router-dom';

const Profile = ({ user }) => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-purple-700">Profile</h2>
        <p className="mb-2 text-lg"><strong>Email:</strong> {user.email}</p>
        <Link to="/" className="inline-block mt-6 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
          Back to Todo
        </Link>
      </div>
    </div>
  );
};

export default Profile;
