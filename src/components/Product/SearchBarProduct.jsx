import { CiSearch } from "react-icons/ci";
import SuggestAddProduct from "./SuggestAddProduct";
import { useEffect } from "react";
import DefaultImage from "../../assets/images/defaultImage.png";
import LoadingSpinner from "../LoadingSpinner";

const SearchBarProduct = ({
	handleSubmit,
	placeholder,
	setValue,
	routeToReview,
	value,
	products,
	loading,
}) => {
	const filteredProducts =
		products &&
		products?.filter((product) =>
			product.name.toLowerCase().includes(value.toLowerCase())
		);

	useEffect(() => {}, [filteredProducts]);

	return (
		<>
			<form
				className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white text-black"
				onSubmit={handleSubmit}
			>
				<input
					type="text"
					placeholder={placeholder}
					className="w-full px-4 py-4 text-sm focus:outline-none border-none"
					onChange={setValue}
					value={value}
				/>
				<button className="text-black text-2xl font-bold px-4 py-2">
					<CiSearch />
				</button>
			</form>
			{value && (
				<div className="absolute mt-2 w-4/5 md:w-1/2 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
					{filteredProducts && filteredProducts.length > 0 ? (
						filteredProducts.map((product) => (
							<div
								key={product.id}
								className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
								onClick={() => {
									routeToReview();
								}}
							>
								<div className="flex flex-row items-center justify-start gap-4">
									<img
										src={product.image || DefaultImage}
										alt={product.name}
										className="w-10 h-10 object-cover rounded-full"
									/>
									<p className="text-lg font-semibold mb-2">
										{product.name.toUpperCase()}
									</p>
								</div>
							</div>
						))
					) : (
						<div className="p-2 text-gray-800">
							{!loading ? <SuggestAddProduct name={value} /> : <LoadingSpinner />}
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default SearchBarProduct;
