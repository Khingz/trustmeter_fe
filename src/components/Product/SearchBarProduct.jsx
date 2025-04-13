import { CiSearch } from "react-icons/ci";
import SuggestAddProduct from "./SuggestAddProduct";
import { useEffect, useState } from "react";
import DefaultImage from "../../assets/images/defaultImage.png";
import LoadingSpinner from "../LoadingSpinner";
import ReviewModalContainer from "../../components/Review/ReviewModalContainer";
import { useListings } from "../../context/listingContext";

const SearchBarProduct = () => {
	const [addReviewModalOpen, setAddReviewModalOpen] = useState(false);
	const [productName, setProductName] = useState("");
	const { getListings, listings } = useListings();
	const [loading, setLoading] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

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

	const filteredProducts =
		listings &&
		listings?.data?.filter((product) =>
			product.name.toLowerCase().includes(productName.toLowerCase())
		);

	const handleOpenProductModal = (product) => {
		if (product === "") return;
		setSelectedProduct(product);
		setAddReviewModalOpen(true);
	};

	useEffect(() => {}, [filteredProducts]);

	return (
		<>
			<form
				className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white text-black"
				onSubmit={handleChange}
			>
				<input
					type="text"
					placeholder="Search for a product..."
					className="w-full px-4 py-4 text-sm focus:outline-none border-none"
					onChange={handleChange}
					value={productName}
				/>
				<button className="text-black text-2xl font-bold px-4 py-2">
					<CiSearch />
				</button>
			</form>
			{listings && productName !== "" && (
				<div className="absolute mt-2 w-4/5 md:w-1/2 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
					{filteredProducts && filteredProducts.length > 0 ? (
						filteredProducts.map((product) => (
							<div
								key={product.id}
								className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
								onClick={() => handleOpenProductModal(product)}
							>
								<div className="flex flex-row items-center justify-start gap-4">
									<img
										src={product.image || DefaultImage}
										alt={product.name}
										className="w-10 h-10 object-cover rounded-full"
									/>
									<p className="text-sm font-semibold mb-2">
										{product.name.toUpperCase()}
									</p>
								</div>
							</div>
						))
					) : (
						<div className="p-2 text-gray-800">
							{!loading ? (
								<SuggestAddProduct name={productName} />
							) : (
								<LoadingSpinner />
							)}
						</div>
					)}
				</div>
			)}

			{addReviewModalOpen && (
				<ReviewModalContainer
					product={selectedProduct}
					setAddReviewModalOpen={setAddReviewModalOpen}
				/>
			)}
		</>
	);
};

export default SearchBarProduct;
