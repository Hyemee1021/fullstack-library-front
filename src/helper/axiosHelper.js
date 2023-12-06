import axios from "axios";

const rootEp = process.env.REACT_APP_ROOTAPI;
const userEp = rootEp + "/users";
//nnow im sending form 3000 to 8000

//getting token from sesstion storage
const getAccessJWT = () => {
  const token = sessionStorage.getItem("accessJWT");
  return token;
};

//getting token from refresh storage
const getRefreshJWT = () => {
  const token = localStorage.getItem("refreshJWT");
  return token;
};

const axiosProcessor = async (obj) => {
  const { isPrivate, refreshToken } = obj;

  if (isPrivate) {
    //make property of obj
    obj.headers = {
      //when ther is refreshtrure send refresh or accesstoken
      authorization: refreshToken ? getRefreshJWT() : getAccessJWT(),
    };
  }
  const token = obj.isPrivate ? getAccessJWT() : null;

  console.log(token);

  try {
    const response = await axios(obj);

    return response.data;
    // console.log(response);
    // console.log(response.data);
    //from userRouter
    // {status: 'error', message: 'There is already user exist'}

    // I need to go to response.data
  } catch (error) {
    const errorMsg = error?.response?.data?.message;

    if (errorMsg.includes("jwt expired")) {
      //get new access token
      const { accessJWT } = await getNewAccessJwt();

      if (accessJWT) {
        sessionStorage.setItem("accessJWT", accessJWT);

        //continure previous job
        console.log(obj);
        return axiosProcessor(obj);
      }
    }
    return {
      status: "error",
      message: error.message,
    };
  }
};
export const postAdminUser = async (data) => {
  return axiosProcessor({
    method: "post",
    url: userEp + "/admin-user",
    data,
  });
};
//   try {
//     const response = await axios.post(userEp + "/admin-user", data);
//     console.log(response);
//     console.log(response.data);
//     //from userRouter
//     // {status: 'error', message: 'There is already user exist'}

//     // I need to go to response.data
//     return response.data;
//   } catch (error) {
//     return {
//       status: "error",
//       message: error.message,
//     };
//   }
// };

//===================login admin
//once login, i send data(obj) with true value of isPrivate
export const loginUser = async (data) => {
  return axiosProcessor({
    method: "post",
    url: userEp + "/login",
    data,
  });
};

//===================logout admin//data is email
export const logOutUser = async (data) => {
  return axiosProcessor({
    method: "post",
    url: userEp + "/logout",
    data,
  });
};

//==========================get user info
//only i can get private user when isPrivate is true
export const getUser = async () => {
  return axiosProcessor({
    method: "get",
    url: userEp,
    isPrivate: true,
  });
};

//==========================get new user info
//only i can get private user when isPrivate is true
export const getNewAccessJwt = async () => {
  return axiosProcessor({
    method: "get",
    url: userEp + "/get-accessjwt",
    isPrivate: true,
    refreshToken: true,
  });
};
