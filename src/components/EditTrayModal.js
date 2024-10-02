// /src/components/EditTrayModal.js
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import to get current user ID
import { updateTray } from "../services/trayService"; // A function to update the tray in Firestore
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const EditTrayModal = ({ tray, onClose }) => {
  const { currentUser } = useAuth(); // Get the current user's ID
  const [trayName, setTrayName] = useState(tray?.name ?? "");
  const [trayCapacity, setTrayCapacity] = useState(tray?.capacity ?? 0);
  const [trayColor, setTrayColor] = useState(tray?.color ?? "#ffffff");
  const [error, setError] = useState("");

  const handleUpdateTray = async () => {
    if (!trayName.trim() || trayCapacity <= 0) {
      setError(
        "Please provide a valid tray name and capacity greater than zero."
      );
      return;
    }

    const updatedTrayData = {
      name: trayName,
      capacity: trayCapacity,
      color: trayColor,
      used: tray.used, // Keep the current used capacity
    };

    try {
      // Ensure the currentUser.uid and tray.id are passed to the updateTray function
      if (currentUser?.uid && tray?.id) {
        await updateTray(currentUser.uid, tray.id, updatedTrayData);
        onClose(); // Close the modal after update
      } else {
        setError(
          "Could not determine user or tray information. Please try again."
        );
      }
    } catch (error) {
      console.error("Error updating tray:", error);
      setError("Error updating tray. Please try again.");
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit Tray</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tray Name"
              value={trayName}
              onChange={(e) => setTrayName(e.target.value)}
              required
              error={!!error && !trayName.trim()}
              helperText={!trayName.trim() && error}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Tray Capacity"
              value={trayCapacity}
              onChange={(e) => setTrayCapacity(Number(e.target.value))}
              required
              error={!!error && trayCapacity <= 0}
              helperText={trayCapacity <= 0 && error}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type="color"
              label="Tray Color"
              value={trayColor}
              onChange={(e) => setTrayColor(e.target.value)}
            />
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdateTray} variant="contained" color="primary">
          Update Tray
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTrayModal;
