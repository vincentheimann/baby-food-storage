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
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const AddTrayModal = ({ onClose }) => {
  const { currentUser } = useAuth();
  const [trayName, setTrayName] = useState("");
  const [trayCapacity, setTrayCapacity] = useState(12);
  const [trayColor, setTrayColor] = useState("#ffffff");

  const handleAddTray = async () => {
    if (trayName.trim()) {
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
      }
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
