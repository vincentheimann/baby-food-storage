import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

const ReassignFoodItemsModal = ({
  open,
  onClose,
  aliments,
  types,
  onReassign,
}) => {
  const [selectedTypes, setSelectedTypes] = useState({});

  const handleTypeChange = (alimentId, newType) => {
    setSelectedTypes({
      ...selectedTypes,
      [alimentId]: newType,
    });
  };

  const handleSubmit = () => {
    onReassign(selectedTypes);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, backgroundColor: "white", borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Reassign Food Items
        </Typography>
        <Grid container spacing={2}>
          {aliments.map((aliment) => (
            <Grid item xs={12} key={aliment.id}>
              <TextField
                label={aliment.name}
                select
                value={selectedTypes[aliment.id] || ""}
                onChange={(e) => handleTypeChange(aliment.id, e.target.value)}
                fullWidth
              >
                {types.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          ))}
        </Grid>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Reassign
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReassignFoodItemsModal;
