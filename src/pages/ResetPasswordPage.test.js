// src/pages/ResetPasswordPage.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ResetPasswordPage from "./ResetPasswordPage";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authService";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../services/authService");

describe("ResetPasswordPage", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  test("renders ResetPasswordPage component", () => {
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Reset password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reset/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Back to login page/i })
    ).toBeInTheDocument();
  });

  test("shows success Snackbar on successful password reset", async () => {
    resetPassword.mockResolvedValueOnce();

    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Reset/i }));

    expect(
      await screen.findByText(/A password reset email has been sent./i)
    ).toBeInTheDocument();
  });

  test("shows error Snackbar on failed password reset", async () => {
    resetPassword.mockRejectedValueOnce(new Error("Failed to send email"));

    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Reset/i }));

    expect(
      await screen.findByText(/Error sending email./i)
    ).toBeInTheDocument();
  });

  test("navigates back to login page when 'Retour à la connexion' is clicked", () => {
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", { name: /Back to login page/i })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
