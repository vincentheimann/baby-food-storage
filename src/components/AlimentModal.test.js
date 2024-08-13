import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AlimentModal from "./AlimentModal";
import { BacContext } from "../context/BacContext";

const mockHandleSave = jest.fn();
const mockHandleClose = jest.fn();
const aliment = {
  name: "",
  freezingDate: "",
  expirationDate: "",
  type: "",
  quantity: 1,
};

const bacs = [
  { id: 1, color: "blue", type: "Proteins", capacity: 12 },
  { id: 2, color: "green", type: "Vegetables", capacity: 12 },
  { id: 3, color: "red", type: "Carbs", capacity: 12 },
  { id: 4, color: "pink", type: "Fruits", capacity: 12 },
];

describe("AlimentModal", () => {
  test("renders AlimentModal component", () => {
    render(
      <BacContext.Provider value={{ bacs }}>
        <AlimentModal
          open={true}
          handleClose={mockHandleClose}
          aliment={aliment}
          handleSave={mockHandleSave}
        />
      </BacContext.Provider>
    );

    expect(screen.getByLabelText(/Food name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Freezing date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expiration date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of ice cubes/i)).toBeInTheDocument();
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
  });

  test("shows validation errors when fields are empty", () => {
    render(
      <BacContext.Provider value={{ bacs }}>
        <AlimentModal
          open={true}
          handleClose={mockHandleClose}
          aliment={aliment}
          handleSave={mockHandleSave}
        />
      </BacContext.Provider>
    );

    fireEvent.click(screen.getByText(/Save/i));

    expect(screen.getByText(/Food name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Freezing date is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Expiration date is required/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Type is required/i)).toBeInTheDocument();
  });

  test("calls handleSave with form data when form is filled correctly", () => {
    render(
      <BacContext.Provider value={{ bacs }}>
        <AlimentModal
          open={true}
          handleClose={mockHandleClose}
          aliment={aliment}
          handleSave={mockHandleSave}
        />
      </BacContext.Provider>
    );

    fireEvent.change(screen.getByLabelText(/Food name/i), {
      target: { value: "Banana" },
    });
    fireEvent.change(screen.getByLabelText(/Freezing date/i), {
      target: { value: "2024-07-01" },
    });
    fireEvent.change(screen.getByLabelText(/Expiration date/i), {
      target: { value: "2024-08-01" },
    });

    fireEvent.mouseDown(screen.getByLabelText(/Type/i));
    fireEvent.click(screen.getByText(/Fruits/i));

    fireEvent.change(screen.getByLabelText(/Number of ice cubes/i), {
      target: { value: 10 },
    });

    fireEvent.click(screen.getByText(/Save/i));

    expect(mockHandleSave).toHaveBeenCalledWith({
      name: "Banana",
      freezingDate: "2024-07-01",
      expirationDate: "2024-08-01",
      type: "Fruits",
      quantity: 10,
    });
  });

  // Additional Test: Ensure Modal Closes on Cancel
  test("calls handleClose when Cancel button is clicked", () => {
    render(
      <BacContext.Provider value={{ bacs }}>
        <AlimentModal
          open={true}
          handleClose={mockHandleClose}
          aliment={aliment}
          handleSave={mockHandleSave}
        />
      </BacContext.Provider>
    );

    fireEvent.click(screen.getByText(/Cancel/i));
    expect(mockHandleClose).toHaveBeenCalled();
  });

  // Additional Test: Ensure the type dropdown is populated correctly
  test("populates the type dropdown with unique values from bacs", () => {
    render(
      <BacContext.Provider value={{ bacs }}>
        <AlimentModal
          open={true}
          handleClose={mockHandleClose}
          aliment={aliment}
          handleSave={mockHandleSave}
        />
      </BacContext.Provider>
    );

    fireEvent.mouseDown(screen.getByLabelText(/Type/i));

    bacs.forEach((bac) => {
      expect(screen.getByText(bac.type)).toBeInTheDocument();
    });
  });
});
