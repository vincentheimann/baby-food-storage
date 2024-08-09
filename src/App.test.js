// src/App.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { useUser } from "./context/UserContext";

jest.mock("./context/UserContext");

describe("App", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("renders LoginPage when not authenticated", () => {
    useUser.mockReturnValue({ isAuthenticated: false });

    render(
      <Router>
        <App />
      </Router>
    );

    // Adjust this according to the actual element being rendered.
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  test("renders HomePage after successful login", () => {
    useUser.mockReturnValue({ isAuthenticated: true });

    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByRole("heading", { name: /home/i })).toBeInTheDocument();
  });

  test("navigates to the Dashboard after successful login", () => {
    useUser.mockReturnValue({ isAuthenticated: true });

    render(
      <Router>
        <App />
      </Router>
    );

    expect(
      screen.getByRole("heading", { name: /dashboard/i })
    ).toBeInTheDocument();
  });
});
