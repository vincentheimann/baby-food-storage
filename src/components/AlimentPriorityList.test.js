// src/components/AlimentPriorityList.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AlimentPriorityList from "./AlimentPriorityList";

describe("AlimentPriorityList", () => {
  test("renders AlimentPriorityList component with aliments", () => {
    const aliments = [
      {
        id: 1,
        nom: "Poulet",
        type: "Protéines",
        dateCongelation: "2024-06-01",
        datePeremption: "2024-07-01",
        quantite: 10,
      },
      {
        id: 2,
        nom: "Carottes",
        type: "Légumes",
        dateCongelation: "2024-06-05",
        datePeremption: "2024-07-05",
        quantite: 8,
      },
    ];

    render(<AlimentPriorityList aliments={aliments} />);

    expect(screen.getByText(/Poulet/i)).toBeInTheDocument();
    expect(screen.getByText(/Carottes/i)).toBeInTheDocument();
  });

  test("shows no aliments message when list is empty", () => {
    render(<AlimentPriorityList aliments={[]} />);

    expect(
      screen.getByText(/Aucun aliment à consommer en priorité/i)
    ).toBeInTheDocument();
  });

  test("sorts aliments by date of peremption", () => {
    const aliments = [
      {
        id: 1,
        nom: "Poulet",
        type: "Protéines",
        dateCongelation: "2024-06-01",
        datePeremption: "2024-07-05",
        quantite: 10,
      },
      {
        id: 2,
        nom: "Carottes",
        type: "Légumes",
        dateCongelation: "2024-06-05",
        datePeremption: "2024-07-01",
        quantite: 8,
      },
    ];

    render(<AlimentPriorityList aliments={aliments} />);

    const listItems = screen.getAllByRole("listitem");

    expect(listItems[0]).toHaveTextContent(/Carottes/i);
    expect(listItems[1]).toHaveTextContent(/Poulet/i);
  });
});
