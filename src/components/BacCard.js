import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { formatDate } from "../utils/dateUtils";

const BacCard = ({ bac, aliments }) => {
  const { color, type } = bac; // Get color and type from bac prop

  const getExpirationStyle = (expirationDate) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const daysRemaining = (expDate - today) / (1000 * 60 * 60 * 24);

    if (daysRemaining <= 0) {
      return { color: "red", fontWeight: "bold" };
    } else if (daysRemaining <= 3) {
      return { color: "orange" };
    } else {
      return {};
    }
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
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          {type} {/* Bac type */}
        </Typography>

        {aliments.length > 0 ? (
          <List>
            {aliments.map((aliment) => (
              <ListItem key={aliment.id}>
                <ListItemText
                  primary={`${aliment.name}`}
                  secondary={
                    <>
                      <Typography variant="body2" component="span">
                        Quantity: {aliment.quantity} ice cubes
                      </Typography>
                      <Typography
                        variant="body2"
                        component="span"
                        sx={getExpirationStyle(aliment.expirationDate)}
                      >
                        , Expiration: {formatDate(aliment.expirationDate)}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
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
