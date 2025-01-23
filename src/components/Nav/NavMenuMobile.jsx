import { IoMdClose } from "react-icons/io";
import { useCustomNav } from "../../context/navContext";
import { getNavLinkClass, navLinks } from "../../utils/navUtils";
import { NavLink } from "react-router-dom";
import { MdCategory } from "react-icons/md";
import { MdReviews } from "react-icons/md";
import { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { MdHome } from "react-icons/md";

const NavMenuMobile = () => {
	const { setIsNavOpen } = useCustomNav();
	const { currentUser, isLoggedIn } = useAuth();

	const navMenuIcon = [
		<MdHome size={25} />,
		<MdCategory size={25} />,
		<MdReviews size={25} />,
	];
	const handleLogout = () => {
		//
	};
	useEffect(() => {
		return () => {
			setIsNavOpen(false);
		};
		// eslint-disable-next-line
	}, []);
	return (
		<div className="bg-indigo-600 w-full h-screen text-white">
			<div className="px-6 py-6">
				<div className="flex justify-between items-center">
					<p className="text-2xl font-bold">TrustMeter</p>
					<IoMdClose size={30} onClick={() => setIsNavOpen(false)} />
				</div>
				<div className="w-full border-t border-t-gray-300 my-6"></div>
				<div className="flex flex-col gap-4 mt-8">
					{navLinks.map((link, index) => (
						<NavLink
							key={index}
							to={link.url}
							className={`${({ isActive }) =>
								getNavLinkClass(
									isActive
								)} flex justify-start items-center gap-5`}
							onClick={() => setIsNavOpen(false)}
						>
							{navMenuIcon[index]}
							<span className="text-xl">{link.name}</span>
						</NavLink>
					))}
				</div>
				<div className="w-full h-10 text-white md:flex md:items-center py-8">
					{isLoggedIn ? (
						<div className="w-full mt-14">
							<NavLink
								to={"/profile"}
								className="flex justify-start items-center gap-4"
								onClick={() => setIsNavOpen(false)}
							>
								<div className="w-[40px] h-[40px] rounded-full bg-white flex justify-center items-center text-indigo-600 font-bold text-xl">
									{currentUser && currentUser.name[0].toUpperCase()}
								</div>
								<p className="font-extralight text-lg">
									{" "}
									{currentUser && currentUser?.name}
								</p>
							</NavLink>
							<div className="mt-6">
								<button
									className="w-full bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 text-center text-white rounded-sm py-3"
									onClick={handleLogout}
								>
									Logout
								</button>
							</div>
						</div>
					) : (
						<div className="">
							<NavLink
								to="/register"
								className="block border py-2 text-xl text-center mb-4"
								onClick={() => setIsNavOpen(false)}
							>
								Register
							</NavLink>
							<NavLink
								to="/login"
								className="block border py-2 text-xl text-center mb-4"
								onClick={() => setIsNavOpen(false)}
							>
								Login
							</NavLink>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default NavMenuMobile;
