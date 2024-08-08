// src/pages/ProfilePage.test.js
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
    expect(screen.getByText(/Mon Profil/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nom/i).value).toBe(mockUser.displayName);
    expect(screen.getByLabelText(/Email/i).value).toBe(mockUser.email);
    expect(screen.getByLabelText(/Mot de passe/i).value).toBe("");
  });

  test("calls updateUser on form submit", async () => {
    render(<ProfilePage />);
    fireEvent.change(screen.getByLabelText(/Nom/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
      target: { value: "newpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Mettre à jour/i }));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        name: "Jane Doe",
        email: "jane@example.com",
        password: "newpassword",
      });
    });
  });
});
