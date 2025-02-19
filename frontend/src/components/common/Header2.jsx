import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Login from './Login';
import Register from './Register'; // Import Register component

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(false); // State for registration form visibility
  const [isSchemeDropdownOpen, setIsSchemeDropdownOpen] = useState(false);
  const [isPlantDropdownOpen, setIsPlantDropdownOpen] = useState(false);
  const [isLabDropdownOpen, setIsLabDropdownOpen] = useState(false);
  
  const [isSubmenuOpen, setIsSubmenuOpen] = useState({
    centralEast: false,
    centralSouth: false,
    centralNorth: false,
    matale: false,
  });
  
  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsLoginFormVisible(false);
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
    setIsRegisterFormVisible(false);
  };

  const togglePlantDropdown = () => {
    setIsPlantDropdownOpen(!isPlantDropdownOpen);
  };
  const toggleLabDropdown = () => {
    setIsLabDropdownOpen(!isLabDropdownOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const toggleSchemeDropdown = () => {
    setIsSchemeDropdownOpen(!isSchemeDropdownOpen);
  };

  const toggleSubmenu = (region) => {
    setIsSubmenuOpen((prevState) => {
      const newState = {
        centralEast: false,
        centralSouth: false,
        centralNorth: false,
        matale: false,
      };
      newState[region] = !prevState[region];
      return newState;
    });
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
              <a href="/" className="text-gray-300 hover:text-green-400">
                Home
              </a>
              <a href="/about2" className="text-gray-300 hover:text-green-400">
                About Us
              </a>
              <a href="/contact2" className="text-gray-300 hover:text-green-400">
                Contact Us
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <span className="text-white">Welcome!</span>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-400"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsLoginFormVisible(!isLoginFormVisible);
                      setIsRegisterFormVisible(false);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setIsRegisterFormVisible(!isRegisterFormVisible);
                      setIsLoginFormVisible(false);
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      {isLoginFormVisible && !isLoggedIn && <Login onLogin={handleLogin} />}
      {isRegisterFormVisible && !isLoggedIn && <Register onRegister={handleRegister} />}
    </>
  );
};

export default Header;