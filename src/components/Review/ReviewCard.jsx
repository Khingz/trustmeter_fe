import React from "react";
import StarRating from "../StarRating";

const ReviewCard = () => {
	return (
		<div className="max-w-sm bg-white border border-gray-200 rounded-sm overflow-hidden p-4">
			<div className="flex items-center space-x-4 mb-4">
				<img
					src="https://via.placeholder.com/60"
					alt="Reviewer"
					className="w-14 h-14 rounded-full object-cover"
				/>
				<div>
					<h3 className="text-lg font-semibold">John Doe</h3>
					<p className="text-sm text-gray-500">Aug 12, 2024</p>
				</div>
			</div>

			<p className="text-gray-700 mb-4">
				"This product has exceeded my expectations. Great quality and fantastic
				support from the team!"
			</p>

			<StarRating rating={2} />

			<div className="flex items-center justify-between">
				<div className="flex justify-start items-center gap-2">
					<img
						src="https://via.placeholder.com/60"
						alt="Company Logo"
						className="h-8 w-8 rounded-full object-contain"
					/>
					<p>Company Name</p>
				</div>

				<button className="text-blue-500 hover:underline text-sm">
					Read More
				</button>
			</div>
		</div>
	);
};

export default ReviewCard;
