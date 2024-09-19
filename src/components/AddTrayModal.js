// /src/components/AddTrayModal.js
import React, { useState } from "react";
import { addTray } from "../services/trayService";
import { useAuth } from "../context/AuthContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";

const AddTrayModal = ({ onClose }) => {
  const { currentUser } = useAuth();
  const [trayName, setTrayName] = useState("");
  const [trayCapacity, setTrayCapacity] = useState(12);
  const [trayColor, setTrayColor] = useState("#ffffff");
  const [error, setError] = useState("");

  const handleAddTray = async () => {
    if (!trayName.trim()) {
      setError("Tray name is required");
      return;
    }

    if (trayCapacity <= 0) {
      setError("Tray capacity must be greater than 0");
      return;
    }

    try {
      await addTray(currentUser.uid, {
        name: trayName,
        capacity: trayCapacity,
        color: trayColor,
        used: 0,
      });
      onClose(); // Close the modal after successful add
    } catch (error) {
      console.error("Error adding tray:", error);
      setError("There was an error adding the tray. Please try again.");
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Add New Tray</DialogTitle>
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
              label="Capacity"
              value={trayCapacity}
              onChange={(e) => setTrayCapacity(e.target.value)}
              required
              error={!!error && trayCapacity <= 0}
              helperText={trayCapacity <= 0 && error}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">Select Tray Color</Typography>
            <TextField
              fullWidth
              type="color"
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
        <Button onClick={handleAddTray} variant="contained" color="primary">
          Add Tray
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTrayModal;
