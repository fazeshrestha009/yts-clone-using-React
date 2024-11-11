import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!user) {
    return <div className="text-white">You must be logged in to view this page.</div>;
  }

  const creationDate = new Date(user.metadata.creationTime).toLocaleString();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-semibold">Welcome, {user.email}</h1>
          <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-xl text-white">{user.email[0].toUpperCase()}</span>
          </div>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg text-gray-900">
          <h2 className="text-3xl font-semibold mb-6">User Details</h2>
          <div className="space-y-4">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>UID:</strong> {user.uid}</p>
            <p><strong>Account Created:</strong> {creationDate}</p>
          </div>
          <div className="mt-6">
            <button
              onClick={() => navigate('/update-profile')}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
