import "./App.css";

import { Routes, Route } from "react-router-dom";
import { MdOutlineLocalLibrary } from "react-icons/md";

import SignIn from "../src/pages/user-signup_login/LogIn";
import SignUp from "./pages/user-signup_login/SignUp";
import AdminSignUp from "../src/pages/admin_signup/AdminSignUp";
import Home from "../src/pages/home/Home";
function App() {
  return (
    <div className="App">
      <Routes>
        {/* public */}
        <Route path="/" element={<Home />} />
        <Route path="login" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        {/*private  */}
        <Route path="admin-signup" element={<AdminSignUp />} />
      </Routes>
    </div>
  );
}

export default App;
