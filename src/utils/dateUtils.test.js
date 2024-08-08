import { formatDate } from "./dateUtils";

describe("formatDate", () => {
  test("should format date in dd.MM.yyyy format", () => {
    const date = "2024-12-01";
    const result = formatDate(date);
    expect(result).toBe("01.12.2024");
  });

  test("should handle different date formats", () => {
    const date = "12/31/2024";
    const result = formatDate(date);
    expect(result).toBe("31.12.2024");
  });

  test("should handle Date object input", () => {
    const date = new Date(2024, 11, 25); // December 25, 2024
    const result = formatDate(date);
    expect(result).toBe("25.12.2024");
  });

  test('should return "Invalid Date" for invalid date input', () => {
    const date = "invalid-date";
    expect(() => formatDate(date)).toThrow();
  });

  test("should correctly handle leap years", () => {
    const date = "2024-02-29";
    const result = formatDate(date);
    expect(result).toBe("29.02.2024");
  });
});
