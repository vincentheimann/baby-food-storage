import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AlimentForm from "./AlimentForm";

test("renders AlimentForm and submits with valid data", () => {
  const handleSubmit = jest.fn();

  render(<AlimentForm onSubmit={handleSubmit} />);

  fireEvent.change(screen.getByLabelText(/Nom de l'aliment/i), {
    target: { value: "Carottes" },
  });
  fireEvent.change(screen.getByLabelText(/Date de congélation/i), {
    target: { value: "2024-01-01" },
  });
  fireEvent.change(screen.getByLabelText(/Date de péremption/i), {
    target: { value: "2024-12-31" },
  });
  fireEvent.change(screen.getByLabelText(/Nombre de glaçons/i), {
    target: { value: 10 },
  });

  fireEvent.click(screen.getByRole("button", { name: /Ajouter/i }));

  expect(handleSubmit).toHaveBeenCalledWith({
    nom: "Carottes",
    dateCongelation: "2024-01-01",
    datePeremption: "2024-12-31",
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
    screen.getByText(/Le nombre de glaçons est requis/i)
  ).toBeInTheDocument();
});
