// /src/components/TrayOverview.js
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  IconButton,
  Grid,
  CardActions,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const TrayOverview = ({ trays, onEdit, onDelete }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Your Trays</Typography>
      </Grid>
      {trays.length === 0 ? (
        <Grid item xs={12}>
          <Typography>No trays available.</Typography>
        </Grid>
      ) : (
        trays.map((tray) => {
          const progressPercentage = (tray.used / tray.capacity) * 100 || 0;

          return (
            <Grid item key={tray.id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography
                    variant="h6"
                    onClick={() => onEdit(tray)}
                    sx={{ cursor: "pointer", color: "primary.main" }}
                  >
                    {tray.name}
                  </Typography>
                  <Typography variant="body2">
                    {tray.used}/{tray.capacity} cubes used
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={progressPercentage}
                    sx={{ mt: 1, mb: 1 }}
                  />
                </CardContent>
                <CardActions>
                  <IconButton
                    aria-label="edit tray"
                    onClick={() => onEdit(tray)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete tray"
                    onClick={() => onDelete(tray)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })
      )}
    </Grid>
  );
};

export default TrayOverview;
