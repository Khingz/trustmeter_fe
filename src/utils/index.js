import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export const handleScroll = (setIsScrolled) => {
	// Handles scroll sets `isScrolled` to `true` if the vertical scroll exceeds 50 pixels, otherwise sets it to `false`
	const scrollY = window.scrollY;
	if (scrollY > 50) {
		setIsScrolled(true);
	} else {
		setIsScrolled(false);
	}
};

export function isValidEmail(email) {
	// Simple email validation check
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const rating_label = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

export const formatDateToShortUS = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
};

export const ScrollToTop = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "PUSH") {
      window.scrollTo(0, 0);
    }
  }, [location, navigationType]);

  return null;
};

export default ScrollToTop;

