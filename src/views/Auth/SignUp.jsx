import { IoMdClose } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { AnimatePresence } from "framer-motion";
import ErrorAlert from "../../components/common/ErrorAlert";
import { isValidEmail } from "../../utils";

const SignUp = () => {
	const navigate = useNavigate();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		name: "",
	});
	const [error, setError] = useState(null);
	const { register } = useAuth();
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
			const { name, email, password } = formData;

			if (!name || !password || !email) {
				setError("All fields is required");
				return;
			}
			if (!isValidEmail(email)) {
				setError("Please enter a valid email");
				return;
			}
			const credentials = {
				name,
				email,
				password,
			};
			console.log(credentials);

			await register(credentials);
			navigate("/login");
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full min-h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
			<div className="w-[90%] md:w-1/3 bg-gray-50 rounded p-4 md:p-6 relative">
				<h3 className="text-gray-700 font-bold text-2xl text-center">
					Create an account
				</h3>
				<p className="text-lg text-center text-gray-700">
					Enter your correct details to create an account
				</p>
				<AnimatePresence>
					{error && <ErrorAlert message={error} />}
				</AnimatePresence>
				<div className="my-6">
					<form onSubmit={handleSubmit}>
						<div className="my-2">
							<label
								htmlFor="text"
								className="block text-lg font-medium text-black"
							>
								Fullname
							</label>
							<input
								type="text"
								id="name"
								name="name"
								placeholder="Enter your email"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								onChange={handleChange}
							/>
						</div>
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
							className="bg-indigo-600 p-2 w-full rounded text-white text-lg mt-3"
							disabled={loading}
						>
							{loading ? <LoadingSpinner /> : "Register"}
						</button>
					</form>
				</div>
				<div className="flex justify-center items-center gap-2 my-4">
					<div className="w-1/4 border-t border-t-gray-300"></div>
					<Link
						to={"/login"}
						className="text-center mb-6>Categories text-gray-700"
					>
						Already have an account?{" "}
						<span className="text-indigo-600">Login</span>
					</Link>
					<div className="w-1/4 border-t border-t-gray-300"></div>
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

export default SignUp;
