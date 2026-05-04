import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "var(--bg)",
      }}
    >
      <h1 style={{ fontSize: "6rem", margin: 0 }}>404</h1>
      <p style={{ fontSize: "1.5rem", margin: "1rem 0" }}>
        Page not found
      </p>
      <Button
        label="Go to Dashboard"
        variant="primary"
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default NotFoundPage;
