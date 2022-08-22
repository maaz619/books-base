// import { useAuth } from "../Contexts/AuthContext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../service/firebase";

export const addData = async (books: any, userId: any) => {
  try {
    if (userId) {
      const docRef = doc(db, `books/${userId}/`);
      await setDoc(docRef, { books }, { merge: true });
    }
  } catch (error: any) {
    console.log(error.message);
  }
};
export const updateData = () => {};
