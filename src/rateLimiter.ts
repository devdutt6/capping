export interface RateLimiterOptions {
  intervalInMS: number;
  maxRequests: number;
}

export class RateLimiter {
  private requestMap: Map<string, number[]>;
  private intervalInMS: number;
  private maxRequests: number;

  constructor(options: RateLimiterOptions) {
    this.requestMap = new Map();
    this.intervalInMS = options.intervalInMS;
    this.maxRequests = options.maxRequests;
  }

  public shouldPass(key: string): boolean {
    const requestAt = Date.now();
    if (!this.requestMap.has(key)) {
      this.requestMap.set(key, []);
    }

    const entries = this.requestMap.get(key)!;

    while (entries.length && entries[0] <= requestAt - this.intervalInMS) {
      entries.shift();
    }

    if (entries.length >= this.maxRequests) {
      return false;
    }

    entries.push(requestAt);
    return true;
  }
}
