import React from "react";
import Header2 from "./Header2";
import Footer2 from "./Footer2";

function Layout2({ children }) {
  return (
    <>
      <Header2 />
      {children}
      <Footer2 />
    </>
  );
}

export default Layout2;
