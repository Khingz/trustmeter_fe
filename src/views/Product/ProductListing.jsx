import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "../../components/Product/ProductCard";
import SearchBar from "../../components/SearchBar";
import { useEffect, useState } from "react";
import NotFound from "../../components/common/NotFound";
import ListingService from "../../service/listingService";
import ProductCardSkeleton from "../../components/Skeleton/ProductCardSkeleton";

const ProductListing = () => {
	const [searchParams] = useSearchParams();
	const query = searchParams.get("q") || "";
	const [results, setResults] = useState([]);
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");
	const [loading, setLoading] = useState(true);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (searchQuery.trim() === "") {
			return;
		}
		setResults([]);
		setLoading(true);
		const encodedQuery = encodeURIComponent(searchQuery.trim());
		const searchParams = new URLSearchParams({ q: encodedQuery });
		navigate(`/products?${searchParams.toString()}`, { replace: true });
	};

	const fetchListings = async (params = {}) => {
		setLoading(true);
		try {
			const data = await ListingService.getListings(params);
			if (data.error) {
				console.error(data.message);
				return;
			}
			setResults(data?.data?.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setSearchQuery(query);
		fetchListings({
			searchTerm: query,
			searchBy: "name",
		});
	}, [query]);

	return (
		<div className="mt-28 px-4 md:px-12 mb-20">
			<div className="flex items-center justify-between gap-8">
				<div className="w-[50%]">
					<SearchBar
						placeholder="Search Product..."
						handleSubmit={handleSubmit}
						query={searchQuery}
						setQuery={setSearchQuery}
					/>
				</div>
				<Link to={"/add-product"} className="w-max bg-indigo-500 px-4 py-4 text-white rounded-md">
					Add Product
				</Link>
			</div>

			{loading && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 mb-10 px-4 md:px-20 gap-8">
					<ProductCardSkeleton count={3} />
				</div>
			)}

			{results && results?.length > 1 && query && (
				<p className="my-6">Search Result For: {query}</p>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 mb-10 px-4 md:px-20 gap-8">
				{results?.length > 0 &&
					results.map((item, index) => (
						<div className="" key={index}>
							<ProductCard product={item} />
						</div>
					))}
			</div>

			{!loading && results?.length < 1 && <NotFound />}
		</div>
	);
};

export default ProductListing;
