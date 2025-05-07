import { useState } from "react";
import SearchBar from "../SearchBar";
import { useNavigate } from "react-router-dom";

const SearchSection = () => {
	const navigate = useNavigate();
	const [query, setQuery] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (query.trim() === "") {
			return;
		}
		const encodedQuery = encodeURIComponent(query.trim());
		const searchParams = new URLSearchParams({ q: encodedQuery });
		navigate(`/products?${searchParams.toString()}`);
	};

	return (
		<div className="md:mx-auto bg-indigo-600 text-center text-white p-8 md:p-14 flex flex-col justify-center items-center gap-2 md:w-[95%] rounded-lg mx-4">
			<h2 className="font-extrabold text-3xl md:text-4xl">
				Find What You Need, Instantly
			</h2>
			<p className="md:text-lg">
				Search by company name or category to discover the right match for your
				needs
			</p>
			<div className="mt-4 w-full md:w-1/2">
				<SearchBar
					placeholder="Search Product..."
					handleSubmit={handleSubmit}
					query={query}
					setQuery={setQuery}
				/>
			</div>
		</div>
	);
};

export default SearchSection;
