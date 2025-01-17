import React from "react";
import HeroSection from "../components/Home/HeroSection";
import SearchSection from "../components/Home/SearchSection";
import RecentReviews from "../components/Home/RecentReviews";
import CategorySection from "../components/Home/CategorySection";

const Home = () => {
	return (
		<div>
			<HeroSection />
            <SearchSection />
            <RecentReviews />
            <CategorySection />
		</div>
	);
};

export default Home;
