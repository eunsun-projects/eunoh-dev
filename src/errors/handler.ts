import { NextResponse } from "next/server";
import { type LogContext, logApiError } from "@/logging";
import { type AppError, toAppError } from "./index";

/**
 * 통일된 에러 응답 포맷
 */
export interface ErrorResponse {
	success: false;
	error: {
		code: string;
		message: string;
		details?: unknown;
		timestamp: string;
		path?: string;
		serverMessage?: string;
	};
}

/**
 * 에러 응답 생성
 */
function createErrorResponse(
	error: AppError,
	context?: LogContext,
): NextResponse<ErrorResponse> {
	const response: ErrorResponse = {
		success: false,
		error: {
			code: error.code || "INTERNAL_ERROR",
			message: error.message,
			timestamp: new Date().toISOString(),
			path: context?.path,
			serverMessage: error.serverMessage,
		},
	};

	// 개발 환경에서만 details 노출
	if (process.env.NODE_ENV === "development" && error.details) {
		response.error.details = error.details;
	}

	return NextResponse.json(response, { status: error.statusCode });
}

/**
 * 중앙화된 에러 핸들러
 *
 * @param error - 발생한 에러
 * @param context - 로깅을 위한 컨텍스트 정보
 * @returns NextResponse with error
 */
export function handleRouteError(
	error: unknown,
	context?: LogContext,
): NextResponse<ErrorResponse> {
	const appError = toAppError(error);

	// 구조화된 로깅
	logApiError(appError, {
		...context,
		path: context?.path || "unknown",
	});

	// 통일된 에러 응답 반환
	return createErrorResponse(appError, context);
}

/**
 * Request 객체에서 컨텍스트 추출
 */
export function extractRequestContext(req: Request): LogContext {
	const url = new URL(req.url);

	return {
		path: url.pathname,
		method: req.method,
		// userId와 pillarId는 각 핸들러에서 추가
	};
}
