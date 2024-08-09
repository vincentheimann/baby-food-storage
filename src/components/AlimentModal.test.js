import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AlimentModal from "./AlimentModal";

const mockHandleSave = jest.fn();
const mockHandleClose = jest.fn();
const aliment = {
  name: "",
  freezingDate: "",
  expirationDate: "",
  type: "",
  quantity: 1,
};

describe("AlimentModal", () => {
  test("renders AlimentModal component", () => {
    render(
      <AlimentModal
        open={true}
        handleClose={mockHandleClose}
        aliment={aliment}
        handleSave={mockHandleSave}
      />
    );

    expect(screen.getByLabelText(/Food name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Freezing date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Best before date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of ice cubes/i)).toBeInTheDocument();
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
  });

  test("shows validation errors when fields are empty", () => {
    render(
      <AlimentModal
        open={true}
        handleClose={mockHandleClose}
        aliment={aliment}
        handleSave={mockHandleSave}
      />
    );

    fireEvent.click(screen.getByText(/Save/i));

    expect(screen.getByText(/Food name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Freezing date is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Best before date is required/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Type is required/i)).toBeInTheDocument();
  });

  test("calls handleSave with form data when form is filled correctly", () => {
    render(
      <AlimentModal
        open={true}
        handleClose={mockHandleClose}
        aliment={aliment}
        handleSave={mockHandleSave}
      />
    );

    fireEvent.change(screen.getByLabelText(/Food name/i), {
      target: { value: "Banana" },
    });
    fireEvent.change(screen.getByLabelText(/Freezing date/i), {
      target: { value: "2024-07-01" },
    });
    fireEvent.change(screen.getByLabelText(/Best before date/i), {
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
});
