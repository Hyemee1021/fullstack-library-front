import axios from "axios";

const rootEp = process.env.REACT_APP_ROOTAPI;
const userEp = rootEp + "/users";
//nnow im sending form 3000 to 8000
const getAccessJWT = () => {
  const token = sessionStorage.getItem("accessJWT");
  return token;
};

const axiosProcessor = async (obj) => {
  if (obj.isPrivate) {
    //make property of obj
    obj.headers = {
      authorization: getAccessJWT(),
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
export const loginUser = async (data) => {
  return axiosProcessor({
    method: "post",
    url: userEp + "/login",
    data,
  });
};

//==========================get user
export const getUser = async () => {
  return axiosProcessor({
    method: "post",
    url: userEp,
    isPrivate: true,
  });
};
