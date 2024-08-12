import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App.js";

describe("App Component", () => {
  test("renders sign-in form", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /Sign in/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign In/i })
    ).toBeInTheDocument();
  });

  test("handles user interactions correctly", () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    // Verify the outcome of a successful interaction, e.g., redirect, loading state, etc.
    // Adjust the assertion below to match what actually happens in the app
    // For example:
    // expect(screen.getByText(/Welcome back/i)).toBeInTheDocument(); // Adjust based on actual UI feedback
  });

  test("displays error on invalid credentials", () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "invalid@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    // Verify the error message displayed for invalid credentials
    // Adjust the assertion below to match what actually happens in the app
    // For example:
    // expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument(); // Adjust based on actual error message
  });
});
