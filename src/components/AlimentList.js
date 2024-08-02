// src/components/AlimentList.js
import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const AlimentList = ({ aliments }) => {
  return (
    <List>
      {aliments.map((aliment) => (
        <ListItem key={aliment.id}>
          <ListItemText
            primary={
              <Typography style={{ color: "red" }}>{aliment.nom}</Typography>
            }
            secondary={`Expire le ${aliment.datePeremption}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default AlimentList;
