import { describe, it, expect } from "vitest"
import { toFraction } from "../src/to-fraction"

// Basic decimals
describe.each([
    [0.5, {}, "1/2"],
    [0.25, {}, "1/4"],
    [0.75, {}, "3/4"],
    [0.3333, {}, "3333/10000"], // not simplified because internal logic doesn’t round decimals
    [2.5, {}, "5/2"]
])("toFraction() — basic decimals", (n, options, expected) => {
    it(`should convert ${n} to "${expected}"`, () => {
        expect(toFraction(n, options)).toBe(expected)
    })
})

// Mixed fractions
describe.each([
    [1.25, { mixed: true }, "1 1/4"],
    [3.5, { mixed: true }, "3 1/2"],
    [2.75, { mixed: true }, "2 3/4"],
    [0.5, { mixed: true }, "1/2"], // less than 1 => no whole number
])("toFraction() — mixed fractions", (n, options, expected) => {
    it(`should return "${expected}" when mixed is true`, () => {
        expect(toFraction(n, options)).toBe(expected)
    })
})

// Pretty (typographic symbol)
describe.each([
    [0.5, { pretty: true }, "1⁄2"],
    [1.25, { pretty: true }, "5⁄4"],
    [2.5, { pretty: true }, "5⁄2"]
])("toFraction() — pretty fractions", (n, options, expected) => {
    it(`should use typographic slash when pretty=true`, () => {
        expect(toFraction(n, options)).toBe(expected)
    })
})

// Pretty + mixed combo
describe.each([
    [1.25, { pretty: true, mixed: true }, "1 1⁄4"],
    [2.5, { pretty: true, mixed: true }, "2 1⁄2"]
])("toFraction() — pretty + mixed", (n, options, expected) => {
    it(`should combine pretty and mixed formatting`, () => {
        expect(toFraction(n, options)).toBe(expected)
    })
})

// Custom symbols and spaces
describe.each([
    [1.25, { mixed: true, symbol: " / " }, "1 1 / 4"],
    [2.5, { pretty: true, symbol: " / " }, "5 / 2"],
    [1.333, { mixed: true, symbol: " / ", space: " " }, "1 333 / 1000"] // not simplified because internal logic doesn’t round decimals
])("toFraction() — custom symbols and spacing", (n, options, expected) => {
    it(`should format using custom symbol and spacing`, () => {
        expect(toFraction(n, options)).toBe(expected)
    })
})

// Integers and whole numbers
describe.each([
    [1, {}, "1/1"],
    [5, {}, "5/1"],
    [0, {}, "0/1"],
    [-2, {}, "-2/1"]
])("toFraction() — integer inputs", (n, options, expected) => {
    it(`should handle integer ${n}`, () => {
        expect(toFraction(n, options)).toBe(expected)
    })
})

// Negative decimals
describe.each([
    [-0.5, {}, "-1/2"],
    [-1.25, { mixed: true }, "-1 1/4"],
    [-2.5, { pretty: true }, "-5⁄2"]
])("toFraction() — negative numbers", (n, options, expected) => {
    it(`should handle negative ${n}`, () => {
        expect(toFraction(n, options)).toBe(expected)
    })
})

// Simplification check (via GCF)
describe.each([
    [0.75, {}, "3/4"], // simplifies 75/100 → 3/4
    [0.2, {}, "1/5"], // 2/10 → 1/5
    [0.125, {}, "1/8"] // 125/1000 → 1/8
])("toFraction() — simplified fractions", (n, options, expected) => {
    it(`should simplify ${n} to "${expected}"`, () => {
        expect(toFraction(n, options)).toBe(expected)
    })
})

// Edge cases
describe.each([
    [0.0001, {}, "1/10000"],
    [10.5, { mixed: true }, "10 1/2"],
    [10.0, {}, "10/1"]
])("toFraction() — edge cases", (n, options, expected) => {
    it(`should correctly handle edge case ${n}`, () => {
        expect(toFraction(n, options)).toBe(expected)
    })
})
