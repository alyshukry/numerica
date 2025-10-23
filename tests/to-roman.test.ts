import { describe, expect, it } from 'vitest';
import { toRoman } from '../src/to-roman.js';

// Basic conversions (small, medium, large numbers) up to 3999

describe.each([
  [1, 'I'],
  [4, 'IV'],
  [11, 'XI'],
  [123, 'CXXIII'],
  [2025, 'MMXXV'],
  [3999, 'MMMCMXCIX'],
])('toRoman() — basic conversions', (n, expected) => {
  it(`should convert ${n} to "${expected}"`, () => {
    expect(toRoman(n)).toBe(expected);
  });
});

// Error handling for out-of-bounds and non-integer inputs

describe.each([[0], [4000], [3.14], [-5]])('toRoman() - error tests', (n) => {
  it(`should throw RangeError for input: ${n}`, () => {
    expect(() => toRoman(n)).toThrow(RangeError);
  });
});
