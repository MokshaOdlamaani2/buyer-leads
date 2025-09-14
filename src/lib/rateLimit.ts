// src/lib/rateLimit.ts

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 30;

type RateLimitRecord = {
  timestamps: number[];
};

const rateLimitStore = new Map<string, RateLimitRecord>();

export function rateLimit(key: string) {
  const now = Date.now();
  const record = rateLimitStore.get(key) || { timestamps: [] };

  // Remove timestamps older than window
  record.timestamps = record.timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);

  if (record.timestamps.length >= MAX_REQUESTS) {
    // Rate limit exceeded
    return false;
  }

  // Record this request
  record.timestamps.push(now);
  rateLimitStore.set(key, record);

  return true;
}
