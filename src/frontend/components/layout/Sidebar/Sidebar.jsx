import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  const sidebarStyle = {
    position: "fixed",
    top: "60px",
    left: 0,
    width: "220px",
    height: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "1rem 0",
    borderRight: "1px solid #e5e7eb",
  };

  const linkStyle = {
    display: "block",
    padding: "0.75rem 1.25rem",
    textDecoration: "none",
    color: "#374151",
    fontSize: "0.9rem",
  };

  const activeStyle = {
    color: "#2563eb",
    fontWeight: 600,
    backgroundColor: "#e0e7ff",
  };

  const isAdmin = user?.role === "Administrator";

  return (
    <aside style={sidebarStyle}>
      <NavLink
        to="/"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeStyle } : linkStyle
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/reservations"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeStyle } : linkStyle
        }
      >
        Reservations
      </NavLink>

      <NavLink
        to="/resources"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeStyle } : linkStyle
        }
      >
        Resources
      </NavLink>

      <NavLink
        to="/availability"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeStyle } : linkStyle
        }
      >
        Availability
      </NavLink>

      {isAdmin && (
        <>
          <NavLink
            to="/users"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Users
          </NavLink>

          <NavLink
            to="/reports"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Reports
          </NavLink>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
