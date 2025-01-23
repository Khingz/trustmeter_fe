import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const CurrentUserProfile = () => {
	const navigate = useNavigate();
	const { currentUser, logout } = useAuth();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<div className="mt-24">
			<h1>
				Hello{" "}
				{currentUser &&
					currentUser?.name.split(" ")[0].charAt(0).toUpperCase() +
						currentUser?.name.split(" ")[0].slice(1)}{" "}
				{"👋, "} Welcome
			</h1>
			<button className="p-2 bg-purple-600 text-white" onClick={handleLogout}>Logout</button>
		</div>
	);
};

export default CurrentUserProfile;
