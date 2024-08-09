import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Notifications from "./Notifications";
import { getNotifications } from "../services/notificationService";

jest.mock("../services/notificationService");

const mockNotifications = [
  {
    id: 1,
    name: "Chicken",
    freezingDate: "2024-07-01",
    expirationDate: "2024-08-01",
    type: "Proteins",
  },
  {
    id: 2,
    name: "Carrots",
    freezingDate: "2024-07-05",
    expirationDate: "2024-08-05",
    type: "Vegetables",
  },
];

describe("Notifications", () => {
  beforeEach(() => {
    getNotifications.mockReturnValue(mockNotifications);
  });

  test("renders Notifications component", async () => {
    render(<Notifications />);

    expect(screen.getByText(/Notifications/i)).toBeInTheDocument();
    await waitFor(() => {
      mockNotifications.forEach((notif) => {
        expect(
          screen.getByText(new RegExp(notif.name, "i"))
        ).toBeInTheDocument();
      });
    });
  });

  test("shows no notifications message when there are no notifications", async () => {
    getNotifications.mockReturnValue([]);
    render(<Notifications />);

    const headings = screen.getAllByText(/Notifications/i);
    expect(headings[0]).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText(/No notifications at the moment/i)
      ).toBeInTheDocument();
    });
  });
});
