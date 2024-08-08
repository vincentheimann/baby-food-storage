// src/pages/SignUpPage.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SignUpPage from "./SignUpPage";

const mockOnSignUp = jest.fn();

describe("SignUpPage", () => {
  test("renders SignUpPage component", () => {
    render(<SignUpPage onSignUp={mockOnSignUp} />);

    expect(screen.getByText(/Créer un compte/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /S'inscrire/i })
    ).toBeInTheDocument();
  });

  test("shows validation errors when fields are empty", () => {
    render(<SignUpPage onSignUp={mockOnSignUp} />);

    fireEvent.click(screen.getByRole("button", { name: /S'inscrire/i }));

    expect(screen.getByText(/Le nom est requis/i)).toBeInTheDocument();
    expect(screen.getByText(/L'email est requis/i)).toBeInTheDocument();
    expect(screen.getByText(/Le mot de passe est requis/i)).toBeInTheDocument();
  });

  test("calls onSignUp with correct values", () => {
    render(<SignUpPage onSignUp={mockOnSignUp} />);
    fireEvent.change(screen.getByLabelText(/Nom/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /S'inscrire/i }));

    expect(mockOnSignUp).toHaveBeenCalledWith({
      nom: "John Doe",
      email: "john@example.com",
      password: "password123",
    });
  });
});
