import { useState } from "react";
import GeneralInfo from "../../components/User/GeneralInfo";
import SecurityInfo from "../../components/User/Security";
import UserReviews from "../../components/User/UserReviews";

const tabs = ["General", "Security", "Your Reviews"];

const CurrentUserProfile = () => {
	const [activeTab, setActiveTab] = useState("General");

	return (
		<div className="md:max-w-6xl min-w-[100%] mx-auto p-4 mt-24">
			<h1 className="text-2xl font-bold mb-6">User Profile</h1>

			<div className="border-b border-gray-200 mb-4">
				<nav className="flex space-x-6" aria-label="Tabs">
					{tabs.map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab)}
							className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
								activeTab === tab
									? "border-indigo-600 text-indigo-600"
									: "border-transparent text-gray-500 hover:text-indigo-500"
							}`}
						>
							{tab}
						</button>
					))}
				</nav>
			</div>

			<div className="bg-white p-6 rounded-md shadow">
				{activeTab === "General" && <GeneralInfo />}

				{activeTab === "Security" && <SecurityInfo />}

				{activeTab === "Your Reviews" && <UserReviews />}
			</div>
		</div>
	);
};

export default CurrentUserProfile;
