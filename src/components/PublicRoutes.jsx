import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import TrustMeterLoader from "./common/TrustMeterSpinner";

const PublicRoute = () => {
	const { isLoggedIn, isLoading } = useAuth();

	if (isLoading)
		return (
			<div className="w-screen h-screen flex items-center justify-center">
				<TrustMeterLoader />
			</div>
		);

	return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
