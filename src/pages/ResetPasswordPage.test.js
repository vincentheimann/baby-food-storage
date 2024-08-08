// src/pages/ResetPasswordPage.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ResetPasswordPage from "./ResetPasswordPage";
import { resetPassword } from "../services/authService";

jest.mock("../services/authService");

describe("ResetPasswordPage", () => {
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

  test("shows success message on successful password reset", async () => {
    resetPassword.mockResolvedValueOnce();

    render(<ResetPasswordPage />);
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Réinitialiser/i }));

    await waitFor(() =>
      expect(resetPassword).toHaveBeenCalledWith("test@example.com")
    );
    expect(
      screen.getByText(
        /Un email de réinitialisation de mot de passe a été envoyé./i
      )
    ).toBeInTheDocument();
  });

  test("shows error message on failed password reset", async () => {
    resetPassword.mockRejectedValueOnce(new Error("Failed to send email"));

    render(<ResetPasswordPage />);
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Réinitialiser/i }));

    await waitFor(() =>
      expect(resetPassword).toHaveBeenCalledWith("test@example.com")
    );
    expect(
      screen.getByText(/Erreur lors de l'envoi de l'email./i)
    ).toBeInTheDocument();
  });
});
