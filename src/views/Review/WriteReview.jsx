import React, { useState } from "react";
import SearchBarProduct from "../../components/Product/SearchBarProduct";
import ReviewModalContainer from "../../components/Review/ReviewModalContainer";
import { useListings } from "../../context/listingContext";

const WriteReview = () => {
	const [addReviewModalOpen, setAddReviewModalOpen] = useState(false);
	const [productName, setProductName] = useState("");
	const { getListings, listings } = useListings();
	const [loading, setLoading] = useState(false);

	const handleOpenProductModal = () => {
		if (productName === "") return;
		setAddReviewModalOpen(true);
	};

	const handleChange = async (e) => {
		setLoading(true);
		try {
			setProductName(e.target.value);
			await getListings(1, "name", e.target.value);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-indigo-50 mt-20 pt-10 relative">
			<div className="w-5/6 md:w-1/2 mx-auto mt-10">
				<h3 className="my-4 font-bold text-xl md:text-3xl text-center">
					What Product Would You Like To Review?
				</h3>
				<SearchBarProduct
					placeholder="Search product you will like to review"
					setValue={handleChange}
					routeToReview={handleOpenProductModal}
					value={productName}
					products={listings && listings.data}
					loading={loading}
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
