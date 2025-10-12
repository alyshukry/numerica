import { describe, it, expect } from "vitest"
import { abbreviate } from "../src/abbreviate"

// Default options
describe.each([
    [0, "0"],
    [999, "999"],
    [1000, "1k"],
    [1500, "1.5k"],
    [1000000, "1m"],
    [2500000, "2.5m"],
    [1000000000, "1b"],
    [1234567890, "1.2b"],
    [1000000000000, "1t"],
    [9876543210000, "9.9t"],
    [0.5, "0.5"],
    [12.34, "12.3"],
    [999.9, "999.9"]
])("abbreviate() — default options", (x, expected) => {
    it(`should abbreviate ${x} to ${expected}`, () => {
        expect(abbreviate(x)).toBe(expected)
    })
})

// Custom options
describe.each([
    [1000, { d: 0 }, "1k"],
    [1500, { d: 2 }, "1.5k"],
    [2500000, { d: 3 }, "2.5m"],
    [1234567890, { d: 2 }, "1.23b"],
    [999.9, { d: 3 }, "999.9"],
    [0.1234, { d: 2 }, "0.12"]
])("abbreviate() — with custom options", (x, options, expected) => {
    it(`should abbreviate ${x} to ${expected} with options ${JSON.stringify(options)}`, () => {
        expect(abbreviate(x, options)).toBe(expected)
    })
})

// Negative numbers
describe.each([
    [-1000, "-1k"],
    [-1500000, "-1.5m"],
    [-987654321, "-987.7m"]
])("abbreviate() — negative numbers", (x, expected) => {
    it(`should abbreviate ${x} to ${expected}`, () => {
        expect(abbreviate(x)).toBe(expected)
    })
})

// Large numbers
describe.each([
    [1e15, "1qa"],
    [1e18, "1qi"],
    [1e21, "1000qi"],
    [1.23e18, "1.2qi"]
])("abbreviate() — large numbers", (x, expected) => {
    it(`should abbreviate ${x} to ${expected}`, () => {
        expect(abbreviate(x)).toBe(expected)
    })
})
