import React from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { useSelector } from "react-redux/";
const Dashboard = () => {
  const { user } = useSelector((state) => state.adminInfo);

  return user?.role === "admin" ? (
    <UserLayout title="dashboard">
      {user?.role === "admin" ? (
        <div className="dashboard">Dashboard</div>
      ) : (
        <h1>unauthorised</h1>
      )}
    </UserLayout>
  ) : (
    <h1>unathorized</h1>
  );
};

export default Dashboard;
