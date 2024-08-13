import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import DemoLoginPage from "./DemoLoginPage";
import { UserContext } from "../context/UserContext";

const mockDemoLogin = jest.fn();

const mockUserContextValue = {
  demoLogin: mockDemoLogin,
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
    expect(screen.getByText(/Demo Account/i)).toBeInTheDocument();
    expect(screen.getByText(/Login as Demo/i)).toBeInTheDocument();
  });

  test("calls demoLogin and navigates on button click", () => {
    renderDemoLoginPage();
    const button = screen.getByText(/Login as Demo/i);
    fireEvent.click(button);
    expect(mockDemoLogin).toHaveBeenCalled();
  });
});
