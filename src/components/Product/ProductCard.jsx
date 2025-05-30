import DefaultImage from "../../assets/images/defaultImage.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const ProductCard = ({ product }) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageError, setImageError] = useState(false);

	return (
		<Link
			to={`/products/${product?.id}`}
			className="block group"
			aria-label={`View ${product?.name}`}
		>
			<div className="flex items-stretch h-full gap-4 p-3 bg-white border border-gray-100 rounded-lg hover:shadow-md transition-all duration-300 hover:border-gray-200">
				<div className="relative flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg bg-gray-50">
					<img
						className={`absolute w-full h-full object-cover transition-all duration-300 ${
							imageLoaded ? "opacity-100" : "opacity-0"
						}`}
						src={product?.image || DefaultImage}
						alt={product?.name}
						onLoad={() => setImageLoaded(true)}
						onError={() => {
							setImageError(true);
							setImageLoaded(true);
						}}
					/>

					{(!imageLoaded || imageError) && (
						<div className="absolute inset-0 flex items-center justify-center">
							<img
								className="absolute inset-0 w-full h-full object-cover blur-sm"
								src={product?.image || DefaultImage}
								alt=""
								aria-hidden="true"
							/>
							<div className="absolute inset-0 bg-white/60" />
							{imageError && (
								<span className="relative z-10 text-xl font-bold text-gray-500">
									{product?.name.charAt(0).toUpperCase()}
								</span>
							)}
						</div>
					)}
				</div>

				<div className="flex flex-col flex-1 min-w-0 py-1">
					<h3 className="font-medium text-gray-900 line-clamp-2 text-xl tracking-widest">
						{product?.name.toUpperCase()}
					</h3>

					<p className="mt-1 text-base font-extralight text-gray-900 break-words">
						{product?.listing_url}
					</p>

					<div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
						<span className="inline-block text-sm font-medium text-indigo-600">
							View →
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
