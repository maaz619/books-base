import React from "react";
import type { HeadFC } from "gatsby";
import Modal from "./Modal";
import EditModal from "./EditBook";
import "../styles/global.scss";
import Plus from "../assets/plus.svg";
import { BookType } from "../../interface";
import { useAuth } from "../Contexts/AuthContext";
import { addData } from "../utils/utils";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../service/firebase";

const Home: React.FC = (): JSX.Element => {
  const context = useAuth();
  const [bookData, setBookData] = React.useState<BookType[]>([]);
  const [currentBook, setBook] = React.useState<BookType>();
  const [editBook, setEditBook] = React.useState<boolean>(false);
  const [modal, setModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const userId = context?.currentUser?.uid;
  const getData = async () => {
    try {
      if (userId) {
        const docRef = doc(db, `books/${userId}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          docSnap.data()?.books?.forEach((doc: any) => {
            setBookData((prev) => [...prev, doc]);
            console.log(doc);
          });
          console.log(docSnap.data());
          setLoading(true);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const updateData = async (currentTask: any) => {};
  React.useEffect(() => {
    getData();
  }, [userId, setBookData]);
  React.useEffect(() => {
    addData(bookData, userId);
  }, [bookData]);
  return (
    <>
      {modal && (
        <Modal
          closeModal={setModal}
          bookData={bookData}
          setBookData={setBookData}
          setLoading={setLoading}
        />
      )}
      {editBook && (
        <EditModal
          editBook={setEditBook}
          bookData={currentBook}
          setBookData={setBook}
        />
      )}
      <header className=" w-4/6 justify-between m-auto text-center pt-6 flex">
        <h1 className=" text-left text-4xl font-sans text-teal-600">
          Books Base
        </h1>
        <nav className=" flex gap-8 items-center">
          {!userId ? (
            <h4
              className=" cursor-pointer"
              onClick={() => context?.signInWithGoogle()}
            >
              Login
            </h4>
          ) : (
            <h4
              className=" cursor-pointer"
              onClick={() => {
                context?.signout();
                setLoading(false);
                context.currentUser = null;
                setBookData([]);
              }}
            >
              Logout
            </h4>
          )}
        </nav>
      </header>
      <main className=" w-4/6 m-auto">
        <div className="flex justify-between items-center">
          <h1 className=" text-5xl font-medium mt-5 pt-5 pb-5">Shelves</h1>
          <Plus
            className="plus"
            onClick={() => {
              setModal(() => true);
            }}
          />
        </div>
        <p className="py-4 font-extrabold">CURRENTLY READING</p>
        {loading && bookData.length ? (
          <div className=" current-books grid grid-flow-col overflow-x-scroll ">
            {bookData.map((el, key) => {
              return (
                <div key={key} className="flex w-80  border p-2 mx-2 shadow">
                  <>
                    <img src={el.image} alt="book image" />
                    <div className="flex flex-col items-center justify-between px-4">
                      <div>
                        <span>
                          <h4 className="text-2xl font-bold">{el.name}</h4>
                          <p className=" w-full pt-2">By:{el.author} </p>
                        </span>
                        <small className="font-semibold">{el.status}</small>
                      </div>
                      <button
                        onClick={() => {
                          setEditBook(() => true);
                          setBook(() => el);
                        }}
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Edit
                      </button>
                    </div>
                  </>
                </div>
              );
            })}
          </div>
        ) : bookData.length === 0 ? (
          "No books found"
        ) : (
          "Loading Books...."
        )}
      </main>
    </>
  );
};

export default Home;

export const Head: HeadFC = () => <title>Home Page</title>;
