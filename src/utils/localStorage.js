// LOCAL STORAGE UTILS
export const saveToLocalStorage = (itemKey, value) => {
	try {
		const valueToStore =
			typeof value === "object" ? JSON.stringify(value) : value;
		localStorage.setItem(itemKey, valueToStore);
	} catch (error) {
		console.error("Error saving to localStorage", error);
	}
};

export const getFromLocalStorage = (itemKey) => {
	try {
		const item = localStorage.getItem(itemKey);
		if (item) {
			try {
				return JSON.parse(item);
			} catch (error) {
				return item;
			}
		}
		return null;
	} catch (error) {
		console.error("Error reading from localStorage", error);
		return null;
	}
};

export const deleteFromLocalStorage = (itemKey) => {
	try {
		localStorage.removeItem(itemKey);
	} catch (error) {
		console.error("Error deleting from localStorage", error);
	}
};

// SESSION STORAGE UTILS
export const saveToSessionStorage = (key, value) => {
	try {
		const valueToSave =
			typeof value === "object" ? JSON.stringify(value) : value;
		sessionStorage.setItem(key, valueToSave);
	} catch (error) {
		console.error("Error saving to sessionStorage", error);
	}
};

export const getFromSessionStorage = (key) => {
	try {
		const item = sessionStorage.getItem(key);
		if (item) {
			try {
				return JSON.parse(item);
			} catch (error) {
				return item;
			}
		}
		return null;
	} catch (error) {
		console.error("Error reading from sessionStorage", error);
		return null;
	}
};

export const deleteFromSessionStorage = (key) => {
	try {
		sessionStorage.removeItem(key);
	} catch (error) {
		console.error("Error deleting from sessionStorage", error);
	}
};
