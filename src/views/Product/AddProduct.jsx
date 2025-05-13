import { AnimatePresence } from "motion/react";
import React, { useState } from "react";
import ErrorAlert from "../../components/common/ErrorAlert";
import { useListings } from "../../context/listingContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import ProductOverviewCard from "../../components/Product/ProductOverviewCard";
import SuccessAlert from "../../components/common/SuccessAlert";

const AddProduct = () => {
	const [productUrl, setProductUrl] = useState("");
	const [product, setProduct] = useState(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { addListing } = useListings();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setProduct(null);
		setError("");
		try {
			if (!productUrl) {
				setError("Product URL is required");
				return;
			}
			const credentials = { url: productUrl };
			const product = await addListing(credentials);
			setProduct(product?.data);
		} catch (error) {
			setProduct(error.data.data);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		setProduct(null);
		setError("");
		setProductUrl(e.target.value);
	};

	return (
		<div className="min-h-screen bg-indigo-50 mt-20 pt-10 relative">
			<div className="w-5/6 md:w-1/2 mx-auto mt-10">
				<h3 className="font-bold text-xl md:text-2xl text-center">
					ADD PRODUCT
				</h3>
				<p className="text-center text-xl mb-3">
					To add a product, please enter the product url
				</p>
				<AnimatePresence>
					{error && <ErrorAlert message={error} />}
				</AnimatePresence>
				<form
					className="w-full mt-1"
					onSubmit={handleSubmit}
				>
					<input
						type="text"
						className="w-full border border-gray-200 rounded-md py-2.5"
						placeholder="Enter Product URL"
						onChange={handleChange}
						readOnly={loading}
					/>
					<button
						className={`text-white py-2 px-3 rounded-md mt-2 w-full ${
							loading ? "bg-slate-500 cursor-not-allowed" : "bg-indigo-600"
						}`}
						disabled={loading}
					>
						Add Product
					</button>
				</form>

				{loading && (
					<div className="mt-4">
						<LoadingSpinner />
						<p className="text-center mt-1">
							Adding product, this may take a while...
						</p>
					</div>
				)}
				{product && (
					<div className="mt-8">
						<AnimatePresence>
							{!error && (
								<SuccessAlert message="Product created successfully" />
							)}
						</AnimatePresence>

						<AnimatePresence>
							{error && (
								<p>This is the product you are trying to add, you can go ahead and add your review...</p>
							)}
						</AnimatePresence>
						<ProductOverviewCard
							product={product}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default AddProduct;
