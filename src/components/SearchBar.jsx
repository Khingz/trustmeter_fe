import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
	return (
		<div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white text-black">
			<input
				type="text"
				placeholder="Search company or category..."
				className="w-full px-4 py-4 text-sm focus:outline-none border-none"
			/>
			<button className="text-black text-2xl font-bold px-4 py-2">
				<CiSearch />
			</button>
		</div>
	);
};

export default SearchBar;
