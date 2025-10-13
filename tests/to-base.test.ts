import { describe, it, expect } from "vitest"
import { toBase } from "../src/to-base"

// Basic conversions (strings & numbers)
describe.each([
    // binary -> decimal
    ["1010", 10, 2, "10"],
    // decimal (number) -> hex
    [255, 16, undefined, "FF"],
    // hex -> decimal
    ["FF", 10, 16, "255"],
    // decimal -> base36 (example from JSDoc)
    ["100", 36, 10, "2S"],
    // decimal -> base2 (number input)
    [13, 2, undefined, "1101"],
    // base36 -> decimal
    ["Z", 10, 36, "35"],
    // base62 -> decimal (lowercase z is index 61)
    ["z", 10, 62, "61"]
])("toBase() — basic conversions — convert %o to base %i from %o", (n, to, from, expected) => {
    it(`should convert ${JSON.stringify(n)} to "${expected}"`, () => {
        if (from === undefined) expect(toBase(n as any, to)).toBe(expected)
        else expect(toBase(n as any, to, from as number)).toBe(expected)
    })
})

// Zero, leading zeros and identity conversions
describe.each([
    ["0", 2, 10, "0"],
    ["000", 10, 10, "0"], // leading zero input should collapse to "0"
    ["123", 10, 10, "123"], // same base -> same representation
    [0, 2, undefined, "0"], // numeric zero
])("toBase() — zero / leading zeros / identity", (n, to, from, expected) => {
    it(`should convert ${JSON.stringify(n)} to "${expected}"`, () => {
        if (from === undefined) expect(toBase(n as any, to)).toBe(expected)
        else expect(toBase(n as any, to, from as number)).toBe(expected)
    })
})

// Negative numbers
describe.each([
    ["-10", 2, 10, "-1010"],
    [-13, 2, undefined, "-1101"],
    ["-FF", 10, 16, "-255"]
])("toBase() — negative numbers", (n, to, from, expected) => {
    it(`should convert negative ${JSON.stringify(n)} to "${expected}"`, () => {
        if (from === undefined) expect(toBase(n as any, to)).toBe(expected)
        else expect(toBase(n as any, to, from as number)).toBe(expected)
    })
})

// Case-sensitivity tests (function uses "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
describe.each([
    // Uppercase hex is valid for base 16
    ["a", 10, 16, "InvalidChar"], // lowercase 'a' should NOT be valid for base 16 (implementation is case-sensitive)
    ["A", 10, 16, "10"], // 'A' valid -> 10
    // lowercase in base62 is valid
    ["a", 10, 62, "36"], // 'a' index is 36 -> decimal 36
    ["A", 10, 36, "10"] // 'A' index 10 -> decimal 10 (still valid in base36)
])("toBase() — case sensitivity", (n, to, from, expected) => {
    it(`should handle case for ${JSON.stringify(n)} from base ${from} to ${to}`, () => {
        if (expected === "InvalidChar") {
            expect(() => toBase(n as any, to, from as number)).toThrow()
        } else {
            expect(toBase(n as any, to, from as number)).toBe(expected)
        }
    })
})

// Invalid characters and digit-out-of-range errors
describe.each([
    // Character not in chars at all
    ["1@", 10, 11, /Invalid character '@' in number\./],
    // Digit exists in chars but not valid for the specified 'from' base
    ["A", 10, 10, /Digit 'A' not valid in base 10\./],
    // Lowercase 'z' has an index but is invalid in base 36 (idx >= 36)
    ["z", 10, 36, /Digit 'z' not valid in base 36\./]
])("toBase() — invalid input cases", (n, to, from, expectedRegex) => {
    it(`should throw for ${JSON.stringify(n)} from base ${from}`, () => {
        expect(() => toBase(n as any, to, from as number)).toThrow(expectedRegex)
    })
})

// Largest supported base checks
describe.each([
    // to > 62 should fail
    ["10", 63, 10, /Largest base supported is 62\./],
    // from > 62 should fail
    ["10", 10, 63, /Largest base supported is 62\./],
    // exactly 62 should be allowed (e.g., single digit highest)
    ["z", 10, 62, null]
])("toBase() — base bounds", (n, to, from, expectedRegexOrNull) => {
    it(`should validate supported base limits for to=${to} from=${from}`, () => {
        if (expectedRegexOrNull) {
            expect(() => toBase(n as any, to, from as number)).toThrow(expectedRegexOrNull)
        } else {
            // allowed: ensure it doesn't throw and returns expected decimal for "z" -> 61
            expect(toBase(n as any, to, from as number)).toBe("61")
        }
    })
})

// Large-ish numbers and mixed-base samples
describe.each([
    // decimal -> base62 (check the result has only valid chars)
    ["3843", 62, 10, "zz"], // 62*62 - 1 = 3843 -> "zz" (z index 61)
    // base62 -> decimal
    ["zz", 10, 62, "3843"],
    // base36 examples
    ["HELLO", 10, 36, "29234652"],
    // back and forth: decimal -> base16 -> back to decimal
    ["123456789", 16, 10, "75BCD15"],
    ["75BCD15", 10, 16, "123456789"]
])("toBase() — larger samples / roundtrips", (n, to, from, expected) => {
    it(`should convert ${JSON.stringify(n)} (from=${from}) to "${expected}" (to=${to})`, () => {
        expect(toBase(n as any, to, from as number)).toBe(expected)
    })
})
