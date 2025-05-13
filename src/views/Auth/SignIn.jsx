import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import {
	deleteFromSessionStorage,
	getFromSessionStorage,
} from "../../utils/localStorage";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorAlert from "../../components/common/ErrorAlert";
import { isValidEmail } from "../../utils";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const SignIn = () => {
	const navigate = useNavigate();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState(null);
	const { login } = useAuth();
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		setError("");
	};

	const handleLogin = async (e) => {
		setLoading(true);
		const { email, password } = formData;

		try {
			e.preventDefault();

			if (!password || !email) {
				setError("Email and password is required");
				return;
			}
			if (!isValidEmail(email)) {
				setError("Please enter a valid email");
				return;
			}
			const credentials = {
				email,
				password,
			};
			await login(credentials);
			const redirectUrl = getFromSessionStorage("redirectUrl") || "/";
			navigate(redirectUrl);
			toast.success("Login successful");
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		return () => {
			deleteFromSessionStorage("user");
		};
	}, []);

	return (
		<div className="w-full min-h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
			<div className="w-[90%] md:w-2/3 lg:w-1/3 bg-gray-50 rounded p-4 md:p-6 relative">
				<h3 className="text-gray-700 font-bold text-2xl text-center">Login</h3>
				<p className="text-lg text-center text-gray-700">
					Enter your login details
				</p>
				<AnimatePresence>
					{error && <ErrorAlert message={error} />}
				</AnimatePresence>
				<div className="my-6">
					<form onSubmit={handleLogin}>
						<div className="my-2">
							<label
								htmlFor="email"
								className="block text-lg font-medium text-black"
							>
								Email
							</label>
							<input
								type="text"
								id="email"
								name="email"
								placeholder="Enter your email"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								onChange={handleChange}
							/>
						</div>
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
									placeholder="Enter your password"
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
							{loading ? <LoadingSpinner /> : "Login"}
						</button>
					</form>
				</div>
				<div className="flex justify-center items-center gap-2 my-4">
					<div className="w-1/4 border-t border-t-gray-300"></div>
					<Link
						to={"/register"}
						className="text-center mb-6>Categories text-gray-700"
					>
						Don't have an account?{" "}
						<span className="text-indigo-600">Register</span>
					</Link>
					<div className="w-1/4 border-t border-t-gray-300"></div>
				</div>
				<Link
					to={"/forgot-password"}
					className="text-center mb-6>Categories text-indigo-600 flex justify-center items-center"
				>
					Forgot Password?
				</Link>
				<div className="absolute top-[15px] right-[20px] text-3xl">
					<Link to={"/"}>
						<IoMdClose />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
