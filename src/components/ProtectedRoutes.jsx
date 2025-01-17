import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute = () => {
	const {isLoggedIn} = useAuth()

	return isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
