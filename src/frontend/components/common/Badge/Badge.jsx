import React from "react";

const Badge = ({ status }) => {
  const normalizedStatus = status?.toLowerCase();

  const statusColors = {
    confirmed: { background: "#16a34a", color: "#ffffff" },
    cancelled: { background: "#dc2626", color: "#ffffff" },
    pending: { background: "#eab308", color: "#000000" },
    completed: { background: "#2563eb", color: "#ffffff" },
    "no-show": { background: "#6b7280", color: "#ffffff" },
    active: { background: "#16a34a", color: "#ffffff" },
    inactive: { background: "#dc2626", color: "#ffffff" },
  };

  const appliedStyle =
    statusColors[normalizedStatus] || {
      background: "#e5e7eb",
      color: "#111827",
    };

  const badgeStyle = {
    display: "inline-block",
    padding: "0.25rem 0.75rem",
    borderRadius: "999px",
    fontSize: "0.75rem",
    fontWeight: 600,
    backgroundColor: appliedStyle.background,
    color: appliedStyle.color,
    textTransform: "capitalize",
  };

  return <span style={badgeStyle}>{status}</span>;
};

export default Badge;
