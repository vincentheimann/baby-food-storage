import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AlimentForm from "./AlimentForm";
import { BacContext } from "../context/BacContext";

const mockSubmit = jest.fn();
const mockBacs = [
  { id: 1, color: "blue", type: "Proteins", capacity: 12 },
  { id: 2, color: "green", type: "Vegetables", capacity: 12 },
  { id: 3, color: "red", type: "Carbs", capacity: 12 },
  { id: 4, color: "pink", type: "Fruits", capacity: 12 },
];

describe("AlimentForm", () => {
  const renderWithContext = (component) => {
    return render(
      <BacContext.Provider value={{ bacs: mockBacs }}>
        {component}
      </BacContext.Provider>
    );
  };

  test("renders AlimentForm component", () => {
    renderWithContext(<AlimentForm onSubmit={mockSubmit} />);

    expect(screen.getByLabelText(/Food name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Freezing date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expiration date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of ice cubes/i)).toBeInTheDocument();
    expect(screen.getByText(/Add/i)).toBeInTheDocument();
  });

  test("shows validation errors when fields are empty", () => {
    renderWithContext(<AlimentForm onSubmit={mockSubmit} />);

    fireEvent.click(screen.getByText(/Add/i));

    expect(screen.getByText(/The food name is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/The freezing date is required/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The expiration date is required/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/The type is required/i)).toBeInTheDocument();
  });

  test("calls onSubmit with form data when form is filled correctly", () => {
    renderWithContext(<AlimentForm onSubmit={mockSubmit} />);

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

    fireEvent.click(screen.getByText(/Add/i));

    expect(mockSubmit).toHaveBeenCalledWith({
      name: "Banana",
      freezingDate: "2024-07-01",
      expirationDate: "2024-08-01",
      type: "Fruits",
      quantity: 10,
    });
  });
});
