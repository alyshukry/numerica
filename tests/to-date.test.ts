import { describe, it, expect } from 'vitest'
import { toDate } from '../src/to-date'

describe.each([
    [new Date('2025-11-09T00:00:00Z'), '09/11/2025'],
    [new Date('2000-01-01T00:00:00Z'), '01/01/2000'],
])('toDate() - formatter', (date, expected) => {
    it(`should format date-object '${date.toISOString()}' to string "${expected}"`, () => {
        expect(toDate({ date })).toBe(expected)
    })
})
