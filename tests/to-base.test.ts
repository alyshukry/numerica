import { describe, it, expect } from "vitest"
import { toBase } from "../src/to-base"

// Basic conversions (strings & numbers)
describe.each([
    ["1010", 10, 2, "10"],
    [255, 16, undefined, "FF"],
    ["FF", 10, 16, "255"],
    ["100", 36, 10, "2S"],
    [13, 2, undefined, "1101"],
    ["Z", 10, 36, "35"],
    ["z", 10, 62, "61"]
])("toBase() — basic conversions — convert %o to base %i from %o", (n, to, from, expected) => {
    it(`should convert ${JSON.stringify(n)} to "${expected}"`, () => {
        if (from === undefined) expect(toBase(n, to)).toBe(expected)
        else expect(toBase(n, to, { from })).toBe(expected)
    })
})

// Zero, leading zeros and identity conversions
describe.each([
    ["0", 2, 10, "0"],
    ["000", 10, 10, "0"],
    ["123", 10, 10, "123"],
    [0, 2, undefined, "0"],
])("toBase() — zero / leading zeros / identity", (n, to, from, expected) => {
    it(`should convert ${JSON.stringify(n)} to "${expected}"`, () => {
        if (from === undefined) expect(toBase(n, to)).toBe(expected)
        else expect(toBase(n, to, { from })).toBe(expected)
    })
})

// Negative numbers
describe.each([
    ["-10", 2, 10, "-1010"],
    [-13, 2, undefined, "-1101"],
    ["-FF", 10, 16, "-255"]
])("toBase() — negative numbers", (n, to, from, expected) => {
    it(`should convert negative ${JSON.stringify(n)} to "${expected}"`, () => {
        if (from === undefined) expect(toBase(n, to)).toBe(expected)
        else expect(toBase(n, to, { from })).toBe(expected)
    })
})

// Case-sensitivity tests
describe.each([
    ["a", 10, 16, "InvalidChar"],
    ["A", 10, 16, "10"],
    ["a", 10, 62, "36"],
    ["A", 10, 36, "10"]
])("toBase() — case sensitivity", (n, to, from, expected) => {
    it(`should handle case for ${JSON.stringify(n)} from base ${from} to ${to}`, () => {
        if (expected === "InvalidChar") {
            expect(() => toBase(n, to, { from })).toThrow()
        } else {
            expect(toBase(n, to, { from })).toBe(expected)
        }
    })
})

// Invalid characters and digit-out-of-range errors
describe.each([
    ["1@", 10, 11, /Invalid character '@' in number\./],
    ["A", 10, 10, /Digit 'A' not valid in base 10\./],
    ["z", 10, 36, /Digit 'z' not valid in base 36\./]
])("toBase() — invalid input cases", (n, to, from, expectedRegex) => {
    it(`should throw for ${JSON.stringify(n)} from base ${from}`, () => {
        expect(() => toBase(n, to, { from })).toThrow(expectedRegex)
    })
})

// Largest supported base checks
describe.each([
    ["10", 63, 10, /Largest base supported is 62\./],
    ["10", 10, 63, /Largest base supported is 62\./],
    ["z", 10, 62, null]
])("toBase() — base bounds", (n, to, from, expectedRegexOrNull) => {
    it(`should validate supported base limits for to=${to} from=${from}`, () => {
        if (expectedRegexOrNull) {
            expect(() => toBase(n, to, { from })).toThrow(expectedRegexOrNull)
        } else {
            expect(toBase(n, to, { from })).toBe("61")
        }
    })
})

// Large-ish numbers and mixed-base samples
describe.each([
    ["3843", 62, 10, "zz"],
    ["zz", 10, 62, "3843"],
    ["HELLO", 10, 36, "29234652"],
    ["123456789", 16, 10, "75BCD15"],
    ["75BCD15", 10, 16, "123456789"]
])("toBase() — larger samples / roundtrips", (n, to, from, expected) => {
    it(`should convert ${JSON.stringify(n)} (from=${from}) to "${expected}" (to=${to})`, () => {
        expect(toBase(n, to, { from })).toBe(expected)
    })
})

// Fractional and precision tests
describe.each([
    [10.5, 16, undefined, "A.8"],
    [10.75, 16, undefined, "A.C"],
    [42.25, 16, undefined, "2A.4"],

    ["A.8", 10, 16, "10.5"],
    ["A.C", 10, 16, "10.75"],
    ["2A.4", 10, 16, "42.25"],

    [10.5, 2, undefined, "1010.1"],
    [10.75, 2, undefined, "1010.11"],
    [5.25, 2, undefined, "101.01"],

    ["1010.1", 10, 2, "10.5"],
    ["1010.11", 10, 2, "10.75"],
    ["101.01", 10, 2, "5.25"]
])("toBase() — fractional numbers", (n, to, from, expected) => {
    it(`should correctly convert fractional ${JSON.stringify(n)} to "${expected}"`, () => {
        if (from === undefined) expect(toBase(n, to)).toBe(expected)
        else expect(toBase(n, to, { from })).toBe(expected)
    })
})

// Negative fractional numbers
describe.each([
    [-10.5, 16, undefined, "-A.8"],
    ["-A.8", 10, 16, "-10.5"],
    [-42.25, 16, undefined, "-2A.4"],
    ["-2A.4", 10, 16, "-42.25"]
])("toBase() — negative fractional numbers", (n, to, from, expected) => {
    it(`should handle negative fractional input ${JSON.stringify(n)}`, () => {
        if (from === undefined) expect(toBase(n, to)).toBe(expected)
        else expect(toBase(n, to, { from })).toBe(expected)
    })
})

// Precision control
describe("toBase() — precision parameter", () => {
    it("should limit fractional digits according to precision", () => {
        const res = toBase(1 / 3, 2, { from: 10, precision: 5 })
        expect(res.startsWith("0.")).toBe(true)
        expect(res.split(".")[1].length).toBeLessThanOrEqual(5)
    })

    it("should increase fractional digits when precision is higher", () => {
        const lowPrecision = toBase(0.1, 2, { from: 10, precision: 3 })
        const highPrecision = toBase(0.1, 2, { from: 10, precision: 10 })
        expect(highPrecision.length).toBeGreaterThan(lowPrecision.length)
    })

    it("should not throw when fractional part is zero", () => {
        expect(toBase(42.0, 16)).toBe("2A")
    })
})
