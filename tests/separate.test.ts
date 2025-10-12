import { describe, it, expect } from "vitest"
import { separate } from "../src/separate"

// Basic cases
describe.each([
    [0, {}, "0"],
    [1, {}, "1"],
    [12, {}, "12"],
    [123, {}, "123"],
    [1234, {}, "1,234"],
    [1234567, {}, "1,234,567"],
    [1234567890, {}, "1,234,567,890"]
])("separate() — basic numbers", (n, options, expected) => {
    it(`should format ${n} as "${expected}"`, () => {
        expect(separate(n, options)).toBe(expected)
    })
})

// Decimal numbers
describe.each([
    [1234.56, {}, "1,234.56"],
    [1000000.1234, {}, "1,000,000.1234"],
    [987654321.001, {}, "987,654,321.001"]
])("separate() — decimal numbers", (n, options, expected) => {
    it(`should correctly preserve decimals for ${n}`, () => {
        expect(separate(n, options)).toBe(expected)
    })
})

// Custom separator characters
describe.each([
    [1234567, { char: " " }, "1 234 567"],
    [1234567, { char: "_" }, "1_234_567"],
    [1234567, { char: "." }, "1.234.567"]
])("separate() — custom separators", (n, options, expected) => {
    it(`should use custom separator "${options.char}"`, () => {
        expect(separate(n, options)).toBe(expected)
    })
})

// Custom segment lengths
describe.each([
    [123456, { segment: 2, char: "_" }, "12_34_56"],
    [1234567, { segment: 4, char: " " }, "123 4567"],
    [987654321, { segment: 1, char: "-" }, "9-8-7-6-5-4-3-2-1"]
])("separate() — custom segment lengths", (n, options, expected) => {
    it(`should separate ${n} into segments of ${options.segment}`, () => {
        expect(separate(n, options)).toBe(expected)
    })
})

// Negative numbers
describe.each([
    [-1234, {}, "-1,234"],
    [-9876543.21, {}, "-9,876,543.21"],
    [-123456, { char: " ", segment: 2 }, "-12 34 56"]
])("separate() — negative numbers", (n, options, expected) => {
    it(`should handle negative numbers like ${n}`, () => {
        expect(separate(n, options)).toBe(expected)
    })
})

// Edge cases
describe.each([
    [NaN, {}, "NaN"],
    [Infinity, {}, "Infinity"],
    [-Infinity, {}, "-Infinity"],
    [0.0001, {}, "0.0001"], // no grouping before decimal
    [1000.0001, {}, "1,000.0001"]
])("separate() — edge cases", (n, options, expected) => {
    it(`should return "${expected}" for ${n}`, () => {
        expect(separate(n, options)).toBe(expected)
    })
})

// Large numbers
describe.each([
    [1e9, {}, "1,000,000,000"],
    [1e12, {}, "1,000,000,000,000"],
    [123456789012345, {}, "123,456,789,012,345"]
])("separate() — large numbers", (n, options, expected) => {
    it(`should format large number ${n}`, () => {
        expect(separate(n, options)).toBe(expected)
    })
})
