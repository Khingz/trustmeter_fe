import React from "react";
import HeroBanner from "../../assets/images/hero-banner.svg";
import { useCustomNav } from "../../context/navContext";

const HeroSection = () => {
	const { isMobile } = useCustomNav();

	return (
		<div className="flex md:w-4/5 px-3 mx-auto pt-32 pb-10 justify-center items-center gap-2">
			{/* Left hero section */}
			<div className="md:w-1/2 flex flex-col justify-start items-start gap-3">
				<h2 className=" text-4xl md:text-7xl font-extrabold">Unbaised Review To Make You Choose Wisely</h2>
				<p className="md:text-lg">Dive into comprehensive insights, balanced perspectives, and transparent analysis to ensure you make a well-informed and confident choice.</p>
				<button className="bg-indigo-600 p-2 md:px-4 py-3 text-white rounded text-lg">See Top Reviews</button>
			</div>
			{/* Right Hero section  */}
			<div className={`${isMobile ? "hidden" : ""}`}>
				<img src={HeroBanner} alt="hero banner images" />
			</div>
		</div>
	);
};

export default HeroSection;
