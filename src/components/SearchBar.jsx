import { CiSearch } from "react-icons/ci";

const SearchBar = ({ handleSubmit, placeholder }) => {
	return (
		<form className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white text-black" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder={placeholder}
				className="w-full px-4 py-4 text-sm focus:outline-none border-none"
			/>
			<button className="text-black text-2xl font-bold px-4 py-2">
				<CiSearch />
			</button>
		</form>
	);
};

export default SearchBar;
