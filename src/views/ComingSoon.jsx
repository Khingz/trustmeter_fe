import React from "react";
import { Link } from "react-router-dom";

const ComingSoonPage = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
			<div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transform transition-all hover:scale-105 duration-300">
				<h2 className="text-5xl text-center text-gray-800 font-bold mb-4">
					Coming Soon
				</h2>
				<p className="text-center text-gray-600 mb-8">
					We're working hard to bring you something amazing. Stay tuned!
				</p>
				<div className="mt-6 flex justify-center">
					<Link
						to="/"
						className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-110"
					>
						Go back to home
					</Link>
				</div>
				<div className="mt-8 text-center text-gray-500 text-sm">
					Follow us for updates:
					<div className="flex justify-center space-x-4 mt-2">
						<Link
							to="/twitter"
							className="text-indigo-600 hover:text-indigo-700 transition duration-300"
						>
							Twitter
						</Link>
						<Link
							to="/instagram"
							className="text-indigo-600 hover:text-indigo-700 transition duration-300"
						>
							Instagram
						</Link>
						<Link
							to="/linkedin"
							className="text-indigo-600 hover:text-indigo-700 transition duration-300"
						>
							LinkedIn
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ComingSoonPage;
