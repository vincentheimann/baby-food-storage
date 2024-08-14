// src/pages/Dashboard.js
import React, { useContext } from "react";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import BacCard from "../components/BacCard";
import { BacContext } from "../contexts/BacContext";
import AlimentContext from "../contexts/AlimentContext";
import { PieChart } from "@mui/x-charts/PieChart";
import AlimentPriorityList from "../components/AlimentPriorityList";

const Dashboard = () => {
  const { bacs } = useContext(BacContext);
  const { aliments } = useContext(AlimentContext);

  const getTypeLabel = (type) => {
    switch (type) {
      case "Proteins":
        return "Proteins";
      case "Vegetables":
        return "Vegetables";
      case "Carbs":
        return "Carbs";
      case "Fruits":
        return "Fruits";
      default:
        return type;
    }
  };

  const getColorByType = (type) => {
    switch (type) {
      case "Proteins":
        return "blue";
      case "Vegetables":
        return "green";
      case "Carbs":
        return "red";
      case "Fruits":
        return "pink";
      default:
        return "grey";
    }
  };

  const filterAlimentsByType = (type) => {
    return aliments.filter((aliment) => aliment.type === type);
  };

  const alimentsCloseToExpiration = aliments.filter((aliment) => {
    const today = new Date();
    const expirationDate = new Date(aliment.expirationDate);
    const diffDays = (expirationDate - today) / (1000 * 60 * 60 * 24);
    return diffDays <= 7; // Aliments whose expiration date is within 7 days or less
  });

  const alimentTypes = aliments.reduce((acc, aliment) => {
    acc[aliment.type] = (acc[aliment.type] || 0) + aliment.quantity;
    return acc;
  }, {});

  const pieChartData = Object.keys(alimentTypes).map((key, index) => ({
    id: index,
    value: alimentTypes[key],
    label: getTypeLabel(key),
    color: getColorByType(key),
  }));

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" component="h1" gutterBottom>
            Dashboard
          </Typography>
          <Box mt={5}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="h2" gutterBottom>
                  Distribution of Food Types
                </Typography>
                <PieChart
                  series={[{ data: pieChartData }]}
                  width={400}
                  height={200}
                  colors={pieChartData.map((data) => data.color)}
                />
                <ul aria-label="Pie chart legend">
                  {pieChartData.map((data) => (
                    <li key={data.id}>{data.label}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        {bacs.map((bac) => (
          <Grid item xs={12} key={bac.id}>
            <BacCard
              color={bac.color}
              type={bac.type}
              aliments={filterAlimentsByType(bac.type)}
            />
          </Grid>
        ))}
      </Grid>
      <Box mt={5}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom>
              Foods to Consume First
            </Typography>
            <AlimentPriorityList aliments={alimentsCloseToExpiration} />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Dashboard;
