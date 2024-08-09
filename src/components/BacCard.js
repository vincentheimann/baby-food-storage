import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { formatDate } from "../utils/dateUtils";

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
                primary={`${aliment.name}`}
                secondary={`Quantity: ${
                  aliment.quantity
                } ice cubes, Expiration: ${formatDate(aliment.expirationDate)}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default BacCard;
