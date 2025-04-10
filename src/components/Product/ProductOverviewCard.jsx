import React, { useState } from "react";
import { Link } from "react-router-dom";
import DefaultImage from "../../assets/images/defaultImage.png";
import ReviewModalContainer from "../Review/ReviewModalContainer";


const ProductOverviewCard = ({ image, name, productId }) => {
	const [addReviewModalOpen, setAddReviewModalOpen] = useState(false);
	image = image || DefaultImage;

	const handleClick = () => {
		setAddReviewModalOpen(true);
	};

	return (
		<div className="absolute mt-2 w-4/5 md:w-1/2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 flex justify-between items-center p-4">
			<div className="flex flex-row items-center justify-start gap-4">
				<img
					src={image}
					alt={name}
					className="w-16 h-16 object-cover rounded-full"
				/>
				<h3 className="text-xl font-semibold mb-2">{name.toUpperCase()}</h3>
			</div>
			<div className="flex gap-4">
				<button
					className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition"
					onClick={handleClick}
				>
					Add Review
				</button>
				<Link
					to={`/product/${productId}`}
					className="px-4 py-2 text-sm bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
				>
					View Product
				</Link>
			</div>
			{addReviewModalOpen && (
				<ReviewModalContainer
					productName={name}
					setAddReviewModalOpen={setAddReviewModalOpen}
				/>
			)}
		</div>
	);
};

export default ProductOverviewCard;
