import firebaseApp, { db, auth } from "./firebase";
import { getDoc, setDoc, doc } from "firebase/firestore";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from "firebase/auth";
import React from "react";
const googleProvider = new GoogleAuthProvider();

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
    console.log(user);
  } catch (err) {
    console.log(err);
  }
};
const logOut = async () => {
  return await signOut(auth);
};
export { signInWithGoogle, logOut };
