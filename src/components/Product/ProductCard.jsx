import DefaultImage from "../../assets/images/defaultImage.png";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
	return (
		<Link to={`/products/${product?.id}`}>
			<div className="overflow-hidden shadow-sm bg-white hover:shadow-xl transition-shadow duration-300">
				<img
					className="w-full h-48 object-cover"
					src={product?.image || DefaultImage}
					alt={product?.name}
				/>
				<div className="p-4">
					<h2 className="text-lg font-semibold text-gray-800">
						{product?.name.toUpperCase()}
					</h2>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
