import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404: Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link
        to="/"
        style={{ color: "#007BFF", textDecoration: "none", fontSize: "18px" }}
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
