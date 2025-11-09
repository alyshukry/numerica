import { describe, it, expect } from "vitest"
import { toGrouped } from "../src/to-grouped"
import { LocaleKey } from "../src/locales/i18n"

// Basic cases
describe.each([
    [0, {}, "0"],
    [1, {}, "1"],
    [12, {}, "12"],
    [123, {}, "123"],
    [1234, {}, "1,234"],
    [1234567, {}, "1,234,567"],
    [1234567890, {}, "1,234,567,890"]
])("toGrouped() — basic numbers", (n, options, expected) => {
    it(`should format ${n} as "${expected}"`, () => {
        expect(toGrouped(n, options)).toBe(expected)
    })
})

// Decimal numbers
describe.each([
    [1234.56, {}, "1,234.56"],
    [1000000.1234, {}, "1,000,000.1234"],
    [987654321.001, {}, "987,654,321.001"]
])("toGrouped() — decimal numbers", (n, options, expected) => {
    it(`should correctly preserve decimals for ${n}`, () => {
        expect(toGrouped(n, options)).toBe(expected)
    })
})

// Custom separator characters
describe.each([
    [1234567, { separator: " " }, "1 234 567"],
    [1234567, { separator: "_" }, "1_234_567"],
    [1234567, { separator: "." }, "1.234.567"]
])("toGrouped() — custom separators", (n, options, expected) => {
    it(`should use custom separator "${options.separator}"`, () => {
        expect(toGrouped(n, options)).toBe(expected)
    })
})

// Custom decimal separator
describe.each([
    [1234.56, { decimal: "," }, "1,234,56"],
    [1000000.5, { separator: ".", decimal: "," }, "1.000.000,5"],
    [9876.543, { separator: " ", decimal: "," }, "9 876,543"],
    [123456.789, { separator: "'", decimal: "." }, "123'456.789"]
])("toGrouped() — custom decimal separators", (n, options, expected) => {
    it(`should use custom decimal separator for ${n}`, () => {
        expect(toGrouped(n, options)).toBe(expected)
    })
})

// Custom segment lengths (single number)
describe.each([
    [123456, { segment: 2, separator: "_" }, "12_34_56"],
    [1234567, { segment: 4, separator: " " }, "123 4567"],
    [987654321, { segment: 1, separator: "-" }, "9-8-7-6-5-4-3-2-1"],
    [12345, { segment: 3 }, "12,345"]
])("toGrouped() — custom segment lengths (single)", (n, options, expected) => {
    it(`should separate ${n} into segments of ${options.segment}`, () => {
        expect(toGrouped(n, options)).toBe(expected)
    })
})

// Array segment lengths (Indian numbering system)
describe.each([
    [1234567, { segment: [3, 2] }, "12,34,567"],
    [123456789, { segment: [3, 2] }, "12,34,56,789"],
    [12345678901, { segment: [3, 2] }, "12,34,56,78,901"],
    [1234567.89, { segment: [3, 2], decimal: "." }, "12,34,567.89"]
])("toGrouped() — array segment lengths (Indian format)", (n, options, expected) => {
    it(`should format ${n} with pattern [3,2] as "${expected}"`, () => {
        expect(toGrouped(n, options)).toBe(expected)
    })
})

// Array segment lengths (custom patterns)
describe.each([
    [123456789, { segment: [4, 3, 2] }, "12,345,6789"],
    [1234567890, { segment: [2, 3] }, "12,345,678,90"],
    [123456, { segment: [1, 2, 3] }, "123,45,6"],
    [12345678, { segment: [4] }, "1234,5678"]
])("toGrouped() — array segment lengths (various patterns)", (n, options, expected) => {
    it(`should format ${n} with custom segment pattern`, () => {
        expect(toGrouped(n, options)).toBe(expected)
    })
})

// Combining array segments with custom separators and decimals
describe.each([
    [1234567.89, { segment: [3, 2], separator: " ", decimal: "," }, "12 34 567,89"],
    [987654321.5, { segment: [3, 2], separator: ".", decimal: "," }, "98.76.54.321,5"],
    [12345678, { segment: [4, 2], separator: "_", decimal: "." }, "12_34_5678"]
])("toGrouped() — combined custom options", (n, options, expected) => {
    it(`should apply all custom options for ${n}`, () => {
        expect(toGrouped(n, options)).toBe(expected)
    })
})

// Negative numbers
describe.each([
    [-1234, {}, "-1,234"],
    [-9876543.21, {}, "-9,876,543.21"],
    [-123456, { separator: " ", segment: 2 }, "-12 34 56"],
    [-1234567, { segment: [3, 2] }, "-12,34,567"],
    [-9876.54, { separator: ".", decimal: "," }, "-9.876,54"]
])("toGrouped() — negative numbers", (n, options, expected) => {
    it(`should handle negative numbers like ${n}`, () => {
        expect(toGrouped(n, options)).toBe(expected)
    })
})

// Localization tests
describe.each([
    [1234567, { locale: 'ar' as LocaleKey }, "١٬٢٣٤٬٥٦٧"],
    [1234.56, { locale: 'ar' as LocaleKey }, "١٬٢٣٤٫٥٦"],
    [-1234, { locale: 'ar' as LocaleKey }, "−١٬٢٣٤"],
    [1234567, { locale: 'de' as LocaleKey }, "1.234.567"],
    [1234.56, { locale: 'de' as LocaleKey }, "1.234,56"],
    [1234567, { locale: 'en-GB' as LocaleKey }, "1,234,567"],
    [1234.56, { locale: 'en-GB' as LocaleKey }, "1,234.56"],
    [1234567, { locale: 'en-US' as LocaleKey }, "1,234,567"],
    [1234.56, { locale: 'en-US' as LocaleKey }, "1,234.56"]
])("toGrouped() — localization", (n, options, expected) => {
    it(`should format ${n} according to locale ${options.locale}`, () => {
        expect(toGrouped(n, options)).toBe(expected)
    })
})

// Locale parameter conflicts
describe.each([
    // Locale with custom separator override
    [1234567, { locale: 'de' as LocaleKey, separator: ',' }, "1,234,567"],
    // Locale with custom decimal override
    [1234.56, { locale: 'de' as LocaleKey, decimal: '.' }, "1.234.56"],
    // Locale with custom segment override
    [1234567, { locale: 'ar' as LocaleKey, segment: 2 }, "١٬٢٣٬٤٥٬٦٧"],
    // Multiple overrides
    [1234567.89, { locale: 'de' as LocaleKey, separator: '_', decimal: ':', segment: 2 }, "1_23_45_67:89"],
])("toGrouped() — locale parameter conflicts", (n, options, expected) => {
    it(`should override locale ${options.locale} defaults with custom options`, () => {
        expect(toGrouped(n, options)).toBe(expected)
    })
})

// Additional locale edge cases
describe.each([
    // Zero with different locales
    [0, { locale: 'ar' as LocaleKey }, "٠"],
    [0, { locale: 'de' as LocaleKey }, "0"],
    // Very small numbers with locales
    [0.00001, { locale: 'ar' as LocaleKey }, "٠٫٠٠٠٠١"],
    [0.00001, { locale: 'de' as LocaleKey }, "0,00001"],
    // Very large numbers with locales
    [1e20, { locale: 'ar' as LocaleKey }, "١٠٠٬٠٠٠٬٠٠٠٬٠٠٠٬٠٠٠٬٠٠٠٬٠٠٠"],
    [1e20, { locale: 'de' as LocaleKey }, "100.000.000.000.000.000.000"],
    // Scientific notation with locales
    [1.23e-5, { locale: 'ar' as LocaleKey }, "٠٫٠٠٠٠١٢٣"],
    [1.23e-5, { locale: 'de' as LocaleKey }, "0,0000123"],
    // Negative zero
    [-0, { locale: 'ar' as LocaleKey }, "٠"],
    [-0, { locale: 'de' as LocaleKey }, "0"],
])("toGrouped() — additional locale cases", (n, options, expected) => {
    it(`should handle special number ${n} with locale ${options.locale}`, () => {
        expect(toGrouped(n, options)).toBe(expected)
    })
})

// Mixed locale features
describe.each([
    // Arabic numerals with western separators
    [1234567, { locale: 'ar' as LocaleKey, separator: ',' }, "١,٢٣٤,٥٦٧"],
    // German format with Arabic numerals
    [1234567.89, { locale: 'de' as LocaleKey, decimal: ',', separator: '.', segment: [3,2] }, "12.34.567,89"],
    // Complex mixing
    [12345678.901, { locale: 'ar' as LocaleKey, separator: '_', decimal: ':', segment: [2,2,2] }, "١٢_٣٤_٥٦_٧٨:٩٠١"],
    // Negative numbers with mixed formats
    [-1234567.89, { locale: 'ar' as LocaleKey, separator: ' ' }, "−١ ٢٣٤ ٥٦٧٫٨٩"],
    [-1234567.89, { locale: 'de' as LocaleKey, separator: '_', decimal: ',' }, "-1_234_567,89"]
])("toGrouped() — mixed locale features", (n, options, expected) => {
    it(`should handle mixed locale features for ${n}`, () => {
        expect(toGrouped(n, options)).toBe(expected)
    })
})

// Invalid or mixed configurations
describe.each([
    // Empty separator
    [12345, { separator: '' }, "12345"],
    // Empty decimal
    [123.45, { decimal: '' }, "12345"],
    // Same separator and decimal
    [1234.56, { separator: '.', decimal: '.' }, "1.234.56"],
    // Invalid segment sizes
    [12345, { segment: 0 }, "12,345"],
    [12345, { segment: -1 }, "12,345"],
    [12345, { segment: [] }, "12,345"],
    // Mixed valid/invalid segments
    [123456, { segment: [2, 0, 3] }, "1,234,56"],
])("toGrouped() — invalid configurations", (n, options, expected) => {
    it(`should handle invalid configuration gracefully`, () => {
        expect(toGrouped(n, options)).toBe(expected)
    })
})

// Edge cases
describe.each([
    [NaN, {}, "NaN"],
    [Infinity, {}, "Infinity"],
    [-Infinity, {}, "-Infinity"],
    [0.0001, {}, "0.0001"],
    [1000.0001, {}, "1,000.0001"],
    [Infinity, { segment: [3, 2] }, "Infinity"],
    [-Infinity, { separator: " " }, "-Infinity"]
])("toGrouped() — edge cases", (n, options, expected) => {
    it(`should return "${expected}" for ${n}`, () => {
        expect(toGrouped(n, options)).toBe(expected)
    })
})

// Large numbers
describe.each([
    [1e9, {}, "1,000,000,000"],
    [1e12, {}, "1,000,000,000,000"],
    [123456789012345, {}, "123,456,789,012,345"],
    [1e15, { segment: [3, 2] }, "1,00,00,00,00,00,00,000"]
])("toGrouped() — large numbers", (n, options, expected) => {
    it(`should format large number ${n}`, () => {
        expect(toGrouped(n, options)).toBe(expected)
    })
})

// Small numbers (between 0 and 1)
describe.each([
    [0.123, {}, "0.123"],
    [0.999, {}, "0.999"],
    [0.1, { decimal: "," }, "0,1"],
    [0.123456, { decimal: "," }, "0,123456"]
])("toGrouped() — small decimal numbers", (n, options, expected) => {
    it(`should handle small numbers like ${n}`, () => {
        expect(toGrouped(n, options)).toBe(expected)
    })
})