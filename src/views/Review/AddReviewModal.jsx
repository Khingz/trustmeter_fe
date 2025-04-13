import React from "react";
import Rating from "../../components/Rating";
import DefaultImage from "../../assets/images/defaultImage.png";

const AddReview = ({ product }) => {
	return (
		<div className="">
			{product && (
				<div className="bg-white p-4 md:p-8 border border-gray-200 mx-auto">
					<h3 className="font-bold text-xl md:text-2xl">You are reviewing:</h3>
					<div className="flex gap-3 items-center mt-4 md:text-2xl">
						<img
							src={product.image || DefaultImage}
							alt={"listing_image"}
							className="w-12 h-12 md:w-22 md:h-22 object-cover rounded-full bg-indigo-600 border border-gray-300"
						/>
						<h5 className="text-[1rem] md:text-[2.5rem] font-extralight mt-1 capitalize">
							{product.name}
						</h5>
					</div>
					<div className="border-t my-8"></div>
					<div className="">
						<p className="">
							Your Rating <span className="text-red-500">*</span>
						</p>
						<Rating />
					</div>
					<div className="mt-4">
						<p className="">
							Review <span className="text-red-500">*</span>
						</p>
						<textarea
							className="w-full border border-gray-200 p-2 rounded-md"
							rows="10"
							placeholder="Write your review..."
						></textarea>
					</div>
					<button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md pointer">
						Submit Review
					</button>
				</div>
			)}
		</div>
	);
};

export default AddReview;
