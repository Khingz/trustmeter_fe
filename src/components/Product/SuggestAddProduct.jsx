import { Link } from "react-router-dom";

const SuggestAddProduct = () => {
	return (
		<div className="flex flex-col justify-center items-center gap-4 py-4">
            <p className="font-bold md:text-3xl">Oops! Product Not Found</p>
			<p>Would you like to add this product?</p>
			<Link to="/add-product" className="border border-gray-700 py-1 px-4">Add Product</Link>
		</div>
	);
};

export default SuggestAddProduct;
