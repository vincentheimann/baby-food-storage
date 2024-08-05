// src/components/TopBar.test.js
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TopBar from "./TopBar";
import { AlimentContext } from "../context/AlimentContext";

const mockContextValue = {
  notifications: [
    {
      id: 1,
      nom: "Poulet",
      message: "Expire dans 3 jours",
      color: "orange",
      lue: false,
    },
    {
      id: 2,
      nom: "Carottes",
      message: "Expire dans 7 jours",
      color: "green",
      lue: false,
    },
  ],
  markNotificationAsRead: jest.fn(),
  deleteNotification: jest.fn(),
  unreadNotificationsCount: 2,
};

test("displays the number of unread notifications", () => {
  render(
    <MemoryRouter>
      <AlimentContext.Provider value={mockContextValue}>
        <TopBar />
      </AlimentContext.Provider>
    </MemoryRouter>
  );

  expect(screen.getByText("2")).toBeInTheDocument();
});

test("opens the notifications drawer", () => {
  render(
    <MemoryRouter>
      <AlimentContext.Provider value={mockContextValue}>
        <TopBar />
      </AlimentContext.Provider>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByTestId("NotificationsIcon"));
  expect(screen.getByText(/Poulet/i)).toBeInTheDocument();
  expect(screen.getByText(/Carottes/i)).toBeInTheDocument();
});
