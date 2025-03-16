export const getNavLinkClass = (isActive) => {
	return isActive ? "text-indigo-600 border-b-2 border-indigo-600" : "";
};

export const navLinks = [
	{
		name: "Home",
		url: "/",
	},
	{
		name: "Leave a Review",
		url: "/review",
	},
	{
		name: "Categories",
		url: "/categories",
	},
];
