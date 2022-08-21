import * as React from "react";
import type { HeadFC } from "gatsby";
import Login from "../components/Login";
import Modal from "../components/Modal";
import "../styles/global.scss";
import Plus from "../assets/plus.svg";
import { BookType } from "../../interface";
import { AuthProvider, useAuth } from "../Contexts/AuthContext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../service/firebase";

const Home: React.FC = (): JSX.Element => {
  const context = useAuth();
  const [bookData, setBookData] = React.useState<BookType[]>([]);
  const [modal, setModal] = React.useState<boolean>(false);
  const userId = context?.currentUser?.uid;

  const addBook = async () => {
    try {
      if (userId) {
        const docRef = doc(db, `books/${userId}`);
        await setDoc(
          docRef,
          {
            bookData,
          },
          { merge: true }
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getDataToState = async () => {
    const docRef = doc(db, "books", `${userId}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setBookData(Object.values(docSnap.data()));
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  // React.useEffect(() => {}, [bookData]);

  React.useEffect(() => {
    try {
      if (userId) {
        getDataToState();
      } else {
        console.log("user authentication error");
      }
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  React.useEffect(() => {
    addBook();
  }, [bookData]);
  return (
    <>
      {modal && (
        <Modal
          closeModal={setModal}
          bookData={bookData}
          setBookData={setBookData}
        />
      )}
      <header className=" w-4/6 justify-between m-auto text-center pt-6 flex">
        <h1 className=" text-left text-4xl font-sans text-teal-600">
          Books Base
        </h1>
        <nav className=" flex gap-8 items-center">
          <h4>Home</h4>
          <h4>My Books</h4>
          {!userId ? (
            <h4
              className=" cursor-pointer"
              onClick={() => context?.signInWithGoogle()}
            >
              Login
            </h4>
          ) : (
            <h4 className=" cursor-pointer" onClick={() => context?.signout()}>
              Logout
            </h4>
          )}
        </nav>
      </header>
      <main className=" w-4/6 m-auto">
        <div className="flex justify-between items-center">
          <h1 className=" mt-5 pt-5 pb-5">Shelves</h1>
          <Plus
            className="plus"
            onClick={() => {
              setModal(() => true);
            }}
          />
        </div>
        <p className="py-4 font-extrabold">CURRENTLY READING</p>
        <div className=" current-books grid grid-flow-col overflow-x-scroll ">
          {bookData.map((el) => {
            return (
              <div
                key={el.id}
                className="flex flex-1 flex-grow w-80  border p-2 mx-2 shadow"
              >
                <img src={el.image} alt="book image" />
                <div className="px-4">
                  <span>
                    <h4>{el.name}</h4>
                    <p className=" w-full pt-2">By:{el.author} </p>
                  </span>
                  <strong>{el.status}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Home;

export const Head: HeadFC = () => <title>Home Page</title>;
