// src/components/BacCard.test.js

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BacCard from "./BacCard";

describe("BacCard", () => {
  test("renders BacCard component with aliments", () => {
    const aliments = [
      {
        id: 1,
        nom: "Poulet",
        quantite: 10,
        datePeremption: "2024-07-01",
      },
      {
        id: 2,
        nom: "Carottes",
        quantite: 8,
        datePeremption: "2024-07-05",
      },
    ];

    render(<BacCard color="blue" type="Proteins" aliments={aliments} />);

    expect(screen.getByText(/Protéines/i)).toBeInTheDocument();
    expect(screen.getByText(/Poulet/i)).toBeInTheDocument();
    expect(screen.getByText(/Carottes/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Quantité : 10 glaçons, Péremption : 01.07.2024/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Quantité : 8 glaçons, Péremption : 05.07.2024/i)
    ).toBeInTheDocument();
  });

  test("renders BacCard component with translated type", () => {
    const aliments = [
      {
        id: 1,
        nom: "Banane",
        quantite: 5,
        datePeremption: "2024-08-01",
      },
    ];

    render(<BacCard color="green" type="Fruits" aliments={aliments} />);

    expect(screen.getByText(/Fruits/i)).toBeInTheDocument();
    expect(screen.getByText(/Banane/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Quantité : 5 glaçons, Péremption : 01.08.2024/i)
    ).toBeInTheDocument();
  });

  test("renders BacCard component with default type if type is unknown", () => {
    const aliments = [
      {
        id: 1,
        nom: "Mystery Food",
        quantite: 3,
        datePeremption: "2024-09-01",
      },
    ];

    render(<BacCard color="grey" type="Unknown" aliments={aliments} />);

    expect(screen.getByText(/Unknown/i)).toBeInTheDocument();
    expect(screen.getByText(/Mystery Food/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Quantité : 3 glaçons, Péremption : 01.09.2024/i)
    ).toBeInTheDocument();
  });
});
