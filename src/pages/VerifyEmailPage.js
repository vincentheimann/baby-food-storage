import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Container,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { updateUserProfileInFirestore } from "../services/firebaseFirestoreDatabaseService";

const VerifyEmailPage = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login if no user is found
      return;
    }

    const checkEmailVerified = async () => {
      await user.reload(); // Reloads the user's current session
      if (user.emailVerified) {
        setIsEmailVerified(true);
        await updateUserProfileInFirestore(user.uid, { emailVerified: true });
        navigate("/"); // Redirect to the Home if verified
      }
    };

    checkEmailVerified();
  }, [user, navigate]);

  const handleResendVerificationEmail = async () => {
    if (!user) return; // Ensure user is valid
    try {
      await sendEmailVerification(user);
      setOpenSnackbar(true); // Show success snackbar
    } catch (error) {
      console.error("Error sending email verification:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleBackToHome = () => {
    navigate("/"); // Navigate back to home page
  };

  if (!user) return null; // Return nothing if user is null

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Please Verify Your Email
        </Typography>
        <Typography variant="body1" gutterBottom>
          A verification link has been sent to {user.email}. Please verify your
          email to access the application.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleResendVerificationEmail}
          sx={{ mr: 2 }}
        >
          Resend Verification Email
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleBackToHome}>
          Back to Home
        </Button>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Verification email sent successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default VerifyEmailPage;
