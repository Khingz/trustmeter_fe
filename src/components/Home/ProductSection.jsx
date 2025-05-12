import { useListing } from "../../hooks/useListing";
import HeaderTitle from "../common/HeaderTitle";
import ProductCard from "../Product/ProductCard";
import EmptyImage from "../../assets/images/no-data.png";
import ProductCardSkeleton from "../Skeleton/ProductCardSkeleton";

const ProductSection = () => {
	const { data: products, isLoading } = useListing({
		pageSize: 6,
		page: 1,
	});

	const hasNoData =
		!isLoading && (!products?.data || products.data.length === 0);

	return (
		<div className="my-20 md:w-5/6 mx-auto">
			<HeaderTitle title={"Top Rated Products"} />
			{hasNoData && (!products?.data || products.data.length === 0) && (
				<div className="flex flex-col justify-center items-center">
					<img
						src={EmptyImage}
						alt="empty review"
						srcSet=""
						className="h-32 w-32"
					/>
					<p className="text-center text-gray-500 mb-4 text-lg">
						Nothing to show, yet!
					</p>
				</div>
			)}
			{!isLoading && products?.data && products.data.length > 0 && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 mb-10 px-4 md:px-10 gap-8">
					{products?.data.map((product) => (
						<ProductCard product={product} key={product?.id} />
					))}
				</div>
			)}
			{isLoading && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-20">
					<ProductCardSkeleton count={3} />
				</div>
			)}
		</div>
	);
};

export default ProductSection;
