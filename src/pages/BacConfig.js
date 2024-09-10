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
  const { bacs, addBac, updateBac, removeBac, loading, error } =
    useContext(BacContext);
  const { aliments, setAliments } = useContext(AlimentContext);

  const [newBac, setNewBac] = useState({
    name: "",
    color: "",
    type: "",
    capacity: 12,
  });
  const [localBacState, setLocalBacState] = useState({});
  const [formError, setFormError] = useState({ type: false, capacity: false });
  const [openDialog, setOpenDialog] = useState(false);
  const [currentType, setCurrentType] = useState("");
  const [alimentsToReassign, setAlimentsToReassign] = useState([]);

  const debouncedSave = useMemo(
    () =>
      debounce((id, field, value) => {
        updateBac(id, { [field]: value }).catch((error) =>
          console.error("Error updating bac:", error)
        );
      }, 300),
    [updateBac]
  );

  const handleInputChange = (id, field, value) => {
    setLocalBacState((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleBlur = (id, field, value) => {
    debouncedSave(id, field, value);
  };

  const handleAddBac = async () => {
    if (!newBac.type.trim()) {
      setFormError({ type: true });
      return;
    }

    if (newBac.capacity < 1) {
      setFormError({ ...formError, capacity: true });
      return;
    }

    setFormError({ type: false, capacity: false });
    addBac(newBac); // No need to refetch bacs due to optimistic UI updates
    setNewBac({ color: "", type: "", capacity: 12 });
  };

  const handleDeleteBac = async (type) => {
    const alimentsOfType = aliments.filter((aliment) => aliment.type === type);
    if (alimentsOfType.length > 0) {
      setAlimentsToReassign(alimentsOfType);
      setCurrentType(type);
      setOpenDialog(true);
    } else {
      removeBac(type); // Optimistic update, no need to re-fetch
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
    <Container
      maxWidth="lg"
      sx={{ mt: { xs: 2, md: 4 }, mb: { xs: 4, md: 8 } }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: { xs: 2, md: 4 } }}>
        Ice Tray Configuration
      </Typography>

      {/* Show any global error from the context */}
      {error && <Typography color="error">{error}</Typography>}

      <Stack spacing={2}>
        {bacs.map((bac) => (
          <Box
            key={bac.id}
            sx={{
              padding: { xs: 1, md: 2 },
              border: "1px solid #ccc",
              borderRadius: 2,
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems="center"
            >
              <TextField
                label="Name"
                value={localBacState[bac.id]?.name || bac.name}
                onChange={(e) =>
                  handleInputChange(bac.id, "name", e.target.value)
                }
                onBlur={(e) => handleBlur(bac.id, "name", e.target.value)}
                fullWidth
              />
              <Box
                sx={{
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: 1,
                  padding: 1.6,
                  width: "100%",
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
                }
                onBlur={(e) => handleBlur(bac.id, "type", e.target.value)}
                fullWidth
              />
              <TextField
                label="Capacity"
                type="number"
                value={localBacState[bac.id]?.capacity || bac.capacity}
                onChange={(e) => {
                  const value = Math.max(1, parseInt(e.target.value, 10) || 1);
                  handleInputChange(bac.id, "capacity", value);
                }}
                onBlur={(e) =>
                  handleBlur(bac.id, "capacity", parseInt(e.target.value, 10))
                }
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
        <Typography variant="h5" component="h2" gutterBottom>
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
              error={formError.type}
              helperText={formError.type ? "This field is required." : ""}
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddBac}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Adding..." : "Add"}
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
          <Button
            onClick={handleReassign}
            variant="contained"
            color="primary"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Reassigning..." : "Reassign and Delete Type"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BacConfig;
