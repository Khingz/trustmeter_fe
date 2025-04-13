import { rating_label } from "../../utils/index";


const RatingBar = ({ item, index, total_review, average }) => {
	return (
		<div key={item.label} className="flex items-center justify-between gap-2">
			<span className="text-sm font-medium text-gray-800 w-24">
				{rating_label[index]}
			</span>
			<div className="flex-1 bg-gray-200 h-2.5 rounded-full relative">
				<div
					className="bg-indigo-600 h-2.5 rounded-full absolute top-0 left-0"
					// style={{ width: `${(total_review / 5) * 100}%` }}
					style={{ width: `${(item.value / total_review) * 100}%` }}
				></div>
			</div>
			<span className="text-sm font-medium text-gray-700 w-6 text-right">
				{item.value}
			</span>
		</div>
	);
};

export default RatingBar;
