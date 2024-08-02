// src/components/BacCard.js
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const BacCard = ({ color, type, aliments }) => {
  return (
    <Card style={{ borderColor: color, borderWidth: 2 }}>
      <CardContent>
        <Typography variant="h5">{type}</Typography>
        <Typography variant="body2">
          {aliments.map((aliment) => (
            <div key={aliment.id}>
              {aliment.nom} (Expire le {aliment.datePeremption})
            </div>
          ))}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BacCard;
