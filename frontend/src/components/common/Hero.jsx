import React, { useState } from 'react';
import { Search } from 'lucide-react';

function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative bg-gradient-to-r from-purple-900 to-blue-900 h-96"
        style={{
          backgroundImage: "url('/src/assets/images/WT1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-10xl mx-auto px-10 py-24 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <div className="text-center">
            <h1
              className="text-4xl font-bold text-white sm:text-7xl md:text-6xl"
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6), -2px -2px 4px rgba(0, 0, 0, 0.6)",
              }}
            >
              National Water Supply and Drainage Board
             
            </h1>
            <h1
              className="text-4xl font-bold text-white sm:text-7xl md:text-6xl"
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6), -2px -2px 4px rgba(0, 0, 0, 0.6)",
              }}
            >
              
              ජාතික ජල සම්පාදන හා ජලාපවහන මණ්ඩලය
            </h1>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;



