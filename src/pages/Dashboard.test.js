// src/pages/Dashboard.test.js
import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "./Dashboard";
import { BacContext } from "../context/BacContext";
import AlimentContext from "../context/AlimentContext";

const mockBacs = [
  { id: 1, color: "blue", type: "Proteins" },
  { id: 2, color: "green", type: "Vegetables" },
];

const mockAliments = [
  {
    id: 1,
    nom: "Poulet",
    dateCongelation: "2024-07-01",
    datePeremption: "2024-08-01",
    type: "Proteins",
    quantite: 10,
  },
  {
    id: 2,
    nom: "Carottes",
    dateCongelation: "2024-07-05",
    datePeremption: "2024-08-05",
    type: "Vegetables",
    quantite: 8,
  },
];

const mockBacContextValue = {
  bacs: mockBacs,
};

const mockAlimentContextValue = {
  aliments: mockAliments,
};

const renderDashboard = () => {
  render(
    <BacContext.Provider value={mockBacContextValue}>
      <AlimentContext.Provider value={mockAlimentContextValue}>
        <Dashboard />
      </AlimentContext.Provider>
    </BacContext.Provider>
  );
};

describe("Dashboard", () => {
  test("renders Dashboard component", () => {
    renderDashboard();
    expect(screen.getByText(/Tableau de bord/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Répartition des Types d'Aliments/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Aliments à consommer en priorité/i)
    ).toBeInTheDocument();
  });

  test("renders pie chart with correct data", () => {
    renderDashboard();
    const pieChartLegend = screen.getByLabelText("Pie chart legend");
    const legendItems = within(pieChartLegend).getAllByRole("listitem");
    expect(legendItems).toHaveLength(2); // Adjust this based on how many items you expect
    expect(screen.getAllByText(/Protéines/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Légumes/i).length).toBeGreaterThan(0);
  });

  test("renders BacCard components based on bacs context", () => {
    renderDashboard();
    mockBacs.forEach((bac) => {
      expect(screen.getByText(new RegExp(bac.type, "i"))).toBeInTheDocument();
    });
  });

  test("renders AlimentPriorityList with aliments close to expiration", () => {
    renderDashboard();
    const alimentsCloseToExpiration = mockAliments.filter((aliment) => {
      const today = new Date();
      const peremptionDate = new Date(aliment.datePeremption);
      const diffDays = (peremptionDate - today) / (1000 * 60 * 60 * 24);
      return diffDays <= 7; // Aliments dont la date de péremption est dans 7 jours ou moins
    });

    alimentsCloseToExpiration.forEach((aliment) => {
      expect(
        screen.getAllByText(new RegExp(aliment.nom, "i")).length
      ).toBeGreaterThan(0);
    });
  });
});
