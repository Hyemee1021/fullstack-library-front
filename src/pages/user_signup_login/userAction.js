import {
  getNewAccessJwt,
  getUser,
  logOutUser,
} from "../../helper/axiosHelper.js";
import { setUser } from "./userSlice.js";

//this will fetch user info and store in redux store
export const getUserAction = () => async (dispatch) => {
  //things I get from router
  const { status, message, user } = await getUser();
  console.log(status);

  console.log(user);
  if (status === "success") {
    //send userInfo save in store

    //export action(function in slice) can update state
    //i need to use dispatch to use action in slice
    //i need to call this when I need to update state
    dispatch(setUser(user));
  }
};

//logi user automatically

// export const autoLogin = () => async (dispatch) => {
//   //after logged out,
//   //check access JWT agaiing

//   const accessJWT = sessionStorage.getItem("accessJWT");

//   if (accessJWT) {
//     return dispatch(getUserAction());
//     //return wont execute code be;low
//   }
// when I dont execute or dont have accesstoken, code below will execute
//   const refreshJWT = localStorage.getItem("refreshJWT");
//   if (refreshJWT) {
//     const response = await getNewAccessJWT();
//     if (response?.accessJWT) {
//       sessionStorage.setItem("accessJWT", response.accessJWT);
// dispatch(getUserAction())
//     }
//   }
// };

export const autoLogin = () => async (dispatch) => {
  //check if we have accessJWT, if so, get user and mount in the state

  const accessJWT = sessionStorage.getItem("accessJWT");
  const refreshJWT = localStorage.getItem("refreshJWT");

  if (!accessJWT && refreshJWT) {
    const response = await getNewAccessJwt();
    if (response?.accessJWT) {
      sessionStorage.setItem("accessJWT", response.accessJWT);

      dispatch(getUserAction());
    }
  }
  dispatch(getUserAction());
};

export const logOutUserACtion = (email) => async (dispatch) => {
  //get access token befoew deleting
  const accessJWT = sessionStorage.getItem("accessJWT");

  //clear user state,
  dispatch(setUser({}));

  //clear storages,
  sessionStorage.removeItem("accessJWT");
  //delete both tokens- from both data
  localStorage.removeItem("refreshJWT");

  //delete both jwtas in both tables
  //email will help me find refreshToken in user data
  //assess token will help mw find one and delete
  await logOutUser({ email, accessJWT });
};
