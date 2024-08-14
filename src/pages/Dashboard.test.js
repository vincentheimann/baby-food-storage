import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "./Dashboard";
import { BacContext } from "../contexts/BacContext";
import AlimentContext from "../contexts/AlimentContext";

// Mock data with properly formatted dates
const mockBacs = [
  { id: 1, color: "blue", type: "Proteins" },
  { id: 2, color: "green", type: "Vegetables" },
];

const mockAliments = [
  {
    id: 1,
    name: "Chicken",
    freezingDate: "2024-07-01", // YYYY-MM-DD format
    expirationDate: "2024-08-01", // YYYY-MM-DD format
    type: "Proteins",
    quantity: 10,
  },
  {
    id: 2,
    name: "Carrots",
    freezingDate: "2024-07-05",
    expirationDate: "2024-08-05",
    type: "Vegetables",
    quantity: 8,
  },
];

const mockBacContextValue = {
  bacs: mockBacs,
};

const mockAlimentContextValue = {
  aliments: mockAliments,
};

// Utility function to render the Dashboard component within the necessary context providers
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
  // Test if the Dashboard component renders correctly
  test("renders Dashboard component", () => {
    renderDashboard();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Distribution of Food Types/i)).toBeInTheDocument();
    expect(screen.getByText(/Foods to Consume First/i)).toBeInTheDocument();
  });

  // Test if the pie chart renders with the correct data
  test("renders pie chart with correct data", () => {
    renderDashboard();
    const pieChartLegend = screen.getByLabelText("Pie chart legend");
    const legendItems = within(pieChartLegend).getAllByRole("listitem");
    expect(legendItems).toHaveLength(2); // Adjust this based on how many items you expect
    expect(screen.getAllByText(/Proteins/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Vegetables/i).length).toBeGreaterThan(0);
  });

  // Test if the BacCard components are rendered based on the context data
  test("renders BacCard components based on bacs context", () => {
    renderDashboard();
    mockBacs.forEach((bac) => {
      expect(
        screen.getAllByText(new RegExp(bac.type, "i")).length
      ).toBeGreaterThanOrEqual(1);
    });
  });

  // Test if the AlimentPriorityList renders aliments close to expiration
  test("renders AlimentPriorityList with aliments close to expiration", () => {
    renderDashboard();
    const alimentsCloseToExpiration = mockAliments.filter((aliment) => {
      const today = new Date();
      const expirationDate = new Date(aliment.expirationDate);
      const diffDays = (expirationDate - today) / (1000 * 60 * 60 * 24);
      return diffDays <= 7; // Aliments whose expiration date is in 7 days or less
    });

    alimentsCloseToExpiration.forEach((aliment) => {
      expect(
        screen.getAllByText(new RegExp(aliment.name, "i")).length
      ).toBeGreaterThan(0);
    });
  });
});
