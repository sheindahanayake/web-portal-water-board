import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const categories = [
  { value: '10', label: 'Domestic' },
  { value: '11', label: 'Board Quarters' },
  { value: '12', label: 'Schools' },
  { value: '13', label: 'Govt Quarters' },
  { value: '14', label: 'Tenaman Garden' },
  { value: '15', label: 'Assisted Schools' },
  { value: '18', label: 'Condominium $4' },
  { value: '19', label: 'Domestic NonVAT' },
  { value: '20', label: 'Domestic Samurdhi' },
  { value: '24', label: 'Tenaman Samurdhi' },
  { value: '51', label: 'Stand Posts' },
  { value: '52', label: 'Garden Taps' },
  { value: '53', label: 'Stand Post (C.S.)' },
  { value: '54', label: 'Stand Post Tenemani' },
  { value: '60', label: 'Govt Institution' },
  { value: '61', label: 'Army' },
  { value: '62', label: 'Police' },
  { value: '63', label: 'Hospitals' },
  { value: '64', label: 'CMC Premises' },
  { value: '65', label: 'SOBE' },
  { value: '70', label: 'Commercial Institutes' },
  { value: '71', label: 'Tourist/Guest' },
  { value: '72', label: 'Shipping' },
  { value: '73', label: 'Indust/Construt' },
  { value: '74', label: 'BOI Approved Industries' },
  { value: '75', label: 'Small & Medium Industries' },
  { value: '79', label: 'Commercial_NonVAT' },
  { value: '80', label: 'Other Comm and Priv.' },
  { value: '81', label: 'Religious' },
  { value: '82', label: 'NWSDB premises' },
  { value: '83', label: 'Religious 2' },
  { value: '84', label: 'Housing Authority' },
  { value: '85', label: 'Other nonProfit Organizations' },
  { value: '90', label: 'Bulk (L.A.)' },
  { value: '91', label: 'Bulk (C.B.O.)' },
  { value: '92', label: 'Bulk (Halgahakubura)' },
  { value: '95', label: 'Bulk Supply (Sp. Inst)' },
  { value: '96', label: 'Bulk Spl (Sp Inst)' },
  { value: '97', label: 'Bulk Spl (Sp Inst)' },
  { value: '93', label: 'Bulk Supply (Sp. Inst)' },
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Form = () => {
  const [formData, setFormData] = useState({
    connectionGrowth: Array(11).fill(''),
    connectionTarget: Array(12).fill(''),
    collectionTargetAchieved: Array(12).fill(''),
    billingTarget: Array(12).fill(''),
    billingTargetAchieved: Array(12).fill(''),
    income: Array(12).fill(''),
    expenditure: Array(12).fill(''),
    expenditureCategorization: [{ item: '', value: '' }],
    currentDebtage: Array(12).fill(''),
    operationalRatio: Array(12).fill(''),
    staffPer1000Connection: Array(12).fill(''),
    nrw: Array(12).fill(''),
    perConnectionIncome: Array(12).fill(''),
    perCumCost: Array(4).fill(''),
    specificEnergy: Array(12).fill(''),
    wspStatus: '',
  });

  const [connections, setConnections] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [connectionValue, setConnectionValue] = useState('');
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

  const handleArrayChange = (e, index, field) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  const handleExpenditureChange = (index, field, value) => {
    const newExpenditure = [...formData.expenditureCategorization];
    newExpenditure[index][field] = value;
    setFormData({
      ...formData,
      expenditureCategorization: newExpenditure,
    });
  };

  const addExpenditureItem = () => {
    setFormData({
      ...formData,
      expenditureCategorization: [...formData.expenditureCategorization, { item: '', value: '' }],
    });
  };

  const removeExpenditureItem = (index) => {
    const newExpenditure = formData.expenditureCategorization.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      expenditureCategorization: newExpenditure,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/form-data', { ...formData, connections, region, item });
      console.log(response.data);
      setSuccessMessage('Data successfully submitted to the database.');
    } catch (error) {
      console.error(error);
      setSuccessMessage('Error submitting data.');
    }
  };

  const addConnection = () => {
    if (selectedCategory && connectionValue) {
      setConnections([...connections, { category: selectedCategory, value: connectionValue }]);
      setSelectedCategory('');
      setConnectionValue('');
    }
  };

  const removeConnection = (index) => {
    const newConnections = connections.filter((_, i) => i !== index);
    setConnections(newConnections);
  };

  const renderInputArray = (label, field, placeholderPrefix) => (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      {formData[field].map((value, index) => (
        <input
          key={index}
          type="number"
          name={`${field}${index}`}
          value={value}
          onChange={(e) => handleArrayChange(e, index, field)}
          placeholder={`${placeholderPrefix} ${index + 1}`}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 mb-2"
        />
      ))}
    </div>
  );

  return (
    <div className="bg-gray-800 border-b border-gray-700 py-8">
      <form className="max-w-8xl mx-auto p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Data Entry Form</h2>
        {successMessage && (
          <div className="mb-4 p-4 bg-green-500 text-white rounded">
            {successMessage}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">Connection Categories:</label>
          <select
            name="connectionCategory"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Existing Number of Connections:</label>
          <input
            type="number"
            name="existingConnections"
            value={connectionValue}
            onChange={(e) => setConnectionValue(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <button
          type="button"
          onClick={addConnection}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-4"
        >
          Add Category
        </button>

        <div className="mb-4">
          <label className="block text-gray-700">Connections:</label>
          <ul className="list-disc pl-5">
            {connections.map((connection, index) => (
              <li key={index} className="mb-2 flex justify-between items-center">
                <span>
                  {categories.find((cat) => cat.value === connection.category)?.label}: {connection.value}
                </span>
                <button
                  type="button"
                  onClick={() => removeConnection(index)}
                  className="ml-4 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {renderInputArray('Connection Growth During Last 10 Years (2015-2025):', 'connectionGrowth', 'Year')}
        
        <div className="mb-4">
          <label className="block text-gray-700">Monthly Data:</label>
          <table className="min-w-full bg-white border border-gray-300 rounded-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Month</th>
                <th className="py-2 px-4 border-b">Connection Target (2025)</th>
                <th className="py-2 px-4 border-b">Collection Achieved</th>
                <th className="py-2 px-4 border-b">Billing Target</th>
                <th className="py-2 px-4 border-b">Billing Achieved</th>
                <th className="py-2 px-4 border-b">Income</th>
                <th className="py-2 px-4 border-b">Expenditure</th>
                <th className="py-2 px-4 border-b">Current Debtage</th>
                <th className="py-2 px-4 border-b">Operational Ratio</th>
                <th className="py-2 px-4 border-b">Staff/1000 Connection</th>
                <th className="py-2 px-4 border-b">NRW</th>
                <th className="py-2 px-4 border-b">Per Connection Income</th>
                <th className="py-2 px-4 border-b">Specific Energy</th>
              </tr>
            </thead>
            <tbody>
              {months.map((month, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{month}</td>
                  {['connectionTarget', 'collectionTargetAchieved', 'billingTarget', 'billingTargetAchieved', 'income', 'expenditure', 'currentDebtage', 'operationalRatio', 'staffPer1000Connection', 'nrw', 'perConnectionIncome', 'specificEnergy'].map((field) => (
                    <td key={field} className="border px-4 py-2">
                      <input
                        type="number"
                        name={`${field}${index}`}
                        value={formData[field][index]}
                        onChange={(e) => handleArrayChange(e, index, field)}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Expenditure Categorization:</label>
          {formData.expenditureCategorization.map((item, index) => (
            <div key={index} className="flex mb-2 items-center">
              <input
                type="text"
                name={`expenditureItem${index}`}
                value={item.item}
                onChange={(e) => handleExpenditureChange(index, 'item', e.target.value)}
                placeholder="Item"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 mr-2"
              />
              <input
                type="number"
                name={`expenditureValue${index}`}
                value={item.value}
                onChange={(e) => handleExpenditureChange(index, 'value', e.target.value)}
                placeholder="Value"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 mr-2"
              />
              <button
                type="button"
                onClick={() => removeExpenditureItem(index)}
                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addExpenditureItem} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            + Add Item
          </button>
        </div>

        {renderInputArray('Per Cum/Cost:', 'perCumCost', 'Quarter')}

        <div className="mb-4">
          <label className="block text-gray-700">WSP Status:</label>
          <textarea
            name="wspStatus"
            value={formData.wspStatus}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="text-center">
          <button type="submit" className="px-10 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;