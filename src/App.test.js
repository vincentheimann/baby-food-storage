import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { useUser } from "./context/UserContext";

jest.mock("./context/UserContext");

describe("App", () => {
  test("renders LoginPage when not authenticated", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );

    // Instead of getByRole, try getByText as a more flexible option
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  test("renders HomePage after successful login", () => {
    useUser.mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /Home/i })).toBeInTheDocument();
  });

  test("navigates to the Home after successful login", () => {
    useUser.mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /Home/i })).toBeInTheDocument();
  });
});
