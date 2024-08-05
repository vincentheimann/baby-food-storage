// src/components/AlimentForm.test.js
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AlimentForm from "./AlimentForm";

test("submits the form with valid values", () => {
  const handleSubmit = jest.fn();
  render(<AlimentForm onSubmit={handleSubmit} />);

  fireEvent.change(screen.getByLabelText(/Nom de l'aliment/i), {
    target: { value: "Carottes" },
  });
  fireEvent.change(screen.getByLabelText(/Date de congélation/i), {
    target: { value: "2024-07-05" },
  });
  fireEvent.change(screen.getByLabelText(/Date de péremption/i), {
    target: { value: "2024-08-05" },
  });

  // Correction pour le champ Type
  fireEvent.mouseDown(screen.getByLabelText(/Type/i));
  fireEvent.click(screen.getByText(/Légumes/i));

  fireEvent.change(screen.getByLabelText(/Nombre de glaçons/i), {
    target: { value: 10 },
  });

  fireEvent.click(screen.getByRole("button", { name: /Ajouter/i }));

  expect(handleSubmit).toHaveBeenCalledWith({
    nom: "Carottes",
    dateCongelation: "2024-07-05",
    datePeremption: "2024-08-05",
    type: "Légumes",
    quantite: 10,
  });
});

test("shows error messages for empty required fields", () => {
  render(<AlimentForm onSubmit={() => {}} />);

  fireEvent.click(screen.getByRole("button", { name: /Ajouter/i }));

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
