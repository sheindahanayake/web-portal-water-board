import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext'; // Correct import path

const Submenu = ({ title, items, isOpen, toggleSubmenu, formType }) => (
  <>
    <a
      href="#"
      className="block px-4 py-2 text-gray-300 hover:bg-gray-700 flex items-center justify-between"
      onClick={(e) => {
        e.preventDefault();
        toggleSubmenu(title);
      }}
    >
      {title.toUpperCase()}
      <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
    </a>
    {isOpen && (
      <div className="pl-4">
        {items.map((item) => (
          <a key={item} href={`/${formType}?region=${title}&item=${item}`} className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
            {item}
          </a>
        ))}
      </div>
    )}
  </>
);

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    scheme: false,
    plant: false,
    lab: false,
  });
  const [isSubmenuOpen, setIsSubmenuOpen] = useState({
    centralEast: false,
    centralSouth: false,
    centralNorth: false,
    matale: false,
  });

  const toggleDropdown = (dropdown) => {
    setIsDropdownOpen((prevState) => ({
      scheme: false,
      plant: false,
      lab: false,
      [dropdown]: !prevState[dropdown],
    }));
  };

  const toggleSubmenu = (region) => {
    setIsSubmenuOpen((prevState) => ({
      ...prevState,
      [region]: !prevState[region],
    }));
  };

  const schemeItems = {
    centralEast: ['Ampitiya', 'Medadumbara', 'Pallekele', 'Marassana', 'Haragama', 'Digana I', 'Digana II', 'Manikhinna', 'Buluwamuduna', 'Rikillagaskada', 'Ragala', 'Walapane'],
    centralNorth: ['Akurana', 'Ankumbura', 'Bokkawala', 'Galagedara', 'Harispattuwa', 'Galewela', 'Hedeniya', 'Pathadumbara'],
    centralSouth: ['Udaperadeniya', 'Kadugannawa', 'Hanthna', 'Gannoruwa', 'Eriyagama', 'Nillambe', 'Hanthana', 'Welamboda', 'CY-1 Gampola', 'CY-4 Pussellawa', 'Nawalapitiya', 'Hatton', 'Maskeliya', 'Nallathanniya', 'Sripada', 'PudaluOya', 'Thalawakale', 'Ginigathhena', 'Meepilimanna'],
    matale: ['Matale', 'Raththota', 'Pussella', 'Ukuwela', 'Dambulla', 'Wilgamuwa', 'Ambanganga', 'Naula', 'Galewela'],
  };

  const plantAndLabItems = {
    centralEast: ['Kundasale WSS-Balagolla WTP', 'Kundasale WSS-Araththana WTP', 'Ampitiya', 'Medadumbara', 'Haragama /Thennekumbura', 'Marassana', 'Rikillagaskada', 'Ragala', 'Walapane'],
    centralNorth: ['Katugasthota WSS', 'Matale', 'Dambulla', 'Ukuwela/ Udathenna WSS', 'Naula WSS', 'Pussella WSS', 'Wilgamuwa WSS'],
    centralSouth: ['Meewatura', 'Nillambe', 'University', 'Doluwa', 'Datry', 'Nawalapitiya', 'Gampolawatta', 'Paradeka', 'Ulapane', 'Pussellawa', 'Elpitiya', 'Hantana', 'Hatton', 'Kotagala', 'Pundaluoya', 'Ginigathhena', 'Maskeliya', 'Thalawakele', 'Nallathanniya', 'Sri Pada'],
  };

  return (
    <>
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="/src/assets/images/NWSDB_logo.png"
                alt="Company Logo"
                className="h-8 w-8"
              />
              <span className="ml-2 text-xl font-bold text-white">
                Web Portal NWSDB
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/2" className="text-gray-300 hover:text-green-400">
                Home
              </a>
              <a href="/about" className="text-gray-300 hover:text-green-400">
                About Us
              </a>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('scheme')}
                  className="text-gray-300 hover:text-green-400 flex items-center"
                >
                  Scheme
                  <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
                </button>
                {isDropdownOpen.scheme && (
                  <div className="absolute left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                    {Object.keys(schemeItems).map((region) => (
                      <Submenu
                        key={region}
                        title={region}
                        items={schemeItems[region]}
                        isOpen={isSubmenuOpen[region]}
                        toggleSubmenu={toggleSubmenu}
                        formType="Form"
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('plant')}
                  className="text-gray-300 hover:text-green-400 flex items-center"
                >
                  Plant
                  <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
                </button>
                {isDropdownOpen.plant && (
                  <div className="absolute left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                    {Object.keys(plantAndLabItems).map((region) => (
                      <Submenu
                        key={region}
                        title={region}
                        items={plantAndLabItems[region]}
                        isOpen={isSubmenuOpen[region]}
                        toggleSubmenu={toggleSubmenu}
                        formType="PtForm"
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('lab')}
                  className="text-gray-300 hover:text-green-400 flex items-center"
                >
                  Labs
                  <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
                </button>
                {isDropdownOpen.lab && (
                  <div className="absolute left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                    {Object.keys(plantAndLabItems).map((region) => (
                      <Submenu
                        key={region}
                        title={region}
                        items={plantAndLabItems[region]}
                        isOpen={isSubmenuOpen[region]}
                        toggleSubmenu={toggleSubmenu}
                        formType="LbForm"
                      />
                    ))}
                  </div>
                )}
              </div>
              <a href="/DwForm" className="text-gray-300 hover:text-green-400">
                Development Works
              </a>
              <a href="/HrmForm" className="text-gray-300 hover:text-green-400">
                HRM
              </a>
              <a href="/GaForm" className="text-gray-300 hover:text-green-400">
                Gallery
              </a>
              <a href="/contact" className="text-gray-300 hover:text-green-400">
                Contact Us
              </a>
              <button
                onClick={logout}
                className="text-red-500 hover:text-red-400"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;