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

const SignIn = () => {
	const navigate = useNavigate();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const { login } = useAuth();

	const handleLogin = async (e) => {
		try {
			e.preventDefault();
			const credentials = {
				email,
				password,
			};
			await login(credentials);
			const redirectUrl = getFromSessionStorage("redirectUrl") || "/";
			navigate(redirectUrl);
		} catch (error) {
			setError(error.message);
		}
	};

	useEffect(() => {
		return () => {
			deleteFromSessionStorage("user");
		};
	}, []);

	return (
		<div className="w-full min-h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
			<div className="w-[90%] md:w-1/3 bg-gray-50 rounded p-4 md:p-6 relative">
				<h2 className="text-indigo-600 font-bold text-3xl text-center mb-2">
					TrustMeter
				</h2>
				<h3 className="text-gray-700 font-bold text-2xl text-center">Login</h3>
				<p className="text-lg text-center text-gray-700">
					Enter your login details
				</p>
				{error && <p className="text-center text-red-500 mt-2">{error}</p>}
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
								type="email"
								id="email"
								placeholder="Enter your email"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								onChange={(e) => setEmail(e.target.value)}
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
									placeholder="Enter your password"
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
									onChange={(e) => setPassword(e.target.value)}
								/>
								<div
									className="absolute inset-y-0 right-2 flex items-center text-indigo-600 text-lg cursor"
									onClick={() => setIsPasswordVisible(!isPasswordVisible)}
								>
									{isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
								</div>
							</div>
						</div>
						<input
							type="submit"
							value={"Login"}
							className="bg-indigo-600 p-2 w-full rounded text-white text-lg mt-3"
						/>
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
