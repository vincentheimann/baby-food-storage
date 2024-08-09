import React from "react";
import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import { formatDate } from "../utils/dateUtils";

const AlimentPriorityList = ({ aliments }) => {
  // Sort foods by Best before date
  const sortedAliments = aliments.sort(
    (a, b) => new Date(a.expirationDate) - new Date(b.expirationDate)
  );

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
                secondary={`Frozen on: ${formatDate(
                  aliment.freezingDate
                )} | Best before: ${formatDate(
                  aliment.expirationDate
                )} | Quantity: ${aliment.quantity} cubes`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default AlimentPriorityList;
