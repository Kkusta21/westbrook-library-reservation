import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const PageWrapper = ({ title, children }) => {
  return (
    <>
      <Header />
      <Sidebar />
      <main style={{
        marginLeft: "220px",
        paddingTop: "84px",
        padding: "84px 24px 24px 24px",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
      }}>
        <h1 style={{ marginBottom: "1.5rem", fontSize: "1.75rem", fontWeight: 700 }}>{title}</h1>
        {children}
      </main>
    </>
  );
};

export default PageWrapper;
