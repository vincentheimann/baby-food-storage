import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AlimentPriorityList from "./AlimentPriorityList";

describe("AlimentPriorityList", () => {
  test("renders AlimentPriorityList component with foods", () => {
    const aliments = [
      {
        id: 1,
        name: "Chicken",
        type: "Proteins",
        freezingDate: "2024-06-01",
        expirationDate: "2024-07-01",
        quantity: 10,
      },
      {
        id: 2,
        name: "Carrots",
        type: "Vegetables",
        freezingDate: "2024-06-05",
        expirationDate: "2024-07-05",
        quantity: 8,
      },
    ];

    render(<AlimentPriorityList aliments={aliments} />);

    expect(screen.getByText(/Chicken/i)).toBeInTheDocument();
    expect(screen.getByText(/Carrots/i)).toBeInTheDocument();
  });

  test("shows no foods message when list is empty", () => {
    render(<AlimentPriorityList aliments={[]} />);

    expect(
      screen.getByText(/No foods to prioritize for consumption/i)
    ).toBeInTheDocument();
  });

  test("sorts foods by expiration date", () => {
    const aliments = [
      {
        id: 1,
        name: "Chicken",
        type: "Proteins",
        freezingDate: "2024-06-01",
        expirationDate: "2024-07-05",
        quantity: 10,
      },
      {
        id: 2,
        name: "Carrots",
        type: "Vegetables",
        freezingDate: "2024-06-05",
        expirationDate: "2024-07-01",
        quantity: 8,
      },
    ];

    render(<AlimentPriorityList aliments={aliments} />);

    const listItems = screen.getAllByRole("listitem");

    expect(listItems[0]).toHaveTextContent(/Carrots/i);
    expect(listItems[1]).toHaveTextContent(/Chicken/i);
  });
});
