import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
  LinearProgress,
  Divider,
} from "@mui/material";
import IcecreamIcon from "@mui/icons-material/Icecream";
import { formatDate } from "../utils/dateUtils";

const BacCard = ({ bac, aliments, onItemClick }) => {
  const { name, color, type } = bac; // Get name, color, and type from bac prop

  const getExpirationStyle = (expirationDate) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const daysRemaining = Math.floor((expDate - today) / (1000 * 60 * 60 * 24));

    if (daysRemaining <= 0) {
      return { color: "red", fontWeight: "bold" };
    } else if (daysRemaining <= 3) {
      return { color: "orange" };
    } else {
      return {};
    }
  };

  // Function to determine the progress bar color based on days remaining
  const getExpirationProgressColor = (expirationDate) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const daysRemaining = Math.floor((expDate - today) / (1000 * 60 * 60 * 24));

    if (daysRemaining <= 3) {
      return "error"; // Red
    } else if (daysRemaining <= 10) {
      return "warning"; // Orange
    } else {
      return "success"; // Green
    }
  };

  // Progress bar calculation (days left / 30 days max as example)
  const getExpirationProgress = (expirationDate) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const totalDays = 30; // Example maximum days until expiration
    const daysRemaining = Math.max(
      0,
      (expDate - today) / (1000 * 60 * 60 * 24)
    );
    return (daysRemaining / totalDays) * 100;
  };

  return (
    <Card
      sx={{
        borderColor: color,
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 2,
        "&:hover": { boxShadow: 4 }, // Hover feedback
      }}
    >
      <CardContent>
        {/* Bac Name and Type */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
            {name} {/* Display bac name */}
          </Typography>
          <Chip label={type} color="primary" variant="outlined" />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Aliments List */}
        {aliments.length > 0 ? (
          <Grid container spacing={2}>
            {aliments.map((aliment) => (
              <Grid item xs={12} sm={6} key={aliment.id}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    padding: 2,
                    textAlign: "center",
                    backgroundColor: "#f9f9f9",
                    cursor: "pointer", // Add pointer for click
                  }}
                  onClick={() => onItemClick(aliment)} // Trigger modal when clicked
                >
                  <IcecreamIcon sx={{ fontSize: 40, color: color }} />
                  <Typography variant="h6">{aliment.name}</Typography>
                  <Typography variant="body2">
                    Quantity: {aliment.quantity} ice cubes
                  </Typography>

                  {/* Expiration info with progress bar */}
                  <Box mt={1} width="100%">
                    <LinearProgress
                      variant="determinate"
                      value={getExpirationProgress(aliment.expirationDate)}
                      color={getExpirationProgressColor(aliment.expirationDate)}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: "center",
                        mt: 1,
                        ...getExpirationStyle(aliment.expirationDate),
                      }}
                    >
                      Expiration: {formatDate(aliment.expirationDate)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box textAlign="center" mt={2}>
            <Typography variant="body2" color="text.secondary">
              No food items in this tray.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default BacCard;
