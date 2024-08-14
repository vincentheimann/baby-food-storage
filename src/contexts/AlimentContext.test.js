import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { AlimentProvider, AlimentContext } from "./AlimentContext";
import { useUser } from "./UserContext";
import { differenceInDays } from "date-fns";

jest.mock("./UserContext");

const ErrorBoundary = ({ children }) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>{children}</React.Suspense>
  );
};

describe("AlimentContext", () => {
  beforeEach(() => {
    useUser.mockReturnValue({ user: { email: "demo@example.com" } });
    jest.clearAllMocks();
  });

  test("should initialize demo aliments when user is demo", () => {
    let contextValue;
    render(
      <ErrorBoundary>
        <AlimentProvider>
          <AlimentContext.Consumer>
            {(value) => {
              contextValue = value;
              return null;
            }}
          </AlimentContext.Consumer>
        </AlimentProvider>
      </ErrorBoundary>
    );

    expect(contextValue.aliments.length).toBeGreaterThan(0);
  });

  test("should initialize empty aliments when user is not demo", () => {
    useUser.mockReturnValue({ user: { email: "notdemo@example.com" } });

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

    expect(contextValue.aliments.length).toBe(0);
  });

  test("should calculate notifications for expired aliments", () => {
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

    const expiredNotification = contextValue.notifications.find(
      (notif) => notif.name === "Chicken"
    );
    const diffDays = differenceInDays(
      new Date(expiredNotification.expirationDate),
      new Date()
    );

    expect(diffDays).toBeLessThan(0);
    expect(expiredNotification.message).toContain("Expired");
    expect(expiredNotification.color).toBe("red");
  });

  test("should calculate notifications for aliments expiring today", () => {
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

    const today = new Date();
    const expiringTodayAliment = {
      id: 11,
      name: "Bread",
      freezingDate: "2024-07-30",
      expirationDate: today.toISOString().split("T")[0],
      type: "Carbs",
      quantity: 4,
    };

    act(() => {
      contextValue.setAliments([expiringTodayAliment]);
    });

    const expiringTodayNotification = contextValue.notifications.find(
      (notif) => notif.id === expiringTodayAliment.id
    );

    expect(expiringTodayNotification.message).toContain("Expires today");
    expect(expiringTodayNotification.color).toBe("orange");
  });

  test("should calculate notifications for aliments expiring in the next 3 days", () => {
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

    const today = new Date();
    const expiringSoonAliment = {
      id: 12,
      name: "Milk",
      freezingDate: "2024-07-30",
      expirationDate: new Date(today.setDate(today.getDate() + 3))
        .toISOString()
        .split("T")[0],
      type: "Dairy",
      quantity: 2,
    };

    act(() => {
      contextValue.setAliments([expiringSoonAliment]);
    });

    const expiringSoonNotification = contextValue.notifications.find(
      (notif) => notif.id === expiringSoonAliment.id
    );

    expect(expiringSoonNotification.message).toContain("Expires in");
    expect(expiringSoonNotification.color).toBe("orange");
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
      <ErrorBoundary>
        <AlimentProvider>
          <AlimentContext.Consumer>
            {(value) => {
              contextValue = value;
              return null;
            }}
          </AlimentContext.Consumer>
        </AlimentProvider>
      </ErrorBoundary>
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
