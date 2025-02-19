import React, { useState } from 'react';
import axios from 'axios';

const HrmForm = () => {
  const [formData, setFormData] = useState({
    cadreApproved: '',
    permanentStaff: '',
    contractStaff: '',
    serviceHiringStaff: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit form data to the server
    try {
      const response = await axios.post('http://localhost:8000/api/hrm-submit', formData);
      setMessage('Form submitted successfully!');
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      setMessage('Error submitting form.');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-8xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Submit HRM Information</h2>
      {message && (
        <div className={`mb-4 p-4 ${message.includes('successfully') ? 'bg-green-500' : 'bg-red-500'} text-white rounded`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Cadre (Approved)</label>
          <input
            type="text"
            name="cadreApproved"
            value={formData.cadreApproved}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Available Staff (Permanent)</label>
          <input
            type="text"
            name="permanentStaff"
            value={formData.permanentStaff}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Available Staff (Contract)</label>
          <input
            type="text"
            name="contractStaff"
            value={formData.contractStaff}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Available Staff (Service Hiring)</label>
          <input
            type="text"
            name="serviceHiringStaff"
            value={formData.serviceHiringStaff}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default HrmForm;