// src/pages/Home.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import { BacContext } from "../context/BacContext";
import AlimentContext from "../context/AlimentContext";

const mockBacs = [
  { id: 1, color: "blue", type: "Protéines" },
  { id: 2, color: "green", type: "Légumes" },
];

const mockAliments = [
  {
    id: 1,
    nom: "Poulet",
    type: "Protéines",
    quantite: 10,
    dateCongelation: "2024-07-01T00:00:00.000Z",
    datePeremption: "2024-08-01T00:00:00.000Z",
  },
  {
    id: 2,
    nom: "Carottes",
    type: "Légumes",
    quantite: 8,
    dateCongelation: "2024-07-05T00:00:00.000Z",
    datePeremption: "2024-08-05T00:00:00.000Z",
  },
];

const mockBacContextValue = {
  bacs: mockBacs,
};

const mockAlimentContextValue = {
  aliments: mockAliments,
  addAliment: jest.fn(),
  decrementAlimentQuantity: jest.fn(),
  incrementAlimentQuantity: jest.fn(),
  updateAliment: jest.fn(),
};

const renderHome = () => {
  render(
    <BacContext.Provider value={mockBacContextValue}>
      <AlimentContext.Provider value={mockAlimentContextValue}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </AlimentContext.Provider>
    </BacContext.Provider>
  );
};

describe("Home", () => {
  test("renders Home component", () => {
    renderHome();
    expect(screen.getByText(/Accueil/i)).toBeInTheDocument();
    expect(screen.getByText(/Ajouter un aliment/i)).toBeInTheDocument();
    expect(screen.getByText(/Liste des aliments/i)).toBeInTheDocument();
  });

  test("renders BacCard components based on bacs context", () => {
    renderHome();
    mockBacs.forEach((bac) => {
      const elements = screen.getAllByText(new RegExp(bac.type, "i"));
      expect(elements.length).toBeGreaterThanOrEqual(1);
    });
  });

  test("renders AlimentList with aliments from context", () => {
    renderHome();
    mockAliments.forEach((aliment) => {
      const elements = screen.getAllByText(new RegExp(aliment.nom, "i"));
      expect(elements.length).toBeGreaterThanOrEqual(1);
    });
  });

  test("calls addAliment on AlimentForm submit", async () => {
    renderHome();
    const nomInput = screen.getByLabelText(/Nom de l'aliment/i);
    const typeSelect = screen.getByLabelText(/Type/i);
    const dateCongelationInput = screen.getByLabelText(/Date de congélation/i);
    const datePeremptionInput = screen.getByLabelText(/Date de péremption/i);
    const quantiteInput = screen.getByLabelText(/Nombre de glaçons/i);
    const submitButton = screen.getByRole("button", { name: /Ajouter/i });

    fireEvent.change(nomInput, { target: { value: "Banane" } });
    fireEvent.change(dateCongelationInput, { target: { value: "2024-07-10" } });
    fireEvent.change(datePeremptionInput, { target: { value: "2024-08-10" } });

    // Open the select dropdown
    fireEvent.mouseDown(typeSelect);

    // Select the option from the dropdown
    const options = await screen.findAllByRole("option");
    const proteinesOption = options.find(
      (option) => option.textContent === "Protéines"
    );
    fireEvent.click(proteinesOption);

    fireEvent.change(quantiteInput, { target: { value: 5 } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAlimentContextValue.addAliment).toHaveBeenCalledWith({
        nom: "Banane",
        type: "Protéines",
        quantite: 5,
        dateCongelation: "2024-07-10",
        datePeremption: "2024-08-10",
      });
    });
  });
});
