import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProfilePage from "./ProfilePage";
import { useUser } from "../context/UserContext";

jest.mock("../context/UserContext");

const mockUser = {
  displayName: "John Doe",
  email: "john@example.com",
};

const mockUpdateUser = jest.fn();

useUser.mockReturnValue({
  user: mockUser,
  updateUser: mockUpdateUser,
});

describe("ProfilePage", () => {
  test("renders ProfilePage component with user data", () => {
    render(<ProfilePage />);
    expect(screen.getByText(/My Profile/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i).value).toBe(mockUser.displayName);
    expect(screen.getByLabelText(/Email/i).value).toBe(mockUser.email);
    expect(screen.getByLabelText(/Password/i).value).toBe("");
  });

  test("calls updateUser on form submit", async () => {
    render(<ProfilePage />);
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "newpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Update/i }));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        name: "Jane Doe",
        email: "jane@example.com",
        password: "newpassword",
      });
    });
  });
});
