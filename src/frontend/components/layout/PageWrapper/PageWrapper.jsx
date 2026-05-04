import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const PageWrapper = ({ title, children }) => {
  const mainStyle = {
    marginLeft: "220px",
    paddingTop: "60px",
    padding: "24px",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
  };

  const titleStyle = {
    marginBottom: "1.5rem",
  };

  return (
    <>
      <Header />
      <Sidebar />
      <main style={mainStyle}>
        <h1 style={titleStyle}>{title}</h1>
        {children}
      </main>
    </>
  );
};

export default PageWrapper;
