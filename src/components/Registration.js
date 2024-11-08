import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; 
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/Login');
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    }
  };
  return (
    <div className="register-container min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleRegister} className="bg-gray-800 p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl mb-4">Register</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-400"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-400"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-400"
        />
        <button type="submit" className="w-full p-2 bg-green-500 rounded hover:bg-green-600">
          Register
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
