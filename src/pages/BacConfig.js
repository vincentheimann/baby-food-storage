import React, { useContext, useState, useMemo } from "react";
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
import { CirclePicker } from "react-color";
import DeleteIcon from "@mui/icons-material/Delete";
import { BacContext } from "../contexts/BacContext";
import { AlimentContext } from "../contexts/AlimentContext";
import { debounce } from "lodash";

const BacConfig = ({ userId }) => {
  const { bacs, addBac, updateBac, removeBac } = useContext(BacContext);
  const { aliments, setAliments } = useContext(AlimentContext);

  const [newBac, setNewBac] = useState({
    name: "",
    color: "",
    type: "",
    capacity: 12,
  });
  const [localBacState, setLocalBacState] = useState({}); // Store local changes for immediate feedback
  const [error, setError] = useState({ type: false, capacity: false });
  const [openDialog, setOpenDialog] = useState(false);
  const [currentType, setCurrentType] = useState("");
  const [alimentsToReassign, setAlimentsToReassign] = useState([]);

  // Debounced function for saving to the database
  const debouncedSave = useMemo(
    () =>
      debounce((id, field, value) => {
        updateBac(id, { [field]: value }).catch((error) =>
          console.error("Error updating bac:", error)
        );
      }, 300),
    [updateBac]
  );

  // Handle input changes immediately for user feedback
  const handleInputChange = (id, field, value) => {
    setLocalBacState((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // Save to database when user stops typing (onBlur)
  const handleBlur = (id, field, value) => {
    debouncedSave(id, field, value);
  };

  const handleAddBac = async () => {
    if (!newBac.type.trim()) {
      setError({ type: true });
      return;
    }

    if (newBac.capacity < 1) {
      setError({ ...error, capacity: true });
      return;
    }

    setError({ type: false, capacity: false });
    try {
      await addBac(newBac);
      setNewBac({ color: "", type: "", capacity: 12 });
    } catch (error) {
      console.error("Error adding bac:", error);
    }
  };

  const handleDeleteBac = async (type) => {
    const alimentsOfType = aliments.filter((aliment) => aliment.type === type);
    if (alimentsOfType.length > 0) {
      setAlimentsToReassign(alimentsOfType);
      setCurrentType(type);
      setOpenDialog(true);
    } else {
      try {
        await removeBac(type);
      } catch (error) {
        console.error("Error deleting bac:", error);
      }
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
                label="Name"
                value={localBacState[bac.id]?.name || bac.name}
                onChange={(e) =>
                  handleInputChange(bac.id, "name", e.target.value)
                } // Immediate feedback
                onBlur={(e) => handleBlur(bac.id, "name", e.target.value)} // Debounced save on blur
                fullWidth
              />
              <Box
                sx={{
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: 1,
                  padding: 1.6,
                }}
              >
                <CirclePicker
                  color={bac.color}
                  onChangeComplete={(color) =>
                    handleBlur(bac.id, "color", color.hex)
                  }
                  colors={[
                    "#F44336",
                    "#F78DA7",
                    "#4CAF50",
                    "#03A9F4",
                    "#607D8B",
                  ]}
                />
              </Box>
              <TextField
                label="Type"
                value={localBacState[bac.id]?.type || bac.type}
                onChange={(e) =>
                  handleInputChange(bac.id, "type", e.target.value)
                } // Immediate feedback
                onBlur={(e) => handleBlur(bac.id, "type", e.target.value)} // Debounced save on blur
                fullWidth
              />
              <TextField
                label="Capacity"
                type="number"
                value={localBacState[bac.id]?.capacity || bac.capacity}
                onChange={(e) => {
                  const value = Math.max(1, parseInt(e.target.value, 10) || 1);
                  handleInputChange(bac.id, "capacity", value);
                }} // Immediate feedback
                onBlur={(e) =>
                  handleBlur(bac.id, "capacity", parseInt(e.target.value, 10))
                } // Debounced save on blur
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
          <Grid item xs={12} md={3}>
            <TextField
              label="Name"
              value={newBac.name}
              onChange={(e) => setNewBac({ ...newBac, name: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: 1,
                padding: 1.6,
              }}
            >
              <CirclePicker
                color={newBac.color}
                onChangeComplete={(color) =>
                  setNewBac({ ...newBac, color: color.hex })
                }
                colors={["#F44336", "#F78DA7", "#4CAF50", "#03A9F4", "#607D8B"]}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Type"
              value={newBac.type}
              onChange={(e) => setNewBac({ ...newBac, type: e.target.value })}
              error={error.type}
              helperText={error.type ? "This field is required." : ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
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
