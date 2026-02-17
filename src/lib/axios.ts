import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import axiosLib from "axios";

export interface RetryableRequestConfig extends AxiosRequestConfig {
	shouldRetry?: boolean;
}

// 에러 응답 구조 정의 (통일된 포맷 + 레거시 포맷 모두 허용)
export type ApiErrorResponse =
	| {
			success: false;
			error: {
				code: string;
				message: string;
				details?: unknown;
				timestamp: string;
				path?: string;
			};
	  }
	| {
			success?: false;
			message?: string;
			details?: unknown;
			code?: string;
			error?: {
				code?: string;
				message?: string;
				details?: unknown;
			};
	  };

type ServerErrorInfo = {
	message?: string;
	code?: string;
};

const CLIENT_MESSAGE_BY_CODE: Record<string, string> = {
	VALIDATION_ERROR: "Invalid request.",
	UNAUTHORIZED: "Unauthorized.",
	FORBIDDEN: "Forbidden.",
	NOT_FOUND: "Resource not found.",
	CONFLICT: "Conflict detected.",
	INTERNAL_ERROR: "Server error. Please try again.",
};

const CLIENT_MESSAGE_BY_STATUS: Record<number, string> = {
	400: "Invalid request.",
	401: "Unauthorized.",
	403: "Forbidden.",
	404: "Resource not found.",
	409: "Conflict detected.",
};

function extractServerErrorInfo(data?: ApiErrorResponse): ServerErrorInfo {
	if (!data || typeof data !== "object") {
		return {};
	}

	const maybeData = data as Record<string, unknown>;
	const nestedError = maybeData.error;

	if (nestedError && typeof nestedError === "object") {
		const nested = nestedError as Record<string, unknown>;
		return {
			message: typeof nested.message === "string" ? nested.message : undefined,
			code: typeof nested.code === "string" ? nested.code : undefined,
		};
	}

	return {
		message:
			typeof maybeData.message === "string"
				? (maybeData.message as string)
				: undefined,
		code:
			typeof maybeData.code === "string"
				? (maybeData.code as string)
				: undefined,
	};
}

function getClientErrorMessage(status: number, info: ServerErrorInfo): string {
	if (info.code && CLIENT_MESSAGE_BY_CODE[info.code]) {
		return CLIENT_MESSAGE_BY_CODE[info.code];
	}

	if (status === 0) {
		return "Network error. Please try again.";
	}

	if (status >= 500) {
		return "Server error. Please try again.";
	}

	if (CLIENT_MESSAGE_BY_STATUS[status]) {
		return CLIENT_MESSAGE_BY_STATUS[status];
	}

	return "Request failed. Please try again.";
}

function shouldUseServerMessage(status: number, info: ServerErrorInfo): boolean {
	// 4xx는 사용자 액션으로 해결 가능한 경우가 많아 서버 메시지를 우선 노출
	return status >= 400 && status < 500 && Boolean(info.message);
}

// 환경별 설정 인터페이스
interface ApiConfig {
	apiUrl: string;
	timeout?: number;
	retryAttempts?: number;
	enableLogging?: boolean;
}

// 커스텀 에러 클래스
class ApiError extends Error {
	public status: number;
	public data?: any;
	public serverMessage?: string;

	constructor(
		status: number,
		message: string,
		data?: any,
		serverMessage?: string,
	) {
		super(message);
		this.status = status;
		this.data = data;
		this.name = "ApiError";
		this.serverMessage = serverMessage;
	}
}

// axios의 기본 클래스를 확장하여 타입 안전성과 편의성을 제공합니다
// - 제네릭 사용을 편리하게 하여 axios.get<User> 형태로 1회만 타입 지정 가능
// - 통합 에러 처리로 코드 중복 방지 및 에러 처리 로직 중앙화
// - 네트워크 오류 처리를 위한 리트라이 로직 내장
// - 서버/클라이언트 환경별 설정 지원
// 추상 클래스로서 extends로 상속하여 사용합니다.
abstract class BaseAxiosClient {
	protected readonly axiosInstance: AxiosInstance;
	private readonly config: ApiConfig;

	constructor(config: ApiConfig) {
		this.config = config;

		this.axiosInstance = axiosLib.create({
			baseURL: config.apiUrl,
			timeout: config.timeout || 10000,
			withCredentials: true, // 클라이언트 사이드에서 쿠키 사용 시 필요
		});

		this.applyRequestInterceptor(this.axiosInstance);
		this.applyResponseInterceptor(this.axiosInstance);
	}

	private applyRequestInterceptor(instance: AxiosInstance): void {
		instance.interceptors.request.use((config) => {
			const url = config.url || "";
			const isExternalUrl =
				url.startsWith("http://") || url.startsWith("https://");

			// 외부 URL (예: GCS presigned URL)인 경우 쿠키/자격증명 제외
			if (isExternalUrl) {
				config.withCredentials = false;
				return config;
			}
			return config;
		});
	}

	private applyResponseInterceptor(instance: AxiosInstance): void {
		instance.interceptors.response.use(
			(response) => {
				return response.data;
			},
			(error: AxiosError<ApiErrorResponse>) => {
				return this.handleApiError(error);
			},
		);
	}

	// 통합 에러 처리
	private handleApiError(error: AxiosError<ApiErrorResponse>): never {
		const response = error.response;
		const status = response?.status ?? 0;
		const data = response?.data;
		const serverErrorInfo = extractServerErrorInfo(data);
		const message =
			shouldUseServerMessage(status, serverErrorInfo) &&
			serverErrorInfo.message
				? serverErrorInfo.message
				: getClientErrorMessage(status, serverErrorInfo);

		// 로깅 (개발 환경에서만)
		if (this.config.enableLogging && process.env.NODE_ENV === "development") {
			console.error(`API Error [${status}]:`, {
				message,
				data,
				serverMessage: serverErrorInfo.message,
				serverCode: serverErrorInfo.code,
				url: error.config?.url,
				method: error.config?.method,
			});
		}

		throw new ApiError(status, message, data, serverErrorInfo.message);
	}

	// 재시도 로직 - 네트워크 오류 중심 리트라이
	private async retryRequest<T>(
		requestFn: () => Promise<T>,
		shouldRetry = true,
	): Promise<T> {
		// 재시도가 비활성화된 경우 바로 실행
		if (!shouldRetry) {
			return await requestFn();
		}

		const maxAttempts = this.config.retryAttempts || 3;
		let lastError: Error;

		for (let i = 0; i < maxAttempts; i++) {
			try {
				return await requestFn();
			} catch (error) {
				lastError = error as Error;

				// 서버 오류(5xx)는 리트라이하지 않음
				if (error instanceof ApiError && error.status >= 500) {
					throw error;
				}

				// 마지막 시도이거나 4xx 클라이언트 오류는 리트라이하지 않음
				if (
					i === maxAttempts - 1 ||
					(error instanceof ApiError &&
						error.status >= 400 &&
						error.status < 500)
				) {
					throw error;
				}

				// 지수 백오프 (1초, 2초, 4초, ...)
				await this.delay(1000 * 2 ** i);
			}
		}

		throw lastError!;
	}

	private delay(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	public get<T = unknown>(
		url: string,
		config?: RetryableRequestConfig,
	): Promise<T> {
		return this.retryRequest(
			() => this.axiosInstance.get(url, config) as Promise<T>,
			config?.shouldRetry ?? true,
		);
	}

	public delete<T = unknown>(
		url: string,
		config?: RetryableRequestConfig,
	): Promise<T> {
		return this.retryRequest(
			() => this.axiosInstance.delete(url, config) as Promise<T>,
			config?.shouldRetry ?? false,
		);
	}

	public post<T = unknown>(
		url: string,
		data?: unknown,
		config?: RetryableRequestConfig,
	): Promise<T> {
		return this.retryRequest(
			() => this.axiosInstance.post(url, data, config) as Promise<T>,
			config?.shouldRetry ?? false,
		);
	}

	public put<T = unknown>(
		url: string,
		data?: unknown,
		config?: RetryableRequestConfig,
	): Promise<T> {
		return this.retryRequest(
			() => this.axiosInstance.put(url, data, config) as Promise<T>,
			config?.shouldRetry ?? false,
		);
	}

	public patch<T = unknown>(
		url: string,
		data?: unknown,
		config?: RetryableRequestConfig,
	): Promise<T> {
		return this.retryRequest(
			() => this.axiosInstance.patch(url, data, config) as Promise<T>,
			config?.shouldRetry ?? false,
		);
	}
}

class ApiClient extends BaseAxiosClient {
	constructor(apiUrl: string) {
		const config: ApiConfig = {
			apiUrl,
			timeout: 1000 * 60 * 5, // 5분
			retryAttempts: 3,
			enableLogging: process.env.NODE_ENV === "development",
		};

		if (!config.apiUrl) {
			throw new Error("API_URL이 설정되지 않았습니다.");
		}

		super(config);
	}
}

const axios = new ApiClient("/");
export default axios;
