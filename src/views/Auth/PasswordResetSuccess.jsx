import { Link } from "react-router-dom";
import successImg from "../../assets/images/successful.svg";

const PasswordResetSuccess = () => {
	return (
		<div className="w-full min-h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
			<div className="w-[90%] md:w-1/3 bg-gray-50 rounded p-4 py-10 md:p-12 relative flex flex-col justify-center items-center gap-4">
				<img src={successImg} alt="link-sent" srcset="" className="w-[40%]" />
				<p className="text-lg text-center text-gray-700 mt-2">
					Your password has been reset <span className="block text-gray-800 font-bold text-2xl md:text-3xl tracking-wide">Successfully</span>
				</p>
                <div className="flex flex-col justify-center items-center gap-3 text-gray-700 text-center">
                    <Link to={"/login"} className="bg-indigo-600 text-white py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-indigo-500">Continue to login</Link>
                </div>
			</div>
		</div>
	);
};

export default PasswordResetSuccess;
