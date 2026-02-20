import React from "react";
import { useVerifyQuery } from "../../redux/services/authApi";
import { Loader } from "lucide-react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { data, isLoading } = useVerifyQuery();
  if (isLoading) return <Loader />;

  if (data?.success) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PublicRoute;
