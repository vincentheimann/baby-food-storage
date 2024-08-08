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
import { BacContext } from "../context/BacContext";
import AlimentContext from "../context/AlimentContext";
import { PieChart } from "@mui/x-charts/PieChart";
import AlimentPriorityList from "../components/AlimentPriorityList";

const Dashboard = () => {
  const { bacs } = useContext(BacContext);
  const { aliments } = useContext(AlimentContext);

  const getTypeTranslation = (type) => {
    switch (type) {
      case "Proteins":
        return "Protéines";
      case "Vegetables":
        return "Légumes";
      case "Carbs":
        return "Féculents";
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

  const alimentsProchesDePeremption = aliments.filter((aliment) => {
    const today = new Date();
    const peremptionDate = new Date(aliment.datePeremption);
    const diffDays = (peremptionDate - today) / (1000 * 60 * 60 * 24);
    return diffDays <= 7; // Aliments dont la date de péremption est dans 7 jours ou moins
  });

  const alimentTypes = aliments.reduce((acc, aliment) => {
    acc[aliment.type] = (acc[aliment.type] || 0) + aliment.quantite;
    return acc;
  }, {});

  const pieChartData = Object.keys(alimentTypes).map((key, index) => ({
    id: index,
    value: alimentTypes[key],
    label: getTypeTranslation(key),
    color: getColorByType(key),
  }));

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" component="h1" gutterBottom>
            Tableau de bord
          </Typography>
          <Box mt={5}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="h2" gutterBottom>
                  Répartition des Types d'Aliments
                </Typography>
                <PieChart
                  series={[{ data: pieChartData }]}
                  width={400}
                  height={200}
                  colors={pieChartData.map((data) => data.color)}
                />
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
              Aliments à consommer en priorité
            </Typography>
            <AlimentPriorityList aliments={alimentsProchesDePeremption} />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Dashboard;
