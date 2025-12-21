import { describe, it, expect } from "vitest"
import { toOrdinal } from "../src/to-ordinal"
import { LocaleKey } from "../src/locales/i18n"

// Basic English ordinals (en-US default)
describe.each([
    [1, {}, "1st"],
    [2, {}, "2nd"],
    [3, {}, "3rd"],
    [4, {}, "4th"],
    [5, {}, "5th"],
    [10, {}, "10th"],
    [11, {}, "11th"],
    [12, {}, "12th"],
    [13, {}, "13th"],
    [20, {}, "20th"],
    [21, {}, "21st"],
    [22, {}, "22nd"],
    [23, {}, "23rd"],
    [24, {}, "24th"],
    [31, {}, "31st"],
    [100, {}, "100th"],
    [101, {}, "101st"],
    [111, {}, "111th"],
    [121, {}, "121st"]
])("toOrdinal() — English ordinals", (n, options, expected) => {
    it(`should format ${n} as "${expected}"`, () => {
        expect(toOrdinal(n, options)).toBe(expected)
    })
})

// Spanish ordinals - masculine
describe.each([
    [1, { locale: 'es' as LocaleKey, grammar: { gender: 'masc' } }, "1º"],
    [2, { locale: 'es' as LocaleKey, grammar: { gender: 'masc' } }, "2º"],
    [3, { locale: 'es' as LocaleKey, grammar: { gender: 'masc' } }, "3º"],
    [10, { locale: 'es' as LocaleKey, grammar: { gender: 'masc' } }, "10º"],
    [21, { locale: 'es' as LocaleKey, grammar: { gender: 'masc' } }, "21º"],
    [100, { locale: 'es' as LocaleKey, grammar: { gender: 'masc' } }, "100º"]
])("toOrdinal() — Spanish masculine", (n, options, expected) => {
    it(`should format ${n} as masculine "${expected}"`, () => {
        expect(toOrdinal(n, options)).toBe(expected)
    })
})

// Spanish ordinals - feminine
describe.each([
    [1, { locale: 'es' as LocaleKey, grammar: { gender: 'fem' } }, "1ª"],
    [2, { locale: 'es' as LocaleKey, grammar: { gender: 'fem' } }, "2ª"],
    [3, { locale: 'es' as LocaleKey, grammar: { gender: 'fem' } }, "3ª"],
    [10, { locale: 'es' as LocaleKey, grammar: { gender: 'fem' } }, "10ª"],
    [21, { locale: 'es' as LocaleKey, grammar: { gender: 'fem' } }, "21ª"],
    [100, { locale: 'es' as LocaleKey, grammar: { gender: 'fem' } }, "100ª"]
])("toOrdinal() — Spanish feminine", (n, options, expected) => {
    it(`should format ${n} as feminine "${expected}"`, () => {
        expect(toOrdinal(n, options)).toBe(expected)
    })
})

// German ordinals (fixed suffix)
describe.each([
    [1, { locale: 'de' as LocaleKey }, "1."],
    [2, { locale: 'de' as LocaleKey }, "2."],
    [3, { locale: 'de' as LocaleKey }, "3."],
    [10, { locale: 'de' as LocaleKey }, "10."],
    [21, { locale: 'de' as LocaleKey }, "21."],
    [100, { locale: 'de' as LocaleKey }, "100."],
    [1000, { locale: 'de' as LocaleKey }, "1000."]
])("toOrdinal() — German ordinals", (n, options, expected) => {
    it(`should format ${n} as "${expected}"`, () => {
        expect(toOrdinal(n, options)).toBe(expected)
    })
})

// Arabic ordinals with Arabic numerals
describe.each([
    [1, { locale: 'ar' as LocaleKey }, "١º"],
    [2, { locale: 'ar' as LocaleKey }, "٢º"],
    [3, { locale: 'ar' as LocaleKey }, "٣º"],
    [4, { locale: 'ar' as LocaleKey }, "٤º"],
    [10, { locale: 'ar' as LocaleKey }, "١٠º"],
    [21, { locale: 'ar' as LocaleKey }, "٢١º"],
    [100, { locale: 'ar' as LocaleKey }, "١٠٠º"]
])("toOrdinal() — Arabic ordinals", (n, options, expected) => {
    it(`should format ${n} with Arabic numerals as "${expected}"`, () => {
        expect(toOrdinal(n, options)).toBe(expected)
    })
})

// Gender variations - different gender strings
describe.each([
    [1, { locale: 'es' as LocaleKey, grammar: { gender: 'feminine' } }, "1ª"],
    [1, { locale: 'es' as LocaleKey, grammar: { gender: 'f' } }, "1ª"],
    [1, { locale: 'es' as LocaleKey, grammar: { gender: 'masculine' } }, "1º"],
    [1, { locale: 'es' as LocaleKey, grammar: { gender: 'm' } }, "1º"],
    [5, { locale: 'es' as LocaleKey, grammar: { gender: 'FEM' } }, "5ª"],
    [5, { locale: 'es' as LocaleKey, grammar: { gender: 'MASC' } }, "5º"]
])("toOrdinal() — gender string variations", (n, options, expected) => {
    it(`should handle gender "${options.grammar.gender}" correctly`, () => {
        expect(toOrdinal(n, options)).toBe(expected)
    })
})

// Edge cases - teens in English
describe.each([
    [11, {}, "11th"],
    [12, {}, "12th"],
    [13, {}, "13th"],
    [14, {}, "14th"],
    [15, {}, "15th"],
    [16, {}, "16th"],
    [17, {}, "17th"],
    [18, {}, "18th"],
    [19, {}, "19th"]
])("toOrdinal() — English teens", (n, options, expected) => {
    it(`should correctly format teen number ${n} as "${expected}"`, () => {
        expect(toOrdinal(n, options)).toBe(expected)
    })
})

// Edge cases - large numbers
describe.each([
    [100, {}, "100th"],
    [101, {}, "101st"],
    [102, {}, "102nd"],
    [103, {}, "103rd"],
    [111, {}, "111th"],
    [112, {}, "112th"],
    [113, {}, "113th"],
    [121, {}, "121st"],
    [1000, {}, "1000th"],
    [1001, {}, "1001st"],
    [1021, {}, "1021st"]
])("toOrdinal() — large numbers", (n, options, expected) => {
    it(`should correctly format large number ${n} as "${expected}"`, () => {
        expect(toOrdinal(n, options)).toBe(expected)
    })
})

// Edge cases - boundary values
describe.each([
    [0, {}, "0th"],
    [1, {}, "1st"],
    [999, {}, "999th"],
    [9999, {}, "9999th"]
])("toOrdinal() — boundary values", (n, options, expected) => {
    it(`should handle boundary value ${n}`, () => {
        expect(toOrdinal(n, options)).toBe(expected)
    })
})

// UK English (should match US English for ordinals)
describe.each([
    [1, { locale: 'en-GB' as LocaleKey }, "1st"],
    [2, { locale: 'en-GB' as LocaleKey }, "2nd"],
    [3, { locale: 'en-GB' as LocaleKey }, "3rd"],
    [21, { locale: 'en-GB' as LocaleKey }, "21st"],
    [111, { locale: 'en-GB' as LocaleKey }, "111th"]
])("toOrdinal() — UK English", (n, options, expected) => {
    it(`should format ${n} in UK English as "${expected}"`, () => {
        expect(toOrdinal(n, options)).toBe(expected)
    })
})

// All x1, x2, x3 endings across different decades
describe.each([
    [1, {}, "1st"],
    [11, {}, "11th"],
    [21, {}, "21st"],
    [31, {}, "31st"],
    [41, {}, "41st"],
    [51, {}, "51st"],
    [61, {}, "61st"],
    [71, {}, "71st"],
    [81, {}, "81st"],
    [91, {}, "91st"],
    [2, {}, "2nd"],
    [12, {}, "12th"],
    [22, {}, "22nd"],
    [32, {}, "32nd"],
    [42, {}, "42nd"],
    [52, {}, "52nd"],
    [62, {}, "62nd"],
    [72, {}, "72nd"],
    [82, {}, "82nd"],
    [92, {}, "92nd"],
    [3, {}, "3rd"],
    [13, {}, "13th"],
    [23, {}, "23rd"],
    [33, {}, "33rd"],
    [43, {}, "43rd"],
    [53, {}, "53rd"],
    [63, {}, "63rd"],
    [73, {}, "73rd"],
    [83, {}, "83rd"],
    [93, {}, "93rd"]
])("toOrdinal() — pattern consistency", (n, options, expected) => {
    it(`should maintain pattern for ${n}`, () => {
        expect(toOrdinal(n, options)).toBe(expected)
    })
})

// Default gender fallback
describe.each([
    [1, { locale: 'es' as LocaleKey }, "1º"],
    [2, { locale: 'es' as LocaleKey }, "2º"],
    [3, { locale: 'es' as LocaleKey }, "3º"]
])("toOrdinal() — default masculine gender", (n, options, expected) => {
    it(`should default to masculine when gender not specified`, () => {
        expect(toOrdinal(n, options)).toBe(expected)
    })
})