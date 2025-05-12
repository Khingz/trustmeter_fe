import { useState } from "react";

const tabs = ["General", "Security", "Notifications"];

const CurrentUserProfile = () => {
	const [activeTab, setActiveTab] = useState("General");

	return (
		<div className="max-w-4xl mx-auto p-4">
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
				{activeTab === "General" && (
					<div>
						<h2 className="text-lg font-semibold mb-2">General Information</h2>
						{/* General content here */}
						<p>Username, Email, Full Name, etc.</p>
					</div>
				)}

				{activeTab === "Security" && (
					<div>
						<h2 className="text-lg font-semibold mb-2">Security Settings</h2>
						{/* Security content here */}
						<p>Change password, 2FA settings, etc.</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default CurrentUserProfile;
