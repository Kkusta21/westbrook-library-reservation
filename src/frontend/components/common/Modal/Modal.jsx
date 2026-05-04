import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const dialogStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "500px",
    padding: "1.5rem",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    position: "relative",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  };

  const titleStyle = {
    fontSize: "1.25rem",
    fontWeight: 600,
  };

  const closeButtonStyle = {
    background: "transparent",
    border: "none",
    fontSize: "1.25rem",
    cursor: "pointer",
    lineHeight: 1,
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={overlayStyle} onClick={handleOverlayClick}>
      <div style={dialogStyle}>
        <div style={headerStyle}>
          <div style={titleStyle}>{title}</div>
          <button style={closeButtonStyle} onClick={onClose}>
            ×
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
