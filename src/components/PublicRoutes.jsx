import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

const PublicRoute = () => {
	const {isLoggedIn} = useAuth()


	return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
