import {
  getAuth,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  deleteUser,
} from "firebase/auth";
import app from "./firebaseApp";

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user; // The signed-in user info
  } catch (error) {
    throw error; // Handle errors as needed
  }
};

export const deleteAccount = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    await deleteUser(user);
  }
};

export const logout = () => signOut(auth);
