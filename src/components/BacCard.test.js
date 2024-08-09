import React from "react";
import { render, screen } from "@testing-library/react";
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
    expect(screen.getByText(/Chicken/i)).toBeInTheDocument();
    expect(screen.getByText(/Carrots/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Quantity: 10 ice cubes, Best before: 07\/01\/2024/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Quantity: 8 ice cubes, Best before: 07\/05\/2024/i)
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
    expect(screen.getByText(/Banana/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Quantity: 5 ice cubes, Best before: 08\/01\/2024/i)
    ).toBeInTheDocument();
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
    expect(screen.getByText(/Mystery Food/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Quantity: 3 ice cubes, Best before: 09\/01\/2024/i)
    ).toBeInTheDocument();
  });
});
