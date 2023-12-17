import React, { useEffect, useState } from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { BookTable } from "../../components/books/BookTable";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CustomInput } from "../../components/custom-input/CustomInput";
import {
  deleteBookAction,
  getABookAction,
  postNewBookAction,
  updateBookAction,
} from "./bookAction";
const UpdateBook = () => {
  // get _id from url
  //use _id to fetch a book from data
  //store book in store
  //get selected book from the state and fill out the form
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { _id } = useParams();
  const [form, setForm] = useState({});
  console.log(form);

  const { selectedBook } = useSelector((state) => state.bookInfo);

  console.log(selectedBook);

  //get _id in redux
  //useParam returns an object of key or value of the dynamic params from current URL
  //as soon as the page is open I like to get selected book info and show
  useEffect(() => {
    //first there is empty in form
    if (_id !== form._id) {
      dispatch(getABookAction(_id));
      setForm(selectedBook);
    }
  }, [_id, dispatch, selectedBook, form._id]);

  console.log(form);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to update this book?")) {
      return;
    }

    const { __v, updatedAt, isbn, createdAt, ...rest } = form;
    dispatch(updateBookAction(rest));

    setTimeout(() => {
      navigate("/books");
    }, 1500);
    console.log(form);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnDelete = async () => {
    if (window.confirm("Are you sure you wnat to delete this book?")) {
      const isDeleted = await dispatch(deleteBookAction(_id));

      isDeleted && navigate("/books");
    }
  };

  const inputs = [
    {
      label: "Book name",
      name: "name",
      placeholder: "Book title",
      type: "text",
      value: form.name,
      required: true,
    },
    {
      label: " thumbnail",
      name: "thumbnail",
      placeholder: "http://...",
      type: "text",
      value: form.thumbnail,
      required: true,
    },
    {
      label: "author",
      name: "author",
      placeholder: "smith",
      type: "text",
      value: form.author,
      required: true,
    },
    {
      label: "isbn",
      name: "isbn",
      placeholder: "04032222",
      type: "text",
      value: form.isbn,
      disabled: true,
      required: true,
    },

    {
      label: "publishYear",
      name: "publishYear",
      placeholder: "2002-10-20",
      type: "number",
      value: form.publishYear,
      required: true,
    },
    {
      label: "description",
      name: "description",
      placeholder: "book description",
      type: "text",
      as: "textarea",
      rows: 5,
      value: form.description,
      required: true,
    },
  ];
  return (
    <UserLayout title="Update book">
      <Link to="/books">
        <Button variant="secondary"> &lt; Back</Button>
      </Link>
      <div className="mt-3">
        <Form onSubmit={handleOnSubmit} className=" ">
          <h4>Update data in the form below</h4>
          <hr />
          <Form.Group className="mb-3">
            <label htmlFor="">Status</label>
            <Form.Select name="status" onChange={handleOnChange}>
              <option value="">--Select one --</option>
              <option value="active" selected={form.status === "active"}>
                Active{" "}
              </option>
              <option value="inactive" selected={form.status === "inactive"}>
                Inactive
              </option>
            </Form.Select>
          </Form.Group>

          {inputs.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnChange} />
          ))}

          <div className="d-grid mt-2">
            <Button variant="primary" type="submit">
              {" "}
              Update Book
            </Button>
          </div>
        </Form>

        <div className="d-grid mt-5">
          <Button onClick={handleOnDelete} variant="danger">
            Delete Book
          </Button>
        </div>
      </div>
    </UserLayout>
  );
};

export default UpdateBook;
