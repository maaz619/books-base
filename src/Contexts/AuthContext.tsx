import React, { ReactNode } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../service/firebase";

export type UserContextType = {
  currentUser: User | null | undefined;
  signout: () => void;
  signInWithGoogle: () => void;
};

const contextDefaultValue = {
  currentUser: null,
  signout: () => {},
  signInWithGoogle: () => {},
};
const AuthContext =
  React.createContext<UserContextType | undefined>(contextDefaultValue);

export const useAuth = () => {
  return React.useContext(AuthContext);
};
const googleProvider = new GoogleAuthProvider();

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [currentUser, setCurrentUser] =
    React.useState<User | null | undefined>(null);

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const userDoc = getDoc(doc(db, `users/${user.uid}`));
      !(await userDoc).exists()
        ? setDoc(doc(db, `users/${user?.uid}`), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            authProvider: "GoogleAuthProvider",
          })
        : null;
      console.log((await userDoc).data());
    } catch (err) {
      console.log(err);
    }
  };
  const signout = async () => {
    await signOut(auth);
  };
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value: UserContextType = {
    currentUser,
    signInWithGoogle,
    signout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
