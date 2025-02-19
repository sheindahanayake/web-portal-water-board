import React from "react";
import Layout from "./common/Layout";
import Hero from "./common/Hero";
import AboutUs from "./common/AboutUs";
import Contact from "./common/Contact";
import Dashboard from "./common/Dashboard";
import { useAuth } from "./context/AuthContext"; // Correct import path

const DashboardPage = () => {
  const { isAuthenticated, logout } = useAuth();

  console.log("DashboardPage rendered, isAuthenticated:", isAuthenticated); // Debugging line

  return (
    <div className="bg-gray-900">
      <Layout>
        <div className="p-0 m-0">
          <Hero />
        </div>
        
        <div className="p-0 m-0">
          <AboutUs />
        </div>
        <div className="p-0 m-0">
          <Contact />
        </div>
      </Layout>
    </div>
  );
};

export default DashboardPage;