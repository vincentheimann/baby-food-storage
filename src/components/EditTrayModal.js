// /src/components/EditTrayModal.js
import React, { useState } from "react";
import { updateTray } from "../services/trayService"; // A function to update the tray in Firestore
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Button,
  Grid,
} from "@mui/material";

const EditTrayModal = ({ tray, onClose }) => {
  const [trayName, setTrayName] = useState(tray.name || "");
  const [trayCapacity, setTrayCapacity] = useState(tray.capacity || 0);
  const [trayColor, setTrayColor] = useState(tray.color || "#ffffff");
  const [error, setError] = useState("");

  const handleUpdateTray = async () => {
    if (!trayName || trayCapacity <= 0) {
      setError("Please provide valid tray name and capacity.");
      return;
    }

    const updatedTrayData = {
      name: trayName,
      capacity: trayCapacity,
      color: trayColor,
      used: tray.used, // Keep the current used capacity
    };

    try {
      await updateTray(tray.id, updatedTrayData); // Update the tray in Firestore
      onClose(); // Close the modal after update
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
              error={!!error && !trayName}
              helperText={!trayName && error}
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
