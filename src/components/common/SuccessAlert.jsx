import { motion } from "framer-motion";

const SuccessAlert = ({ message }) => {
	if (!message) return null;

	return (
		<motion.div
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.3 }}
			className="bg-green-200 text-green-700 px-4 py-2 rounded-md text-center mt-2"
		>
			{message}
		</motion.div>
	);
};

export default SuccessAlert;
