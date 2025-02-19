import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GaForm = () => {
  const [formData, setFormData] = useState({
    recentCommissionPipelines: { description: '', photos: [], certificates: [] },
    openings: { description: '', photos: [], certificates: [] },
    csrActivities: { description: '', photos: [], certificates: [] },
    certifications150: { description: '', photos: [], certificates: [] },
    certifications5s: { description: '', photos: [], certificates: [] },
    wwdAchievements: { description: '', photos: [], certificates: [] },
    staffAchievements: { description: '', photos: [], certificates: [] },
    other: { description: '', photos: [], certificates: [] },
  });

  const [selectedCategory, setSelectedCategory] = useState('recentCommissionPipelines');
  const [successMessage, setSuccessMessage] = useState('');
  const [previewUrls, setPreviewUrls] = useState({
    photos: {},
    certificates: {}
  });

  const handleChange = (e, category, field) => {
    setFormData({
      ...formData,
      [category]: {
        ...formData[category],
        [field]: e.target.value,
      },
    });
  };

  const handleFileChange = (e, category, field) => {
    const newFiles = Array.from(e.target.files);

    // Merge new files with existing ones
    const updatedFiles = [...(formData[category][field] || []), ...newFiles];

    // Create preview URLs for new files and merge with existing ones
    const newUrls = newFiles.map(file => URL.createObjectURL(file));
    const updatedUrls = {
      ...previewUrls,
      [field]: {
        ...previewUrls[field],
        [category]: [...(previewUrls[field]?.[category] || []), ...newUrls]
      }
    };

    setPreviewUrls(updatedUrls);
    setFormData({
      ...formData,
      [category]: {
        ...formData[category],
        [field]: updatedFiles,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    const categoryData = formData[selectedCategory];

    formDataToSend.append('category', selectedCategory);
    formDataToSend.append('description', categoryData.description);

    // Handle photos
    if (categoryData.photos && categoryData.photos.length > 0) {
      categoryData.photos.forEach(photo => {
        formDataToSend.append('photos[]', photo);
      });
    }

    // Handle certificates
    if (categoryData.certificates && categoryData.certificates.length > 0) {
      categoryData.certificates.forEach(certificate => {
        formDataToSend.append('certificates[]', certificate);
      });
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/ga-form-submit',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
          },
        }
      );

      console.log('Form submitted successfully:', response.data);
      setSuccessMessage('Data successfully submitted to the database.');

      // Clear form after successful submission
      setFormData({
        ...formData,
        [selectedCategory]: {
          description: '',
          photos: [],
          certificates: []
        }
      });
      setPreviewUrls({
        photos: {},
        certificates: {}
      });
    } catch (error) {
      console.error('Validation errors:', error.response?.data);
      const errorMessage = error.response?.data?.errors
        ? Object.values(error.response.data.errors).flat().join(', ')
        : 'Error submitting data.';
      setSuccessMessage(errorMessage);
    }
  };

  const categories = {
    recentCommissionPipelines: 'Recent Commission Pipelines',
    openings: 'Openings',
    csrActivities: 'CSR Activities',
    certifications150: '150 Certifications',
    certifications5s: '5S Certifications',
    wwdAchievements: 'WWD Achievements',
    staffAchievements: 'Any Achievement by Staff Member',
    other: 'Other',
  };

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      Object.values(previewUrls.photos || {}).forEach(urls => {
        urls.forEach(url => URL.revokeObjectURL(url));
      });
      Object.values(previewUrls.certificates || {}).forEach(urls => {
        urls.forEach(url => URL.revokeObjectURL(url));
      });
    };
  }, [previewUrls]);

  return (
    <div className="max-w-8xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Submit General Administration Information</h2>
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
            {Object.keys(categories).map((category) => (
              <option key={category} value={category}>
                {categories[category]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">{categories[selectedCategory]}</h3>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              name={`${selectedCategory}Description`}
              value={formData[selectedCategory].description}
              onChange={(e) => handleChange(e, selectedCategory, 'description')}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Photos</label>
            <div className="space-y-4">
              <input
                type="file"
                name={`${selectedCategory}Photos`}
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e, selectedCategory, 'photos')}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
              />

              {/* Photos Preview Section */}
              {previewUrls.photos?.[selectedCategory]?.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {previewUrls.photos[selectedCategory].map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newUrls = previewUrls.photos[selectedCategory].filter((_, i) => i !== index);
                          const newFiles = formData[selectedCategory].photos.filter((_, i) => i !== index);
                          setPreviewUrls(prev => ({
                            ...prev,
                            photos: {
                              ...prev.photos,
                              [selectedCategory]: newUrls
                            }
                          }));
                          setFormData({
                            ...formData,
                            [selectedCategory]: {
                              ...formData[selectedCategory],
                              photos: newFiles
                            }
                          });
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                      <p className="text-sm text-gray-400 mt-1 truncate">
                        {formData[selectedCategory].photos[index].name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Certificates</label>
            <div className="space-y-4">
              <input
                type="file"
                name={`${selectedCategory}Certificates`}
                accept="image/*,.pdf"
                multiple
                onChange={(e) => handleFileChange(e, selectedCategory, 'certificates')}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
              />

              {/* Certificates Preview Section */}
              {previewUrls.certificates?.[selectedCategory]?.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {previewUrls.certificates[selectedCategory].map((url, index) => (
                    <div key={index} className="relative group">
                      {formData[selectedCategory].certificates[index].type.includes('pdf') ? (
                        <div className="w-full h-32 bg-gray-700 rounded flex items-center justify-center">
                          <span className="text-4xl">📄</span>
                        </div>
                      ) : (
                        <img
                          src={url}
                          alt={`Certificate Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          const newUrls = previewUrls.certificates[selectedCategory].filter((_, i) => i !== index);
                          const newFiles = formData[selectedCategory].certificates.filter((_, i) => i !== index);
                          setPreviewUrls(prev => ({
                            ...prev,
                            certificates: {
                              ...prev.certificates,
                              [selectedCategory]: newUrls
                            }
                          }));
                          setFormData({
                            ...formData,
                            [selectedCategory]: {
                              ...formData[selectedCategory],
                              certificates: newFiles
                            }
                          });
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                      <p className="text-sm text-gray-400 mt-1 truncate">
                        {formData[selectedCategory].certificates[index].name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
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

export default GaForm;