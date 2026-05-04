import React from "react";

const Button = ({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  isLoading = false,
  type = "button",
}) => {
  const isDisabled = disabled || isLoading;

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    fontWeight: 500,
    fontSize: "0.95rem",
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDisabled ? 0.7 : 1,
    transition: "all 0.2s ease-in-out",
  };

  const variants = {
    primary: {
      backgroundColor: "#2563eb",
      color: "#ffffff",
      border: "1px solid #2563eb",
    },
    danger: {
      backgroundColor: "#dc2626",
      color: "#ffffff",
      border: "1px solid #dc2626",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "#2563eb",
      border: "1px solid #2563eb",
    },
  };

  const spinnerStyle = {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255,255,255,0.6)",
    borderTop: "2px solid #ffffff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  };

  const ghostSpinnerStyle = {
    ...spinnerStyle,
    border: "2px solid rgba(37,99,235,0.3)",
    borderTop: "2px solid #2563eb",
  };

  const appliedVariant = variants[variant] || variants.primary;

  return (
    <>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <button
        type={type}
        onClick={!isDisabled ? onClick : undefined}
        disabled={isDisabled}
        style={{ ...baseStyle, ...appliedVariant }}
      >
        {isLoading && (
          <span
            style={
              variant === "ghost" ? ghostSpinnerStyle : spinnerStyle
            }
          />
        )}
        {!isLoading && label}
      </button>
    </>
  );
};

export default Button;
