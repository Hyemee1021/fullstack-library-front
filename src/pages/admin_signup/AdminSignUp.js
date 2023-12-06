import React from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { useState } from "react";
import { postAdminUser } from "../../helper/axiosHelper.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux/";
const initialState = {
  fName: "",
  lName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const AdminSignUp = () => {
  const { user } = useSelector((state) => state.adminInfo);
  const [form, setForm] = useState(initialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    console.log(form);

    const { confirmPassword, ...rest } = form;

    if (confirmPassword !== rest.password) {
      return alert("password do not match");
    }
    // const {message, status} = await postAdminUser(rest);

    const pending = postAdminUser(rest);

    toast.promise(pending, {
      pending: "Please, wait",
      //success:"request success",
      //error:"error in request"
    });
    // console.log(data);
    // console.log(data.status);
    // console.log(data.message);
    const { status, message } = await pending;
    toast[status](message); //toast.success or toast.error
  };
  const inputs = [
    {
      label: "First name",
      name: "fName",
      placeholder: "Sam",
      type: "text",
      required: true,
    },
    {
      label: "Last name",
      name: "lName",
      placeholder: "Smith",
      type: "text",
      required: true,
    },
    {
      label: "email",
      name: "email",
      placeholder: "smith@email.com",
      type: "text",
      required: true,
    },
    {
      label: "Phone",
      name: "phone",
      placeholder: "04032222",
      type: "text",
    },

    {
      label: "Password",
      name: "password",
      placeholder: "****",
      type: "password",
      required: true,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      placeholder: "****",
      type: "password",
      required: true,
    },
  ];

  if (user?.role !== "admin") {
    return `<h1>Unauthorised</h1>`;
  }
  return (
    <div className="bg-light p-3 text-light">
      <Form
        onSubmit={handleOnSubmit}
        className="form-center border shadow-lg p-4 rounded mt-5"
      >
        <h2>Create New Admin</h2>
        <hr />
        {inputs.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}

        <div className="d-grid mt-2">
          <Button variant="primary" type="submit">
            Create New Admin
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AdminSignUp;
