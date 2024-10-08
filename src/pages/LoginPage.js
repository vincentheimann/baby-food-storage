import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  Paper,
  Box,
  Grid,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useUser } from "../contexts/UserContext";

const LoginPage = () => {
  const { googleLogin, isAuthenticated, loading } = useUser(); // Add loading and isAuthenticated
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // Automatically redirect to home if the user is already authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate("/"); // Redirect to home if authenticated
    }
  }, [isAuthenticated, loading, navigate]);

  const handleGoogleLogin = async () => {
    setLoginLoading(true);
    try {
      await googleLogin(); // Calls your googleLogin method in firebaseAuthService.js
      navigate("/"); // Navigate to home page after login
    } catch (error) {
      setGeneralError("Google login failed. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setGeneralError(""); // Clear the general error after Snackbar is closed
  };

  // Render loading if the user is authenticated
  if (isAuthenticated && !loading) {
    return <div>Redirecting...</div>;
  }

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url('/static/images/templates/sign-in-side.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in with Google
            </Typography>
            <Box sx={{ position: "relative", width: "100%" }}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleGoogleLogin}
                disabled={loginLoading}
                aria-label="Sign in with Google"
              >
                {loginLoading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Sign in with Google"
                )}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {generalError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginPage;
