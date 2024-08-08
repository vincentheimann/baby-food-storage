// src/pages/DemoLoginPage.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import DemoLoginPage from "./DemoLoginPage";
import { UserContext } from "../context/UserContext";

const mockLoginDemoUser = jest.fn();

const mockUserContextValue = {
  loginDemoUser: mockLoginDemoUser,
};

const renderDemoLoginPage = () => {
  render(
    <UserContext.Provider value={mockUserContextValue}>
      <BrowserRouter>
        <DemoLoginPage />
      </BrowserRouter>
    </UserContext.Provider>
  );
};

describe("DemoLoginPage", () => {
  test("renders DemoLoginPage component", () => {
    renderDemoLoginPage();
    expect(screen.getByText(/Compte de Démonstration/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Connexion en tant que Démonstration/i)
    ).toBeInTheDocument();
  });

  test("calls loginDemoUser and navigates on button click", () => {
    renderDemoLoginPage();
    const button = screen.getByText(/Connexion en tant que Démonstration/i);
    fireEvent.click(button);
    expect(mockLoginDemoUser).toHaveBeenCalled();
  });
});
