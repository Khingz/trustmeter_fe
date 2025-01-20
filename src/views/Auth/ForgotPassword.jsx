import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../../context/authContext";

const ForgotPassword = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [error, setError] = useState(null);
	const { login } = useAuth();

	const handleForgotPassword = async (e) => {
		try {
			e.preventDefault();
            navigate("/reset-link-successful");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="w-full min-h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
			<div className="w-[90%] md:w-1/3 bg-gray-50 rounded p-4 md:p-6 relative">
				<h3 className="text-gray-700 font-bold text-2xl text-center">Forgot Password</h3>
				<p className="text-lg text-center text-gray-700 mt-2">
					Enter your email to reset your password
				</p>
				{error && <p className="text-center text-red-500 mt-2">{error}</p>}
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
								type="email"
								id="email"
								placeholder="Enter your email"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<input
							type="submit"
							value={"Send reset link"}
							className="bg-indigo-600 p-2 w-full rounded text-white text-lg mt-3"
						/>
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
