import React, { useEffect, useState, useContext } from "react";
import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import { formatDate } from "../utils/dateUtils";
import { AlimentContext } from "../contexts/AlimentContext";

const AlimentPriorityList = () => {
  const { aliments } = useContext(AlimentContext);
  const [sortedAliments, setSortedAliments] = useState([]);

  useEffect(() => {
    // Sort aliments by expiration date
    const sorted = aliments.sort(
      (a, b) => new Date(a.expirationDate) - new Date(b.expirationDate)
    );
    setSortedAliments(sorted);
  }, [aliments]);

  return (
    <>
      {sortedAliments.length === 0 ? (
        <Box textAlign="center" mt={2}>
          <Typography variant="h6">
            No foods to prioritize for consumption
          </Typography>
        </Box>
      ) : (
        <List>
          {sortedAliments.map((aliment) => (
            <ListItem key={aliment.id}>
              <ListItemText
                primary={`${aliment.name} (${aliment.type})`}
                secondary={`Frozen on: ${formatDate(aliment.freezingDate)} | 
                Expiration: ${formatDate(aliment.expirationDate)} | 
                Quantity: ${aliment.quantity} cubes`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default AlimentPriorityList;
