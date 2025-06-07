import React from "react";

const NotFound = ({message, submessage}) => {
	return (
		<div className="flex flex-col items-center justify-center min-h-[300px] p-6 bg-white rounded-2xl shadow-sm">
			<svg
				className="w-32 h-32 mb-4 text-gray-400"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M3 7l9-4 9 4M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9 5 9-5"
				/>
			</svg>
			<h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
				{message || "No Item Found"}
			</h2>
			<p className="text-gray-500 text-center max-w-sm">
				{submessage || "Sorry, we couldn't find this item"}
			</p>
		</div>
	);
};

export default NotFound;
