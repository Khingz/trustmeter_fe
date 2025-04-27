import React, { useEffect, useState } from "react";
import { handleScroll } from "../../utils";
import { Link } from "react-router-dom";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import NavMenuDesktop from "./NavMenuDesktop";
import { useCustomNav } from "../../context/navContext";
import NavMenuMobile from "./NavMenuMobile";

const NavBar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const { isNavOpen, handleNavToggle, isMobile } = useCustomNav();

	useEffect(() => {
		const onScroll = () => handleScroll(setIsScrolled);
		window.addEventListener("scroll", onScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav
			className={`fixed w-full top-0 z-50 transition-colors duration-300 ${
				isScrolled ? "bg-[rgba(255,255,255,0.9)] shadow-lg" : "bg-white"
			}`}
		>
			<div className="w-full lg:w-4/5 mx-auto flex justify-between items-center py-[1.5rem] px-[1.5rem] md:gap-1">
				<div className="">
					<Link to={"/"}>
						<h2 className="text-indigo-600 font-bold text-3xl">TrustMeter</h2>
					</Link>
				</div>
				<div className="flex items-center justify-end gap-10">
					{isMobile ? (
						<div onClick={handleNavToggle}>
							<HiMiniBars3BottomRight size={30} />
						</div>
					) : (
						<NavMenuDesktop />
					)}
				</div>

				{isMobile && (
					<div
						className={`absolute top-0 w-screen min-h-screen transition-all duration-500 ease-in-out ${
							isNavOpen ? "left-0" : "-left-[1000px]"
						}`}
					>
						<NavMenuMobile />
					</div>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
