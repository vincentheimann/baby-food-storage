// src/pages/SignUpPage.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignUpPage from "./SignUpPage";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("SignUpPage", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  test("renders SignUpPage component", () => {
    render(
      <MemoryRouter>
        <SignUpPage onSignUp={jest.fn()} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Créer un compte/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /S'inscrire/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Retour à la connexion/i })
    ).toBeInTheDocument();
  });

  test("submits the form with valid data", () => {
    const onSignUpMock = jest.fn();
    render(
      <MemoryRouter>
        <SignUpPage onSignUp={onSignUpMock} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nom/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /S'inscrire/i }));

    expect(onSignUpMock).toHaveBeenCalledWith({
      nom: "Test User",
      email: "test@example.com",
      password: "password123",
    });
  });

  test("navigates back to login page when 'Retour à la connexion' is clicked", () => {
    render(
      <MemoryRouter>
        <SignUpPage onSignUp={jest.fn()} />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", { name: /Retour à la connexion/i })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
