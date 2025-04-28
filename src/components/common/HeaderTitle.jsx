const HeaderTitle = ({title}) => {
	return (
		<div className="flex justify-center items-center w-[70%] mx-auto gap-4 mb-10">
			<div className="w-1/3 border-t border-t-gray-300"></div>
			<h3 className="font-extrabold text-2xl md:text-3xl text-center mb-6>Categories">
				{title}
			</h3>
			<div className="w-1/3 border-t border-t-gray-300"></div>
		</div>
	);
};

export default HeaderTitle;
