/**
 * Converts a number from one base to another.
 *
 * Supports bases up to 62, using digits, uppercase letters, and lowercase letters as symbols.
 * Throws an error if the number includes invalid characters for the given base.
 *
 * @param {number | string} n - The number to convert. Can be provided as a numeric value or string.
 * @param {number} to - The target base to convert to (e.g., 2 for binary, 16 for hexadecimal).
 * @param {number} [from=10] - The original base of the input number. Defaults to base 10.
 * @returns {string} The number represented in the target base.
 *
 * @throws {Error} Throws an error if the base exceeds 62 or if the number contains invalid digits.
 *
 * @example
 * toBase("1010", 10, 2)
 * // Returns: "10"
 *
 * @example
 * toBase(255, 16)
 * // Returns: "FF"
 *
 * @example
 * toBase("FF", 10, 16)
 * // Returns: "255"
 *
 * @example
 * toBase("100", 36, 10)
 * // Returns: "2S"
 */
export function toBase(n: number | string, to: number, from: number = 10): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (to > chars.length || from > chars.length) throw new Error(`Largest base supported is ${chars.length}.`)

    const isNegative = n.toString().startsWith('-') // Check if the user input a negative number
    const digits = n.toString().replace(/^-/, '').split('') // Turn the number into an array of chars and remove the negative dash


    // Validate digits
    for (const d of digits) {
        const idx = chars.indexOf(d)
        if (idx === -1) throw new Error(`Invalid character '${d}' in number.`)
        if (idx >= from) throw new Error(`Digit '${d}' not valid in base ${from}.`)
    }

    // Convert input to base 10
    const b10 = digits
        .map((d) => chars.indexOf(d))
        .map((d, i) => d * (from ** (digits.length - 1 - i)))
        .reduce((sum, val) => sum + val, 0)

    // Convert base 10 to target base
    let dividend = b10
    const result: string[] = []

    // Get remainders
    while (dividend > 0) {
        const remainder = dividend % to
        result.unshift(chars[remainder])
        dividend = Math.floor(dividend / to)
    }

    if (isNegative) result.unshift('-')

    return result.join('') || '0'
}