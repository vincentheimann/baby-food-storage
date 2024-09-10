import React, { useState, useEffect } from "react";
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
  const [error, setError] = useState(null); // Error state
  const [localAliments, setLocalAliments] = useState(aliments); // Local state for optimistic updates
  const [loadingAlimentId, setLoadingAlimentId] = useState(null); // Track which aliment is being updated

  useEffect(() => {
    setLocalAliments(aliments); // Ensure local state is in sync with props
  }, [aliments]);

  // Optimistically update quantity and call the increment function in the background
  const handleIncrement = async (id) => {
    const aliment = localAliments.find((aliment) => aliment.id === id);
    if (!aliment) return;

    const updatedAliments = localAliments.map((aliment) =>
      aliment.id === id
        ? { ...aliment, quantity: aliment.quantity + 1 }
        : aliment
    );

    setLocalAliments(updatedAliments); // Optimistic update
    setLoadingAlimentId(id); // Set loading state for this aliment

    try {
      await onIncrement(id); // Perform the increment operation
      setError(null); // Clear error on success
    } catch (err) {
      setError("Failed to increment quantity.");
      setLocalAliments(aliments); // Revert back to original state on error
    } finally {
      setLoadingAlimentId(null); // Clear loading state
    }
  };

  // Optimistically update quantity and call the decrement function in the background
  const handleDecrement = async (id) => {
    const aliment = localAliments.find((aliment) => aliment.id === id);
    if (aliment.quantity === 0) return; // Prevent decrementing below 0

    const updatedAliments = localAliments.map((aliment) =>
      aliment.id === id
        ? { ...aliment, quantity: Math.max(aliment.quantity - 1, 0) }
        : aliment
    );

    setLocalAliments(updatedAliments); // Optimistic update
    setLoadingAlimentId(id); // Set loading state for this aliment

    try {
      await onDecrement(id); // Perform the decrement operation
      setError(null); // Clear error on success
    } catch (err) {
      setError("Failed to decrement quantity.");
      setLocalAliments(aliments); // Revert back to original state on error
    } finally {
      setLoadingAlimentId(null); // Clear loading state
    }
  };

  const handleItemClick = (aliment) => {
    setSelectedAliment(aliment);
  };

  const handleCloseModal = () => {
    setSelectedAliment(null);
  };

  return (
    <>
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
      {localAliments.length === 0 ? (
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
          {localAliments.map((aliment) => (
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
                    disabled={loadingAlimentId === aliment.id} // Disable button during loading
                  >
                    <RemoveCircleOutlineIcon sx={{ fontSize: 32 }} />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="increment"
                    onClick={() => handleIncrement(aliment.id)}
                    size="large"
                    sx={{ ml: 2, padding: "12px" }}
                    disabled={loadingAlimentId === aliment.id} // Disable button during loading
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
