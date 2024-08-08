import { getNotifications } from "./notificationService";

describe("notificationService", () => {
  test("should return empty array if no aliments are close to expiration", () => {
    const aliments = [
      { id: 1, nom: "Poulet", datePeremption: "2024-12-01" },
      { id: 2, nom: "Carottes", datePeremption: "2024-12-10" },
    ];

    const result = getNotifications(aliments);
    expect(result).toEqual([]);
  });

  test("should return aliments that are close to expiration", () => {
    const today = new Date();
    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(today.getDate() + 7);

    const aliments = [
      {
        id: 1,
        nom: "Poulet",
        datePeremption: sevenDaysFromNow.toISOString().split("T")[0],
      },
      { id: 2, nom: "Carottes", datePeremption: "2024-12-10" },
    ];

    const result = getNotifications(aliments);
    expect(result).toEqual([
      {
        id: 1,
        nom: "Poulet",
        datePeremption: sevenDaysFromNow.toISOString().split("T")[0],
      },
    ]);
  });

  test("should handle empty aliments array", () => {
    const result = getNotifications([]);
    expect(result).toEqual([]);
  });

  test("should handle aliments with expiration today", () => {
    const today = new Date().toISOString().split("T")[0];

    const aliments = [
      { id: 1, nom: "Poulet", datePeremption: today },
      { id: 2, nom: "Carottes", datePeremption: "2024-12-10" },
    ];

    const result = getNotifications(aliments);
    expect(result).toEqual([{ id: 1, nom: "Poulet", datePeremption: today }]);
  });

  test("should return multiple aliments close to expiration", () => {
    const today = new Date();
    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);
    const fiveDaysFromNow = new Date(today);
    fiveDaysFromNow.setDate(today.getDate() + 5);

    const aliments = [
      {
        id: 1,
        nom: "Poulet",
        datePeremption: threeDaysFromNow.toISOString().split("T")[0],
      },
      {
        id: 2,
        nom: "Carottes",
        datePeremption: fiveDaysFromNow.toISOString().split("T")[0],
      },
      { id: 3, nom: "Pâtes", datePeremption: "2024-12-10" },
    ];

    const result = getNotifications(aliments);
    expect(result).toEqual([
      {
        id: 1,
        nom: "Poulet",
        datePeremption: threeDaysFromNow.toISOString().split("T")[0],
      },
      {
        id: 2,
        nom: "Carottes",
        datePeremption: fiveDaysFromNow.toISOString().split("T")[0],
      },
    ]);
  });
});
