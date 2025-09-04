// import React from "react";
// import { Outlet } from "react-router-dom";

// const ProtectedRoute = () => {
//   // With httpOnly cookies, the frontend can't see the token.
//   // We rely on the API to reject requests if the cookie is missing or invalid.
//   // The error handling in our components (like DashboardLayout) will then redirect.
//   return <Outlet />;
// };

// export default ProtectedRoute;


import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../services/api"; 

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    api.get("/auth/me", { withCredentials: true })
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
}

