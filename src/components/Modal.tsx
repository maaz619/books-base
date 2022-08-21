import React from "react";
import { Props } from "../../interface";
import { useAuth } from "../Contexts/AuthContext";

const Modal: React.FC<Props> = ({
  closeModal,
  setBookData,
  bookData,
}): JSX.Element => {
  const [bookDetail, setBookDetail] = React.useState({
    name: "",
    author: "",
    status: "",
  });
  const user = useAuth()?.currentUser;
  const clickHandler = () => {
    setBookData([
      ...bookData,
      {
        id: bookData.length,
        name: bookDetail.name,
        author: bookDetail.author,
        status: bookDetail.status,
        image:
          "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1442726934i/4865._SX120_.jpg",
      },
    ]);
  };

  return (
    <>
      <div className="container flex justify-center">
        <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className=" w-1/5  p-6 bg-white rounded-md">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl">Add a Book</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => closeModal(false)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className=" mt-4">
              {!user ? (
                <h1 className=" w-full text-4xl text-center">Please Login</h1>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    clickHandler();
                    closeModal(false);
                  }}
                >
                  <div className="">
                    <label
                      htmlFor="book"
                      className="block py-2 font-bold text-gray-600"
                    >
                      Name of Book
                    </label>
                    <input
                      type="text"
                      name="book"
                      id="book"
                      value={bookDetail.name}
                      className=" w-full  p-2 border rounded-md shadow focus:ring-purple-600"
                      placeholder="Enter you name"
                      required
                      onChange={(e) =>
                        setBookDetail({
                          ...bookDetail,
                          name: e.currentTarget.value,
                        })
                      }
                    />
                    <label
                      htmlFor="author"
                      className="block py-2 font-bold text-gray-600"
                    >
                      Name of Author
                    </label>
                    <input
                      type="text"
                      name="author"
                      id="author"
                      value={bookDetail.author}
                      className="w-full p-2 border rounded-md shadow focus:ring-purple-600"
                      placeholder=""
                      required
                      onChange={(e) =>
                        setBookDetail({
                          ...bookDetail,
                          author: e.currentTarget.value,
                        })
                      }
                    />
                  </div>
                  <label
                    htmlFor="status"
                    className="block py-2 font-bold text-gray-600"
                  >
                    Status
                  </label>
                  <select
                    className="w-3/5 px-1 mb-5 py-2 border rounded-md shadow focus:ring-purple-600"
                    name="status"
                    id="status"
                    onChange={(e) =>
                      setBookDetail({
                        ...bookDetail,
                        status: e.currentTarget.value,
                      })
                    }
                  >
                    <option hidden disabled selected value="">
                      Choose here
                    </option>
                    <option value="Currently Reading">Currently Reading</option>
                    <option value="Want To Read">Want To Read</option>
                    <option value="Finished Reading">Finished Reading</option>
                  </select>
                  <button
                    type="submit"
                    className=" w-full border-none py-2 px-5 rounded-sm font-bold text-white bg-blue-500"
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
