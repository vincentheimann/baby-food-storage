// src/pages/ResetPasswordPage.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ResetPasswordPage from "./ResetPasswordPage";
import { resetPassword } from "../services/authService";

jest.mock("../services/authService");

describe("ResetPasswordPage", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  test("renders ResetPasswordPage component", () => {
    render(<ResetPasswordPage />);
    expect(
      screen.getByText(/Réinitialiser le mot de passe/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Réinitialiser/i })
    ).toBeInTheDocument();
  });

  test("shows success Snackbar on successful password reset", async () => {
    resetPassword.mockResolvedValueOnce();

    render(<ResetPasswordPage />);
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Réinitialiser/i }));

    expect(resetPassword).toHaveBeenCalledWith("test@example.com");

    expect(
      await screen.findByText(
        /Un email de réinitialisation de mot de passe a été envoyé./i
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Un email de réinitialisation de mot de passe a été envoyé."
    );
  });

  test("shows error Snackbar on failed password reset", async () => {
    resetPassword.mockRejectedValueOnce(new Error("Failed to send email"));

    render(<ResetPasswordPage />);
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Réinitialiser/i }));

    expect(resetPassword).toHaveBeenCalledWith("test@example.com");

    expect(
      await screen.findByText(/Erreur lors de l'envoi de l'email./i)
    ).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Erreur lors de l'envoi de l'email."
    );
  });
});
