import React from "react";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // With httpOnly cookies, the frontend can't see the token.
  // We rely on the API to reject requests if the cookie is missing or invalid.
  // The error handling in our components (like DashboardLayout) will then redirect.
  return <Outlet />;
};

export default ProtectedRoute;
