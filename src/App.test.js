// src/App.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders home page with Baby Food Storage title", () => {
  render(<App />);
  const titleElement = screen.getByText(/Baby Food Storage/i);
  expect(titleElement).toBeInTheDocument();
});
