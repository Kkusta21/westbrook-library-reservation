import React, { useEffect } from "react";

const Notification = ({ message, type = "info", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose && onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const typeColors = {
    success: "#16a34a",
    error: "#dc2626",
    warning: "#eab308",
    info: "#2563eb",
  };

  const backgroundColor = typeColors[type] || typeColors.info;

  const containerStyle = {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor,
    color: "#ffffff",
    padding: "0.75rem 1rem",
    borderRadius: "6px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    minWidth: "250px",
    zIndex: 2000,
  };

  const messageStyle = {
    fontSize: "0.9rem",
    fontWeight: 500,
  };

  const closeButtonStyle = {
    background: "transparent",
    border: "none",
    color: "#ffffff",
    fontSize: "1rem",
    cursor: "pointer",
    lineHeight: 1,
  };

  return (
    <div style={containerStyle}>
      <span style={messageStyle}>{message}</span>
      <button style={closeButtonStyle} onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default Notification;
