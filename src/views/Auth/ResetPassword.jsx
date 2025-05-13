import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorAlert from "../../components/common/ErrorAlert";
import { AnimatePresence } from "framer-motion";

const ResetPassword = () => {
	const navigate = useNavigate();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [formData, setFormData] = useState({
		password: "",
		confirmPassword: ""
	})
	const [error, setError] = useState(null);
	const { token_id } = useParams();
	const { resetPassword } = useAuth();
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		setError("");
	};


	const handleSubmit = async (e) => {
		setLoading(true);
		try {
			e.preventDefault();
			const {password, confirmPassword} = formData;
			if(password.length < 6) {
				setError("Password must be 6 characters or more");
				return;
			}
			if (password !== confirmPassword) {
				setError("Passwords do not match");
				return;
			}
			await resetPassword(token_id, password);
			navigate("/password-reset-successful");
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full min-h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
			<div className="w-[90%] md:w-2/3 lg:w-1/3 bg-gray-50 rounded px-4 py-12 md:py-12 relative">
				<h3 className="text-gray-700 font-bold text-2xl text-center">
					Enter new password
				</h3>
				<AnimatePresence>
					{error && <ErrorAlert message={error} />}
				</AnimatePresence>
				<div className="my-6">
					<form onSubmit={handleSubmit}>
						<div className="my-2">
							<label
								htmlFor="password"
								className="block text-lg font-medium text-black"
							>
								Password
							</label>
							<div className="relative">
								<input
									type={isPasswordVisible ? "text" : "password"}
									id="password"
									name="password"
									placeholder="Enter your new password"
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
									onChange={handleChange}
								/>
								<div
									className="absolute inset-y-0 right-2 flex items-center text-indigo-600 text-lg cursor"
									onClick={() => setIsPasswordVisible(!isPasswordVisible)}
								>
									{isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
								</div>
							</div>
						</div>
						<div className="my-2">
							<label
								htmlFor="confirm password"
								className="block text-lg font-medium text-black"
							>
								Confirm password
							</label>
							<div className="relative">
								<input
									type={isPasswordVisible ? "text" : "password"}
									id="confirm_password"
									name="confirmPassword"
									placeholder="Confirm password"
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
									onChange={handleChange}
								/>
								<div
									className="absolute inset-y-0 right-2 flex items-center text-indigo-600 text-lg cursor"
									onClick={() => setIsPasswordVisible(!isPasswordVisible)}
								>
									{isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
								</div>
							</div>
						</div>
						<button
							type="submit"
							className="bg-indigo-600 p-2 w-full rounded text-white text-lg mt-3 transition-colors duration-300 hover:bg-indigo-500"
							disabled={loading}
						>
							{loading ? <LoadingSpinner /> : "Submit"}
						</button>
					</form>
				</div>
				<div className="absolute top-[15px] right-[20px] text-3xl">
					<Link to={"/"}>
						<IoMdClose />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
