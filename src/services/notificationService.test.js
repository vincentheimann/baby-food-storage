import { getNotifications } from "./notificationService";

describe("notificationService", () => {
  test("should return an empty array if no foods are close to expiration", () => {
    const aliments = [
      { id: 1, name: "Chicken", expirationDate: "2024-12-01" },
      { id: 2, name: "Carrots", expirationDate: "2024-12-10" },
    ];

    const result = getNotifications(aliments);
    expect(result).toEqual([]);
  });

  test("should return foods that are close to expiration", () => {
    const today = new Date();
    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(today.getDate() + 7);

    const aliments = [
      {
        id: 1,
        name: "Chicken",
        expirationDate: sevenDaysFromNow.toISOString().split("T")[0],
      },
      { id: 2, name: "Carrots", expirationDate: "2024-12-10" },
    ];

    const result = getNotifications(aliments);
    expect(result).toEqual([
      {
        id: 1,
        name: "Chicken",
        expirationDate: sevenDaysFromNow.toISOString().split("T")[0],
      },
    ]);
  });

  test("should handle an empty foods array", () => {
    const result = getNotifications([]);
    expect(result).toEqual([]);
  });

  test("should handle foods with expiration today", () => {
    const today = new Date().toISOString().split("T")[0];

    const aliments = [
      { id: 1, name: "Chicken", expirationDate: today },
      { id: 2, name: "Carrots", expirationDate: "2024-12-10" },
    ];

    const result = getNotifications(aliments);
    expect(result).toEqual([{ id: 1, name: "Chicken", expirationDate: today }]);
  });

  test("should return multiple foods close to expiration", () => {
    const today = new Date();
    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);
    const fiveDaysFromNow = new Date(today);
    fiveDaysFromNow.setDate(today.getDate() + 5);

    const aliments = [
      {
        id: 1,
        name: "Chicken",
        expirationDate: threeDaysFromNow.toISOString().split("T")[0],
      },
      {
        id: 2,
        name: "Carrots",
        expirationDate: fiveDaysFromNow.toISOString().split("T")[0],
      },
      { id: 3, name: "Pasta", expirationDate: "2024-12-10" },
    ];

    const result = getNotifications(aliments);
    expect(result).toEqual([
      {
        id: 1,
        name: "Chicken",
        expirationDate: threeDaysFromNow.toISOString().split("T")[0],
      },
      {
        id: 2,
        name: "Carrots",
        expirationDate: fiveDaysFromNow.toISOString().split("T")[0],
      },
    ]);
  });
});
