import React from "react";
import { render, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BacProvider, BacContext } from "./BacContext";

describe("BacContext", () => {
  test("should provide initial bacs", () => {
    let contextValue;

    render(
      <BacProvider>
        <BacContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </BacContext.Consumer>
      </BacProvider>
    );

    expect(contextValue.bacs.length).toBe(4);
  });

  test("should update a bac", () => {
    let contextValue;

    render(
      <BacProvider>
        <BacContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </BacContext.Consumer>
      </BacProvider>
    );

    const bacId = 1;
    act(() => {
      contextValue.updateBac(bacId, { color: "yellow", capacity: 15 });
    });

    const updatedBac = contextValue.bacs.find((bac) => bac.id === bacId);
    expect(updatedBac.color).toBe("yellow");
    expect(updatedBac.capacity).toBe(15);
  });

  test("should not allow negative capacity when updating a bac", () => {
    let contextValue;

    render(
      <BacProvider>
        <BacContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </BacContext.Consumer>
      </BacProvider>
    );

    const bacId = 2;
    act(() => {
      contextValue.updateBac(bacId, { capacity: -5 });
    });

    const updatedBac = contextValue.bacs.find((bac) => bac.id === bacId);
    expect(updatedBac.capacity).toBe(1);
  });

  test("should add a new bac with a valid type", () => {
    let contextValue;

    render(
      <BacProvider>
        <BacContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </BacContext.Consumer>
      </BacProvider>
    );

    act(() => {
      contextValue.addBac({ color: "purple", type: "Snacks", capacity: 10 });
    });

    expect(contextValue.bacs.length).toBe(5);
    expect(
      contextValue.bacs.some(
        (bac) => bac.type === "Snacks" && bac.color === "purple"
      )
    ).toBe(true);
  });

  test("should not allow negative capacity when adding a new bac", () => {
    let contextValue;

    render(
      <BacProvider>
        <BacContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </BacContext.Consumer>
      </BacProvider>
    );

    act(() => {
      contextValue.addBac({ color: "purple", type: "Desserts", capacity: -10 });
    });

    const addedBac = contextValue.bacs.find((bac) => bac.type === "Desserts");
    expect(addedBac.capacity).toBe(1);
  });

  test("should remove a bac by type", () => {
    let contextValue;

    render(
      <BacProvider>
        <BacContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </BacContext.Consumer>
      </BacProvider>
    );

    const bacType = "Proteins";
    act(() => {
      contextValue.removeBac(bacType);
    });

    expect(contextValue.bacs.length).toBe(3);
    expect(contextValue.bacs.some((bac) => bac.type === bacType)).toBe(false);
  });
});
