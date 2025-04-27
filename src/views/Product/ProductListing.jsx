import ProductCard from "../../components/Product/ProductCard";

const ProductListing = () => {
	return (
		<div className="mt-28 px-12">
			<h1 className="mb-6 text-3xl font-bold ">Products Listing</h1>
			{
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 mb-10 px-4 md:px-10 gap-8">
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
				</div>
			}
		</div>
	);
};

export default ProductListing;
