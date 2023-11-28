import React from "react";

import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { useRef } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../helper/axiosHelper.js";
import { MainLayout } from "../../components/layout/MainLayout.js";

const LogIn = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  //binding useRef with inputs so i get value
  const inputs = [
    {
      label: "email",
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

    if (!email || !password) {
      return toast.error("All the input fields must be filled");
    }

    const { status, message } = await loginUser({ email, password });

    toast[status](message);
  };
  return (
    <div>
      <MainLayout>
        <div className="bg-dark p-3 text-light">
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
