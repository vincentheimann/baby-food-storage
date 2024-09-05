import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import { useUser } from "../contexts/UserContext";
import { getUserProfile } from "../services/firebaseFirestoreDatabaseService";

jest.mock("../contexts/UserContext");
jest.mock("../services/firebaseFirestoreDatabaseService");

getUserProfile.mockResolvedValue({
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
});

const mockUser = {
  uid: "123",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
};

const mockUpdateUserProfile = jest.fn();
const mockUpdateUserPassword = jest.fn();
const mockResetPassword = jest.fn();
const mockSetError = jest.fn();

useUser.mockReturnValue({
  user: mockUser,
  updateUserProfile: mockUpdateUserProfile,
  updateUserPassword: mockUpdateUserPassword,
  resetPassword: mockResetPassword,
  error: null,
  setError: mockSetError,
});

describe("ProfilePage", () => {
  const renderWithRouter = (ui) => {
    return render(<Router>{ui}</Router>);
  };

  test("renders ProfilePage component with user data", async () => {
    renderWithRouter(<ProfilePage />);

    // Using findBy* handles asynchronous updates and resolves the act warning
    expect(await screen.findByLabelText(/First Name/i)).toHaveValue("John");
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue("Doe");
    expect(screen.getByLabelText(/Email/i)).toHaveValue("john@example.com");
  });

  test("shows validation errors when fields are empty", async () => {
    renderWithRouter(<ProfilePage />);

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Update Profile/i }));

    expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
  });

  test("calls updateUserProfile on form submit when fields are valid", async () => {
    renderWithRouter(<ProfilePage />);

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "jane@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Update Profile/i }));

    await waitFor(() => {
      expect(mockUpdateUserProfile).toHaveBeenCalledWith({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
      });
    });
  });

  test("calls updateUserPassword on form submit when passwords are valid", async () => {
    renderWithRouter(<ProfilePage />);

    fireEvent.change(screen.getByLabelText("Current Password"), {
      target: { value: "oldpassword" },
    });
    fireEvent.change(screen.getByLabelText("New Password"), {
      target: { value: "newpassword" },
    });
    fireEvent.change(screen.getByLabelText("Confirm New Password"), {
      target: { value: "newpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Update Password/i }));

    await waitFor(() => {
      expect(mockUpdateUserPassword).toHaveBeenCalledWith(
        "oldpassword",
        "newpassword"
      );
    });
  });

  test("shows error message when passwords do not match", async () => {
    renderWithRouter(<ProfilePage />);

    fireEvent.change(screen.getByLabelText("Current Password"), {
      target: { value: "oldpassword" },
    });
    fireEvent.change(screen.getByLabelText("New Password"), {
      target: { value: "newpassword1" },
    });
    fireEvent.change(screen.getByLabelText("Confirm New Password"), {
      target: { value: "newpassword2" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Update Password/i }));

    // Use findByText to implicitly wrap in act()
    expect(
      await screen.findByText(/new password does not match/i)
    ).toBeInTheDocument();

    // Ensure updateUserPassword has not been called
    expect(mockUpdateUserPassword).not.toHaveBeenCalled();
  });
});
