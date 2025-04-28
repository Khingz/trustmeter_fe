import { Link } from "react-router-dom";

const AddProductCTA = () => {
	return (
		<section className="md:mx-auto bg-indigo-600 text-center text-white p-8 md:p-14 flex flex-col justify-center items-center gap-2 md:w-[95%] rounded-lg mt-20 mb-20 mx-4">
			<h2 className="font-extrabold text-3xl md:text-4xl">Can't find the product you're looking for?</h2>
			<p className="md:text-lg">Add it to our platform and be the first to review!</p>
			<Link to={"/"} className="border border-white py-3 px-6 rounded-lg mt-3 hover:scale-110 transition-all transit">Add Product</Link>
		</section>
	);
};

export default AddProductCTA;
