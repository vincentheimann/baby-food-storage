// src/components/AlimentList.js
import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AlimentModal from "./AlimentModal";

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
      <List>
        {aliments.map((aliment) => (
          <ListItem
            button
            key={aliment.id}
            onClick={() => handleItemClick(aliment)}
          >
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
