/**
 * Client-side Rate Limiter to prevent API abuse
 * Implements token bucket algorithm for smooth rate limiting
 */

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  blockDurationMs?: number;
}

class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private blockedUntil: Map<string, number> = new Map();

  /**
   * Check if a request should be allowed
   * @param key - Unique identifier for the rate limit (e.g., 'search', 'contact-form')
   * @param config - Rate limit configuration
   * @returns true if request is allowed, false if rate limited
   */
  checkRateLimit(key: string, config: RateLimitConfig): boolean {
    const now = Date.now();

    // Check if currently blocked
    const blockedUntil = this.blockedUntil.get(key);
    if (blockedUntil && now < blockedUntil) {
      return false;
    }

    // Get or initialize request timestamps for this key
    let timestamps = this.requests.get(key) || [];

    // Remove timestamps outside the time window
    timestamps = timestamps.filter(
      (timestamp) => now - timestamp < config.windowMs,
    );

    // Check if under rate limit
    if (timestamps.length >= config.maxRequests) {
      // Block for the specified duration if configured
      if (config.blockDurationMs) {
        this.blockedUntil.set(key, now + config.blockDurationMs);
      }
      return false;
    }

    // Add current timestamp and update
    timestamps.push(now);
    this.requests.set(key, timestamps);

    return true;
  }

  /**
   * Get remaining requests in current window
   */
  getRemainingRequests(key: string, config: RateLimitConfig): number {
    const now = Date.now();
    const timestamps = this.requests.get(key) || [];
    const validTimestamps = timestamps.filter(
      (timestamp) => now - timestamp < config.windowMs,
    );
    return Math.max(0, config.maxRequests - validTimestamps.length);
  }

  /**
   * Get time until next request is allowed (in ms)
   */
  getTimeUntilReset(key: string, config: RateLimitConfig): number {
    const now = Date.now();

    // Check if blocked
    const blockedUntil = this.blockedUntil.get(key);
    if (blockedUntil && now < blockedUntil) {
      return blockedUntil - now;
    }

    const timestamps = this.requests.get(key) || [];
    const validTimestamps = timestamps.filter(
      (timestamp) => now - timestamp < config.windowMs,
    );

    if (validTimestamps.length < config.maxRequests) {
      return 0;
    }

    // Return time until oldest request expires
    const oldestTimestamp = validTimestamps[0];
    return config.windowMs - (now - oldestTimestamp);
  }

  /**
   * Reset rate limit for a specific key
   */
  reset(key: string): void {
    this.requests.delete(key);
    this.blockedUntil.delete(key);
  }

  /**
   * Clear all rate limits
   */
  clearAll(): void {
    this.requests.clear();
    this.blockedUntil.clear();
  }
}

// Global rate limiter instance
export const rateLimiter = new RateLimiter();
