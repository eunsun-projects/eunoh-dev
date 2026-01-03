import { AppError } from "@/errors";

export interface LogContext {
	userId?: string;
	pillarId?: string;
	requestId?: string;
	path?: string;
	method?: string;
	ip?: string;
	userAgent?: string;
	duration?: number;
	[key: string]: unknown;
}

export type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
	timestamp: string;
	level: LogLevel;
	message: string;
	context?: LogContext;
	error?: {
		name: string;
		message: string;
		code?: string;
		statusCode?: number;
		stack?: string;
		details?: unknown;
	};
}

/**
 * 구조화된 로그 출력
 */
function log(
	level: LogLevel,
	message: string,
	context?: LogContext,
	error?: AppError | Error,
): void {
	const logEntry: LogEntry = {
		timestamp: new Date().toISOString(),
		level,
		message,
	};

	if (context) {
		logEntry.context = context;
	}

	if (error) {
		logEntry.error = {
			name: error.name,
			message: error.message,
			stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
		};

		if (error instanceof AppError) {
			logEntry.error.code = error.code;
			logEntry.error.statusCode = error.statusCode;
			logEntry.error.details = error.details;
		}
	}

	const logString = JSON.stringify(
		logEntry,
		null,
		process.env.NODE_ENV === "development" ? 2 : 0,
	);

	switch (level) {
		case "error":
			console.error(logString);
			break;
		case "warn":
			console.warn(logString);
			break;
		case "debug":
			if (process.env.NODE_ENV === "development") {
				console.debug(logString);
			}
			break;
		default:
			console.log(logString);
	}
}

export const logger = {
	info: (message: string, context?: LogContext) =>
		log("info", message, context),
	warn: (message: string, context?: LogContext) =>
		log("warn", message, context),
	error: (message: string, context?: LogContext, error?: AppError | Error) =>
		log("error", message, context, error),
	debug: (message: string, context?: LogContext) =>
		log("debug", message, context),
};

/**
 * API 에러 로깅 전용 헬퍼
 */
export function logApiError(
	error: AppError | Error,
	context: LogContext,
): void {
	logger.error("API Error", context, error);
}
