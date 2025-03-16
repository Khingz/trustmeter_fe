import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../../context/authContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { isValidEmail } from "../../utils";
import ErrorAlert from "../../components/common/ErrorAlert";
import { AnimatePresence } from "framer-motion";


const ForgotPassword = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [error, setError] = useState(null);
	const { forgotPassword } = useAuth();
	const [loading, setLoading] = useState(false);

	const handleForgotPassword = async (e) => {
		setLoading(true);
		try {
			e.preventDefault();
			if (!email) {
				setError("Email is required");
				return;
			}
			if (!isValidEmail(email)) {
				setError("Invalid email format");
				return;
			}
			await forgotPassword(email);
			navigate("/reset-link-successful");
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
					Forgot Password
				</h3>
				<p className="text-lg text-center text-gray-700 mt-2">
					Enter your registered email to reset your password
				</p>
				<AnimatePresence>
					{error && <ErrorAlert message={error} />}
				</AnimatePresence>
				<div className="my-6">
					<form onSubmit={handleForgotPassword}>
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
								placeholder="Enter your email"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								onChange={(e) => {
									setEmail(e.target.value)
									setError("")
								}}
							/>
						</div>
						<button
							type="submit"
							className="bg-indigo-600 p-2 w-full rounded text-white text-lg mt-3 transition-colors duration-300 hover:bg-indigo-500"
							disabled={loading}
						>
							{loading ? <LoadingSpinner /> : "Reset Password"}
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

export default ForgotPassword;
