// src/services/firebaseAuthService.test.js
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  signUp,
  login,
  logout,
  resetPassword,
  demoLogin,
} from "./firebaseAuthService";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({ currentUser: { uid: "123" } })),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("firebaseAuthService", () => {
  const mockAuth = getAuth();

  test("signUp should create a user with email and password", async () => {
    const result = await signUp("test@example.com", "password123");
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      mockAuth,
      "test@example.com",
      "password123"
    );
  });

  test("login should sign in a user with email and password", async () => {
    const result = await login("test@example.com", "password123");
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      mockAuth,
      "test@example.com",
      "password123"
    );
  });

  test("logout should sign out a user", async () => {
    await logout();
    expect(signOut).toHaveBeenCalledWith(mockAuth);
  });

  test("resetPassword should send a password reset email", async () => {
    await resetPassword("test@example.com");
    expect(sendPasswordResetEmail).toHaveBeenCalledWith(
      mockAuth,
      "test@example.com"
    );
  });

  test("demoLogin should log in a demo user", async () => {
    const result = await demoLogin();
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      mockAuth,
      "demo@example.com",
      "demopassword"
    );
  });
});
