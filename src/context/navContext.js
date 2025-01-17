import React, { createContext, useState, useEffect, useContext } from "react";

export const NavigationContext = createContext();

export function NavigationProvider({ children }) {
	const [isNavOpen, setIsNavOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				// Adjust breakpoint as needed
				setIsMobile(true);
			} else {
				setIsMobile(false);
				setIsNavOpen(false);
			}
		};

		// Call handleResize on initial page render
		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleNavToggle = () => {
		setIsNavOpen(!isNavOpen);
	};

	return (
		<NavigationContext.Provider
			value={{ isNavOpen, setIsNavOpen, handleNavToggle, isMobile }}
		>
			{children}
		</NavigationContext.Provider>
	);
}

export const useCustomNav = () => {
    return useContext(NavigationContext);
}
