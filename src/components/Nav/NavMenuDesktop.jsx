import React from "react";
import { Link, NavLink } from "react-router-dom";
import { getNavLinkClass, navLinks } from "../../utils/navUtils";
import { useAuth } from "../../context/authContext";

const NavMenuDesktop = () => {
	const { isLoggedIn, currentUser } = useAuth();
	return (
		<div className="flex items-center justify-center gap-6 font-extralight text-md">
			{navLinks.map((link, index) => (
				<NavLink
					key={index}
					to={link.url}
					className={({ isActive }) =>
						`${getNavLinkClass(
							isActive
						)} text-lg font-normal transition-transform duration-300 hover:scale-105`
					}
				>
					{link.name}
				</NavLink>
			))}
			<div className="">
				{!isLoggedIn ? (
					<div className="flex gap-3 justify-center items-center">
						<NavLink
							to={"login"}
							className="py-2 px-4 rounded text-indigo-600 transition-transform duration-300 hover:scale-105`"
						>
							Login
						</NavLink>
						<NavLink
							to={"register"}
							className="bg-indigo-600 py-2 px-4 rounded text-white transition-colors duration-300 hover:bg-indigo-500"
						>
							Register
						</NavLink>{" "}
					</div>
				) : (
					<Link
						to={"/profile"}
						className="flex justify-start items-center gap-2 transition-transform duration-300 hover:scale-105"
					>
						<div className="w-[40px] h-[40px] rounded-full bg-indigo-600 flex justify-center items-center text-white font-bold text-xl">
							{currentUser && currentUser.name[0].toUpperCase()}
						</div>
					</Link>
				)}
			</div>
		</div>
	);
};

export default NavMenuDesktop;
