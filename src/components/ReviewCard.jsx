import React from "react";
import StarRating from "./StarRating";

const ReviewCard = () => {
	return (
		<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden p-4">
			{/* Reviewer Image */}
			<div className="flex items-center space-x-4 mb-4">
				<img
					src="https://via.placeholder.com/60"
					alt="Reviewer"
					className="w-14 h-14 rounded-full object-cover"
				/>
				<div>
					<h3 className="text-lg font-semibold">John Doe</h3>
					<p className="text-sm text-gray-500">ABC Corporation</p>
				</div>
			</div>

			{/* Review Text */}
			<p className="text-gray-700 mb-4">
				"This product has exceeded my expectations. Great quality and fantastic
				support from the team!"
			</p>

			{/* Star Rating */}
			<StarRating rating={2} />

			{/* Company Logo */}
			<div className="flex items-center justify-between">
				<img
					src="https://via.placeholder.com/80x40"
					alt="Company Logo"
					className="h-8 object-contain"
				/>
				<button className="text-blue-500 hover:underline text-sm">
					Read More
				</button>
			</div>
		</div>
	);
};

export default ReviewCard;
