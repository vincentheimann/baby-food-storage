// src/pages/BacConfig.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BacConfig from "./BacConfig";
import { BacContext } from "../context/BacContext";

const mockBacs = [
  { id: 1, color: "blue", type: "Proteins", capacity: 12 },
  { id: 2, color: "green", type: "Vegetables", capacity: 15 },
];

const mockBacContextValue = {
  bacs: mockBacs,
  updateBac: jest.fn(),
  addBac: jest.fn(),
  removeBac: jest.fn(),
};

const renderBacConfig = () => {
  render(
    <BacContext.Provider value={mockBacContextValue}>
      <BacConfig />
    </BacContext.Provider>
  );
};

describe("BacConfig", () => {
  test("renders BacConfig component", () => {
    renderBacConfig();
    expect(
      screen.getByText(/Configuration des Bacs à Glaçons/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Ajouter un Nouveau Bac/i)).toBeInTheDocument();
    mockBacs.forEach((bac) => {
      const bacColorInput = screen.getByDisplayValue(bac.color);
      const bacTypeInput = screen.getByDisplayValue(bac.type);
      const bacCapacityInput = screen.getByDisplayValue(String(bac.capacity));

      expect(bacColorInput).toBeInTheDocument();
      expect(bacTypeInput).toBeInTheDocument();
      expect(bacCapacityInput).toBeInTheDocument();
    });
  });

  test("updates existing bac values", () => {
    renderBacConfig();
    const newColor = "red";
    fireEvent.change(screen.getByDisplayValue("blue"), {
      target: { value: newColor },
    });
    expect(mockBacContextValue.updateBac).toHaveBeenCalledWith(1, {
      color: newColor,
    });
  });

  test("adds a new bac", () => {
    renderBacConfig();
    const colorInput = screen.getAllByLabelText(/Couleur/i).pop();
    const typeInput = screen.getAllByLabelText(/Type/i).pop();
    const capacityInput = screen.getAllByLabelText(/Capacité/i).pop();
    fireEvent.change(colorInput, { target: { value: "yellow" } });
    fireEvent.change(typeInput, { target: { value: "Fruits" } });
    fireEvent.change(capacityInput, { target: { value: 20 } });
    fireEvent.click(screen.getAllByText(/Ajouter/i).pop());
    expect(mockBacContextValue.addBac).toHaveBeenCalledWith({
      color: "yellow",
      type: "Fruits",
      capacity: 20,
    });
  });

  test("removes an existing bac", () => {
    renderBacConfig();
    // Find the delete button by the icon inside it
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    expect(mockBacContextValue.removeBac).toHaveBeenCalledWith(1);
  });
});
