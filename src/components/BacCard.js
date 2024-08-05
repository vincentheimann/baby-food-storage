// src/components/BacCard.js
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
  const getTypeTranslation = (type) => {
    switch (type) {
      case "Proteins":
        return "Protéines";
      case "Vegetables":
        return "Légumes";
      case "Carbs":
        return "Féculents";
      case "Others":
        return "Autres";
      default:
        return type;
    }
  };

  return (
    <Card style={{ borderColor: color, borderWidth: 2, borderStyle: "solid" }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {getTypeTranslation(type)}
        </Typography>
        <List>
          {aliments.map((aliment) => (
            <ListItem key={aliment.id}>
              <ListItemText
                primary={`${aliment.nom}`}
                secondary={`Quantité : ${
                  aliment.quantite
                } glaçons, Péremption : ${formatDate(aliment.datePeremption)}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default BacCard;
