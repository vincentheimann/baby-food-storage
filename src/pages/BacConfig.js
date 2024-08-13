import React, { useContext, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  Box,
  IconButton,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { BacContext } from "../context/BacContext";
import { AlimentContext } from "../context/AlimentContext";

const BacConfig = () => {
  const { bacs, updateBac, addBac, removeBac } = useContext(BacContext);
  const { aliments, setAliments } = useContext(AlimentContext);

  const [newBac, setNewBac] = useState({ color: "", type: "", capacity: 12 });
  const [error, setError] = useState({ type: false, capacity: false });
  const [openDialog, setOpenDialog] = useState(false);
  const [currentType, setCurrentType] = useState("");
  const [alimentsToReassign, setAlimentsToReassign] = useState([]);

  const handleUpdateBac = (id, field, value) => {
    if (field === "capacity" && (value < 1 || isNaN(value))) {
      setError((prev) => ({ ...prev, [id]: true }));
      return;
    } else {
      setError((prev) => ({ ...prev, [id]: false }));
    }
    updateBac(id, { [field]: value });
  };

  const handleAddBac = () => {
    if (!newBac.type.trim()) {
      setError({ type: true });
      return;
    }

    if (newBac.capacity < 1) {
      setError({ ...error, capacity: true });
      return;
    }

    setError({ type: false, capacity: false });
    addBac({ ...newBac, capacity: parseInt(newBac.capacity, 10) });
    setNewBac({ color: "", type: "", capacity: 12 });
  };

  const handleDeleteBac = (type) => {
    const alimentsOfType = aliments.filter((aliment) => aliment.type === type);
    if (alimentsOfType.length > 0) {
      setAlimentsToReassign(alimentsOfType);
      setCurrentType(type);
      setOpenDialog(true);
    } else {
      removeBac(type);
    }
  };

  const handleReassign = () => {
    setAliments((prevAliments) =>
      prevAliments.map((aliment) => {
        const reassignedAliment = alimentsToReassign.find(
          (a) => a.id === aliment.id
        );
        return reassignedAliment && reassignedAliment.newType
          ? { ...aliment, type: reassignedAliment.newType }
          : aliment;
      })
    );
    removeBac(currentType);
    setOpenDialog(false);
  };

  const handleReassignChange = (alimentId, newType) => {
    setAlimentsToReassign((prev) =>
      prev.map((aliment) =>
        aliment.id === alimentId ? { ...aliment, newType } : aliment
      )
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 4 }}>
        Ice Tray Configuration
      </Typography>
      <Stack spacing={3}>
        {bacs.map((bac) => (
          <Box
            key={bac.id}
            sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2 }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                label="Color"
                value={bac.color}
                onChange={(e) =>
                  handleUpdateBac(bac.id, "color", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="Type"
                value={bac.type}
                onChange={(e) =>
                  handleUpdateBac(bac.id, "type", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="Capacity"
                type="number"
                value={bac.capacity}
                onChange={(e) => {
                  const value = Math.max(1, parseInt(e.target.value, 10) || 1);
                  handleUpdateBac(bac.id, "capacity", value);
                }}
                fullWidth
              />

              <IconButton
                aria-label="delete"
                color="secondary"
                onClick={() => handleDeleteBac(bac.type)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Box>
        ))}
      </Stack>
      <Box mt={5}>
        <Typography variant="h4" component="h2" gutterBottom>
          Add a New Tray
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Color"
              value={newBac.color}
              onChange={(e) => setNewBac({ ...newBac, color: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Type"
              value={newBac.type}
              onChange={(e) => setNewBac({ ...newBac, type: e.target.value })}
              error={error.type}
              helperText={error.type ? "This field is required." : ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Capacity"
              type="number"
              value={newBac.capacity}
              onChange={(e) =>
                setNewBac({
                  ...newBac,
                  capacity: Math.max(1, parseInt(e.target.value, 10) || 1),
                })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleAddBac}>
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Dialog for reassigning aliments */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Reassign Aliments</DialogTitle>
        <DialogContent>
          {alimentsToReassign.map((aliment) => (
            <Box key={aliment.id} mb={2}>
              <Typography>{aliment.name}</Typography>
              <TextField
                select
                label="New Type"
                value={aliment.newType || ""}
                onChange={(e) =>
                  handleReassignChange(aliment.id, e.target.value)
                }
                fullWidth
              >
                {bacs
                  .filter((bac) => bac.type !== currentType) // Exclude the type being deleted
                  .map((bac) => (
                    <MenuItem key={bac.type} value={bac.type}>
                      {bac.type}
                    </MenuItem>
                  ))}
              </TextField>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleReassign} variant="contained" color="primary">
            Reassign and Delete Type
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BacConfig;
