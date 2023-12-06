import React from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { useSelector } from "react-redux/";
const MyBook = () => {
  const { user } = useSelector((state) => state.adminInfo);

  return user?.role === "admin" ? (
    <UserLayout title="Books">Book</UserLayout>
  ) : (
    <h1>unathorized</h1>
  );
};

export default MyBook;
