import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import SuggestAddProduct from "./SuggestAddProduct";

const SearchBarProduct = ({ handleSubmit, placeholder, setValue }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const products = [
		{ id: 1, name: "Apple iPhone 13", category: "Smartphones" },
		{ id: 2, name: "Samsung Galaxy S21", category: "Smartphones" },
		{ id: 3, name: "MacBook Pro 14", category: "Laptops" },
		{ id: 4, name: "Dell XPS 13", category: "Laptops" },
		{ id: 5, name: "Sony WH-1000XM4", category: "Headphones" },
		{ id: 6, name: "Bose QuietComfort 45", category: "Headphones" },
	];
	const filteredProducts = products.filter((product) =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

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
					onChange={(e) => {
						setSearchTerm(e.target.value);
						setValue(e.target.value);
					}}
				/>
				<button className="text-black text-2xl font-bold px-4 py-2">
					<CiSearch />
				</button>
			</form>
			{searchTerm && (
				<div className="absolute mt-2 w-4/5 md:w-1/2 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
					{filteredProducts.length > 0 ? (
						filteredProducts.map((product) => (
							<div
								key={product.id}
								className="p-2 hover:bg-gray-100 cursor-pointer"
								onClick={() => {
									setSearchTerm(product.name);
									setValue(product.name);
								}}
							>
								{product.name}
							</div>
						))
					) : (
						<div className="p-2 text-gray-800">
							<SuggestAddProduct />
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default SearchBarProduct;
