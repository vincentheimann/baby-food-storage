import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import { BacContext } from "../context/BacContext";
import AlimentContext from "../context/AlimentContext";

const mockBacs = [
  { id: 1, color: "blue", type: "Proteins" },
  { id: 2, color: "green", type: "Vegetables" },
];

const mockAliments = [
  {
    id: 1,
    name: "Chicken",
    type: "Proteins",
    quantity: 10,
    freezingDate: "2024-07-01T00:00:00.000Z",
    expirationDate: "2024-08-01T00:00:00.000Z",
  },
  {
    id: 2,
    name: "Carrots",
    type: "Vegetables",
    quantity: 8,
    freezingDate: "2024-07-05T00:00:00.000Z",
    expirationDate: "2024-08-05T00:00:00.000Z",
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
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Add a food item/i)).toBeInTheDocument();
    expect(screen.getByText(/Food list/i)).toBeInTheDocument();
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
      const elements = screen.getAllByText(new RegExp(aliment.name, "i"));
      expect(elements.length).toBeGreaterThanOrEqual(1);
    });
  });

  test("calls addAliment on AlimentForm submit", async () => {
    renderHome();
    const nameInput = screen.getByLabelText(/Food name/i);
    const typeSelect = screen.getByLabelText(/Type/i);
    const freezingDateInput = screen.getByLabelText(/Freezing date/i);
    const expirationDateInput = screen.getByLabelText(/Expiration date/i);
    const quantityInput = screen.getByLabelText(/Number of ice cubes/i);
    const submitButton = screen.getByRole("button", { name: /Add/i });

    fireEvent.change(nameInput, { target: { value: "Banana" } });
    fireEvent.change(freezingDateInput, { target: { value: "2024-07-10" } });
    fireEvent.change(expirationDateInput, { target: { value: "2024-08-10" } });

    // Open the select dropdown
    fireEvent.mouseDown(typeSelect);

    // Select the option from the dropdown
    const options = await screen.findAllByRole("option");
    const proteinsOption = options.find(
      (option) => option.textContent === "Proteins"
    );
    fireEvent.click(proteinsOption);

    fireEvent.change(quantityInput, { target: { value: 5 } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAlimentContextValue.addAliment).toHaveBeenCalledWith({
        name: "Banana",
        type: "Proteins",
        quantity: 5,
        freezingDate: "2024-07-10",
        expirationDate: "2024-08-10",
      });
    });
  });
});
