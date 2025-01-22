export const getNavLinkClass = (isActive) => {
	return isActive
		? "border-b-2 border-customBlue px-3 py-2 rounded-md shadow-sm"
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
