// src/pages/BacConfig.js
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { BacContext } from "../context/BacContext";

const BacConfig = () => {
  const { bacs, updateBac, addBac, removeBac } = useContext(BacContext);
  const [newBac, setNewBac] = useState({ color: "", type: "", capacity: 12 });

  const handleUpdateBac = (id, field, value) => {
    updateBac(id, { [field]: value });
  };

  const handleAddBac = () => {
    addBac({ ...newBac, capacity: parseInt(newBac.capacity, 10) }); // Ensure capacity is a number
    setNewBac({ color: "", type: "", capacity: 12 });
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom>
        Configuration des Bacs à Glaçons
      </Typography>
      <Stack spacing={3}>
        {bacs.map((bac) => (
          <Box
            key={bac.id}
            sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2 }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                label="Couleur"
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
                label="Capacité"
                type="number"
                value={bac.capacity}
                onChange={(e) =>
                  handleUpdateBac(bac.id, "capacity", e.target.value)
                }
                fullWidth
              />
              <IconButton
                aria-label="delete"
                color="secondary"
                onClick={() => removeBac(bac.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Box>
        ))}
      </Stack>
      <Box mt={5}>
        <Typography variant="h4" component="h2" gutterBottom>
          Ajouter un Nouveau Bac
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Couleur"
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
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Capacité"
              type="number"
              value={newBac.capacity}
              onChange={(e) =>
                setNewBac({ ...newBac, capacity: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleAddBac}>
              Ajouter
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default BacConfig;
