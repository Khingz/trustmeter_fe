import React, { useState } from "react";
import AddReview from "../../views/Review/AddReviewModal";

const ReviewModalContainer = ({
	product,
	setAddReviewModalOpen,
}) => {
	return (
		<div className="w-full fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 py-10 px-1.5">
			<div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 relative">
				<button
					onClick={() => {
						setAddReviewModalOpen(false);
					}}
					className="absolute top-5 right-8 text-gray-500 hover:text-gray-700 text-3xl"
				>
					&times;
				</button>
				<AddReview product={product} />
			</div>
		</div>
	);
};

export default ReviewModalContainer;
