import React from "react";
import HeroBanner from "../../assets/images/hero-banner.svg";
import { useCustomNav } from "../../context/navContext";

const HeroSection = () => {
	const { isMobile } = useCustomNav();

	return (
		<div className="flex md:w-5/6 px-3 mx-auto pt-24 md:pt-32 pb-10 justify-center items-center gap-2">
			{/* Left hero section */}
			<div className="md:w-4/5 flex flex-col justify-start items-start gap-3">
				<h2 className=" text-4xl md:text-7xl font-medium">
					Unbaised Review To Make You Choose Wisely
				</h2>
				<p className="md:text-xl font-normal">
					We break things down with clear insights, fair perspectives, and
					honest analysis—so you can make the best decision with confidence.
				</p>
				<button className="bg-indigo-600 p-2 md:px-4 py-3 text-white rounded">
					See Top Reviews
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
