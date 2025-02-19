import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const PtForm = () => {
  const [formData, setFormData] = useState({
    schemeBrief: '',
    designedPlantCapacity: '',
    operationalCapacity: '',
    waterSource: '',
    approvedExtractionQuantity: '',
    treatmentPlant: '',
    coverage: '',
    photos: [],
  });

  const [successMessage, setSuccessMessage] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const region = queryParams.get('region');
  const item = queryParams.get('item');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photos: [...e.target.files],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare form data for submission
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'photos') {
        formData.photos.forEach((file) => {
          data.append('photos[]', file);
        });
      } else {
        data.append(key, formData[key]);
      }
    });
    data.append('region', region);
    data.append('item', item);

    // Submit form data to the server
    try {
      const response = await axios.post('http://localhost:8000/api/plant-information-submit', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Form submitted successfully:', response.data);
      setSuccessMessage('Data successfully submitted to the database.');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSuccessMessage('Error submitting data.');
    }
  };

  return (
    <div className="max-w-8xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Submit Plant Information</h2>
      {successMessage && (
        <div className="mb-4 p-4 bg-green-500 text-white rounded">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Scheme Brief and History (Intake/TP)</label>
          <textarea
            name="schemeBrief"
            value={formData.schemeBrief}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            rows="4"
          />
        </div>
        <div>
          <label className="block mb-2">Photos</label>
          <input
            type="file"
            name="photos"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Designed Plant Capacity (cum/day)</label>
          <input
            type="text"
            name="designedPlantCapacity"
            value={formData.designedPlantCapacity}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Operational Capacity (cum/day)</label>
          <input
            type="text"
            name="operationalCapacity"
            value={formData.operationalCapacity}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Water Source/Ownership</label>
          <input
            type="text"
            name="waterSource"
            value={formData.waterSource}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Approved Extraction Quantity (cum/day)</label>
          <input
            type="text"
            name="approvedExtractionQuantity"
            value={formData.approvedExtractionQuantity}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Treatment Plant (Full/Partial/Cl only/other)</label>
          <input
            type="text"
            name="treatmentPlant"
            value={formData.treatmentPlant}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Coverage (DS/GN areas)</label>
          <input
            type="text"
            name="coverage"
            value={formData.coverage}
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

export default PtForm;