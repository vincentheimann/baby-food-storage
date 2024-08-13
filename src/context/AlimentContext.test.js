import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { AlimentProvider, AlimentContext } from "./AlimentContext";
import { useUser } from "./UserContext";
import { differenceInDays } from "date-fns";

jest.mock("./UserContext");

describe("AlimentContext", () => {
  const mockUser = { email: "demo@example.com" };
  useUser.mockReturnValue({ user: mockUser });

  test("should initialize demo aliments when user is demo", () => {
    let contextValue;
    render(
      <AlimentProvider>
        <AlimentContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </AlimentContext.Consumer>
      </AlimentProvider>
    );

    expect(contextValue.aliments.length).toBeGreaterThan(0);
  });

  test("should calculate notifications based on expiration dates", () => {
    let contextValue;
    const today = new Date();

    render(
      <AlimentProvider>
        <AlimentContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </AlimentContext.Consumer>
      </AlimentProvider>
    );

    const notification = contextValue.notifications.find(
      (notif) => notif.name === "Chicken"
    );

    const diffDays = differenceInDays(
      new Date(notification.expirationDate),
      today
    );
    expect(notification.message).toContain(
      diffDays < 0 ? "Expired" : "Expires"
    );
  });

  test("should add a new aliment", () => {
    let contextValue;
    render(
      <AlimentProvider>
        <AlimentContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </AlimentContext.Consumer>
      </AlimentProvider>
    );

    act(() => {
      contextValue.addAliment({
        name: "New Food",
        freezingDate: "2024-07-01",
        expirationDate: "2024-08-01",
        type: "Proteins",
        quantity: 5,
      });
    });

    expect(
      contextValue.aliments.some((aliment) => aliment.name === "New Food")
    ).toBe(true);
  });

  test("should decrement aliment quantity", () => {
    let contextValue;
    render(
      <AlimentProvider>
        <AlimentContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </AlimentContext.Consumer>
      </AlimentProvider>
    );

    const alimentId = contextValue.aliments[0].id;
    const initialQuantity = contextValue.aliments[0].quantity;

    act(() => {
      contextValue.decrementAlimentQuantity(alimentId);
    });

    const updatedAliment = contextValue.aliments.find(
      (aliment) => aliment.id === alimentId
    );
    expect(updatedAliment.quantity).toBe(initialQuantity - 1);
  });

  test("should increment aliment quantity", () => {
    let contextValue;
    render(
      <AlimentProvider>
        <AlimentContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </AlimentContext.Consumer>
      </AlimentProvider>
    );

    const alimentId = contextValue.aliments[0].id;
    const initialQuantity = contextValue.aliments[0].quantity;

    act(() => {
      contextValue.incrementAlimentQuantity(alimentId);
    });

    const updatedAliment = contextValue.aliments.find(
      (aliment) => aliment.id === alimentId
    );
    expect(updatedAliment.quantity).toBe(initialQuantity + 1);
  });

  test("should update an aliment", () => {
    let contextValue;
    render(
      <AlimentProvider>
        <AlimentContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </AlimentContext.Consumer>
      </AlimentProvider>
    );

    const alimentId = contextValue.aliments[0].id;

    act(() => {
      contextValue.updateAliment({
        id: alimentId,
        name: "Updated Food",
        freezingDate: "2024-07-01",
        expirationDate: "2024-08-01",
        type: "Proteins",
        quantity: 5,
      });
    });

    const updatedAliment = contextValue.aliments.find(
      (aliment) => aliment.id === alimentId
    );
    expect(updatedAliment.name).toBe("Updated Food");
  });

  test("should update multiple aliments' types", () => {
    let contextValue;
    render(
      <AlimentProvider>
        <AlimentContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </AlimentContext.Consumer>
      </AlimentProvider>
    );

    const updatedAliments = [
      { id: 1, type: "Vegetables" },
      { id: 2, type: "Fruits" },
    ];

    act(() => {
      contextValue.updateMultipleAliments(updatedAliments);
    });

    updatedAliments.forEach((updatedAliment) => {
      const aliment = contextValue.aliments.find(
        (a) => a.id === updatedAliment.id
      );
      expect(aliment.type).toBe(updatedAliment.type);
    });
  });

  test("should mark a notification as read", () => {
    let contextValue;
    render(
      <AlimentProvider>
        <AlimentContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </AlimentContext.Consumer>
      </AlimentProvider>
    );

    const notificationId = contextValue.notifications[0].id;

    act(() => {
      contextValue.markNotificationAsRead(notificationId);
    });

    const updatedNotification = contextValue.notifications.find(
      (notif) => notif.id === notificationId
    );
    expect(updatedNotification.read).toBe(true);
  });

  test("should delete a notification", () => {
    let contextValue;
    render(
      <AlimentProvider>
        <AlimentContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </AlimentContext.Consumer>
      </AlimentProvider>
    );

    const notificationId = contextValue.notifications[0].id;

    act(() => {
      contextValue.deleteNotification(notificationId);
    });

    expect(
      contextValue.notifications.some((notif) => notif.id === notificationId)
    ).toBe(false);
  });
});
