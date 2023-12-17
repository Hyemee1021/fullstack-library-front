import { toast } from "react-toastify";
import {
  deleteBook,
  getBooks,
  postBook,
  updateBook,
} from "../../helper/axiosHelper";
import { setBooks, setABook } from "./bookSlice.js";

export const getAllBooksAction = () => async (dispatch) => {
  const { status, message, books } = await getBooks();

  console.log(books);
  if (status === "success") {
    dispatch(setBooks(books));
  }
};

//store selectedbook info
export const getABookAction = (_id) => async (dispatch) => {
  const { status, message, books } = await getBooks(_id);

  console.log(books);

  if (status === "success") {
    dispatch(setABook(books));
  }
};

export const postNewBookAction = (bookObj) => async (dispatch) => {
  const pending = postBook(bookObj);
  toast.promise(pending, {
    pending: "Please, wait...",
  });

  const { status, message } = await pending;
  toast[status](message);

  if (status === "success") {
    // fetch all books and update redux

    dispatch(getAllBooksAction());
  }
};

export const updateBookAction = (bookObj) => async (dispatch) => {
  const pending = updateBook(bookObj);
  toast.promise(pending, {
    pending: "Please wait...",
  });
  const { status, message } = await pending;
  toast[status](message);

  if (status === "success") {
    // call the fuction that fatches all the books and updates the store
    dispatch(getAllBooksAction());
    dispatch(setABook({}));
  }
};

export const deleteBookAction = (_id) => async (dispatch) => {
  const pending = deleteBook(_id);
  toast.promise(pending, {
    pending: "Please wait...",
  });
  const { status, message } = await pending;
  toast[status](message);

  if (status === "success") {
    // call the fuction that fatches all the books and updates the store
    dispatch(getAllBooksAction());
    return true;
  }
};
