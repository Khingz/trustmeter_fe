import React, { useState } from "react";

const Rating = () => {
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);

	return (
		<div className="flex items-center">
			{[...Array(5)].map((star, index) => {
				index += 1;
				return (
					<button
						type="button"
						key={index}
						className={
							index <= (hover || rating) ? "text-indigo-600" : "text-gray-300"
						}
						onClick={() => setRating(index)}
						onMouseEnter={() => setHover(index)}
						onMouseLeave={() => setHover(rating)}
					>
						<span className="text-3xl cursor-pointer">&#9733;</span>
					</button>
				);
			})}
		</div>
	);
};

export default Rating;
