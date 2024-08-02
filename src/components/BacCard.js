// src/components/BacCard.js
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const BacCard = ({ color, type, aliments }) => {
  return (
    <Card variant="outlined" style={{ borderColor: color, borderWidth: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {type}
        </Typography>
        {aliments.length > 0 ? (
          aliments.map((aliment) => (
            <Typography key={aliment.id} variant="body2" color="text.secondary">
              {aliment.nom} (Expire le {aliment.datePeremption})
            </Typography>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            Aucun aliment
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default BacCard;
