import React from "react";
import HeroSection from "../components/Home/HeroSection";
import SearchSection from "../components/Home/SearchSection";
import RecentReviews from "../components/Home/RecentReviews";
import ProductSection from "../components/Home/ProductSection";
import FadeInSection from "../components/common/FadeInSection";
import LeaveReviewCTA from "../components/Home/LeaveReviewCTA";
import AddProductCTA from "../components/Home/AddproductCTA";

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
				<LeaveReviewCTA />
			</FadeInSection>

			<FadeInSection>
				<ProductSection />
			</FadeInSection>

			<FadeInSection>
				<AddProductCTA />
			</FadeInSection>
		</div>
	);
};

export default Home;
