import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { saveToSessionStorage } from "../utils/localStorage";
import NavBar from "./Nav/NavBar";
import TrustMeterLoader from "./common/TrustMeterSpinner";

const ProtectedRoute = () => {
	const { isLoggedIn, isLoading } = useAuth();

	if (isLoading)
		return (
			<div className="w-screen h-screen flex items-center justify-center">
				<TrustMeterLoader />
			</div>
		);

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
