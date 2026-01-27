import type { NextRequest } from "next/server";
import { checkRateLimit } from "./rate-limit";

export interface RateLimitConfig {
  prefix?: string;
  maxRequests?: number;
  window?: string;
}

export interface RateLimitResponse {
  success: boolean;
  limit: number;
  reset: number;
  remaining: number;
  headers: Record<string, string>;
}

export interface RateLimitErrorResponse {
  error: string;
  retryAfter: number;
  type: string;
  status: number;
  headers: Record<string, string>;
}

/**
 * Extracts the client IP address from various headers
 * Handles forwarded, real-ip, and Cloudflare headers
 *
 * @param req - The incoming request object
 * @returns The client IP address or "unknown" if not found
 *
 * @example
 * ```typescript
 * const clientIP = extractClientIP(req);
 * console.log(`Request from IP: ${clientIP}`);
 * ```
 */
export function extractClientIP(req: Request | NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIP = req.headers.get("x-real-ip");
  const cfConnectingIP = req.headers.get("cf-connecting-ip");

  // Parse x-forwarded-for header (can contain multiple IPs)
  if (forwarded) {
    const ips = forwarded.split(",").map((ip) => ip.trim());
    // Return the first IP (client's original IP)
    return ips[0] || "unknown";
  }

  // Fallback to other headers
  return realIP || cfConnectingIP || "unknown";
}

/**
 * Creates a rate limit identifier with optional prefix
 *
 * @param clientIP - The client IP address
 * @param prefix - Optional prefix for the identifier (default: "ai-elements-sources-chat")
 * @returns A unique identifier for rate limiting
 *
 * @example
 * ```typescript
 * const identifier = createRateLimitIdentifier("192.168.1.1", "api");
 * // Returns: "api-192.168.1.1"
 * ```
 */
export function createRateLimitIdentifier(
  clientIP: string,
  prefix = "ai-elements-v0-clone"
): string {
  return `${prefix}-${clientIP}`;
}

/**
 * Checks rate limit and returns the result
 *
 * @param identifier - The rate limit identifier
 * @returns Promise resolving to rate limit result
 */
export async function checkRequestRateLimit(
  identifier: string
): Promise<RateLimitResponse> {
  return await checkRateLimit(identifier);
}

/**
 * Creates a rate limit error response with proper headers
 *
 * @param rateLimitResult - The rate limit result object
 * @returns Formatted error response with headers
 */
export function createRateLimitErrorResponse(
  rateLimitResult: RateLimitResponse
): RateLimitErrorResponse {
  const retryAfter = Math.ceil((rateLimitResult.reset - Date.now()) / 1000);

  return {
    error: "Rate limit exceeded. Please try again later.",
    retryAfter,
    type: "rate_limit_exceeded",
    status: 429,
    headers: {
      "Content-Type": "application/json",
      "Retry-After": retryAfter.toString(),
      ...rateLimitResult.headers,
    },
  };
}

/**
 * Handles the complete rate limiting flow for a request
 * Returns either the rate limit result or an error response
 *
 * @param req - The incoming request object
 * @param prefix - Optional prefix for rate limiting (default: "ai-elements-sources-chat")
 * @returns Promise resolving to either success with rate limit result or failure with error response
 *
 * @example
 * ```typescript
 * // Basic usage
 * const result = await handleRequestRateLimit(req);
 * if (result.success) {
 *   // Rate limit check passed, continue with request
 *   console.log(`Remaining requests: ${result.rateLimitResult.remaining}`);
 * } else {
 *   // Rate limit exceeded, return error
 *   return createRateLimitResponse(result.errorResponse);
 * }
 *
 * // With custom prefix
 * const result = await handleRequestRateLimit(req, "custom-api");
 * ```
 */
export async function handleRequestRateLimit(
  req: Request | NextRequest,
  prefix = "ai-elements-v0-clone"
): Promise<
  | { success: true; rateLimitResult: RateLimitResponse }
  | { success: false; errorResponse: RateLimitErrorResponse }
> {
  const clientIP = extractClientIP(req);
  const identifier = createRateLimitIdentifier(clientIP, prefix);
  const rateLimitResult = await checkRequestRateLimit(identifier);

  if (rateLimitResult.success) {
    return { success: true, rateLimitResult };
  }
  const errorResponse = createRateLimitErrorResponse(rateLimitResult);
  return { success: false, errorResponse };
}

/**
 * Utility to create a rate limit error response as a Next.js Response
 *
 * @param errorResponse - The error response object
 * @returns Next.js Response object with proper status and headers
 *
 * @example
 * ```typescript
 * const result = await handleRequestRateLimit(req);
 * if (!result.success) {
 *   return createRateLimitResponse(result.errorResponse);
 * }
 * ```
 */
export function createRateLimitResponse(
  errorResponse: RateLimitErrorResponse
): Response {
  return new Response(
    JSON.stringify({
      error: errorResponse.error,
      retryAfter: errorResponse.retryAfter,
      type: errorResponse.type,
    }),
    {
      status: errorResponse.status,
      headers: errorResponse.headers,
    }
  );
}

/**
 * Creates a standardized error response for internal server errors
 *
 * @param error - The error object
 * @param options - Optional configuration for the error response
 * @returns Next.js Response object with proper error formatting
 *
 * @example
 * ```typescript
 * try {
 *   // Your API logic
 * } catch (error) {
 *   return createErrorResponse(error);
 * }
 *
 * // With custom options
 * return createErrorResponse(error, {
 *   includeDetails: true,
 *   customMessage: "Something went wrong with the request"
 * });
 * ```
 */
export function createErrorResponse(
  error: unknown,
  options: {
    includeDetails?: boolean;
    customMessage?: string;
    status?: number;
  } = {}
): Response {
  const {
    includeDetails = process.env.NODE_ENV === "development",
    customMessage = "Internal server error. Please try again later.",
    status = 500,
  } = options;

  const errorMessage = error instanceof Error ? error.message : String(error);

  return new Response(
    JSON.stringify({
      error: customMessage,
      type: "internal_error",
      ...(includeDetails && { details: errorMessage }),
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

/**
 * Creates a standardized success response with optional data
 *
 * @param data - The data to return
 * @param options - Optional configuration for the response
 * @returns Next.js Response object with proper formatting
 *
 * @example
 * ```typescript
 * return createSuccessResponse({ message: "Success!" });
 *
 * // With custom status
 * return createSuccessResponse(data, { status: 201 });
 * ```
 */
export function createSuccessResponse(
  data: unknown,
  options: {
    status?: number;
    headers?: Record<string, string>;
  } = {}
): Response {
  const { status = 200, headers = {} } = options;

  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

