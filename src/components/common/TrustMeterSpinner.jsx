import React from "react";

const TrustMeterLoader = () => {
	return (
		<div className="flex flex-col items-center">
			<h2 className="text-indigo-600 font-bold text-4xl md:text-8xl animate-pulse">
				TrustMeter
			</h2>
			<div className="flex space-x-1 mt-2">
				<span className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
				<span className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
				<span className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce" />
			</div>
		</div>
	);
};

export default TrustMeterLoader;
