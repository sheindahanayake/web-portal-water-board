import React from "react";
import Hero from "./common/Hero";
import Layout from "./common/Layout2";
import AboutUs from "./common/AboutUs";
import Dashboard from "./common/Dashboard";

const HomePage2 = () => {
  return (
    <div className="bg-gray-900">
      <Layout>
        <div className="p-0 m-0">
          <Hero />
        </div>
        <div className="p-0 m-0">
          <Dashboard />
       </div>
        
      </Layout>
    </div>
  );
};

export default HomePage2;