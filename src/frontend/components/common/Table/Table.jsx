import React from "react";

const Table = ({ columns = [], data = [], onRowClick, actions }) => {
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle = {
    textAlign: "left",
    padding: "0.75rem",
    borderBottom: "2px solid #e5e7eb",
    fontWeight: 600,
    backgroundColor: "#f9fafb",
    fontSize: "0.85rem",
  };

  const tdStyle = {
    padding: "0.75rem",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "0.9rem",
  };

  const rowStyle = {
    cursor: onRowClick ? "pointer" : "default",
    transition: "background-color 0.2s ease-in-out",
  };

  const hoverStyle = {
    backgroundColor: "#f3f4f6",
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} style={thStyle}>
              {col.label}
            </th>
          ))}
          {actions && <th style={thStyle}>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            style={rowStyle}
            onClick={() => onRowClick && onRowClick(row)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                hoverStyle.backgroundColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            {columns.map((col) => (
              <td key={col.key} style={tdStyle}>
                {row[col.key]}
              </td>
            ))}
            {actions && (
              <td style={tdStyle}>
                {actions(row)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
