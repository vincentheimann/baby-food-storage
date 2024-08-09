import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import TopBar from "./TopBar";
import { AlimentContext } from "../context/AlimentContext";
import { UserContext } from "../context/UserContext";

const mockAlimentContextValue = {
  notifications: [],
  markNotificationAsRead: jest.fn(),
  deleteNotification: jest.fn(),
  unreadNotificationsCount: 0,
};

const mockUserContextValue = {
  user: { email: "demo@example.com" },
  isAuthenticated: true,
  logout: jest.fn(),
  login: jest.fn(),
  demoLogin: jest.fn(),
};

const renderTopBar = () => {
  render(
    <AlimentContext.Provider value={mockAlimentContextValue}>
      <UserContext.Provider value={mockUserContextValue}>
        <BrowserRouter>
          <TopBar />
        </BrowserRouter>
      </UserContext.Provider>
    </AlimentContext.Provider>
  );
};

describe("TopBar", () => {
  test("renders TopBar component", () => {
    renderTopBar();
    expect(screen.getByText(/Baby Food Storage/i)).toBeInTheDocument();
  });

  test("opens menu on menu button click", () => {
    renderTopBar();
    fireEvent.click(screen.getByTestId("menu-button"));
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });

  test("opens notifications drawer on notifications icon click", () => {
    renderTopBar();
    fireEvent.click(screen.getByTestId("notifications-button"));
    expect(screen.getByText(/No notifications/i)).toBeInTheDocument();
  });
});
