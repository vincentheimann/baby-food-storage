// src/pages/SignUpPage.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignUpPage from "./SignUpPage";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../contexts/UserContext", () => ({
  useUser: jest.fn(),
}));

describe("SignUpPage", () => {
  const mockNavigate = jest.fn();
  const mockSignUp = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useUser.mockReturnValue({
      signUp: mockSignUp,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders SignUpPage component", () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Create an account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign up/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Back to login page/i })
    ).toBeInTheDocument();
  });

  test("submits the form with valid data", async () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Sign up/i }));

    expect(mockSignUp).toHaveBeenCalledWith(
      "john.doe@example.com",
      "password123",
      "John",
      "Doe"
    );
  });

  test("shows validation errors if fields are empty", () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Sign up/i }));

    expect(screen.getByText(/First name required/i)).toBeInTheDocument();
    expect(screen.getByText(/Last name required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password required/i)).toBeInTheDocument();
  });

  test("navigates back to login page when 'Back to login page' is clicked", () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", { name: /Back to login page/i })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
