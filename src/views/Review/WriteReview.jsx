import React from "react";
import SearchBarProduct from "../../components/Product/SearchBarProduct";

const WriteReview = () => {
	return (
		<div className="min-h-screen bg-indigo-50 mt-20 pt-10 relative">
			<div className="w-5/6 md:w-1/2 mx-auto mt-10">
				<h3 className="my-4 font-bold text-xl md:text-3xl text-center">
					What Product Would You Like To Review?
				</h3>
				<SearchBarProduct />
			</div>
		</div>
	);
};

export default WriteReview;
