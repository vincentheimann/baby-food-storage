import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { getUserProfile } from "../services/firebaseFirestoreDatabaseService";

const ProfilePage = () => {
  const {
    user,
    updateUserProfile,
    updateUserPassword,
    resetPassword,
    error,
    setError,
  } = useUser();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [passwordValues, setPasswordValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordErrorMessages, setPasswordErrorMessages] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [resetPasswordVisible, setResetPasswordVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getUserProfile(user.uid);
        if (userDoc) {
          setValues({
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
            email: userDoc.email,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("You do not have permission to access this resource.");
      }
    };
    if (user) {
      fetchUserData();
    }
  }, [user, setError]);

  useEffect(() => {
    if (error) {
      if (error.includes("permission")) {
        navigate("/login");
      }
      setError(null);
    }
  }, [error, navigate, setError]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    if (!values.firstName || !values.lastName || !values.email) {
      setError("All fields are required.");
      return;
    }

    try {
      await updateUserProfile(values);
      setSuccessMessage("Profile updated successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    const errors = {
      currentPassword: !passwordValues.currentPassword,
      newPassword: !passwordValues.newPassword,
      confirmPassword:
        passwordValues.confirmPassword !== passwordValues.newPassword,
    };
    setPasswordErrors(errors);

    if (Object.values(errors).some(Boolean)) {
      return;
    }

    try {
      await updateUserPassword(
        passwordValues.currentPassword,
        passwordValues.newPassword
      );
      setSuccessMessage("Password updated successfully!");
      setSnackbarOpen(true);
      setResetPasswordVisible(false);
    } catch (error) {
      handlePasswordError(error);
    }
  };

  const handlePasswordError = (error) => {
    if (error.code === "auth/weak-password") {
      setPasswordErrors({ newPassword: true });
      setPasswordErrorMessages({
        newPassword: "Password should be at least 6 characters",
      });
    } else if (
      error.code === "auth/wrong-password" ||
      error.code === "auth/invalid-credential"
    ) {
      setPasswordErrors({ currentPassword: true });
      setPasswordErrorMessages({
        currentPassword: "Current password is incorrect",
      });
    } else if (error.code === "auth/too-many-requests") {
      setPasswordErrors({ currentPassword: true });
      setPasswordErrorMessages({
        currentPassword:
          "Too many attempts. Please try again later or reset your password.",
      });
      setResetPasswordVisible(true);
    } else {
      console.error("Unexpected error during password update:", error);
    }
  };

  const handleResetPassword = () => {
    resetPassword(user.email);
    setSuccessMessage("Password reset email sent!");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 8 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
          {user?.firstName?.charAt(0) || "U"}
        </Avatar>
        <Typography variant="h4" component="h1" gutterBottom>
          My Profile
        </Typography>
        <form onSubmit={handleProfileSubmit} noValidate>
          <TextField
            label="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!values.firstName}
            helperText={!values.firstName && "First name is required"}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!values.lastName}
            helperText={!values.lastName && "Last name is required"}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!values.email}
            helperText={!values.email && "Email is required"}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update Profile
          </Button>
        </form>

        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          Change Password
        </Typography>
        <form onSubmit={handlePasswordSubmit} noValidate>
          <TextField
            label="Current Password"
            name="currentPassword"
            type="password"
            value={passwordValues.currentPassword}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
            error={passwordErrors.currentPassword}
            helperText={
              passwordErrors.currentPassword &&
              passwordErrorMessages.currentPassword
            }
          />
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            value={passwordValues.newPassword}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
            error={passwordErrors.newPassword}
            helperText={
              passwordErrors.newPassword && passwordErrorMessages.newPassword
            }
          />
          <TextField
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            value={passwordValues.confirmPassword}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
            error={passwordErrors.confirmPassword}
            helperText={
              passwordErrors.confirmPassword &&
              passwordErrorMessages.confirmPassword
            }
          />
          <Button type="submit" variant="contained" color="secondary" fullWidth>
            Update Password
          </Button>
          {resetPasswordVisible && (
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleResetPassword}
            >
              Reset Password
            </Button>
          )}
        </form>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      {error && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default ProfilePage;
