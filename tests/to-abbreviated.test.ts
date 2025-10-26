import { describe, expect, it } from "vitest"
import { toAbbreviated } from "../src/to-abbreviated.js"

// Basic abbreviation tests
describe.each([
    [500, "500"],
    [1500, "1.5k"],
    [2500000, "2.5m"],
    [1000000000, "1b"],
    [1000000000000, "1t"],
    [1000000000000000, "1qa"],
    [1000000000000000000, "1qi"],
    [-3400, "-3.4k"],
    [0, "0"],
])("toAbbreviated() — basic formatting", (n, expected) => {
    it(`should abbreviate ${n} as "${expected}"`, () => {
        expect(toAbbreviated(n)).toBe(expected)
    })
})

// Decimal and trimming options
describe.each([
    [1500, { d: 2 }, "1.5k"],
    [1500, { d: 3, trim: false }, "1.500k"],
    [1000000, { d: 2, trim: true }, "1m"],
    [1000000, { d: 2, trim: false }, "1.00m"],
    [1234567, { d: 0 }, "1m"],
])("toAbbreviated() — decimals and trim options", (n, opts, expected) => {
    it(`should abbreviate ${n} with options ${JSON.stringify(opts)} as "${expected}"`, () => {
        expect(toAbbreviated(n, opts)).toBe(expected)
    })
})

// Small non-abbreviated numbers
describe.each([
    [12.345, { d: 2 }, "12.35"],
    [10.0, { d: 2 }, "10"],
    [0.5, undefined, "0.5"],
    [0.0042, { d: 3 }, "0.004"],
])("toAbbreviated() — small number formatting", (n, opts, expected) => {
    it(`should format ${n} with options ${JSON.stringify(opts)} as "${expected}"`, () => {
        expect(toAbbreviated(n, opts)).toBe(expected)
    })
})

// Invalid and edge cases
describe.each([
    [NaN, "NaN"],
    [Infinity, "Infinity"],
    [-Infinity, "-Infinity"],
])("toAbbreviated() — invalid inputs", (n, expected) => {
    it(`should return "${expected}" for input ${n}`, () => {
        expect(toAbbreviated(n)).toBe(expected)
    })
})
