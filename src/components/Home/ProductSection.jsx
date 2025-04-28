import HeaderTitle from "../common/HeaderTitle";
import ProductCard from "../Product/ProductCard";

const ProductSection = () => {
	return (
		<div className="my-20 md:w-5/6 mx-auto">
			<HeaderTitle title={"Top Rated Products"}/>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 mb-10 px-4 md:px-10 gap-8">
				<ProductCard />
				<ProductCard />
				<ProductCard />
			</div>
		</div>
	);
};

export default ProductSection;
