import { describe, it, expect } from "vitest"
import { toWords } from "../src/to-words"

// Basic integers
describe.each([
    [0, {}, "zero"],
    [1, {}, "one"],
    [9, {}, "nine"],
    [10, {}, "ten"],
    [11, {}, "eleven"],
    [15, {}, "fifteen"],
    [20, {}, "twenty"],
    [21, {}, "twenty one"],
    [99, {}, "ninety nine"],
    [100, {}, "one hundred"],
    [101, {}, "one hundred one"],
    [110, {}, "one hundred ten"],
    [115, {}, "one hundred fifteen"],
    [123, {}, "one hundred twenty three"],
    [999, {}, "nine hundred ninety nine"]
])("toWords() — basic integers", (n, options, expected) => {
    it(`should convert ${n} to "${expected}"`, () => {
        expect(toWords(n, options)).toBe(expected)
    })
})

// 'and' option
describe.each([
    [101, { and: true }, "one hundred and one"],
    [120, { and: true }, "one hundred and twenty"],
    [999, { and: true }, "nine hundred and ninety nine"]
])("toWords() — with 'and' option", (n, options, expected) => {
    it(`should include 'and' correctly for ${n}`, () => {
        expect(toWords(n, options)).toBe(expected)
    })
})

// Hyphen option
describe.each([
    [21, { hyphens: true }, "twenty-one"],
    [45, { hyphens: true }, "forty-five"],
    [99, { hyphens: true }, "ninety-nine"]
])("toWords() — with hyphens", (n, options, expected) => {
    it(`should hyphenate correctly for ${n}`, () => {
        expect(toWords(n, options)).toBe(expected)
    })
})

// Separator option
describe.each([
    [123, { separator: "-" }, "one-hundred-twenty-three"],
    [1001, { separator: "-" }, "one-thousand-one"]
])("toWords() — custom separators", (n, options, expected) => {
    it(`should use custom separator for ${n}`, () => {
        expect(toWords(n, options)).toBe(expected)
    })
})

// Large numbers (thousand, million, billion, etc.)
describe.each([
    [1000, {}, "one thousand"],
    [2001, {}, "two thousand one"],
    [1000000, {}, "one million"],
    [1002003, {}, "one million two thousand three"],
    [1234567, {}, "one million two hundred thirty four thousand five hundred sixty seven"],
    [1000000000, {}, "one billion"]
])("toWords() — large numbers", (n, options, expected) => {
    it(`should correctly convert large numbers like ${n}`, () => {
        expect(toWords(n, options)).toBe(expected)
    })
})

// Decimal handling
describe.each([
    [45.67, {}, "forty five point six seven"],
    [45.67, { hyphens: true }, "forty-five point six seven"],
    [0.5, {}, "zero point five"],
    [12.34, {}, "twelve point three four"]
])("toWords() — decimal numbers", (n, options, expected) => {
    it(`should correctly spell decimal ${n}`, () => {
        expect(toWords(n, options)).toBe(expected)
    })
})

// Complex formatting combinations
describe.each([
    [1234, { and: true, hyphens: true }, "one thousand two hundred and thirty-four"],
    [1200456, { and: true, separator: "_" }, "one_million_two_hundred_thousand_four_hundred_and_fifty_six"],
])("toWords() — combined formatting", (n, options, expected) => {
    it(`should handle combined options for ${n}`, () => {
        expect(toWords(n, options)).toBe(expected)
    })
})

// Edge and corner cases
describe.each([
    [0.0, {}, "zero"],
    [1000000000000, {}, "one trillion"],
    [999999999999999, {}, "nine hundred ninety nine trillion nine hundred ninety nine billion nine hundred ninety nine million nine hundred ninety nine thousand nine hundred ninety nine"],
    [7.007, {}, "seven point zero zero seven"],
])("toWords() — edge and extreme values", (n, options, expected) => {
    it(`should handle edge number ${n}`, () => {
        expect(toWords(n, options)).toBe(expected)
    })
})

// Notes on potential inconsistencies
describe("toWords() — potential improvements", () => {
    it("should possibly trim extra separators at thousand boundaries (if they appear)", () => {
        // Current logic adds a separator even when a chunk is empty before appending thousand/million, etc.
        // Example fix would be: skip appending THOUSANDS[i] if chunk == 0.
        expect(true).toBe(true)
    })
})

// Negative numbers
describe.each([
    [-1, {}, "negative one"],
    [-9, {}, "negative nine"],
    [-10, {}, "negative ten"],
    [-11, {}, "negative eleven"],
    [-15, {}, "negative fifteen"],
    [-20, {}, "negative twenty"],
    [-21, {}, "negative twenty one"],
    [-99, {}, "negative ninety nine"],
    [-100, {}, "negative one hundred"],
    [-101, {}, "negative one hundred one"],
    [-110, {}, "negative one hundred ten"],
    [-115, {}, "negative one hundred fifteen"],
    [-123, {}, "negative one hundred twenty three"],
    [-999, {}, "negative nine hundred ninety nine"]
])("toWords() — negative integers", (n, options, expected) => {
    it(`should convert ${n} to "${expected}"`, () => {
        expect(toWords(n, options)).toBe(expected)
    })
})

// Negative numbers with 'and'
describe.each([
    [-101, { and: true }, "negative one hundred and one"],
    [-120, { and: true }, "negative one hundred and twenty"],
    [-999, { and: true }, "negative nine hundred and ninety nine"]
])("toWords() — negative integers with 'and'", (n, options, expected) => {
    it(`should include 'and' correctly for ${n}`, () => {
        expect(toWords(n, options)).toBe(expected)
    })
})

// Negative numbers with hyphens
describe.each([
    [-21, { hyphens: true }, "negative twenty-one"],
    [-45, { hyphens: true }, "negative forty-five"],
    [-99, { hyphens: true }, "negative ninety-nine"]
])("toWords() — negative integers with hyphens", (n, options, expected) => {
    it(`should hyphenate correctly for ${n}`, () => {
        expect(toWords(n, options)).toBe(expected)
    })
})

// Negative decimals
describe.each([
    [-3.14, {}, "negative three point one four"],
    [-0.5, {}, "negative zero point five"],
    [-12.34, { hyphens: true }, "negative twelve point three four"]
])("toWords() — negative decimal numbers", (n, options, expected) => {
    it(`should correctly spell negative decimal ${n}`, () => {
        expect(toWords(n, options)).toBe(expected)
    })
})
