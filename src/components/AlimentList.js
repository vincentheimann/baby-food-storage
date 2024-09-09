import React, { useState } from "react";
import {
  IconButton,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AlimentModal from "./AlimentModal";
import { formatDate } from "../utils/dateUtils";

const AlimentList = ({ aliments, onDecrement, onIncrement, onUpdate }) => {
  const [selectedAliment, setSelectedAliment] = useState(null);
  const [error, setError] = useState(null); // New error state

  const handleItemClick = (aliment) => {
    setSelectedAliment(aliment);
  };

  const handleCloseModal = () => {
    setSelectedAliment(null);
  };

  const handleDecrement = async (id) => {
    try {
      await onDecrement(id);
    } catch (err) {
      setError("Failed to decrement quantity.");
    }
  };

  const handleIncrement = async (id) => {
    try {
      await onIncrement(id);
    } catch (err) {
      setError("Failed to increment quantity.");
    }
  };

  return (
    <>
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
      {aliments.length === 0 ? (
        <Box textAlign="center" mt={2}>
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
          >
            Oops, there's nothing to eat!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {aliments.map((aliment) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={aliment.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                }}
              >
                <CardContent
                  sx={{ flex: "1 0 auto", cursor: "pointer" }}
                  onClick={() => handleItemClick(aliment)}
                >
                  <Typography
                    component="div"
                    variant="h4"
                    sx={{
                      fontSize: { xs: "1.2rem", md: "1.6rem" },
                      fontWeight: 600,
                    }}
                  >
                    {`${aliment.name}`}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: "text.secondary", mb: 1 }}
                  >
                    {aliment.type}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "text.secondary", mb: 0.5 }}
                  >
                    {`Frozen on: ${formatDate(aliment.freezingDate)}`}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{
                      color:
                        new Date(aliment.expirationDate) < new Date()
                          ? "red"
                          : "text.secondary",
                      fontWeight: 500,
                    }}
                  >
                    {`Expiration: ${formatDate(aliment.expirationDate)}`}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "text.secondary", mt: 1 }}
                  >
                    {`Quantity: ${aliment.quantity} ice cubes`}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pb: 2,
                  }}
                >
                  <IconButton
                    edge="end"
                    aria-label="decrement"
                    onClick={() => handleDecrement(aliment.id)}
                    size="large"
                    sx={{ padding: "12px" }}
                  >
                    <RemoveCircleOutlineIcon sx={{ fontSize: 32 }} />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="increment"
                    onClick={() => handleIncrement(aliment.id)}
                    size="large"
                    sx={{ ml: 2, padding: "12px" }}
                  >
                    <AddCircleOutlineIcon sx={{ fontSize: 32 }} />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {selectedAliment && (
        <AlimentModal
          open={Boolean(selectedAliment)}
          handleClose={handleCloseModal}
          aliment={selectedAliment}
          handleSave={onUpdate}
        />
      )}
    </>
  );
};

export default AlimentList;
