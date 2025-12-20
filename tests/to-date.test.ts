import { describe, it, expect } from "vitest"
import { toDate } from "../src/to-date"
import { LocaleKey } from "../src/locales/i18n"

// Basic preset formats
describe.each([
    [new Date(2025, 10, 12), { format: "short" }, "11/12/25"], // en-US default
    [new Date(2025, 10, 12), { format: "medium" }, "Wed, Nov 12, 25"],
    [new Date(2025, 10, 12), { format: "long" }, "November 12, 2025"],
    [new Date(2025, 10, 12), { format: "full" }, "Wednesday, November 12, 2025"]
])("toDate() — preset formats (en-US)", (date, options, expected) => {
    it(`should format date as "${expected}" with format "${options.format}"`, () => {
        expect(toDate(date, options)).toBe(expected)
    })
})

// Custom format tokens - Year
describe.each([
    [new Date(2025, 10, 12), { format: "YYYY" }, "2025"],
    [new Date(2025, 10, 12), { format: "YY" }, "25"],
    [new Date(1999, 5, 15), { format: "YYYY" }, "1999"],
    [new Date(1999, 5, 15), { format: "YY" }, "99"],
    [new Date(2000, 0, 1), { format: "YY" }, "00"]
])("toDate() — year tokens", (date, options, expected) => {
    it(`should format year as "${expected}"`, () => {
        expect(toDate(date, options)).toBe(expected)
    })
})

// Custom format tokens - Month
describe.each([
    [new Date(2025, 0, 15), { format: "MMMM" }, "January"],
    [new Date(2025, 0, 15), { format: "MMM" }, "Jan"],
    [new Date(2025, 0, 15), { format: "MM" }, "01"],
    [new Date(2025, 0, 15), { format: "M" }, "1"],
    [new Date(2025, 11, 15), { format: "MMMM" }, "December"],
    [new Date(2025, 11, 15), { format: "MMM" }, "Dec"],
    [new Date(2025, 11, 15), { format: "MM" }, "12"],
    [new Date(2025, 11, 15), { format: "M" }, "12"]
])("toDate() — month tokens", (date, options, expected) => {
    it(`should format month as "${expected}"`, () => {
        expect(toDate(date, options)).toBe(expected)
    })
})

// Custom format tokens - Day
describe.each([
    [new Date(2025, 10, 1), { format: "DD" }, "01"],
    [new Date(2025, 10, 1), { format: "D" }, "1"],
    [new Date(2025, 10, 1), { format: "Do" }, "1st"],
    [new Date(2025, 10, 2), { format: "Do" }, "2nd"],
    [new Date(2025, 10, 3), { format: "Do" }, "3rd"],
    [new Date(2025, 10, 4), { format: "Do" }, "4th"],
    [new Date(2025, 10, 21), { format: "Do" }, "21st"],
    [new Date(2025, 10, 31), { format: "DD" }, "01"],
    [new Date(2025, 10, 31), { format: "D" }, "1"]
])("toDate() — day tokens", (date, options, expected) => {
    it(`should format day as "${expected}"`, () => {
        expect(toDate(date, options)).toBe(expected)
    })
})

// Custom format tokens - Weekday
describe.each([
    [new Date(2025, 10, 9), { format: "DDDD" }, "Sunday"], // Nov 9, 2025 is Sunday
    [new Date(2025, 10, 9), { format: "DDD" }, "Sun"],
    [new Date(2025, 10, 10), { format: "DDDD" }, "Monday"],
    [new Date(2025, 10, 10), { format: "DDD" }, "Mon"],
    [new Date(2025, 10, 15), { format: "DDDD" }, "Saturday"],
    [new Date(2025, 10, 15), { format: "DDD" }, "Sat"]
])("toDate() — weekday tokens", (date, options, expected) => {
    it(`should format weekday as "${expected}"`, () => {
        expect(toDate(date, options)).toBe(expected)
    })
})

// Custom format tokens - Time
describe.each([
    [new Date(2025, 10, 12, 14, 30, 45), { format: "HH:mm:ss" }, "14:30:45"],
    [new Date(2025, 10, 12, 9, 5, 3), { format: "HH:mm:ss" }, "09:05:03"],
    [new Date(2025, 10, 12, 9, 5, 3), { format: "H:m:s" }, "9:5:3"],
    [new Date(2025, 10, 12, 0, 0, 0), { format: "HH:mm:ss" }, "00:00:00"],
    [new Date(2025, 10, 12, 23, 59, 59), { format: "HH:mm:ss" }, "23:59:59"]
])("toDate() — time tokens", (date, options, expected) => {
    it(`should format time as "${expected}"`, () => {
        expect(toDate(date, options)).toBe(expected)
    })
})

// Complex custom formats
describe.each([
    [new Date(2025, 10, 12), { format: "YYYY-MM-DD" }, "2025-11-12"],
    [new Date(2025, 10, 12), { format: "DD/MM/YYYY" }, "12/11/2025"],
    [new Date(2025, 10, 12, 14, 30), { format: "YYYY-MM-DD HH:mm" }, "2025-11-12 14:30"],
    [new Date(2025, 10, 12), { format: "DDDD, MMMM Do, YYYY" }, "Wednesday, November 12th, 2025"],
    [new Date(2025, 0, 1), { format: "DDD, MMM D, YY" }, "Wed, Jan 1, 25"],
    [new Date(2025, 10, 12, 14, 30, 45), { format: "D/M/YY H:m:s" }, "12/11/25 14:30:45"]
])("toDate() — complex custom formats", (date, options, expected) => {
    it(`should format with custom pattern as "${expected}"`, () => {
        expect(toDate(date, options)).toBe(expected)
    })
})

// Literal text in formats
describe.each([
    [new Date(2025, 10, 12), { format: "YYYY年MM月DD日" }, "2025年11月12日"],
    [new Date(2025, 10, 12, 14, 30), { format: "YYYY-MM-DD at HH:mm" }, "2025-11-12 at 14:30"],
    [new Date(2025, 10, 12), { format: "Today i\\s DDDD" }, "Today is Wednesday"],
    [new Date(2025, 10, 12), { format: "[YYYY-MM-DD]" }, "[2025-11-12]"]
])("toDate() — formats with literal text", (date, options, expected) => {
    it(`should preserve literal text in format`, () => {
        expect(toDate(date, options)).toBe(expected)
    })
})

// German locale
describe.each([
    [new Date(2025, 10, 12), { locale: 'de' as LocaleKey, format: "short" }, "12.11.25"],
    [new Date(2025, 10, 12), { locale: 'de' as LocaleKey, format: "medium" }, "Mi, 12. Nov 25"],
    [new Date(2025, 10, 12), { locale: 'de' as LocaleKey, format: "long" }, "12. November 2025"],
    [new Date(2025, 10, 12), { locale: 'de' as LocaleKey, format: "full" }, "Mittwoch, 12. November 2025"],
    [new Date(2025, 0, 15), { locale: 'de' as LocaleKey, format: "MMMM" }, "Januar"],
    [new Date(2025, 2, 15), { locale: 'de' as LocaleKey, format: "MMMM" }, "März"],
    [new Date(2025, 10, 9), { locale: 'de' as LocaleKey, format: "DDDD" }, "Sonntag"]
])("toDate() — German locale", (date, options, expected) => {
    it(`should format in German as "${expected}"`, () => {
        expect(toDate(date, options)).toBe(expected)
    })
})

// UK English locale
describe.each([
    [new Date(2025, 10, 12), { locale: 'en-GB' as LocaleKey, format: "short" }, "12/11/25"],
    [new Date(2025, 10, 12), { locale: 'en-GB' as LocaleKey, format: "medium" }, "Wed, 12 Nov 25"],
    [new Date(2025, 10, 12), { locale: 'en-GB' as LocaleKey, format: "long" }, "12 November 2025"],
    [new Date(2025, 10, 12), { locale: 'en-GB' as LocaleKey, format: "full" }, "Wednesday, 12 November 2025"]
])("toDate() — UK English locale", (date, options, expected) => {
    it(`should format in UK English as "${expected}"`, () => {
        expect(toDate(date, options)).toBe(expected)
    })
})

// Arabic locale with Arabic numerals
describe.each([
    [new Date(2025, 10, 12), { locale: 'ar' as LocaleKey, format: "short" }, "٢٥/١١/١٢"],
    [new Date(2025, 10, 12), { locale: 'ar' as LocaleKey, format: "medium" }, "أرب، ١٢ نوف ٢٥"],
    [new Date(2025, 10, 12), { locale: 'ar' as LocaleKey, format: "long" }, "١٢ نوفمبر ٢٠٢٥"],
    [new Date(2025, 10, 12), { locale: 'ar' as LocaleKey, format: "full" }, "الأربعاء، ١٢ نوفمبر ٢٠٢٥"],
    [new Date(2025, 0, 15), { locale: 'ar' as LocaleKey, format: "YYYY-MM-DD" }, "٢٠٢٥-٠١-١٥"],
    [new Date(2025, 10, 12, 14, 30), { locale: 'ar' as LocaleKey, format: "HH:mm" }, "١٤:٣٠"],
    [new Date(2025, 0, 1), { locale: 'ar' as LocaleKey, format: "Do MMMM" }, "١º يناير"]
])("toDate() — Arabic locale", (date, options, expected) => {
    it(`should format in Arabic with Arabic numerals as "${expected}"`, () => {
        expect(toDate(date, options)).toBe(expected)
    })
})

// Arabic weekdays and months
describe.each([
    [new Date(2025, 10, 9), { locale: 'ar' as LocaleKey, format: "DDDD" }, "الأحد"],
    [new Date(2025, 10, 10), { locale: 'ar' as LocaleKey, format: "DDDD" }, "الاثنين"],
    [new Date(2025, 10, 9), { locale: 'ar' as LocaleKey, format: "DDD" }, "أحد"],
    [new Date(2025, 0, 15), { locale: 'ar' as LocaleKey, format: "MMMM" }, "يناير"],
    [new Date(2025, 1, 15), { locale: 'ar' as LocaleKey, format: "MMMM" }, "فبراير"],
    [new Date(2025, 0, 15), { locale: 'ar' as LocaleKey, format: "MMM" }, "ينا"]
])("toDate() — Arabic names", (date, options, expected) => {
    it(`should use Arabic names for weekdays/months`, () => {
        expect(toDate(date, options)).toBe(expected)
    })
})

// Edge cases - boundary dates
describe.each([
    [new Date(2000, 0, 1), { format: "YYYY-MM-DD" }, "2000-01-01"],
    [new Date(1999, 11, 31), { format: "YYYY-MM-DD" }, "1999-12-31"],
    [new Date(2099, 11, 31), { format: "YYYY-MM-DD" }, "2099-12-31"],
    [new Date(1900, 0, 1), { format: "YYYY-MM-DD" }, "1900-01-01"]
])("toDate() — boundary dates", (date, options, expected) => {
    it(`should handle boundary date ${expected}`, () => {
        expect(toDate(date, options)).toBe(expected)
    })
})

// Edge cases - leap year
describe.each([
    [new Date(2024, 1, 29), { format: "YYYY-MM-DD" }, "2024-02-29"],
    [new Date(2024, 1, 29), { format: "DDDD, MMMM Do" }, "Thursday, February 29th"],
    [new Date(2000, 1, 29), { format: "YYYY-MM-DD" }, "2000-02-29"]
])("toDate() — leap year dates", (date, options, expected) => {
    it(`should handle leap year date correctly`, () => {
        expect(toDate(date, options)).toBe(expected)
    })
})

// Edge cases - midnight and edge times
describe.each([
    [new Date(2025, 10, 12, 0, 0, 0), { format: "HH:mm:ss" }, "00:00:00"],
    [new Date(2025, 10, 12, 23, 59, 59), { format: "HH:mm:ss" }, "23:59:59"],
    [new Date(2025, 10, 12, 12, 0, 0), { format: "HH:mm" }, "12:00"]
])("toDate() — edge time values", (date, options, expected) => {
    it(`should handle edge time ${expected}`, () => {
        expect(toDate(date, options)).toBe(expected)
    })
})

// Ordinal suffixes for different days
describe.each([
    [new Date(2025, 10, 1), { format: "Do" }, "1st"],
    [new Date(2025, 10, 2), { format: "Do" }, "2nd"],
    [new Date(2025, 10, 3), { format: "Do" }, "3rd"],
    [new Date(2025, 10, 11), { format: "Do" }, "11th"],
    [new Date(2025, 10, 21), { format: "Do" }, "21st"],
    [new Date(2025, 10, 22), { format: "Do" }, "22nd"],
    [new Date(2025, 10, 23), { format: "Do" }, "23rd"],
    [new Date(2025, 11, 31), { format: "Do" }, "31st"]
])("toDate() — ordinal suffixes", (date, options, expected) => {
    it(`should use correct ordinal suffix for day`, () => {
        expect(toDate(date, options)).toBe(expected)
    })
})

// Mixed locales with custom formats
describe.each([
    [new Date(2025, 10, 12), { locale: 'de' as LocaleKey, format: "DD.MM.YYYY" }, "12.11.2025"],
    [new Date(2025, 10, 12), { locale: 'ar' as LocaleKey, format: "YYYY/MM/DD" }, "٢٠٢٥/١١/١٢"],
    [new Date(2025, 10, 12, 14, 30), { locale: 'de' as LocaleKey, format: "DD.MM.YYYY HH:mm" }, "12.11.2025 14:30"],
    [new Date(2025, 10, 12), { locale: 'en-GB' as LocaleKey, format: "DD/MM/YYYY" }, "12/11/2025"]
])("toDate() — locales with custom formats", (date, options, expected) => {
    it(`should apply locale to custom format`, () => {
        expect(toDate(date, options)).toBe(expected)
    })
})

// All months across locales
describe.each([
    [new Date(2025, 0, 1), { locale: 'en-US' as LocaleKey, format: "MMMM" }, "January"],
    [new Date(2025, 5, 1), { locale: 'en-US' as LocaleKey, format: "MMMM" }, "June"],
    [new Date(2025, 11, 1), { locale: 'en-US' as LocaleKey, format: "MMMM" }, "December"],
    [new Date(2025, 0, 1), { locale: 'de' as LocaleKey, format: "MMMM" }, "Januar"],
    [new Date(2025, 5, 1), { locale: 'de' as LocaleKey, format: "MMMM" }, "Juni"],
    [new Date(2025, 11, 1), { locale: 'de' as LocaleKey, format: "MMMM" }, "Dezember"],
    [new Date(2025, 0, 1), { locale: 'ar' as LocaleKey, format: "MMMM" }, "يناير"],
    [new Date(2025, 5, 1), { locale: 'ar' as LocaleKey, format: "MMMM" }, "يونيو"],
    [new Date(2025, 11, 1), { locale: 'ar' as LocaleKey, format: "MMMM" }, "ديسمبر"]
])("toDate() — all months in different locales", (date, options, expected) => {
    it(`should display month name correctly in ${options.locale}`, () => {
        expect(toDate(date, options)).toBe(expected)
    })
})

// All weekdays across locales
describe.each([
    [new Date(2025, 10, 9), { locale: 'en-US' as LocaleKey, format: "DDDD" }, "Sunday"],
    [new Date(2025, 10, 15), { locale: 'en-US' as LocaleKey, format: "DDDD" }, "Saturday"],
    [new Date(2025, 10, 9), { locale: 'de' as LocaleKey, format: "DDDD" }, "Sonntag"],
    [new Date(2025, 10, 15), { locale: 'de' as LocaleKey, format: "DDDD" }, "Samstag"],
    [new Date(2025, 10, 9), { locale: 'ar' as LocaleKey, format: "DDDD" }, "الأحد"],
    [new Date(2025, 10, 15), { locale: 'ar' as LocaleKey, format: "DDDD" }, "السبت"]
])("toDate() — all weekdays in different locales", (date, options, expected) => {
    it(`should display weekday name correctly in ${options.locale}`, () => {
        expect(toDate(date, options)).toBe(expected)
    })
})

// Padding edge cases
describe.each([
    [new Date(2025, 0, 1), { format: "MM-DD" }, "01-01"],
    [new Date(2025, 0, 9), { format: "MM-DD" }, "01-09"],
    [new Date(2025, 9, 9), { format: "MM-DD" }, "10-09"],
    [new Date(2025, 10, 12, 9, 5), { format: "HH:mm" }, "09:05"],
    [new Date(2025, 10, 12, 0, 0), { format: "HH:mm" }, "00:00"]
])("toDate() — padding edge cases", (date, options, expected) => {
    it(`should pad numbers correctly`, () => {
        expect(toDate(date, options)).toBe(expected)
    })
})

// Empty and minimal formats
describe.each([
    [new Date(2025, 10, 12), { format: "" }, ""],
    [new Date(2025, 10, 12), { format: "YYYY" }, "2025"],
    [new Date(2025, 10, 12), { format: "/" }, "/"],
    [new Date(2025, 10, 12), { format: "---" }, "---"]
])("toDate() — minimal and special formats", (date, options, expected) => {
    it(`should handle minimal format correctly`, () => {
        expect(toDate(date, options)).toBe(expected)
    })
})