import { useParams } from 'react-router-dom';

const SingleProduct = () => {
    const { id } = useParams();
    
	return (
		<div className="min-h-screen bg-indigo-50 mt-20 pt-10 relative">
			<div className="w-5/6 md:w-1/2 mx-auto mt-10">
				<h3 className="my-4 font-bold text-xl md:text-3xl text-center">
					Product Details
				</h3>
				<p className="text-center text-xl mb-3">
					Product ID: {id}
				</p>
			</div>
		</div>
	);
};

export default SingleProduct;
