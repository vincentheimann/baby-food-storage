// src/components/AlimentList.test.js
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AlimentList from "./AlimentList";

const aliments = [
  {
    id: 1,
    nom: "Poulet",
    dateCongelation: "2024-07-01",
    datePeremption: "2024-08-01",
    type: "Protéines",
    quantite: 10,
  },
  {
    id: 2,
    nom: "Carottes",
    dateCongelation: "2024-07-05",
    datePeremption: "2024-08-05",
    type: "Légumes",
    quantite: 8,
  },
];

test("displays the list of aliments", () => {
  render(
    <AlimentList
      aliments={aliments}
      onDecrement={() => {}}
      onIncrement={() => {}}
      onUpdate={() => {}}
    />
  );

  expect(screen.getByText(/Poulet/i)).toBeInTheDocument();
  expect(screen.getByText(/Carottes/i)).toBeInTheDocument();
});

test("decrements the quantity of an aliment", () => {
  const handleDecrement = jest.fn();
  render(
    <AlimentList
      aliments={aliments}
      onDecrement={handleDecrement}
      onIncrement={() => {}}
      onUpdate={() => {}}
    />
  );

  fireEvent.click(screen.getAllByRole("button", { name: /decrement/i })[0]);
  expect(handleDecrement).toHaveBeenCalledWith(1);
});

test("increments the quantity of an aliment", () => {
  const handleIncrement = jest.fn();
  render(
    <AlimentList
      aliments={aliments}
      onDecrement={() => {}}
      onIncrement={handleIncrement}
      onUpdate={() => {}}
    />
  );

  fireEvent.click(screen.getAllByRole("button", { name: /increment/i })[1]);
  expect(handleIncrement).toHaveBeenCalledWith(2);
});
