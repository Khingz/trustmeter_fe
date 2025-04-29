import React from "react";
import HeroBanner from "../../assets/images/hero-banner.svg";
import { useCustomNav } from "../../context/navContext";

const HeroSection = () => {
	const { isMobile } = useCustomNav();

	return (
		<div className="flex md:w-[90%] px-3 mx-auto pt-24 md:pt-32 pb-10 justify-center items-center gap-4">
			{/* Left hero section */}
			<div className="md:w-4/5 flex flex-col justify-start items-start gap-3">
				<h2 className=" text-4xl md:text-7xl font-medium">
				Share Your <span className="text-indigo-500">Experiences.</span> Find the <span className="text-indigo-500">Best Products,</span> Fast
				</h2>
				<p className="md:text-xl font-normal">
					Your review could guide someone’s best decision. Discover what others are saying, too.
				</p>
				<button className="bg-indigo-600 p-2 md:px-4 py-3 text-white rounded transition-colors duration-300 hover:bg-indigo-500">
					Get Started
				</button>
			</div>
			{/* Right Hero section  */}
			<div className={`${isMobile ? "hidden" : ""} md:w-4/5`}>
				<img src={HeroBanner} alt="hero banner images" />
			</div>
		</div>
	);
};

export default HeroSection;
