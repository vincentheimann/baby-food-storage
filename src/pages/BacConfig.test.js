import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BacConfig from "./BacConfig";
import { BacContext } from "../contexts/BacContext";
import { AlimentContext } from "../contexts/AlimentContext";

const mockBacs = [
  { id: 1, color: "blue", type: "Proteins", capacity: 12 },
  { id: 2, color: "green", type: "Vegetables", capacity: 15 },
];

const mockAliments = [{ id: 1, name: "Chicken", type: "Proteins" }];

const mockBacContextValue = {
  bacs: mockBacs,
  updateBac: jest.fn(),
  addBac: jest.fn(),
  removeBac: jest.fn(),
};

const mockAlimentContextValue = {
  aliments: mockAliments,
  setAliments: jest.fn(),
};

const renderBacConfigWithContexts = () => {
  render(
    <AlimentContext.Provider value={mockAlimentContextValue}>
      <BacContext.Provider value={mockBacContextValue}>
        <BacConfig />
      </BacContext.Provider>
    </AlimentContext.Provider>
  );
};

describe("BacConfig", () => {
  test("renders BacConfig component", () => {
    renderBacConfigWithContexts();
    expect(screen.getByText(/Ice Tray Configuration/i)).toBeInTheDocument();
    expect(screen.getByText(/Add a New Tray/i)).toBeInTheDocument();
    mockBacs.forEach((bac) => {
      expect(screen.getByDisplayValue(bac.color)).toBeInTheDocument();
      expect(screen.getByDisplayValue(bac.type)).toBeInTheDocument();

      const capacityInputs = screen.getAllByDisplayValue(String(bac.capacity));
      expect(capacityInputs.length).toBeGreaterThan(0);
    });
  });

  test("updates existing bac values", () => {
    renderBacConfigWithContexts();
    const newColor = "red";
    fireEvent.change(screen.getByDisplayValue("blue"), {
      target: { value: newColor },
    });
    expect(mockBacContextValue.updateBac).toHaveBeenCalledWith(1, {
      color: newColor,
    });
  });

  test("prevents setting capacity to less than 1", () => {
    renderBacConfigWithContexts();
    const capacityInputs = screen.getAllByDisplayValue("12");
    fireEvent.change(capacityInputs[0], { target: { value: "-1" } });

    expect(mockBacContextValue.updateBac).toHaveBeenCalledWith(1, {
      capacity: 1,
    });
  });

  test("does not allow adding a bac with capacity less than 1", () => {
    renderBacConfigWithContexts();
    fireEvent.change(screen.getAllByLabelText(/Color/i).pop(), {
      target: { value: "yellow" },
    });
    fireEvent.change(screen.getAllByLabelText(/Type/i).pop(), {
      target: { value: "Fruits" },
    });
    fireEvent.change(screen.getAllByLabelText(/Capacity/i).pop(), {
      target: { value: "-5" },
    });
    fireEvent.click(screen.getAllByText(/Add/i).pop());

    // The addBac function should still be called but with capacity adjusted to 1
    expect(mockBacContextValue.addBac).toHaveBeenCalledWith({
      color: "yellow",
      type: "Fruits",
      capacity: 1,
    });
  });

  test("adds a new bac, allowing duplicate types", () => {
    renderBacConfigWithContexts();
    fireEvent.change(screen.getAllByLabelText(/Color/i).pop(), {
      target: { value: "yellow" },
    });
    fireEvent.change(screen.getAllByLabelText(/Type/i).pop(), {
      target: { value: "Proteins" }, // Allowing a duplicate type
    });
    fireEvent.change(screen.getAllByLabelText(/Capacity/i).pop(), {
      target: { value: 20 },
    });
    fireEvent.click(screen.getAllByText(/Add/i).pop());
    expect(mockBacContextValue.addBac).toHaveBeenCalledWith({
      color: "yellow",
      type: "Proteins", // Duplicate type
      capacity: 20,
    });
  });

  test("removes an existing bac", () => {
    renderBacConfigWithContexts();
    fireEvent.click(screen.getAllByRole("button", { name: /delete/i })[1]);
    expect(mockBacContextValue.removeBac).toHaveBeenCalledWith("Vegetables");
  });
});

describe("BacConfig Modal", () => {
  test("opens modal when attempting to delete a bac type with food items", () => {
    renderBacConfigWithContexts();
    fireEvent.click(screen.getAllByRole("button", { name: /delete/i })[0]);
    expect(screen.getByText(/Reassign Aliments/i)).toBeInTheDocument();
  });

  test("reassigns aliments and deletes bac type", () => {
    renderBacConfigWithContexts();
    fireEvent.click(screen.getAllByRole("button", { name: /delete/i })[0]);

    fireEvent.mouseDown(screen.getByLabelText("New Type"));
    const listbox = within(screen.getByRole("listbox"));
    fireEvent.click(listbox.getByText(/Vegetables/i));

    fireEvent.click(screen.getByText(/Reassign and Delete Type/i));

    expect(mockAlimentContextValue.setAliments).toHaveBeenCalledWith(
      expect.any(Function)
    );

    const updatedAliments =
      mockAlimentContextValue.setAliments.mock.calls[0][0](mockAliments);

    expect(updatedAliments).toEqual(
      expect.arrayContaining([{ id: 1, name: "Chicken", type: "Vegetables" }])
    );

    expect(mockBacContextValue.removeBac).toHaveBeenCalledWith("Proteins");
  });

  test("excludes the deleted type in the modal dropdown", () => {
    renderBacConfigWithContexts();
    fireEvent.click(screen.getAllByRole("button", { name: /delete/i })[0]);

    fireEvent.mouseDown(screen.getByLabelText("New Type"));
    const listbox = within(screen.getByRole("listbox"));
    const options = listbox.getAllByRole("option");

    expect(options.map((o) => o.textContent)).not.toContain("Proteins");
  });
});
