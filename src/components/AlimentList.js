// AlimentList.js
import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

const AlimentList = ({ aliments }) => {
  return (
    <List>
      {aliments.map((aliment) => (
        <ListItem key={aliment.id}>
          <ListItemText
            primary={aliment.nom}
            secondary={`Expire le ${aliment.datePeremption}`}
            style={{
              color:
                new Date(aliment.datePeremption) < new Date()
                  ? "red"
                  : "inherit",
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default AlimentList;
