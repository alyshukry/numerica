// import { describe, it, expect } from "vitest"
// import { relativeTime } from "../src/relative-time"

// const MINUTE = 60 * 1000
// const HOUR = 60 * MINUTE
// const DAY = 24 * HOUR
// const WEEK = 7 * DAY
// const MONTH = 30 * DAY
// const YEAR = 365 * DAY

// // Basic "ago" cases
// describe.each([
//     [new Date(Date.now() - 500), {}, "just now"],
//     [new Date(Date.now() - 2000), {}, "2 seconds ago"],
//     [new Date(Date.now() - MINUTE), {}, "1 minute ago"],
//     [new Date(Date.now() - 2 * MINUTE), {}, "2 minutes ago"],
//     [new Date(Date.now() - HOUR), {}, "1 hour ago"],
//     [new Date(Date.now() - 5 * HOUR), {}, "5 hours ago"],
//     [new Date(Date.now() - DAY), {}, "1 day ago"],
//     [new Date(Date.now() - 3 * DAY), {}, "3 days ago"],
//     [new Date(Date.now() - WEEK), {}, "1 week ago"],
//     [new Date(Date.now() - 2 * WEEK), {}, "2 weeks ago"],
//     [new Date(Date.now() - MONTH), {}, "1 month ago"],
//     [new Date(Date.now() - 6 * MONTH), {}, "6 months ago"],
//     [new Date(Date.now() - YEAR), {}, "1 year ago"],
//     [new Date(Date.now() - 3 * YEAR), {}, "3 years ago"]
// ])("relativeTime() — basic past times", (date, options, expected) => {
//     it(`should return "${expected}"`, () => {
//         expect(relativeTime(date, options)).toBe(expected)
//     })
// })

// // Basic "in" future cases
// describe.each([
//     [new Date(Date.now() + 2000), {}, "in 2 seconds"],
//     [new Date(Date.now() + MINUTE), {}, "in 1 minute"],
//     [new Date(Date.now() + HOUR), {}, "in 1 hour"],
//     [new Date(Date.now() + 3 * DAY), {}, "in 3 days"],
//     [new Date(Date.now() + MONTH), {}, "in 1 month"],
//     [new Date(Date.now() + 2 * YEAR), {}, "in 2 years"]
// ])("relativeTime() — future times", (date, options, expected) => {
//     it(`should return "${expected}"`, () => {
//         expect(relativeTime(date, options)).toBe(expected)
//     })
// })

// // Lod (level of detail)
// describe.each([
//     [new Date(Date.now() - (DAY + HOUR + MINUTE)), { lod: 1 }, "1 day ago"],
//     [new Date(Date.now() - (DAY + HOUR + MINUTE)), { lod: 2 }, "1 day, 1 hour ago"],
//     [new Date(Date.now() - (DAY + HOUR + MINUTE)), { lod: 3 }, "1 day, 1 hour, 1 minute ago"]
// ])("relativeTime() — lod option", (date, options, expected) => {
//     it(`should return "${expected}"`, () => {
//         expect(relativeTime(date, options)).toBe(expected)
//     })
// })

// // Separator
// describe.each([
//     [new Date(Date.now() - (DAY + HOUR + MINUTE)), { lod: 3, separator: ' • ' }, "1 day • 1 hour • 1 minute ago"],
//     [new Date(Date.now() - (HOUR + MINUTE)), { lod: 2, separator: ' and ' }, "1 hour and 1 minute ago"]
// ])("relativeTime() — custom separator", (date, options, expected) => {
//     it(`should return "${expected}"`, () => {
//         expect(relativeTime(date, options)).toBe(expected)
//     })
// })

// // Abbreviation mode
// describe.each([
//     [new Date(Date.now() - (HOUR + MINUTE)), { lod: 2, abbreviate: true }, "1h, 1m ago"],
//     [new Date(Date.now() + (DAY + HOUR)), { lod: 2, abbreviate: true }, "in 1d, 1h"]
// ])("relativeTime() — abbreviate option", (date, options, expected) => {
//     it(`should return "${expected}"`, () => {
//         expect(relativeTime(date, options)).toBe(expected)
//     })
// })

// // Include suffix toggle
// describe.each([
//     [new Date(Date.now() - HOUR), { includeSuffix: false }, "1 hour"],
//     [new Date(Date.now() + HOUR), { includeSuffix: false }, "1 hour"]
// ])("relativeTime() — includeSuffix=false", (date, options, expected) => {
//     it(`should return "${expected}" without 'ago' or 'in'`, () => {
//         expect(relativeTime(date, options)).toBe(expected)
//     })
// })

// // Edge cases
// describe.each([
//     [new Date(Date.now()), {}, "just now"],
//     [new Date(Date.now() - 999), {}, "just now"],
//     [new Date(Date.now() + 999), {}, "just now"],
//     [new Date(Date.now() - YEAR - MONTH - DAY), { lod: 2 }, "1 year, 1 month ago"]
// ])("relativeTime() — edge and combined cases", (date, options, expected) => {
//     it(`should handle edge cases`, () => {
//         expect(relativeTime(date, options)).toBe(expected)
//     })
// })
