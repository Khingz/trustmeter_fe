import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getNavLinkClass, navLinks } from "../../utils/navUtils";
import { useAuth } from "../../context/authContext";
import { FaRegUser } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";

const NavMenuDesktop = () => {
	const { isLoggedIn, currentUser, logout } = useAuth();
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef(null);
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate("/login");
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
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
					<div className="inline-block text-left" ref={dropdownRef}>
						<div
							className="w-[40px] h-[40px] rounded-full bg-indigo-600 flex justify-center items-center text-white font-bold text-xl cursor-pointer"
							onClick={() => setOpen((prev) => !prev)}
						>
							{currentUser && currentUser.name[0].toUpperCase()}
							{open && (
								<div className="absolute right-18 top-16 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50 text-gray-700 flex flex-col justify-start items-center gap-1 px-2 py-2 font-normal text-base">
									<Link
										to={"/profile"}
										className="w-full text-left hover:bg-gray-100 px-2 py-1 rounded-md"
									>
										<div className="flex gap-3 items-center">
											<FaRegUser />
											Profile
										</div>
									</Link>

									<button
										className="w-full text-left hover:bg-red-300 px-2 py-1 rounded-md bg-red-200 text-red-500"
										onClick={() => {
											setOpen(false);
										}}
									>
										<div
											className="flex gap-3 items-center"
											onClick={handleLogout}
										>
											<PiSignOutBold />
											Logout
										</div>
									</button>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default NavMenuDesktop;
