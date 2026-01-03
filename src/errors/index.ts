/**
 * Custom Error Classes for API Error Handling
 * Following SOLID principles and Clean Architecture
 */

export class AppError extends Error {
	constructor(
		message: string,
		public readonly statusCode: number = 500,
		public readonly code?: string,
		public readonly details?: unknown,
		public readonly serverMessage?: string,
	) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * 400 Bad Request - Invalid input or validation error
 */
export class ValidationError extends AppError {
	constructor(message = "Invalid request", details?: unknown) {
		super(message, 400, "VALIDATION_ERROR", details);
	}
}

/**
 * 401 Unauthorized - Authentication required
 */
export class UnauthorizedError extends AppError {
	constructor(message = "Unauthorized") {
		super(message, 401, "UNAUTHORIZED");
	}
}

/**
 * 403 Forbidden - Access denied
 */
export class ForbiddenError extends AppError {
	constructor(message = "Forbidden", details?: unknown) {
		super(message, 403, "FORBIDDEN", details);
	}
}

/**
 * 404 Not Found - Resource not found
 */
export class NotFoundError extends AppError {
	constructor(message = "Resource not found", details?: unknown) {
		super(message, 404, "NOT_FOUND", details);
	}
}

/**
 * exception - Error but return 200
 */
export class ExceptionError extends AppError {
	constructor(message = "Exception error", details?: unknown) {
		super(message, 200, "EXCEPTION", details);
	}
}

/**
 * 409 Conflict - Resource conflict
 */
export class ConflictError extends AppError {
	constructor(message = "Resource conflict", details?: unknown) {
		super(message, 409, "CONFLICT", details);
	}
}

/**
 * 500 Internal Server Error - Server error
 */
export class InternalServerError extends AppError {
	constructor(message = "Internal Server Error", details?: unknown) {
		super(message, 500, "INTERNAL_ERROR", details);
	}
}

/**
 * Helper function to convert unknown error to AppError
 */
export function toAppError(error: unknown): AppError {
	if (error instanceof AppError) {
		return error;
	}

	if (error instanceof Error) {
		return new InternalServerError(error.message);
	}

	return new InternalServerError("Unknown error occurred");
}

/**
 * Helper function to get error message safely
 */
export function getErrorMessage(error: unknown): string {
	if (error instanceof AppError) {
		return error.message;
	}

	if (error instanceof Error) {
		return error.message;
	}

	return "Internal Server Error";
}

/**
 * Helper function to get HTTP status code from error
 */
export function getErrorStatusCode(error: unknown): number {
	if (error instanceof AppError) {
		return error.statusCode;
	}

	return 500;
}
