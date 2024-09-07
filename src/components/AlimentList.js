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

  const handleItemClick = (aliment) => {
    setSelectedAliment(aliment);
  };

  const handleCloseModal = () => {
    setSelectedAliment(null);
  };

  return (
    <>
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
            <Grid item xs={12} key={aliment.id}>
              <Card sx={{ display: "flex", width: "100%", mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <CardContent
                    sx={{ flex: "1 0 auto" }}
                    onClick={() => handleItemClick(aliment)}
                  >
                    <Typography
                      component="div"
                      variant="h4"
                      sx={{ fontSize: { xs: "1.2rem", md: "2rem" } }}
                    >
                      {`${aliment.name}`}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{ color: "text.secondary" }}
                    >
                      {aliment.type}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ color: "text.secondary" }}
                    >
                      {`Frozen on: ${formatDate(aliment.freezingDate)}`}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ color: "text.secondary" }}
                    >
                      {`Expiration: ${formatDate(aliment.expirationDate)}`}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ color: "text.secondary" }}
                    >
                      {`Quantity: ${aliment.quantity} ice cubes`}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      pl: 1,
                      pb: 1,
                    }}
                  >
                    <IconButton
                      edge="end"
                      aria-label="decrement"
                      onClick={() => onDecrement(aliment.id)}
                      size="large"
                      sx={{ padding: "12px" }}
                    >
                      <RemoveCircleOutlineIcon sx={{ fontSize: 32 }} />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="increment"
                      onClick={() => onIncrement(aliment.id)}
                      size="large"
                      sx={{ ml: 2, padding: "12px" }}
                    >
                      <AddCircleOutlineIcon sx={{ fontSize: 32 }} />
                    </IconButton>
                  </Box>
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
