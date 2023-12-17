import React, { useState } from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { BookTable } from "../../components/books/BookTable";
import { Link, useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { postNewBookAction } from "./bookAction";

const NewBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [book, setBook] = useState({});

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(book);

    dispatch(postNewBookAction(book));
    setTimeout(() => {
      navigate("/books");
    }, 1100);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setBook({
      ...book,
      [name]: value,
    });
  };

  const inputs = [
    {
      label: "Book name",
      name: "name",
      placeholder: "Book title",
      type: "text",
      required: true,
    },
    {
      label: "thumbnail",
      name: "thumbnail",
      placeholder: "http://...",
      type: "url",
      required: true,
    },
    {
      label: "author",
      name: "author",
      placeholder: "smith",
      type: "text",
      required: true,
    },
    {
      label: "isbn",
      name: "isbn",
      placeholder: "04032222",
      type: "text",
      required: true,
    },

    {
      label: "publishYear",
      name: "publishYear",
      placeholder: "2002",
      type: "number",
      required: true,
    },
    {
      label: "description",
      name: "description",
      placeholder: "book description",
      type: "text",
      as: "textarea",
      rows: 5,
      required: true,
    },
  ];
  return (
    <UserLayout title="Add new book">
      <Link to="/books">
        <Button> &lt; Back </Button>
      </Link>

      <div className="p-3  mt-3">
        <Form
          onSubmit={handleOnSubmit}
          className="form-center border p-4 rounded mt-5"
        >
          <h2>Enter book details</h2>
          <hr />
          {inputs.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnChange} />
          ))}

          <div className="d-grid mt-2">
            <Button variant="primary" type="submit">
              Add book
            </Button>
          </div>
        </Form>
      </div>
    </UserLayout>
  );
};

export default NewBook;
