import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { saveToSessionStorage } from "../utils/localStorage";
import NavBar from "./Nav/NavBar";

const ProtectedRoute = () => {
	const { isLoggedIn } = useAuth();

	if (isLoggedIn) {
		return (
			<div>
				<NavBar />
				<Outlet />
			</div>
		);
	} else {
		saveToSessionStorage("redirectUrl", window.location.href);

		return <Navigate to="/login" />;
	}
};

export default ProtectedRoute;
