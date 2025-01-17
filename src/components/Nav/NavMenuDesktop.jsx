import React from "react";
import { Link, NavLink } from "react-router-dom";
import { getNavLinkClass, navLinks } from "../../utils/navUtils";
import { useAuth } from "../../context/authContext";

const NavMenuDesktop = () => {
	const { isLoggedIn, currentUser } = useAuth();
	return (
		<div className="flex items-center justify-center gap-10 font-extralight text-md">
			{navLinks.map((link, index) => (
				<NavLink
					key={index}
					to={link.url}
					className={`${({ isActive }) => getNavLinkClass(isActive)}`}
				>
					{link.name}
				</NavLink>
			))}
			<div className="">
				{!isLoggedIn ? (
					<div className="flex gap-3 justify-center items-center">
						<NavLink
							to={"login"}
							className={`${({ isActive }) =>
								getNavLinkClass(
									isActive
								)} bg-indigo-600 py-2 px-4 rounded text-white`}
						>
							Login
						</NavLink>
						<NavLink
							to={"register"}
							className={`${({ isActive }) =>
								getNavLinkClass(
									isActive
								)} border border-indigo-600 py-2 px-4 rounded`}
						>
							Register
						</NavLink>{" "}
					</div>
				) : (
					<Link
						to={"/profile"}
						className="flex justify-start items-center gap-2"
					>
						<div className="w-[40px] h-[40px] rounded-full bg-purple-600 flex justify-center items-center text-white font-bold text-xl">
							{currentUser && currentUser.name[0].toUpperCase()}
						</div>
						<p className="font-extralight text-lg">
							{" "}
							{currentUser &&
								currentUser?.name.split(" ")[0].charAt(0).toUpperCase() +
									currentUser?.name.split(" ")[0].slice(1)}
						</p>
					</Link>
				)}
			</div>
		</div>
	);
};

export default NavMenuDesktop;
