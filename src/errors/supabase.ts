import type { PostgrestError } from "@supabase/supabase-js";
import {
  type AppError,
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "./index";

/**
 * Supabase PostgrestError를 AppError로 변환
 *
 * 주요 에러 코드:
 * - PGRST301: RLS 정책 위반 (Row Level Security)
 * - PGRST116: Not found (쿼리 결과 없음)
 * - 23505: Unique constraint violation
 * - 23503: Foreign key constraint violation
 * - 23502: Not null constraint violation
 * - 42P01: Undefined table
 * - 42703: Undefined column
 */
export function toSupabaseError(error: PostgrestError): AppError {
  const { code, message, details, hint } = error;

  // RLS 정책 위반
  if (code === "PGRST301") {
    return new ForbiddenError("Access denied");
  }

  // Not found
  if (code === "PGRST116") {
    return new NotFoundError("Resource not found");
  }

  // Unique constraint violation
  if (code === "23505") {
    return new ConflictError("Resource already exists", {
      details,
      hint,
    });
  }

  // Foreign key constraint violation
  if (code === "23503") {
    return new ValidationError("Invalid reference", {
      details,
      hint,
    });
  }

  // Not null constraint violation
  if (code === "23502") {
    return new ValidationError("Required field missing", {
      details,
      hint,
    });
  }

  // Undefined table/column (개발 단계 에러)
  if (code === "42P01" || code === "42703") {
    return new InternalServerError("Database schema error", {
      code,
      details,
      hint,
    });
  }

  // 기타 모든 에러
  return new InternalServerError("Database error", {
    code,
    message,
    details,
    hint,
  });
}

/**
 * Supabase 에러 체크 헬퍼
 */
export function checkSupabaseError(error: PostgrestError | null): void {
  if (error) {
    throw toSupabaseError(error);
  }
}
