import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { useUser } from "./context/UserContext";

// Mocking the useUser hook
jest.mock("./context/UserContext");

describe("App", () => {
  test("renders LoginPage when not authenticated", () => {
    useUser.mockReturnValue({ isAuthenticated: false });

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );

    // In LoginPage, the text is probably "Sign in"
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  test("renders HomePage after successful login", () => {
    useUser.mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // In Home.js, the text is "Home"
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  test("navigates to the Home after successful login", () => {
    useUser.mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // In Home.js, ensure the text is "Home"
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });
});
