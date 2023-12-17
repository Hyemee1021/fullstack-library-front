import { postBurrow } from "../../helper/axiosHelper";
import { toast } from "react-toastify";
import { getABookAction } from "../book/bookAction.js";

export const postBurrowAction = (obj) => async (dispatch) => {
  const pending = postBurrow(obj);
  toast.promise(pending, { pending: "Please, wait.." });

  const { status, message } = await pending;
  toast[status](message);

  if (status === "success") {
    //refetch the selected book, update the page
    dispatch(getABookAction(obj.bookId));
  }
};
