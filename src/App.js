import "./App.css";

import { Routes, Route } from "react-router-dom";

import LogIn from "../src/pages/user-signup_login/LogIn";
import SignUp from "./pages/user-signup_login/SignUp";
import AdminSignUp from "../src/pages/admin_signup/AdminSignUp";
import Home from "../src/pages/home/Home";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="">
      <Routes>
        {/* public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/*private  */}
        <Route path="/admin-signup" element={<AdminSignUp />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
