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
import { resetPassword } from "../services/authService";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    if (!email) return "L'email est requis";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "L'email est invalide";
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
      setMessage("Un email de réinitialisation de mot de passe a été envoyé.");
    } catch (error) {
      setMessage("Erreur lors de l'envoi de l'email.");
    }
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Réinitialiser le mot de passe
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
            Réinitialiser
          </Button>
          <Button
            onClick={() => navigate("/login")}
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Retour à la connexion
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
