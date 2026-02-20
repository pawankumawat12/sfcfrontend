import React, { useEffect } from "react";
import { useVerifyQuery } from "../../redux/services/authApi";
import { useDispatch } from "react-redux";
import { Loader } from "lucide-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { data, isLoading, isError } = useVerifyQuery();
  if (isLoading) return <Loader />;

  if (!data?.success) {
    return <Navigate to="/signin" />;
  }

  if (!allowedRoles?.includes(data?.user?.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
