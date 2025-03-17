import React from "react";
import Rating from "../../components/Rating";

const AddReview = ({ productName }) => {;
	return (
		<div className="">
			<div className="bg-white p-4 md:p-8 border border-gray-200 mx-auto">
				<h3 className="font-bold text-xl md:text-2xl">You are reviewing:</h3>
				<div className="flex gap-2 mt-4 md:text-2xl">
					<div className="bg-indigo-600 text-white px-2 rounded-md">Logo</div>
					<p className="uppercase">{productName}</p>
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
				<button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md">
					Submit Review
				</button>
			</div>
		</div>
	);
};

export default AddReview;
