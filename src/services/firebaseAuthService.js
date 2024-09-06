import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword as firebaseUpdatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import app from "./firebaseApp";

export const auth = getAuth(app);

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Automatically send email verification after sign-up
    await sendEmailVerification(user);

    return userCredential;
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      throw new Error("This email is already in use.");
    }
    throw error; // Re-throw other errors
  }
};

export const sendVerificationEmail = (user) => sendEmailVerification(user);

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const resetPassword = (email) => sendPasswordResetEmail(auth, email);

export const demoLogin = () =>
  signInWithEmailAndPassword(auth, "demo@example.com", "demopassword");

export const updatePassword = async (currentPassword, newPassword) => {
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  try {
    await reauthenticateWithCredential(user, credential);
    await firebaseUpdatePassword(user, newPassword);
  } catch (error) {
    console.error("Password update failed: ", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
