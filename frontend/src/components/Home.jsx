import React from "react";
import Hero from "./common/Hero";
import Layout from "./common/Layout";
import AboutUs from "./common/AboutUs";
import Contact from "./common/Contact";

const HomePage = () => {
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

export default HomePage;