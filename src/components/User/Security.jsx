import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { isValidEmail } from "../../utils";
import { getFromLocalStorage } from "../../utils/localStorage";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SecurityInfo = () => {
	const user_id = getFromLocalStorage("currentUser").id;
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {};

	const handleSubmit = async (e) => {
		setLoading(true);
		try {
			e.preventDefault();
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="general-info">
			<h2 className="text-lg font-semibold mb-2">Change Password</h2>
			<div className="my-6">
				<form onSubmit={handleSubmit}>
					<div className="my-2">
						<label
							htmlFor="old password"
							className="block text-base font-medium text-black"
						>
							Old Password
						</label>
						<div className="relative">
							<input
								type={isOldPasswordVisible ? "text" : "password"}
								id="password"
								name="password"
								placeholder="Enter your password"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								onChange={(e) => setOldPassword(e.target.value)}
							/>
							<div
								className="absolute inset-y-0 right-2 flex items-center text-indigo-600 text-lg cursor"
								onClick={() => setIsOldPasswordVisible(!isOldPasswordVisible)}
							>
								{isOldPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
							</div>
						</div>
					</div>
					<div className="my-2">
						<label
							htmlFor="new password"
							className="block text-base font-medium text-black"
						>
							New Password
						</label>
						<div className="relative">
							<input
								type={isNewPasswordVisible ? "text" : "password"}
								id="password"
								name="password"
								placeholder="Enter your password"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								onChange={(e) => setNewPassword(e.target.value)}
							/>
							<div
								className="absolute inset-y-0 right-2 flex items-center text-indigo-600 text-lg cursor"
								onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
							>
								{isNewPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
							</div>
						</div>
					</div>
					<div className="my-2">
						<label
							htmlFor="confirm password"
							className="block text-base font-medium text-black"
						>
							Confirm Password
						</label>
						<div className="relative">
							<input
								type={isConfirmPasswordVisible ? "text" : "password"}
								id="password"
								name="password"
								placeholder="Enter your password"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							<div
								className="absolute inset-y-0 right-2 flex items-center text-indigo-600 text-lg cursor"
								onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
							>
								{isConfirmPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
							</div>
						</div>
					</div>
					<button
						type="submit"
						className="w-full bg-indigo-600 py-2 px-4 rounded text-white text-base transition-colors duration-300 hover:bg-indigo-500 mt-2"
						disabled={loading}
					>
						{loading ? <LoadingSpinner /> : "Update"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default SecurityInfo;
