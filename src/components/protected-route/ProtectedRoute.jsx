import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../../features/auth/pages/login/Login";

const ProtectedRoute = (props) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser || !currentUser.name) {
    return <Login></Login>;
  }
  return <Outlet></Outlet>;
};

export default ProtectedRoute;
