import React, { useState } from "react";
import AddReview from "./AddReviewModal";
import SearchBarProduct from "../../components/Product/SearchBarProduct";

const WriteReview = () => {
	const [addReviewModalOpen, setAddReviewModalOpen] = useState(false);
	const [productName, setProductName] = useState("");

	const handleOpenProductModal = () => {
		if (productName === "") return;
		setAddReviewModalOpen(true);
	};

	return (
		<div className="min-h-screen bg-indigo-50 mt-20 pt-10 relative">
			<div className="w-5/6 md:w-1/2 mx-auto mt-10">
				<h3 className="my-4 font-bold text-xl md:text-3xl text-center">
					What Product Would You Like To Review?
				</h3>
				<SearchBarProduct
					placeholder="Search product you will like to review"
					setValue={setProductName}
					routeToReview={handleOpenProductModal}
					value={productName}
				/>
			</div>
			{addReviewModalOpen && (
				<div className="w-full fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 py-10">
					<div className="bg-white p-6 rounded-lg shadow-lg md:w-3/4 relative">
						<button
							onClick={() => {
								setProductName("");
								setAddReviewModalOpen(false);
							}}
							className="absolute top-5 right-8 text-gray-500 hover:text-gray-700 text-3xl"
						>
							&times;
						</button>
						<AddReview productName={productName} />
					</div>
				</div>
			)}
		</div>
	);
};

export default WriteReview;
