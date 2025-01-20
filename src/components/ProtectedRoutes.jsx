import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { saveToSessionStorage } from "../utils/localStorage";

const ProtectedRoute = () => {
	const {isLoggedIn} = useAuth()

	if (isLoggedIn) {
		return <Outlet />;
	} else {
		saveToSessionStorage("redirectUrl", window.location.href);
		
		return <Navigate to="/login" />;
	}
};

export default ProtectedRoute;
