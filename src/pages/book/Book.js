import React from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { useSelector } from "react-redux/";
const Book = () => {
  const { user } = useSelector((state) => state.adminInfo);

  return user?.role === "admin" ? (
    <UserLayout title="Books">
      {user?.role === "admin" ? (
        <div className="book">book</div>
      ) : (
        <h1>unauthorised</h1>
      )}
    </UserLayout>
  ) : (
    <h1>unathorized</h1>
  );
};

export default Book;
