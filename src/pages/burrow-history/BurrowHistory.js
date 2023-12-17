import React from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { useSelector } from "react-redux/";
const BurrowHistory = () => {
  const { user } = useSelector((state) => state.userInfo);

  return user?.role === "admin" ? (
    <UserLayout title="BurrowHistory">Burrow history</UserLayout>
  ) : (
    <h1>unathorized</h1>
  );
};

export default BurrowHistory;
