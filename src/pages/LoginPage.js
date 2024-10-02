// /src/pages/LoginPage.js
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Card, CardContent } from "@mui/material";
import BackgroundImage from "../assets/images/login-background.jpg"; // Import a background image
import GoogleIcon from "@mui/icons-material/Google"; // Import the Google icon

const LoginPage = () => {
  const { currentUser, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/"); // Redirect to HomePage if the user is logged in
    }
  }, [currentUser, navigate]);

  const styles = {
    root: {
      minHeight: "100vh",
      backgroundImage: `url(${BackgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 20px", // Add padding for better mobile experience
    },
    loginCard: {
      backgroundColor: "rgba(255, 255, 255, 0.95)", // Semi-transparent background
      padding: "2rem",
      borderRadius: "10px",
      textAlign: "center",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      maxWidth: "400px", // Set a maximum width for the card
      width: "100%", // Ensure the card scales on smaller screens
    },
    loginButton: {
      marginTop: "1.5rem",
      textTransform: "none", // Maintain the proper casing of the text
    },
    baseline: {
      marginTop: "1rem",
      fontStyle: "italic",
      fontWeight: 500,
      color: "#555", // Soft color for baseline text
    },
  };

  return (
    <div style={styles.root}>
      <Card style={styles.loginCard}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Baby Food Storage
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Sign in to manage your baby food storage and trays.
          </Typography>

          {/* Baseline */}
          <Typography variant="body2" component="p" style={styles.baseline}>
            Organize with Love, Feed with Care
          </Typography>

          {/* Google Sign-In Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={login}
            size="large"
            startIcon={<GoogleIcon />} // Google icon added here
            style={styles.loginButton}
          >
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
