import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/Nav/NavBar";
import Footer from "../../components/Footer";

const MainLayout = () => {
	return (
		<>
			<NavBar />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default MainLayout;
