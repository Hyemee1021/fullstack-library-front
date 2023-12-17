import "./App.css";
import { Button } from "react-bootstrap";
import { IoIosHome } from "react-icons/io";
import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/user_signup_login/LogIn";
import SignUp from "./pages/user_signup_login/SignUp";
import AdminSignUp from "./pages/admin_signup/AdminSignUp";
import Home from "./pages/home/Home";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/dashboard/Dashboard";
import Book from "./pages/book/Book";
import Student from "./pages/student/Student";
import BurrowHistory from "./pages/burrow-history/BurrowHistory";
import MyProfile from "./pages/my-profile/MyProfile";
import NewBook from "./pages/book/NewBook";
import UpdateBook from "./pages/book/UpdateBook";
import {
  PrivateRouter,
  AdminPrivateRouter,
} from "./components/private-router/PrivateRouter";
import MyBook from "./pages/my-books/MyBook";
import { useEffect } from "react";
import { getAllBooksAction } from "./pages/book/bookAction";
import { useDispatch } from "react-redux";
import BookLanding from "./pages/book/BookLanding";
import { autoLogin } from "./pages/user_signup_login/userAction";

function App() {
  const dispatch = useDispatch();

  //show all thw book first on website
  useEffect(() => {
    dispatch(getAllBooksAction());
    dispatch(autoLogin());
  }, [dispatch]);

  return (
    <div className="">
      <Routes>
        {/* public  routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/book/:_id" element={<BookLanding />} />

        {/* find out where url coming form  */}
        {/* private routes  */}
        <Route
          path="/admin-signup"
          element={
            <PrivateRouter>
              <AdminSignUp />
            </PrivateRouter>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRouter>
              <Dashboard />
            </PrivateRouter>
          }
        />
        <Route
          path="/books"
          element={
            <AdminPrivateRouter>
              <Book />
            </AdminPrivateRouter>
          }
        />
        <Route
          path="/new-book"
          element={
            <AdminPrivateRouter>
              <NewBook />
            </AdminPrivateRouter>
          }
        />
        <Route
          path="/edit-book/:_id"
          element={
            <AdminPrivateRouter>
              <UpdateBook />
            </AdminPrivateRouter>
          }
        />
        <Route
          path="/students"
          element={
            <PrivateRouter>
              <Student />
            </PrivateRouter>
          }
        />
        <Route
          path="/burrow-history"
          element={
            <PrivateRouter>
              <BurrowHistory />
            </PrivateRouter>
          }
        />
        <Route
          path="/my-books"
          element={
            <PrivateRouter>
              <MyBook />
            </PrivateRouter>
          }
        />
        <Route
          path="/my-profile"
          element={
            <PrivateRouter>
              <MyProfile />
            </PrivateRouter>
          }
        />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
