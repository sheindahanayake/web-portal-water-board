import React from 'react';
import Header from './Header'; // Ensure the correct import path
import Footer from './Footer'; // Ensure the correct import path

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      {/* Main content */}
      <main>{children}</main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;