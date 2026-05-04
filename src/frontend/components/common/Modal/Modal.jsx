import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center",
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: "8px", padding: "2rem",
        width: "100%", maxWidth: "560px", maxHeight: "90vh",
        overflowY: "auto", position: "relative",
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ margin: 0, fontSize: "1.25rem" }}>{title}</h2>
          <button onClick={onClose} style={{
            background: "none", border: "none", fontSize: "1.5rem",
            cursor: "pointer", color: "#6b7280", lineHeight: 1,
          }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
