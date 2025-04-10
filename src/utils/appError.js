class AppError extends Error {
	constructor(message, data = {}, statusCode = 500) {
		super(message);
		this.name = "AppError";
		this.data = data;
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}

export default AppError;
