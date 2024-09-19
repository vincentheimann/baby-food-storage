// /src/pages/ProfilePage.js
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // Redirect to login page after logging out
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      {currentUser && (
        <div>
          <p>
            <strong>Name:</strong> {currentUser.displayName}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
