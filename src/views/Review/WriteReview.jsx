import React from "react";
import SearchBar from "../../components/SearchBar";
import { useNavigate } from "react-router-dom";

const WriteReview = () => {
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate("/add-review");
	};

	return (
		<div className="min-h-screen bg-indigo-50 mt-20 pt-10">
			<div className="w-5/6 md:w-1/2 mx-auto mt-10">
				<h3 className="my-4 font-bold text-3xl text-center">
					What Product Would You Like To Review?
				</h3>
				<SearchBar placeholder="Search Product" handleSubmit={handleSubmit} />
			</div>
		</div>
	);
};

export default WriteReview;
