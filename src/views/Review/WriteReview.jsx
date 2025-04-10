import React, { useState } from "react";
import SearchBarProduct from "../../components/Product/SearchBarProduct";
import ReviewModalContainer from "../../components/Review/ReviewModalContainer";

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
				<ReviewModalContainer
					productName={productName}
					setProductName={setProductName}
					setAddReviewModalOpen={setAddReviewModalOpen}
				/>
			)}
		</div>
	);
};

export default WriteReview;
