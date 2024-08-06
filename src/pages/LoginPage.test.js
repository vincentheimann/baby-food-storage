// src/pages/LoginPage.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider, useUser } from "../context/UserContext";
import LoginPage from "./LoginPage";

// Mock UserContext
jest.mock("../context/UserContext");

describe("LoginPage", () => {
  const loginMock = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock useUser to return the mock login function
    useUser.mockReturnValue({
      login: loginMock,
      isAuthenticated: false,
    });
  });

  test("renders login form with email and password fields", () => {
    render(
      <UserProvider>
        <Router>
          <LoginPage />
        </Router>
      </UserProvider>
    );

    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign In/i })
    ).toBeInTheDocument();
  });

  test("calls login function on form submit", () => {
    render(
      <UserProvider>
        <Router>
          <LoginPage />
        </Router>
      </UserProvider>
    );

    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    expect(loginMock).toHaveBeenCalledWith("test@example.com", "password");
  });
});
