const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const pageNumbers = [];

	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	return (
		<div className="">
			<nav className="flex">
				{currentPage > 1 && (
					<button
						className="px-2 py-1 text-gray-700 font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
						onClick={() => onPageChange(currentPage - 1)}
					>
						Prev
					</button>
				)}
				{pageNumbers.map((pageNumber) => (
					<button
						key={pageNumber}
						className={`px-3 py-1 text-gray-700 font-medium ${
							pageNumber === currentPage
								? "bg-gray-400 text-white border border-gray-400"
								: "hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border border-gray-400"
						}`}
						onClick={() => onPageChange(pageNumber)}
					>
						{pageNumber}
					</button>
				))}
				{currentPage < totalPages && (
					<button
						className="px-2 py-1 text-gray-700 font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-4"
						onClick={() => onPageChange(currentPage + 1)}
					>
						Next
					</button>
				)}
			</nav>
		</div>
	);
};

export default Pagination;
