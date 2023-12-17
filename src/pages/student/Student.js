import React from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { useSelector } from "react-redux/";
const Student = () => {
  const { user } = useSelector((state) => state.userInfo);

  return user?.role === "admin" ? (
    <UserLayout title="students">student</UserLayout>
  ) : (
    <h1>unathorized</h1>
  );
};

export default Student;
