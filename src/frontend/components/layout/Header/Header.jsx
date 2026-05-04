import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const headerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "60px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    zIndex: 100,
  };

  const titleStyle = {
    fontWeight: 700,
    fontSize: "1.1rem",
  };

  const rightSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    fontSize: "0.9rem",
  };

  const logoutButtonStyle = {
    background: "#dc2626",
    color: "#ffffff",
    border: "none",
    padding: "0.4rem 0.75rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.85rem",
  };

  return (
    <header style={headerStyle}>
      <div style={titleStyle}>Westbrook Library</div>

      <div style={rightSectionStyle}>
        {user && (
          <span>
            {user.name} [{user.role}]
          </span>
        )}
        <button style={logoutButtonStyle} onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
