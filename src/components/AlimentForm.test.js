// src/components/AlimentForm.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AlimentForm from "./AlimentForm";

const mockSubmit = jest.fn();

describe("AlimentForm", () => {
  test("renders AlimentForm component", () => {
    render(<AlimentForm onSubmit={mockSubmit} />);

    expect(screen.getByLabelText(/Nom de l'aliment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date de congélation/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date de péremption/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre de glaçons/i)).toBeInTheDocument();
    expect(screen.getByText(/Ajouter/i)).toBeInTheDocument();
  });

  test("shows validation errors when fields are empty", () => {
    render(<AlimentForm onSubmit={mockSubmit} />);

    fireEvent.click(screen.getByText(/Ajouter/i));

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

  test("calls onSubmit with form data when form is filled correctly", () => {
    render(<AlimentForm onSubmit={mockSubmit} />);

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

    fireEvent.click(screen.getByText(/Ajouter/i));

    expect(mockSubmit).toHaveBeenCalledWith({
      nom: "Banane",
      dateCongelation: "2024-07-01",
      datePeremption: "2024-08-01",
      type: "Fruits",
      quantite: 10,
    });
  });
});
