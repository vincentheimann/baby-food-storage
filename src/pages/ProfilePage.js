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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { getUserProfile } from "../services/firebaseFirestoreDatabaseService";
import { deleteAccount } from "../services/firebaseAuthService";

const ProfilePage = () => {
  const { user, updateUserProfile, logout, error, setError } = useUser();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [notificationPref, setNotificationPref] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      setSuccessMessage("Account deleted successfully.");
      setSnackbarOpen(true);
      navigate("/login");
    } catch (error) {
      console.error("Failed to delete account:", error);
      setError("Failed to delete account. Try again later.");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 8 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar
          sx={{ width: 80, height: 80, mb: 2 }}
          src={user?.photoURL} // Google profile picture
          alt={user?.displayName || "User Avatar"}
        />
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
            disabled
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update Profile
          </Button>
        </form>

        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          Account Settings
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={notificationPref}
              onChange={() => setNotificationPref(!notificationPref)}
            />
          }
          label="Enable Expiration Notifications"
        />

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>

        <Button
          variant="outlined"
          color="error"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => setDeleteDialogOpen(true)}
        >
          Delete Account
        </Button>
      </Box>

      {/* Snackbar for success messages */}
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

      {/* Error Snackbar */}
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

      {/* Delete Account Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDeleteAccount();
              handleDialogClose();
            }}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;
