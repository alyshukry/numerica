interface Options {
    from?: number,
    precision?: number,
}

/**
 * Converts a number from one base to another base (supports fractional and negative numbers).
 * 
 * @param {number | string} n - The number to convert. Can be a numeric value or string
 * @param {number} to - The target base to convert to (e.g., 2 for binary, 16 for hexadecimal)
 * @param {Options} [options] - Configuration options
 * @param {number} [options.from=10] - The original base of the input number. Defaults to base 10
 * @param {number} [options.precision=8] - The maximum number of digits to include after the decimal point when converting fractional values
 * 
 * @returns {string} The number represented in the target base
 * 
 * @throws {Error} Throws an error if the base exceeds 62 or if the number contains invalid digits
 * 
 * @example
 * // Integer conversions
 * toBase(255, 16)                        // "FF"   (decimal to hexadecimal)
 * toBase(255, 2)                         // "11111111" (decimal to binary)
 * toBase('FF', 10, { from: 16 })         // "255"  (hexadecimal to decimal)
 * toBase('1010', 10, { from: 2 })        // "10"   (binary to decimal)
 * toBase(100, 36)                        // "2S"   (decimal to base-36)
 * toBase(-42, 16)                        // "-2A"  (negative numbers supported)
 * 
 * // Fractional conversions
 * toBase(10.5, 16)                       // "A.8"  (decimal to hexadecimal with fractional part)
 * toBase(10.75, 2)                       // "1010.11" (decimal to binary with fractional part)
 * toBase('A.8', 10, { from: 16 })        // "10.5" (hexadecimal with fraction to decimal)
 * toBase('-2A.4', 10, { from: 16 })      // "-42.25" (negative fractional conversion)
 */
export function toBase(
    n: number | string,
    to: number,
    {
        from = 10,
        precision = 8,

    }: Options = {}): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (to > chars.length || from > chars.length)
        throw new Error(`Largest base supported is ${chars.length}.`)

    const str = n.toString()
    const isNegative = str.startsWith('-')
    const [intPartStr, fracPartStr = ''] = str.replace(/^-/, '').split('.')

    const validateDigits = (digits: string, base: number) => {
        for (const d of digits) {
            const idx = chars.indexOf(d)
            if (idx === -1) throw new Error(`Invalid character '${d}' in number.`)
            if (idx >= base) throw new Error(`Digit '${d}' not valid in base ${base}.`)
        }
    }
    validateDigits(intPartStr, from)
    if (fracPartStr) validateDigits(fracPartStr, from)

    // Convert integer part to base 10
    const intPart10 = intPartStr
        .split('')
        .map((d) => chars.indexOf(d))
        .reduce((acc, val) => acc * from + val, 0)

    // Convert fractional part to base 10
    let fracPart10 = 0
    for (let i = 0; i < fracPartStr.length; i++) {
        const val = chars.indexOf(fracPartStr[i])
        fracPart10 += val / Math.pow(from, i + 1)
    }

    const num10 = intPart10 + fracPart10

    // Convert integer part from base 10 to target base
    let intPart = Math.floor(num10)
    const intResult: string[] = []
    if (intPart === 0) intResult.push('0')
    while (intPart > 0) {
        const remainder = intPart % to
        intResult.unshift(chars[remainder])
        intPart = Math.floor(intPart / to)
    }

    // Convert fractional part to target base
    let fracPart = num10 - Math.floor(num10)
    const fracResult: string[] = []
    let count = 0
    while (fracPart > 0 && count < precision) {
        fracPart *= to
        const digit = Math.floor(fracPart)
        fracResult.push(chars[digit])
        fracPart -= digit
        count++
    }

    const result =
        intResult.join('') + (fracResult.length ? '.' + fracResult.join('') : '')
    return isNegative ? '-' + result : result
}