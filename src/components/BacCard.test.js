import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BacCard from "./BacCard";

describe("BacCard", () => {
  test("renders BacCard component with aliments", () => {
    const aliments = [
      {
        id: 1,
        name: "Chicken",
        quantity: 10,
        expirationDate: "2024-07-01",
      },
      {
        id: 2,
        name: "Carrots",
        quantity: 8,
        expirationDate: "2024-07-05",
      },
    ];

    render(<BacCard color="blue" type="Proteins" aliments={aliments} />);

    expect(screen.getByText(/Proteins/i)).toBeInTheDocument();

    // Find all list items
    const listItems = screen.getAllByRole("listitem");

    // Verify Chicken item
    const chickenItem = within(listItems[0]);
    expect(chickenItem.getByText(/Chicken/i)).toBeInTheDocument();
    expect(
      chickenItem.getByText(/Quantity: 10 ice cubes/i)
    ).toBeInTheDocument();
    expect(
      chickenItem.getByText(/Expiration: 01.07.2024/i)
    ).toBeInTheDocument();

    // Verify Carrots item
    const carrotsItem = within(listItems[1]);
    expect(carrotsItem.getByText(/Carrots/i)).toBeInTheDocument();
    expect(carrotsItem.getByText(/Quantity: 8 ice cubes/i)).toBeInTheDocument();
    expect(
      carrotsItem.getByText(/Expiration: 05.07.2024/i)
    ).toBeInTheDocument();
  });

  test("renders BacCard component with translated type", () => {
    const aliments = [
      {
        id: 1,
        name: "Banana",
        quantity: 5,
        expirationDate: "2024-08-01",
      },
    ];

    render(<BacCard color="green" type="Fruits" aliments={aliments} />);

    expect(screen.getByText(/Fruits/i)).toBeInTheDocument();

    const listItems = screen.getAllByRole("listitem");
    const bananaItem = within(listItems[0]);
    expect(bananaItem.getByText(/Banana/i)).toBeInTheDocument();
    expect(bananaItem.getByText(/Quantity: 5 ice cubes/i)).toBeInTheDocument();
    expect(bananaItem.getByText(/Expiration: 01.08.2024/i)).toBeInTheDocument();
  });

  test("renders BacCard component with default type if type is unknown", () => {
    const aliments = [
      {
        id: 1,
        name: "Mystery Food",
        quantity: 3,
        expirationDate: "2024-09-01",
      },
    ];

    render(<BacCard color="grey" type="Unknown" aliments={aliments} />);

    expect(screen.getByText(/Unknown/i)).toBeInTheDocument();

    const listItems = screen.getAllByRole("listitem");
    const mysteryItem = within(listItems[0]);
    expect(mysteryItem.getByText(/Mystery Food/i)).toBeInTheDocument();
    expect(mysteryItem.getByText(/Quantity: 3 ice cubes/i)).toBeInTheDocument();
    expect(
      mysteryItem.getByText(/Expiration: 01.09.2024/i)
    ).toBeInTheDocument();
  });
});
