import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import successImg from "../../assets/images/email-success.svg";

const ResetLinkSuccessful = () => {
	return (
		<div className="w-full min-h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
			<div className="w-[90%] md:w-2/3 lg:w-1/3 bg-gray-50 rounded p-4 py-10 md:p-12 relative flex flex-col justify-center items-center gap-2">
				<img src={successImg} alt="link-sent" srcset="" className="w-[40%]" />
				<p className="text-lg text-center text-gray-700 mt-2">
					A reset link has been sent to your email. Follow the link to reset
					your password. If you don’t see the email, check your spam folder.
				</p>
                <div className="border-t border-t-gray-300 w-[95%] my-3"></div>
                <div className="flex flex-col justify-center items-center gap-3 text-gray-700 text-center">
                    <p>Didn't receive the email? No worries, you can try again.</p>
                    <Link to={"/forgot-password"} className="bg-indigo-600 text-white py-2 px-4 rounded-lg">Try again</Link>
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

export default ResetLinkSuccessful;
