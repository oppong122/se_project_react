import React from "react";
import { Navigate } from "react-router-dom";

export default function Protectedroute({ isloggedIn, children }) {
  return isloggedIn ? children : <Navigate to="/" replace />;
}
