import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { getFromLocalStorage } from "../../utils/localStorage";
import { AnimatePresence } from "motion/react";
import ErrorAlert from "../common/ErrorAlert";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";

const GeneralInfo = () => {
	const user = getFromLocalStorage("currentUser");
	const [userData, setUserData] = useState({
		email: user?.email,
		name: user?.name,
	});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const { updateUser } = useAuth();

	const handleChange = (e) => {
		const { name, value } = e.target;

		setUserData((prev) => ({
			...prev,
			[name]: value,
		}));
		setError("");
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		try {
			e.preventDefault();
			const { name } = userData;

			if (!name) {
				setError("All fields is required");
				return;
			}
			const credentials = {
				name,
			};
			await updateUser(credentials);
			toast.success("Registration successful");
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="general-info">
			<h2 className="text-lg font-semibold mb-2">General Information</h2>
			<AnimatePresence>
				{error && <ErrorAlert message={error} />}
			</AnimatePresence>
			<div className="my-6">
				<form onSubmit={handleSubmit}>
					<div className="my-2">
						<label
							htmlFor="text"
							className="block text-base font-medium text-black"
						>
							Fullname
						</label>
						<input
							type="text"
							id="name"
							name="name"
							placeholder="Update your email"
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
							onChange={handleChange}
							value={userData.name}
						/>
					</div>
					<div className="my-2">
						<label
							htmlFor="email"
							className="block text-base font-medium text-black"
						>
							Email
						</label>
						<input
							type="text"
							id="email"
							name="email"
							disabled={true}
							placeholder="Update your email"
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-500 cursor-not-allowed"
							value={userData.email}
						/>
					</div>
					<div className="flex justify-between items-center mt-4">
						<button
							type="submit"
							className="bg-indigo-600 py-2 px-4 rounded text-white text-base transition-colors duration-300 hover:bg-indigo-500"
							disabled={loading}
						>
							{loading ? <LoadingSpinner /> : "Update Info"}
						</button>
						<button className=" hover:bg-red-300 bg-red-200 text-red-500 text-base py-2 px-4 rounded">
							Logout
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default GeneralInfo;
