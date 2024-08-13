import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BacConfig from "./BacConfig";
import { BacContext } from "../context/BacContext";
import { AlimentContext } from "../context/AlimentContext";

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
      const bacColorInput = screen.getByDisplayValue(bac.color);
      const bacTypeInput = screen.getByDisplayValue(bac.type);
      const bacCapacityInputs = screen.getAllByDisplayValue(
        String(bac.capacity)
      );

      expect(bacColorInput).toBeInTheDocument();
      expect(bacTypeInput).toBeInTheDocument();
      // Ensure we find the correct capacity input for each bac by filtering
      expect(
        bacCapacityInputs.some((input) => input.value === String(bac.capacity))
      ).toBeTruthy();
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

  test("adds a new bac", () => {
    renderBacConfigWithContexts();
    const colorInput = screen.getAllByLabelText(/Color/i).pop();
    const typeInput = screen.getAllByLabelText(/Type/i).pop();
    const capacityInput = screen.getAllByLabelText(/Capacity/i).pop();
    fireEvent.change(colorInput, { target: { value: "yellow" } });
    fireEvent.change(typeInput, { target: { value: "Fruits" } });
    fireEvent.change(capacityInput, { target: { value: 20 } });
    fireEvent.click(screen.getAllByText(/Add/i).pop());
    expect(mockBacContextValue.addBac).toHaveBeenCalledWith({
      color: "yellow",
      type: "Fruits",
      capacity: 20,
    });
  });

  test("removes an existing bac", () => {
    renderBacConfigWithContexts();
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    fireEvent.click(deleteButtons[1]); // Clicking the delete button for "Vegetables"
    expect(mockBacContextValue.removeBac).toHaveBeenCalledWith("Vegetables");
  });
});

describe("BacConfig Modal", () => {
  test("opens modal when attempting to delete a bac type with food items", () => {
    renderBacConfigWithContexts();
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    expect(screen.getByText(/Reassign Aliments/i)).toBeInTheDocument();
  });

  test("reassigns aliments and deletes bac type", () => {
    renderBacConfigWithContexts();
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    // Open the dropdown and select a new type
    fireEvent.mouseDown(screen.getByLabelText("New Type"));
    const listbox = within(screen.getByRole("listbox"));
    fireEvent.click(listbox.getByText(/Vegetables/i));

    fireEvent.click(screen.getByText(/Reassign and Delete Type/i));

    // Ensure setAliments was called correctly
    expect(mockAlimentContextValue.setAliments).toHaveBeenCalledWith(
      expect.any(Function)
    );

    // Simulate the state update to check the final state
    const updatedAliments =
      mockAlimentContextValue.setAliments.mock.calls[0][0](mockAliments);

    expect(updatedAliments).toEqual(
      expect.arrayContaining([{ id: 1, name: "Chicken", type: "Vegetables" }])
    );

    expect(mockBacContextValue.removeBac).toHaveBeenCalledWith("Proteins");
  });

  test("excludes the deleted type in the modal dropdown", () => {
    renderBacConfigWithContexts();
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    // Open the dropdown
    fireEvent.mouseDown(screen.getByLabelText("New Type"));
    const listbox = within(screen.getByRole("listbox"));
    const options = listbox.getAllByRole("option");

    expect(options.map((o) => o.textContent)).not.toContain("Proteins");
  });
});
