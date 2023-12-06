import React from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { useSelector } from "react-redux";
const MyProfile = () => {
  const { user } = useSelector((state) => state.adminInfo);

  return user?.role === "admin" ? (
    <UserLayout titile={"My Profile"}>My Profile</UserLayout>
  ) : (
    <h1> unanthorise</h1>
  );
};

export default MyProfile;
