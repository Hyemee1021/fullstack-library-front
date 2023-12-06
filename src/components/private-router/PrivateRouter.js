import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRouter = ({ children }) => {
  const location = useLocation();
  console.log(location);

  const { user } = useSelector((state) => state.adminInfo);
  //send to login
  return user?._id ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: { location } }} />
  );
};

export const AdminPrivateRouter = ({ children }) => {
  const { user } = useSelector((state) => state.adminInfo);

  return user?.role === "admin" ? children : <h1>You are not authorized.</h1>;
};
