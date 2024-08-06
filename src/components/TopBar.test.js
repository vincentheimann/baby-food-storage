import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TopBar from "./TopBar";
import { UserProvider } from "../context/UserContext";
import { BrowserRouter as Router } from "react-router-dom";

test("renders TopBar with profile icon", () => {
  const user = { email: "test@example.com" };

  render(
    <UserProvider value={{ user, logout: jest.fn() }}>
      <Router>
        <TopBar />
      </Router>
    </UserProvider>
  );

  expect(screen.getByText(/Logout \(test@example.com\)/i)).toBeInTheDocument();
});

test("calls logout function when logout button is clicked", () => {
  const logoutMock = jest.fn();
  const user = { email: "test@example.com" };

  render(
    <UserProvider value={{ user, logout: logoutMock }}>
      <Router>
        <TopBar />
      </Router>
    </UserProvider>
  );

  fireEvent.click(screen.getByText(/Logout \(test@example.com\)/i));
  expect(logoutMock).toHaveBeenCalledTimes(1);
});
