// /src/components/AddAlimentModal.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { addAliment } from "../services/alimentService";
import { fetchTrays } from "../services/trayService";
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


const AddAlimentModal = ({ onClose }) => {
  const { currentUser } = useAuth();
  const [alimentName, setAlimentName] = useState("");
  const [alimentType, setAlimentType] = useState("Protein");
  const [trays, setTrays] = useState([]);
  const [trayQuantities, setTrayQuantities] = useState({});

  useEffect(() => {
    const loadTrays = async () => {
      const trayData = await fetchTrays(currentUser.uid);
      setTrays(trayData);
    };
    loadTrays();
  }, [currentUser]);

  const handleAddAliment = async () => {
    const totalQuantity = Object.values(trayQuantities).reduce(
      (acc, qty) => acc + qty,
      0
    );

    const alimentData = {
      name: alimentName,
      type: alimentType,
      totalQuantity,
      trays: Object.keys(trayQuantities).map((trayId) => ({
        trayId,
        quantity: trayQuantities[trayId],
      })),
    };

    await addAliment(currentUser.uid, alimentData);
    onClose();
  };

  const handleTrayQuantityChange = (trayId, quantity) => {
    setTrayQuantities((prev) => ({ ...prev, [trayId]: Number(quantity) }));
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Add New Aliment</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Aliment Name"
              value={alimentName}
              onChange={(e) => setAlimentName(e.target.value)}
              required
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
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddAliment} variant="contained" color="primary">
          Add Aliment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAlimentModal;
