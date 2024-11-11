import React from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; 
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const password = watch('password', '');

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate('/Login');
    } catch (error) {
      alert(error.message || 'Registration failed. Please try again.');
    }
  };
  return (
    <div className="register-container min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl mb-4">Register</h2>
        
        <input
          type="email"
          {...register('email', {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format"
            }
          })}
          placeholder="Email"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-400"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        
        <input
          type="password"
          {...register('password', {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters"
            }
          })}
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-400"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <input
          type="password"
          {...register('confirmPassword', {
            validate: (value) => value === password || "Passwords do not match"
          })}
          placeholder="Confirm Password"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-400"
        />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
        
        <button type="submit" className="w-full p-2 bg-green-500 rounded hover:bg-green-600">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
