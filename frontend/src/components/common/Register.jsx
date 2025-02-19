import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Correct import path

const Register = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Register form submitted", { name, email, password });
    try {
      const response = await axios.post('http://localhost:8000/api/register', { name, email, password });
      const { token } = response.data;
      localStorage.setItem('token', token); // Store the token in localStorage
      login(); // Call login to update the authentication state
      onRegister(); // Call onRegister to update the parent component state
      navigate('/dashboard'); // Redirect to the dashboard
    } catch (error) {
      console.error("Register error:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'Registration failed' });
      }
    }
  };

  return (
    <div className="bg-gray-800 border-b border-gray-700 py-8">
      <form className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>
        {errors.general && <p className="text-red-500">{errors.general}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {errors.password && <p className="text-red-500">{errors.password[0]}</p>}
        </div>
        <div className="text-right">
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;