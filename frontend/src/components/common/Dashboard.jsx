import React, { useEffect, useState } from "react";
import axios from "axios";
import { X, Users, Briefcase, Leaf, Droplet } from "lucide-react";
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import LineChart from '../charts/LineChart';
import PieChart from '../charts/PieChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TABS = [
  { key: "hrm", label: "HRM", icon: <Users className="w-5 h-5" /> },
  { key: "development", label: "Development", icon: <Briefcase className="w-5 h-5" /> },
  { key: "gallery", label: "Gallery", icon: <Briefcase className="w-5 h-5" /> },
  { key: "plantInfo", label: "Plant Info", icon: <Leaf className="w-5 h-5" /> },
  { key: "waterQuality", label: "Lab Quality", icon: <Droplet className="w-5 h-5" /> },
  { key: "SchemeData", label: "Scheme Data", icon: <X className="w-5 h-5" /> },
];

const plantAndLabItems = {
  centralEast: ['Kundasale WSS-Balagolla WTP', 'Kundasale WSS-Araththana WTP', 'Ampitiya', 'Medadumbara', 'Haragama /Thennekumbura', 'Marassana', 'Rikillagaskada', 'Ragala', 'Walapane'],
  centralNorth: ['Katugasthota WSS', 'Matale', 'Dambulla', 'Ukuwela/ Udathenna WSS', 'Naula WSS', 'Pussella WSS', 'Wilgamuwa WSS'],
  centralSouth: ['Meewatura', 'Nillambe', 'University', 'Doluwa', 'Datry', 'Nawalapitiya', 'Gampolawatta', 'Paradeka', 'Ulapane', 'Pussellawa', 'Elpitiya', 'Hantana', 'Hatton', 'Kotagala', 'Pundaluoya', 'Ginigathhena', 'Maskeliya', 'Thalawakele', 'Nallathanniya', 'Sri Pada'],
};

const schemeItems = {
  centralEast: ['Ampitiya', 'Medadumbara', 'Pallekele', 'Marassana', 'Haragama', 'Digana I', 'Digana II', 'Manikhinna', 'Buluwamuduna', 'Rikillagaskada', 'Ragala', 'Walapane'],
  centralNorth: ['Akurana', 'Ankumbura', 'Bokkawala', 'Galagedara', 'Harispattuwa', 'Galewela', 'Hedeniya', 'Pathadumbara'],
  centralSouth: ['Udaperadeniya', 'Kadugannawa', 'Hanthna', 'Gannoruwa', 'Eriyagama', 'Nillambe', 'Hanthana', 'Welamboda', 'CY-1 Gampola', 'CY-4 Pussellawa', 'Nawalapitiya', 'Hatton', 'Maskeliya', 'Nallathanniya', 'Sripada', 'PudaluOya', 'Thalawakale', 'Ginigathhena', 'Meepilimanna'],
  matale: ['Matale', 'Raththota', 'Pussella', 'Ukuwela', 'Dambulla', 'Wilgamuwa', 'Ambanganga', 'Naula', 'Galewela'],
};

const fetchData = async (setData) => {
  try {
    const responses = await Promise.all([
      axios.get("http://localhost:8000/api/hrm-data"),
      axios.get("http://localhost:8000/api/development-work-data"),
      axios.get("http://localhost:8000/api/ga-form-data"),
      axios.get("http://localhost:8000/api/plant-information-data"),
      axios.get("http://localhost:8000/api/water-quality-data"),
      axios.get("http://localhost:8000/api/form-data")
    ]);

    setData({
      hrmData: responses[0].data,
      developmentWorkData: responses[1].data,
      galleryData: responses[2].data.flatMap(item => ({
        id: item.id,
        title: item.data.category,
        description: item.data.description,
        imageUrl: Array.isArray(item.data.photos) ? item.data.photos.map(photo => `http://localhost:8000/storage/${photo.path}`) : [],
        created_at: item.created_at
      })),
      plantInformationData: responses[3].data.map(item => ({
        ...item,
        imageUrl: Array.isArray(item.photos) ? item.photos.map(photo => `http://localhost:8000/storage/${photo.path}`) : []
      })),
      waterQualityData: responses[4].data,
      SchemeData: responses[5].data
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const renderData = (data, fields, showCharts = false) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {data.map(item => (
      <div key={item.id} className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-md border border-gray-200">
        {fields.map(field => (
          <p key={field.label} className="text-gray-700">
            <strong>{field.label}:</strong> {field.format ? field.format(item[field.key]) : Array.isArray(item[field.key]) ? item[field.key].join(', ') : typeof item[field.key] === 'object' ? JSON.stringify(item[field.key]) : item[field.key]}
          </p>
        ))}
{showCharts && (
  <div className="mt-4">
    <Bar
      data={{
        labels: ['Progress'],
        datasets: [
          {
            label: 'Progress',
            data: [item.progress],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      }}
      options={{
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      }}
    />
  </div>
)}
        {item.imageUrl && item.imageUrl.length > 0 && (
          <div className="mt-4">
            {item.imageUrl.map((url, index) => (
              <img key={index} src={url} alt={`Gallery Image ${index + 1}`} className="w-full h-auto rounded-lg shadow-md mb-4" onError={(e) => console.error(`Error loading image: ${url}`, e)} />
              
            ))}
          </div>
          
        )}
      </div>
    ))}
  </div>
);

const filteredData = (data, region, item) => data.filter(d => (
  (region === "" || d.region === region) &&
  (item === "" || d.item === item)
));



const Dashboard = () => {
  const [data, setData] = useState({
    hrmData: [],
    developmentWorkData: [],
    galleryData: [],
    plantInformationData: [],
    waterQualityData: [],
    SchemeData: []
  });
  const [activeTab, setActiveTab] = useState("hrm");
  const [filters, setFilters] = useState({
    selectedRegion: "",
    selectedItem: "",
    selectedWaterQualityRegion: "",
    selectedWaterQualityItem: ""
  });

  useEffect(() => {
    fetchData(setData);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "hrm":
        return renderData(data.hrmData, [
          { label: "🏢 Cadre Approved", key: "cadreApproved" },
          { label: "👨‍💼 Permanent Staff", key: "permanentStaff" },
          { label: "📝 Contract Staff", key: "contractStaff" },
          { label: "🔧 Service Hiring Staff", key: "serviceHiringStaff" },
          { label: "📅 Created at", key: "created_at", format: date => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }
        ]);
      case "development":
        return renderData(data.developmentWorkData, [
          { label: "📌 Category", key: "category" },
          { label: "💰 Allocation", key: "allocation" },
          { label: "📈 Projects", key: "projects" },
          { label: "🚀 Progress", key: "progress" }
        ], true);
      case "gallery":
        return renderData(data.galleryData, [
          { label: "📸 Title", key: "title" },
          { label: "📝 Description", key: "description" },
          { label: "📅 Date", key: "created_at", format: date => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }
        ]);
      case "plantInfo":
        return (
          <>
            <FilterSelect
              label="Select Region"
              value={filters.selectedRegion}
              onChange={(value) => setFilters({ ...filters, selectedRegion: value })}
              options={Object.keys(plantAndLabItems)}
            />
            <FilterSelect
              label="Select Item"
              value={filters.selectedItem}
              onChange={(value) => setFilters({ ...filters, selectedItem: value })}
              options={filters.selectedRegion ? plantAndLabItems[filters.selectedRegion] : []}
            />
            {renderData(filteredData(data.plantInformationData, filters.selectedRegion, filters.selectedItem), [
              { label: "🌱 Scheme Brief", key: "schemeBrief" },
              { label: "🏭 Designed Plant Capacity", key: "designedPlantCapacity" },
              { label: "⚙️ Operational Capacity", key: "operationalCapacity" },
              { label: "💧 Water Source", key: "waterSource" },
              { label: "📊 Approved Extraction Quantity", key: "approvedExtractionQuantity" },
              { label: "🏗️ Treatment Plant", key: "treatmentPlant" },
              { label: "🌍 Coverage", key: "coverage" },
              { label: "📍 Region", key: "region" },
              { label: "📋 Item", key: "item" },
              { label: "📅 Created at", key: "created_at", format: date => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }
            ])}
          </>
        );
      case "waterQuality":
        return (
          <>
            <FilterSelect
              label="Select Region"
              value={filters.selectedWaterQualityRegion}
              onChange={(value) => setFilters({ ...filters, selectedWaterQualityRegion: value })}
              options={Object.keys(plantAndLabItems)}
            />
            <FilterSelect
              label="Select Item"
              value={filters.selectedWaterQualityItem}
              onChange={(value) => setFilters({ ...filters, selectedWaterQualityItem: value })}
              options={filters.selectedWaterQualityRegion ? plantAndLabItems[filters.selectedWaterQualityRegion] : []}
            />
            {renderData(filteredData(data.waterQualityData, filters.selectedWaterQualityRegion, filters.selectedWaterQualityItem), [
              { label: "💧 Raw Water", key: "rawWater" },
              { label: "🏭 Treated Water TP", key: "treatedWaterTP" },
              { label: "💧 Treated Water Distribution", key: "treatedWaterDistribution" },
              { label: "📋 WQ Issues", key: "wqIssues" },
              { label: "🌍 Region", key: "region" },
              { label: "📋 Item", key: "item" },
              { label: "📅 Created at", key: "created_at", format: date => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }
            ])}
          </>
        );
      case "SchemeData":
        const filteredSchemeData = filteredData(data.SchemeData, filters.selectedRegion, filters.selectedItem);
        const selectedItemData = filteredSchemeData.find(item => item.item === filters.selectedItem);
        const connectionGrowthData = selectedItemData ? selectedItemData.connectionGrowth : [];
        const connectionsData = selectedItemData ? selectedItemData.connections : [];
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        return (
          <>
            <FilterSelect
              label="Select Region"
              value={filters.selectedRegion}
              onChange={(value) => setFilters({ ...filters, selectedRegion: value })}
              options={Object.keys(schemeItems)}
            />
            <FilterSelect
              label="Select Item"
              value={filters.selectedItem}
              onChange={(value) => setFilters({ ...filters, selectedItem: value })}
              options={filters.selectedRegion ? schemeItems[filters.selectedRegion] : []}
            />
<div className="mb-4">
  {/* Display these fields as cards */}
  <div className="bg-blue-100 p-4 rounded-lg shadow-md mb-4">
    <div><strong className="text-xl text-gray-800">Region:</strong> <span className="text-gray-600">{filteredSchemeData[0]?.region}</span></div>
    <div><strong className="text-xl text-gray-800">Item:</strong> <span className="text-gray-600">{filteredSchemeData[0]?.item}</span></div>
    
    {/* Connection Growth in individual boxes */}
    <div><strong className="text-xl text-gray-800">Connection Growth:</strong> 
      <div className="flex space-x-2 mt-2">
        {['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'].map((year, index) => (
          <div key={index} className="bg-gray-200 p-2 rounded-md w-20 text-center">
            <strong>{year}:</strong> <span>{filteredSchemeData[0]?.connectionGrowth[index] || '-'}</span>
          </div>
        ))}
      </div>
    </div>
    
    <div><strong className="text-xl text-gray-800">Expenditure Categorization:</strong> 
      <span className="text-gray-600">{filteredSchemeData[0]?.expenditureCategorization?.map(v => `${v.item}: ${v.value}`).join(', ')}</span>
    </div>
    <div><strong className="text-xl text-gray-800">WSP Status:</strong> 
      <span className="text-gray-600">{filteredSchemeData[0]?.wspStatus}</span>
    </div>
    <div><strong className="text-xl text-gray-800">Connections:</strong> 
      <span className="text-gray-600">{filteredSchemeData[0]?.connections?.map(v => `${v.category}: ${v.value}`).join(', ')}</span>
    </div>
    <div><strong className="text-xl text-gray-800">Created at:</strong> 
      <span className="text-gray-600">{new Date(filteredSchemeData[0]?.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
    </div>
    
    {/* Per Cum Cost in individual boxes */}
    <div><strong className="text-xl text-gray-800">Per Cum Cost:</strong> 
      <div className="flex space-x-2 mt-2">
        {['First Quarter', 'Second Quarter', 'Third Quarter', 'Fourth Quarter'].map((quarter, index) => (
          <div key={index} className="bg-gray-200 p-2 rounded-md w-32 text-center">
            <strong>{quarter}:</strong> <span>{filteredSchemeData[0]?.perCumCost[index] || '-'}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

{/* Now display the table with monthly data */}
<table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
  <thead className="bg-blue-200">
    <tr>
      <th className="py-2 px-4 border-b text-left text-sm font-semibold">Month</th>
      <th className="py-2 px-4 border-b text-left text-sm font-semibold">Connection Target</th>
      <th className="py-2 px-4 border-b text-left text-sm font-semibold">Collection Target Achieved</th>
      <th className="py-2 px-4 border-b text-left text-sm font-semibold">Billing Target</th>
      <th className="py-2 px-4 border-b text-left text-sm font-semibold">Billing Target Achieved</th>
      <th className="py-2 px-4 border-b text-left text-sm font-semibold">Income</th>
      <th className="py-2 px-4 border-b text-left text-sm font-semibold">Expenditure</th>
      <th className="py-2 px-4 border-b text-left text-sm font-semibold">Current Debtage</th>
      <th className="py-2 px-4 border-b text-left text-sm font-semibold">Operational Ratio</th>
      <th className="py-2 px-4 border-b text-left text-sm font-semibold">Staff Per 1000 Connection</th>
      <th className="py-2 px-4 border-b text-left text-sm font-semibold">NRW</th>
      <th className="py-2 px-4 border-b text-left text-sm font-semibold">Per Connection Income</th>
      <th className="py-2 px-4 border-b text-left text-sm font-semibold">Specific Energy</th>
    </tr>
  </thead>
  <tbody>
    {/* Add a row for each month */}
    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, monthIndex) => (
      <tr key={monthIndex} className="hover:bg-gray-100">
        {/* Display the month in the first column */}
        <td className="border px-4 py-2">{month}</td>
        {/* Display the data for each field */}
        {['connectionTarget', 'collectionTargetAchieved', 'billingTarget', 'billingTargetAchieved', 'income', 'expenditure', 'currentDebtage', 'operationalRatio', 'staffPer1000Connection', 'nrw', 'perConnectionIncome', 'specificEnergy'].map((field, fieldIndex) => (
          <td key={fieldIndex} className="border px-4 py-2 text-center">
            {filteredSchemeData[0]?.[field] && filteredSchemeData[0]?.[field][monthIndex] ? filteredSchemeData[0]?.[field][monthIndex] : '-'}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>




{connectionGrowthData.length > 0 && (
  <div className="mt-">
    <h2 className="text-xl font-bold text-gray-800 mb-2">Connection Growth Over the Years</h2>
    <div className="w-full md:w-3/4 lg:w-2/3 mx-auto" style={{ height: '500px' }}>
      <Bar
        data={{
          labels: connectionGrowthData.map((_, index) => `${2015 + index}`),
          datasets: [
            {
              label: 'Connection Growth',
              data: connectionGrowthData,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Connection Growth Over the Years',
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.dataset.label}: ${context.raw}`;
                },
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        }}
        
      />
    </div>
  </div>
)}

{connectionsData.length > 0 && (
  <div className="mt-4">
    <h2 className="text-xl font-bold text-gray-800 mb-2">Connections Distribution</h2>
    <div className="w-full md:w-3/4 lg:w-2/3 mx-auto" style={{ height: '500px' }}>
      <Pie
        data={{
          labels: connectionsData.map(conn => conn.category),
          datasets: [
            {
              label: 'Connections',
              data: connectionsData.map(conn => conn.value),
              backgroundColor: connectionsData.map((_, index) => `rgba(${index * 30}, ${index * 60}, ${index * 90}, 0.6)`),
              borderColor: connectionsData.map((_, index) => `rgba(${index * 30}, ${index * 60}, ${index * 90}, 1)`),
              borderWidth: 1,
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Connections Distribution',
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.label}: ${context.raw}`;
                },
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  </div>
)}

{selectedItemData && selectedItemData.connectionTarget && selectedItemData.collectionTargetAchieved && (
  <div className="mt-4">
    <h2 className="text-xl font-bold text-gray-800 mb-2">Connection Target vs Achieved</h2>
    <div className="w-full md:w-3/4 lg:w-2/3 mx-auto" style={{ height: '500px' }}>
      <Bar
        data={{
          labels: selectedItemData.income.map((_, index) => monthNames[index % 12]),
          datasets: [
            {
              label: 'Connection Target',
              data: selectedItemData.connectionTarget,
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
            {
              label: 'Collection Target Achieved',
              data: selectedItemData.collectionTargetAchieved,
              backgroundColor: 'rgba(255, 159, 64, 0.6)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1,
            },
          ],
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Connection Target vs Achieved',
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.dataset.label}: ${context.raw}`;
                },
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  </div>
)}

{selectedItemData && selectedItemData.billingTarget && selectedItemData.billingTargetAchieved && (
  <div className="mt-4">
    <h2 className="text-xl font-bold text-gray-800 mb-2">Billing Target vs Achieved</h2>
    <div className="w-full md:w-3/4 lg:w-2/3 mx-auto" style={{ height: '500px' }}>
      <Bar
        data={{
          labels: selectedItemData.income.map((_, index) => monthNames[index % 12]),
          datasets: [
            {
              label: 'Billing Target',
              data: selectedItemData.billingTarget,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
            {
              label: 'Billing Target Achieved',
              data: selectedItemData.billingTargetAchieved,
              backgroundColor: 'rgba(255, 206, 86, 0.6)',
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 1,
            },
          ],
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Billing Target vs Achieved',
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.dataset.label}: ${context.raw}`;
                },
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  </div>
)}

{selectedItemData && selectedItemData.income && selectedItemData.expenditure && (
  <div className="mt-4">
    <h2 className="text-xl font-bold text-gray-800 mb-2">Income vs Expenditure</h2>
    <div className="w-full md:w-3/4 lg:w-2/3 mx-auto" style={{ height: '500px' }}>
      <Bar
        data={{
          labels: selectedItemData.income.map((_, index) => monthNames[index % 12]),
          datasets: [
            {
              label: 'Income',
              data: selectedItemData.income,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Expenditure',
              data: selectedItemData.expenditure,
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Income vs Expenditure',
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.dataset.label}: ${context.raw}`;
                },
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  </div>
)}

{selectedItemData && selectedItemData.expenditureCategorization && selectedItemData.expenditureCategorization.length > 0 && (
  <div className="mt-4">
    <h2 className="text-xl font-bold text-gray-800 mb-2">Expenditure Categorization</h2>
    <div className="w-full md:w-3/4 lg:w-2/3 mx-auto" style={{ height: '500px' }}>
      <Pie
        data={{
          labels: selectedItemData.expenditureCategorization.map(item => item.item),
          datasets: [
            {
              label: 'Expenditure Categorization',
              data: selectedItemData.expenditureCategorization.map(item => item.value),
              backgroundColor: selectedItemData.expenditureCategorization.map((_, index) => `rgba(${index * 30}, ${index * 60}, ${index * 90}, 0.6)`),
              borderColor: selectedItemData.expenditureCategorization.map((_, index) => `rgba(${index * 30}, ${index * 60}, ${index * 90}, 1)`),
              borderWidth: 1,
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Expenditure Categorization',
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.label}: ${context.raw}`;
                },
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  </div>
)}




          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-white text-center mb-6 p-4 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 tracking-wide">
        📊 Dashboard
      </h1>
      <div className="flex justify-center space-x-4 mb-6">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`flex items-center gap-2 px-6 py-2 text-lg font-semibold rounded-lg shadow-md transition-all ${activeTab === tab.key ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700 hover:bg-gray-400"}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

const FilterSelect = ({ label, value, onChange, options }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={label}>{label}:</label>
    <select
      id={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
      <option value="">All</option>
      {options && options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default Dashboard;