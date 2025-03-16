import { motion } from "framer-motion";

const ErrorAlert = ({ message }) => {
	if (!message) return null;

	return (
		<motion.div
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.3 }}
			className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-center mt-2"
		>
			{message}
		</motion.div>
	);
};

export default ErrorAlert;
