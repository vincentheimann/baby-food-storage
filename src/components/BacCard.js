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

const BacCard = ({ color, type, aliments }) => {
  return (
    <Card style={{ borderColor: color, borderWidth: 2, borderStyle: "solid" }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {type}
        </Typography>
        <List>
          {aliments.map((aliment) => (
            <ListItem key={aliment.id}>
              <ListItemText
                primary={`${aliment.nom}`}
                secondary={`Quantité : ${aliment.quantite} glaçons`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default BacCard;
