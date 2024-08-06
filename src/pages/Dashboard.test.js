// src/pages/Dashboard.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { UserProvider } from "../context/UserContext";
import { BacProvider } from "../context/BacContext";
import { AlimentProvider } from "../context/AlimentContext";

test("renders Dashboard with Pie Chart", async () => {
  render(
    <UserProvider>
      <BacProvider>
        <AlimentProvider>
          <Dashboard />
        </AlimentProvider>
      </BacProvider>
    </UserProvider>
  );

  // Vérifiez que le composant PieChart est rendu
  const pieChartElement = screen.getByText(/Répartition des Types d'Aliments/i);
  expect(pieChartElement).toBeInTheDocument();
});
