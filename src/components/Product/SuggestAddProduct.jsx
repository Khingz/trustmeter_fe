import { Link } from "react-router-dom";

const SuggestAddProduct = ({name}) => {
	return (
		<div className="flex flex-col justify-center items-center gap-4 py-4">
            <p className="font-bold md:text-3xl">Oops! Product <span className="text-indigo-600 font-light text-4xl">{name}</span> Not Found</p>
			<p>Would you like to add this product?</p>
			<Link to="/add-product" className="py-2 px-6 bg-indigo-600 text-white">Add Product</Link>
		</div>
	);
};

export default SuggestAddProduct;
