import React from 'react';

function Footer() {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-8 md:mb-0 flex items-center">
              <img src="/src/assets/images/NWSDB_logo.png" alt="Company Logo" className="mb-4 w-32 mx-auto md:mx-0" /> 
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-4 text-white">Contact Details</h3>
                <ul className="space-y-2">
                  <li className="mb-2 text-white">Location:  7JC3+2WW, Dangolla Rd, Peradeniya</li>
                  
                  <li className="mb-2 text-white">Phone: 0812 388 086</li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-1/4 mb-8 md:mb-0 md:ml-auto">
              <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2">
                <li><a href="about2" className="text-gray-400 hover:text-green-400">About Us</a></li>

                <li><a href="contact2" className="text-gray-400 hover:text-green-400">Contact</a></li>
                
              </ul>
            </div>
           
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 Web portal NWSDB. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;