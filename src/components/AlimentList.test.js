import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AlimentList from "./AlimentList";
import "@testing-library/jest-dom/extend-expect"; // pour les matchers jest-dom

const aliments = [
  {
    id: 1,
    name: "Chicken",
    freezingDate: "2024-07-01",
    expirationDate: "2024-08-01",
    type: "Proteins",
    quantity: 10,
  },
  {
    id: 2,
    name: "Carrots",
    freezingDate: "2024-07-05",
    expirationDate: "2024-08-05",
    type: "Vegetables",
    quantity: 8,
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
        screen.getByText(aliment.name, { exact: false })
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Quantity: ${aliment.quantity} ice cubes`, {
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
      screen.getByText("Oops, there's nothing to eat!")
    ).toBeInTheDocument();
  });
});
