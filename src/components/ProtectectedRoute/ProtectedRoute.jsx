import React from "react";
import { Navigate } from "react-router-dom";

export default function Protectedroute({ loggedIn, children }) {
  return loggedIn ? children : <Navigate to="/" replace />;
}
