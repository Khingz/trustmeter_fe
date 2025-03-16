import React from "react";
import HeroSection from "../components/Home/HeroSection";
import SearchSection from "../components/Home/SearchSection";
import RecentReviews from "../components/Home/RecentReviews";
import CategorySection from "../components/Home/CategorySection";
import FadeInSection from "../components/common/FadeInSection";

const Home = () => {
	return (
		<div>
			<HeroSection />
			<FadeInSection>
				<SearchSection />
			</FadeInSection>

			<FadeInSection>
				<RecentReviews />
			</FadeInSection>

			<FadeInSection>
				<CategorySection />
			</FadeInSection>
		</div>
	);
};

export default Home;
