// /src/components/EditAlimentModal.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchTrays } from "../services/trayService"; // To fetch available trays
import { updateAliment } from "../services/alimentService"; // Update the aliment service
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const EditAlimentModal = ({ aliment, onClose }) => {
  const { currentUser } = useAuth();
  const [alimentName, setAlimentName] = useState(aliment.name || "");
  const [alimentType, setAlimentType] = useState(aliment.type || "Protein");
  const [trayQuantities, setTrayQuantities] = useState({});
  const [trays, setTrays] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTrays = async () => {
      const trayData = await fetchTrays(currentUser.uid);
      setTrays(trayData);

      // Initialize the tray quantities based on the aliment's existing data
      const trayQuantitiesInitial = (aliment.trays || []).reduce(
        (acc, tray) => {
          acc[tray.trayId] = tray.quantity;
          return acc;
        },
        {}
      );

      setTrayQuantities(trayQuantitiesInitial);
    };

    loadTrays();
  }, [aliment, currentUser]);

  const handleUpdateAliment = async () => {
    if (!alimentName) {
      setError("Aliment name is required.");
      return;
    }

    const totalQuantity = Object.values(trayQuantities).reduce(
      (acc, qty) => acc + qty,
      0
    );

    if (totalQuantity <= 0) {
      setError("Please allocate at least some quantity to the trays.");
      return;
    }

    const updatedAlimentData = {
      name: alimentName,
      type: alimentType,
      totalQuantity,
      trays: Object.keys(trayQuantities).map((trayId) => ({
        trayId,
        quantity: trayQuantities[trayId],
      })),
    };

    try {
      await updateAliment(currentUser.uid, aliment.id, updatedAlimentData);
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating aliment:", error);
      setError("Error updating aliment. Please try again.");
    }
  };

  const handleTrayQuantityChange = (trayId, quantity) => {
    setTrayQuantities((prev) => ({ ...prev, [trayId]: Number(quantity) }));
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit Aliment</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Aliment Name"
              value={alimentName}
              onChange={(e) => setAlimentName(e.target.value)}
              required
              error={!!error && !alimentName}
              helperText={!alimentName && error}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Aliment Type"
              value={alimentType}
              onChange={(e) => setAlimentType(e.target.value)}
            >
              <MenuItem value="Protein">Protein</MenuItem>
              <MenuItem value="Carb">Carb</MenuItem>
              <MenuItem value="Vegetable">Vegetable</MenuItem>
            </TextField>
          </Grid>

          {trays.map((tray) => (
            <Grid item xs={12} key={tray.id}>
              <Typography variant="subtitle1">
                {tray.name} (Available capacity: {tray.capacity - tray.used})
              </Typography>
              <TextField
                type="number"
                fullWidth
                label="Quantity"
                value={trayQuantities[tray.id] || 0}
                onChange={(e) =>
                  handleTrayQuantityChange(tray.id, e.target.value)
                }
                inputProps={{ min: 0, max: tray.capacity - tray.used }}
              />
            </Grid>
          ))}

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
        <Button
          onClick={handleUpdateAliment}
          variant="contained"
          color="primary"
        >
          Update Aliment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAlimentModal;
