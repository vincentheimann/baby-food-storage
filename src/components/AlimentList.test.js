// src/components/AlimentList.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AlimentList from "./AlimentList";
import "@testing-library/jest-dom/extend-expect"; // pour les matchers jest-dom

const aliments = [
  {
    id: 1,
    nom: "Poulet",
    dateCongelation: "2024-07-01",
    datePeremption: "2024-08-01",
    type: "Proteins",
    quantite: 10,
  },
  {
    id: 2,
    nom: "Carottes",
    dateCongelation: "2024-07-05",
    datePeremption: "2024-08-05",
    type: "Vegetables",
    quantite: 8,
  },
];

const mockDecrement = jest.fn();
const mockIncrement = jest.fn();
const mockUpdate = jest.fn();

describe("AlimentList", () => {
  test("renders a list of aliments", () => {
    render(
      <AlimentList
        aliments={aliments}
        onDecrement={mockDecrement}
        onIncrement={mockIncrement}
        onUpdate={mockUpdate}
      />
    );

    aliments.forEach((aliment) => {
      expect(
        screen.getByText(aliment.nom, { exact: false })
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Quantité : ${aliment.quantite} glaçons`, {
          exact: false,
        })
      ).toBeInTheDocument();
    });
  });

  test("calls onDecrement when decrement button is clicked", () => {
    render(
      <AlimentList
        aliments={aliments}
        onDecrement={mockDecrement}
        onIncrement={mockIncrement}
        onUpdate={mockUpdate}
      />
    );

    const decrementButtons = screen.getAllByLabelText("decrement");
    fireEvent.click(decrementButtons[0]);

    expect(mockDecrement).toHaveBeenCalledWith(aliments[0].id);
  });

  test("calls onIncrement when increment button is clicked", () => {
    render(
      <AlimentList
        aliments={aliments}
        onDecrement={mockDecrement}
        onIncrement={mockIncrement}
        onUpdate={mockUpdate}
      />
    );

    const incrementButtons = screen.getAllByLabelText("increment");
    fireEvent.click(incrementButtons[0]);

    expect(mockIncrement).toHaveBeenCalledWith(aliments[0].id);
  });

  test("shows no aliments message when list is empty", () => {
    render(
      <AlimentList
        aliments={[]}
        onDecrement={mockDecrement}
        onIncrement={mockIncrement}
        onUpdate={mockUpdate}
      />
    );

    expect(
      screen.getByText("Oups, il n'y a rien à manger !")
    ).toBeInTheDocument();
  });
});
