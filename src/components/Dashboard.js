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
    <div className="content p-8">
      <div className="dashboard-header flex justify-between items-center mb-4">
        <h1 className="text-4xl text-white">Welcome, {user.email}</h1>
      </div>

      <div className="user-details bg-gray-800 p-6 rounded-lg">
        <h2 className="text-3xl text-white mb-4">User Details</h2>
        <div className="user-info text-white mb-4">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>UID:</strong> {user.uid}</p>
          <p><strong>Created On:</strong> {creationDate}</p>
        </div>
        <div className="user-actions">
          <button
            onClick={() => navigate('/update-profile')}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors mr-4"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
