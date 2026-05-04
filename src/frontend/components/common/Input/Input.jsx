import React from "react";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  error,
  options = [],
  placeholder = "",
  required = false,
}) => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1rem",
  };

  const labelStyle = {
    marginBottom: "0.5rem",
    fontWeight: 500,
    fontSize: "0.9rem",
  };

  const inputStyle = {
    padding: "0.5rem 0.75rem",
    borderRadius: "4px",
    border: error ? "1px solid #dc2626" : "1px solid #d1d5db",
    fontSize: "0.95rem",
    outline: "none",
  };

  const errorStyle = {
    marginTop: "0.25rem",
    fontSize: "0.8rem",
    color: "#dc2626",
  };

  const commonProps = {
    value,
    onChange,
    required,
    placeholder,
    style: inputStyle,
  };

  return (
    <div style={containerStyle}>
      {label && (
        <label style={labelStyle}>
          {label} {required && <span style={{ color: "#dc2626" }}>*</span>}
        </label>
      )}

      {type === "select" ? (
        <select {...commonProps}>
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} {...commonProps} />
      )}

      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
};

export default Input;
