/**
 * Converts a number from one base to another base.
 * 
 * @param n - The number to convert (as a number or string)
 * @param to - The target base to convert to (2-62)
 * @param from - The source base of the input number (default: 10)
 * 
 * @returns The number represented in the target base as a string
 * 
 * @throws {Error} If the base exceeds 62 or if invalid characters are found
 * 
 * @example
 * toBase(255, 16)           // "FF" (decimal to hexadecimal)
 * toBase(255, 2)            // "11111111" (decimal to binary)
 * toBase('FF', 10, 16)      // "255" (hexadecimal to decimal)
 * toBase('1010', 10, 2)     // "10" (binary to decimal)
 * toBase(100, 36)           // "2S" (decimal to base-36)
 * toBase(-42, 16)           // "-2A" (negative numbers supported)
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