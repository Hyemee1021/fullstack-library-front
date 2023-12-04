import { getUser } from "../../helper/axiosHelper.js";
import { setUser } from "../../pages/user-signup_login/userSlice.js";
export const getUserAction = () => async (dispatch) => {
  //things I get from router
  const { status, message, user } = await getUser();

  if (status === "success") {
    dispatch(setUser(user));
  }
};
