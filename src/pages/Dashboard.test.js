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
    nom: "Chicken",
    dateCongelation: "2024-07-01",
    datePeremption: "2024-08-01",
    type: "Proteins",
    quantite: 10,
  },
  {
    id: 2,
    nom: "Carrots",
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
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Food Type Distribution/i)).toBeInTheDocument();
    expect(screen.getByText(/Priority Foods to Consume/i)).toBeInTheDocument();
  });

  test("renders pie chart with correct data", () => {
    renderDashboard();
    const pieChartLegend = screen.getByLabelText("Pie chart legend");
    const legendItems = within(pieChartLegend).getAllByRole("listitem");
    expect(legendItems).toHaveLength(2); // Adjust this based on how many items you expect
    expect(screen.getAllByText(/Proteins/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Vegetables/i).length).toBeGreaterThan(0);
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
      const expirationDate = new Date(aliment.datePeremption);
      const diffDays = (expirationDate - today) / (1000 * 60 * 60 * 24);
      return diffDays <= 7; // Aliments whose Best before date is in 7 days or less
    });

    alimentsCloseToExpiration.forEach((aliment) => {
      expect(
        screen.getAllByText(new RegExp(aliment.nom, "i")).length
      ).toBeGreaterThan(0);
    });
  });
});
