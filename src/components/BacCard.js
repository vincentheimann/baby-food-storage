import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { formatDate } from "../utils/dateUtils";

const BacCard = ({ color, type, aliments }) => {
  // Style adjustments based on the bac type
  const getTypeSpecificStyles = (type) => {
    switch (type) {
      case "Proteins":
        return { backgroundColor: "#f0f4c3" };
      case "Vegetables":
        return { backgroundColor: "#c8e6c9" };
      case "Carbs":
        return { backgroundColor: "#ffccbc" };
      case "Fruits":
        return { backgroundColor: "#f8bbd0" };
      default:
        return { backgroundColor: "#ffffff" };
    }
  };

  return (
    <Card
      style={{
        borderColor: color,
        borderWidth: 2,
        borderStyle: "solid",
        ...getTypeSpecificStyles(type),
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {type}
        </Typography>
        <List>
          {aliments.map((aliment) => (
            <ListItem key={aliment.id}>
              <ListItemText
                primary={`${aliment.name}`}
                secondary={`Quantity: ${
                  aliment.quantity
                } ice cubes, Expiration: ${formatDate(aliment.expirationDate)}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default BacCard;
