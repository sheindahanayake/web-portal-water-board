import React, { useState } from 'react';
import axios from 'axios';

const DwForm = () => {
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState(['cede', 'rh', 'nrw', 'us', 'catchement','CIPC' , 'other']);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryData, setCategoryData] = useState({ allocation: '', projects: '', progress: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e, field) => {
    setCategoryData({
      ...categoryData,
      [field]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare the data to be sent to the server
    const dataToSend = Object.keys(formData).map(category => ({
      category,
      ...formData[category]
    }));

    try {
      const response = await axios.post('http://localhost:8000/api/development-work-submit', dataToSend); // Update the URL here
      console.log('Form submitted successfully:', response.data);
      setSuccessMessage('Data successfully submitted to the database.');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSuccessMessage('Error submitting data.');
    }
  };

  const addCategory = () => {
    if (selectedCategory && !formData[selectedCategory]) {
      setFormData({
        ...formData,
        [selectedCategory]: { ...categoryData },
      });
      setSelectedCategory('');
      setCategoryData({ allocation: '', projects: '', progress: '' });
    }
  };

  const removeCategory = (category) => {
    const newFormData = { ...formData };
    delete newFormData[category];
    setFormData(newFormData);
  };

  return (
    <div className="max-w-8xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Submit Development Works Information</h2>
      {successMessage && (
        <div className="mb-4 p-4 bg-green-500 text-white rounded">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label className="block mb-2">Select Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="mb-4">
            <label className="block mb-2">Allocation</label>
            <input
              type="text"
              name="allocation"
              value={categoryData.allocation}
              onChange={(e) => handleChange(e, 'allocation')}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Projects</label>
            <input
              type="text"
              name="projects"
              value={categoryData.projects}
              onChange={(e) => handleChange(e, 'projects')}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Progress (phy-Fin)</label>
            <input
              type="text"
              name="progress"
              value={categoryData.progress}
              onChange={(e) => handleChange(e, 'progress')}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
          </div>
          <button
            type="button"
            onClick={addCategory}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Category
          </button>
        </div>
        {Object.keys(formData).map((category) => (
          <div key={category} className="mt-4">
            <h3 className="text-xl font-semibold mb-4">{category.toUpperCase()}</h3>
            <div className="mb-4">
              <p className="block mb-2">Allocation: {formData[category].allocation}</p>
            </div>
            <div className="mb-4">
              <p className="block mb-2">Projects: {formData[category].projects}</p>
            </div>
            <div className="mb-4">
              <p className="block mb-2">Progress (phy-Fin): {formData[category].progress}</p>
            </div>
            <button
              type="button"
              onClick={() => removeCategory(category)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
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

export default DwForm;