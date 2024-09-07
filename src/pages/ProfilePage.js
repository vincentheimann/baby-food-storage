import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Button,
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
import { deleteAccount } from "../services/firebaseAuthService";

const ProfilePage = () => {
  const { user, logout, error, setError } = useUser();
  const navigate = useNavigate();

  const [notificationPref, setNotificationPref] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (error) {
      if (error.includes("permission")) {
        navigate("/login");
      }
      setError(null);
    }
  }, [error, navigate, setError]);

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
        {/* Display Google Profile Picture */}
        <Avatar
          sx={{ width: 80, height: 80, mb: 2 }}
          src={user?.photoURL || ""}
          alt={user?.displayName || "User Avatar"}
          referrerPolicy="no-referrer"
        >
          {!user?.photoURL && user?.displayName?.charAt(0)}
        </Avatar>

        {/* Display Name and Email from Google Account */}
        <Typography variant="h4" component="h1" gutterBottom>
          {user?.displayName || "User Name"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {user?.email}
        </Typography>

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
