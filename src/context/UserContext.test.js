import React from "react";
import { render, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { UserProvider, UserContext } from "./UserContext";
import { login, logout, demoLogin } from "../services/authService";

jest.mock("../services/authService");

describe("UserContext with localStorage", () => {
  let contextValue;

  const renderWithProvider = () => {
    render(
      <UserProvider>
        <UserContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </UserContext.Consumer>
      </UserProvider>
    );
  };

  beforeEach(() => {
    localStorage.clear();
  });

  test("should store user and isAuthenticated in localStorage on login", async () => {
    renderWithProvider();

    const mockUser = { email: "test@example.com" };
    login.mockResolvedValueOnce({ user: mockUser });

    await act(async () => {
      await contextValue.login("test@example.com", "password");
    });

    expect(localStorage.getItem("user")).toEqual(JSON.stringify(mockUser));
    expect(localStorage.getItem("isAuthenticated")).toBe("true");
  });

  test("should initialize from localStorage if user is present", () => {
    const mockUser = { email: "test@example.com" };
    localStorage.setItem("user", JSON.stringify(mockUser));
    localStorage.setItem("isAuthenticated", "true");

    renderWithProvider();

    expect(contextValue.user).toEqual(mockUser);
    expect(contextValue.isAuthenticated).toBe(true);
  });

  test("should remove user and isAuthenticated from localStorage on logout", async () => {
    renderWithProvider();

    const mockUser = { email: "test@example.com" };
    login.mockResolvedValueOnce({ user: mockUser });

    await act(async () => {
      await contextValue.login("test@example.com", "password");
    });

    logout.mockResolvedValueOnce();

    await act(async () => {
      await contextValue.logout();
    });

    expect(localStorage.getItem("user")).toBeNull();
    expect(localStorage.getItem("isAuthenticated")).toBeNull();
  });
});
