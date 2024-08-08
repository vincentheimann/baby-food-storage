// src/components/AlimentModal.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AlimentModal from "./AlimentModal";

const mockHandleSave = jest.fn();
const mockHandleClose = jest.fn();
const aliment = {
  nom: "",
  dateCongelation: "",
  datePeremption: "",
  type: "",
  quantite: 1,
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

    expect(screen.getByLabelText(/Nom de l'aliment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date de congélation/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date de péremption/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre de glaçons/i)).toBeInTheDocument();
    expect(screen.getByText(/Sauvegarder/i)).toBeInTheDocument();
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

    fireEvent.click(screen.getByText(/Sauvegarder/i));

    expect(
      screen.getByText(/Le nom de l'aliment est requis/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/La date de congélation est requise/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/La date de péremption est requise/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Le type est requis/i)).toBeInTheDocument();
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

    fireEvent.change(screen.getByLabelText(/Nom de l'aliment/i), {
      target: { value: "Banane" },
    });
    fireEvent.change(screen.getByLabelText(/Date de congélation/i), {
      target: { value: "2024-07-01" },
    });
    fireEvent.change(screen.getByLabelText(/Date de péremption/i), {
      target: { value: "2024-08-01" },
    });

    fireEvent.mouseDown(screen.getByLabelText(/Type/i));
    fireEvent.click(screen.getByText(/Fruits/i));

    fireEvent.change(screen.getByLabelText(/Nombre de glaçons/i), {
      target: { value: 10 },
    });

    fireEvent.click(screen.getByText(/Sauvegarder/i));

    expect(mockHandleSave).toHaveBeenCalledWith({
      nom: "Banane",
      dateCongelation: "2024-07-01",
      datePeremption: "2024-08-01",
      type: "Fruits",
      quantite: 10, // Make sure this is a number, not a string
    });
  });
});
