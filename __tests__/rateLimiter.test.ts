import { RateLimiter } from "../src/index";

describe("RateLimiter", () => {
  it("should limit requests", () => {
    const limiter = new RateLimiter({ intervalInMS: 500, maxRequests: 2 });
    const key = "key";

    expect(limiter.shouldPass(key)).toBe(true);
    expect(limiter.shouldPass(key)).toBe(true);
    expect(limiter.shouldPass(key)).toBe(false);
  });

  it("should reset after duration", (done) => {
    const limiter = new RateLimiter({ intervalInMS: 500, maxRequests: 1 });
    const key = "key";

    expect(limiter.shouldPass(key)).toBe(true);
    expect(limiter.shouldPass(key)).toBe(false);

    setTimeout(() => {
      expect(limiter.shouldPass(key)).toBe(true);
      done();
    }, 500);
  });
});
