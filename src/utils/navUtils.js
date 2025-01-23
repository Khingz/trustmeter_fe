export const getNavLinkClass = (isActive) => {
	return isActive
		? "text-red-500 border-b-2 border-red-500"
		: "";
};

export const navLinks = [
	{
		name: "Home",
		url: "/"
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
