const AddProduct = () => {

	return (
		<div className="min-h-screen bg-indigo-50 mt-20 pt-10 relative">
			<div className="w-5/6 md:w-1/2 mx-auto mt-10">
				<h3 className="font-bold text-xl md:text-2xl text-center">
					ADD PRODUCT
				</h3>
                <p className="text-center text-xl mb-3">To add a product, please enter the product url</p>
				<form className="w-full">
                    <input type="text" className="w-full border border-gray-200 rounded-md py-2.5" placeholder="Enter Product URL"/>
                    <button className="bg-indigo-600 text-white py-2 px-3 rounded-md mt-2 w-full">Add Product</button>
                </form>
			</div>
		</div>
	);
};

export default AddProduct;
