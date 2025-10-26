/**
 * Converts a number to its written word representation.
 *
 * @param n - The number to convert to roman numerals. Will error if n is less than 1 or greater than 3999.
 *
 * @returns The number spelled out in roman numerals
 *
 * @example
 * toRoman(42)                          // "XLII"
 * toRoman(105)                         // "CV"
 * toRoman(1234)                        // "MCCXXXIV"
 */

const romanNumerals: Record<string, number> = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
}

export function toRoman(n: number): string {
    if (n <= 0 || n >= 4000 || !Number.isInteger(n)) {
        throw new RangeError('Input must be an integer between 1 and 3999')
    }

    let result: string = ''

    for (const key in romanNumerals) {
        const count = n / romanNumerals[key]
        if (count > 0) {
            result += key.repeat(Math.floor(count))
            n = n % romanNumerals[key]
        }
    }

    return result
}