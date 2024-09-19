// /src/pages/ProfilePage.js
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid2"; // Correct import for Grid2

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
    <Grid container spacing={3} direction="column" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h4" component="h2">
          User Profile
        </Typography>
      </Grid>

      {currentUser && (
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardContent>
              <Typography variant="body1">
                <strong>Name:</strong> {currentUser.displayName}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {currentUser.email}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}

      <Grid item xs={12}>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
