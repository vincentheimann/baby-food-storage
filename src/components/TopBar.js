// /src/components/TopBar.js
import React from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

const TopBar = () => {
  const { currentUser, logout } = useAuth(); // Extract logout from useAuth
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from AuthContext
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!currentUser) {
    return null; // Don't render the TopBar if the user is not authenticated
  }

  return (
    <div className="top-bar">
      <h1>Baby Food Storage App</h1>
      <nav className="top-bar-nav">
        {/* NavLink allows us to easily apply active styles */}
        <NavLink to="/" exact activeClassName="active-link">
          Home
        </NavLink>
        <NavLink to="/trays" activeClassName="active-link">
          Tray Management
        </NavLink>
        <NavLink to="/profile" activeClassName="active-link">
          Profile
        </NavLink>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
};

export default TopBar;
