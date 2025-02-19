import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Correct import path

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login form submitted");
    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token); // Store the token in localStorage
      login(); // Call login to update the authentication state
      navigate('/dashboard'); // Redirect to the dashboard
    } catch (error) {
      console.error("Login error:", error);
      setError('Invalid credentials');
    }
  };

  return (
    <div className="bg-gray-800 border-b border-gray-700 py-8">
      <form className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="text-right">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;