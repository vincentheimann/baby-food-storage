// src/context/UserContext.js
import React from "react";
import { render, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { UserProvider, UserContext } from "./UserContext";
import { login, logout, demoLogin } from "../services/authService";

jest.mock("../services/authService");

describe("UserContext", () => {
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

  test("should login a user", async () => {
    renderWithProvider();

    const mockUser = { email: "test@example.com" };
    login.mockResolvedValueOnce({ user: mockUser });

    await act(async () => {
      await contextValue.login("test@example.com", "password");
    });

    expect(contextValue.user).toEqual(mockUser);
    expect(contextValue.isAuthenticated).toBe(true);
  });

  test("should demo login a user", async () => {
    renderWithProvider();

    const mockUser = { email: "demo@example.com" };
    demoLogin.mockResolvedValueOnce({ user: mockUser });

    await act(async () => {
      await contextValue.demoLogin();
    });

    expect(contextValue.user).toEqual(mockUser);
    expect(contextValue.isAuthenticated).toBe(true);
  });

  test("should logout a user", async () => {
    renderWithProvider();

    // Simulez la connexion d'un utilisateur
    const mockUser = { email: "test@example.com" };
    login.mockResolvedValueOnce({ user: mockUser });

    await act(async () => {
      await contextValue.login("test@example.com", "password");
    });

    // Simulez la déconnexion
    logout.mockResolvedValueOnce();

    await act(async () => {
      await contextValue.logout();
    });

    expect(contextValue.user).toBeNull(); // Vérifiez que l'utilisateur est bien null après déconnexion
    expect(contextValue.isAuthenticated).toBe(false);
  });
});
