// src/components/AlimentList.js
import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const AlimentList = ({ aliments, onDecrement, onIncrement }) => {
  return (
    <List>
      {aliments.map((aliment) => (
        <ListItem key={aliment.id}>
          <ListItemText
            primary={`${aliment.nom} (${aliment.type})`}
            secondary={`Congelé le : ${aliment.dateCongelation} | Péremption : ${aliment.datePeremption} | Quantité : ${aliment.quantite} glaçons`}
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="decrement"
              onClick={() => onDecrement(aliment.id)}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="increment"
              onClick={() => onIncrement(aliment.id)}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default AlimentList;
