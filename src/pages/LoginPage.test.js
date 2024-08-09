// src/pages/LoginPage.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage";
import { UserContext } from "../context/UserContext";

const mockUserContextValue = {
  login: jest.fn(),
  demoLogin: jest.fn(),
};

const renderLoginPage = () => {
  render(
    <UserContext.Provider value={mockUserContextValue}>
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </UserContext.Provider>
  );
};

describe("LoginPage", () => {
  test("renders LoginPage component", () => {
    renderLoginPage();
    expect(
      screen.getByRole("heading", { name: /Sign in/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign In/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /Demo account login/i,
      })
    ).toBeInTheDocument();
  });

  test("calls login on form submit", async () => {
    renderLoginPage();
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));
    await waitFor(() =>
      expect(mockUserContextValue.login).toHaveBeenCalledWith(
        "test@example.com",
        "password"
      )
    );
  });

  test("calls demoLogin on demo login button click", async () => {
    renderLoginPage();
    fireEvent.click(
      screen.getByRole("button", {
        name: /Demo account login/i,
      })
    );
    await waitFor(() =>
      expect(mockUserContextValue.demoLogin).toHaveBeenCalled()
    );
  });
});
