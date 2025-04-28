import SearchBar from "../SearchBar";

const SearchSection = () => {
	return (
		<div className="md:mx-auto bg-indigo-600 text-center text-white p-8 md:p-14 flex flex-col justify-center items-center gap-2 md:w-[95%] rounded-lg mx-4">
			<h2 className="font-extrabold text-3xl md:text-4xl">Find What You Need, Instantly</h2>
			<p className="md:text-lg">
				Search by company name or category to discover the right match for your needs
			</p>
			<div className="mt-4 w-full md:w-1/2">
				<SearchBar placeholder="Search Product, Category" />
			</div>
		</div>
	);
};

export default SearchSection;
