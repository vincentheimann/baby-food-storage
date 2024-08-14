// src/pages/ResetPasswordPage.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
} from "@mui/material";
import { resetPassword } from "../services/firebaseAuthService";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "The email is invalid";
    return null;
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }
    setErrors({});
    try {
      await resetPassword(email);
      setMessage("A password reset email has been sent.");
    } catch (error) {
      setMessage("Error sending email.");
    }
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Reset password
        </Typography>
        <form onSubmit={handleResetPassword}>
          <TextField
            error={!!errors.email}
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            helperText={errors.email}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Reset
          </Button>
          <Button
            onClick={() => navigate("/login")}
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Back to login page
          </Button>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={message}
        />
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
