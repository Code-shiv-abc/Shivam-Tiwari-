import { describe, it } from "node:test";
import assert from "node:assert";
import { throttle } from "./utils.ts";

describe("throttle", () => {
  it("should throttle function calls", (t, done) => {
    let count = 0;
    const increment = () => {
      count++;
    };
    const throttledIncrement = throttle(increment, 100);

    throttledIncrement();
    throttledIncrement();
    throttledIncrement();

    assert.strictEqual(count, 1);

    setTimeout(() => {
      assert.strictEqual(count, 2);
      done();
    }, 150);
  });

  it("should preserve 'this' context", () => {
    const obj = {
      value: 42,
      getValue(this: { value: number }) {
        return this.value;
      },
    };

    let result: number | undefined;
    const throttledGetValue = throttle(function(this: typeof obj) {
      result = this.getValue();
    }, 100);

    throttledGetValue.call(obj);
    assert.strictEqual(result, 42);
  });

  it("should pass arguments correctly", () => {
    let receivedArg: string | undefined;
    const func = (arg: string) => {
      receivedArg = arg;
    };
    const throttledFunc = throttle(func, 100);

    throttledFunc("hello");
    assert.strictEqual(receivedArg, "hello");
  });
});
