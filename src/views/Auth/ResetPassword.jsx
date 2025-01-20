import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const ResetPassword = () => {
	const navigate = useNavigate();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState(null);
    const { token_id } = useParams();

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			if (password !== confirmPassword) {
				setError("Passwords do not match");
				return;
			}
            if (!token_id) {
                setError("Invalid token");
                return
            }
            console.log(token_id);
            
			navigate("/password-reset-successful");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="w-full min-h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
			<div className="w-[90%] md:w-1/3 bg-gray-50 rounded px-4 py-12 md:py-12 relative">
				<h3 className="text-gray-700 font-bold text-2xl text-center">
					Enter new password
				</h3>
				<p className="text-lg text-center text-gray-700 mt-2">
					Password must be minimum of 6 characters
				</p>
				{error && <p className="text-center text-red-500 mt-2">{error}</p>}
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
									placeholder="Enter your new password"
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
									placeholder="Confirm password"
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
									onChange={(e) => setConfirmPassword(e.target.value)}
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
							value={"Submit"}
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

export default ResetPassword;
