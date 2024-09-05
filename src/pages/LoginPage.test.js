import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

// Mock useNavigate from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockUserContextValue = {
  login: jest.fn(),
  demoLogin: jest.fn(),
};

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

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
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

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
      screen.getByRole("button", { name: /Demo account login/i })
    ).toBeInTheDocument();
  });

  test("shows error messages when fields are empty", async () => {
    renderLoginPage();

    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Password is required/i)
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(mockUserContextValue.login).not.toHaveBeenCalled();
    });
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

    await waitFor(() => {
      expect(mockUserContextValue.login).toHaveBeenCalledWith(
        "test@example.com",
        "password"
      );
    });
  });

  test("calls demoLogin on demo login button click", async () => {
    renderLoginPage();

    fireEvent.click(
      screen.getByRole("button", { name: /Demo account login/i })
    );

    await waitFor(() => {
      expect(mockUserContextValue.demoLogin).toHaveBeenCalled();
    });
  });

  test("navigates on successful login", async () => {
    mockUserContextValue.login.mockResolvedValueOnce(); // Mock successful login
    renderLoginPage();

    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    await waitFor(() => {
      expect(mockUserContextValue.login).toHaveBeenCalledWith(
        "test@example.com",
        "password"
      );
    });

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("shows snackbar on login failure", async () => {
    mockUserContextValue.login.mockRejectedValueOnce(new Error("Login failed"));
    renderLoginPage();

    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    expect(
      await screen.findByText(/Login failed. Please check your credentials./i)
    ).toBeInTheDocument();

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
