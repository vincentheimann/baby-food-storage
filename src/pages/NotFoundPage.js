// /src/pages/NotFoundPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/"); // Redirect to HomePage
  };

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button onClick={goHome}>Go to Home</button>
    </div>
  );
};

export default NotFoundPage;
