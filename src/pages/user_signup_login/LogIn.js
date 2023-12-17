import React, { useEffect } from "react";

import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../../components/custom-input/CustomInput.js";
import { useRef } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../helper/axiosHelper.js";
import { MainLayout } from "../../components/layout/MainLayout.js";
import { autoLogin, getUserAction } from "./userAction.js";
import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
const LogIn = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.userInfo);
  console.log(user);
  //send the page where I am from
  const fromLocation =
    location?.state?.from?.location?.pathname || "/dashboard";
  console.log(fromLocation);
  //for user experience
  //I dont need to log in
  useEffect(() => {
    //redirect-

    user?._id && navigate(fromLocation);
    //id there is _id codes below dont execute

    !user?._id && dispatch(autoLogin());
  }, [user?._id, navigate, dispatch, fromLocation]);

  //binding useRef with inputs so i get value

  const inputs = [
    {
      label: "Email",
      name: "email",
      placeholder: "smith@email.com",
      type: "text",
      required: true,
      passRef: emailRef,
    },

    {
      label: "Password",
      name: "password",
      placeholder: "****",
      type: "password",
      required: true,
      passRef: passwordRef,
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    console.log(email, password);

    if (!email || !password) {
      return toast.error("All the input fields must be filled");
    }

    //calling axios-userRouter sends jwts

    const { status, message, jwts } = await loginUser({ email, password });
    toast[status](message);
    if (status === "success") {
      const { accessJWT, refreshJWT } = jwts;

      sessionStorage.setItem("accessJWT", accessJWT);
      localStorage.setItem("refreshJWT", refreshJWT);

      //fetsh user info- store in redux store , redirtect to dashboard

      //userAction

      dispatch(getUserAction());
      return;
    }

    //only shoe toast when there is an error
    toast[status](message);
  };
  return (
    <div>
      <MainLayout>
        <div className="bg-light p-3 text-light">
          <Form
            onSubmit={handleOnSubmit}
            className="form-center border shadow-lg p-4 rounded mt-5"
          >
            <h2>Welcome to Log in</h2>
            <hr />
            {inputs.map((item, i) => (
              <CustomInput key={i} {...item} />
            ))}

            <div className="d-grid mt-2">
              <Button variant="primary" type="submit">
                login
              </Button>
            </div>
          </Form>
        </div>
      </MainLayout>
    </div>
  );
};

export default LogIn;
