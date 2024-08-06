// src/components/AlimentPriorityList.js
import React from "react";
import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import { formatDate } from "../utils/dateUtils";

const AlimentPriorityList = ({ aliments }) => {
  // Trier les aliments par date de péremption
  const sortedAliments = aliments.sort(
    (a, b) => new Date(a.datePeremption) - new Date(b.datePeremption)
  );

  return (
    <>
      {sortedAliments.length === 0 ? (
        <Box textAlign="center" mt={2}>
          <Typography variant="h6">
            Aucun aliment à consommer en priorité
          </Typography>
        </Box>
      ) : (
        <List>
          {sortedAliments.map((aliment) => (
            <ListItem key={aliment.id}>
              <ListItemText
                primary={`${aliment.nom} (${aliment.type})`}
                secondary={`Congelé le : ${formatDate(
                  aliment.dateCongelation
                )} | Péremption : ${formatDate(
                  aliment.datePeremption
                )} | Quantité : ${aliment.quantite} glaçons`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default AlimentPriorityList;
