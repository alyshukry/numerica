interface Options {
    decimals?: number,
    trim?: boolean
}

/**
 * Converts a number to an abbreviated string format with suffixes like 'k', 'm', 'b', etc.
 * 
 * @param n - The number to abbreviate
 * @param options - Configuration options
 * @param options.decimals - Number of decimal places to display (default: 1)
 * @param options.trim - Whether to display trailing zeros (default: true)
 * 
 * @returns The abbreviated number as a string
 * 
 * @example
 * toAbbreviated(1500)           // "1.5k"
 * toAbbreviated(2500000)        // "2.5m"
 * toAbbreviated(1000000, {decimals: 2, trim: true}) // "1m"
 * toAbbreviated(1000000, {decimals: 2, trim: false}) // "1.00m"
 * toAbbreviated(1234567, {decimals: 0}) // "1m"
 * toAbbreviated(500)            // "500"
 * toAbbreviated(-3400)          // "-3.4k"
 */
export function toAbbreviated(
    n: number,
    {
        decimals = 1,
        trim = true,

    }: Options = {}): string {

    const suffixes = [
        '', 'k', 'm', 'b', 't', // Reliable suffixes
        'qa', 'qi',
    ]

    // Handle invalid numbers
    if (!isFinite(n) || Number.isNaN(n)) {
        return String(n)
    }

    const sign = n < 0 ? '-' : ''
    const abs = Math.abs(n)

    // If number is small, don't abbreviate but still respect the 'd' chosen
    if (abs < 1000) {
        // If integer, return without decimals
        if (Number.isInteger(abs)) {
            return sign + String(abs)
        }
        // Else, format to 'd' decimals then remove trailing zeros if enabled
        let number = abs.toFixed(decimals)
        if (trim) number = number.replace(/\.?0+$/, '')
        return sign + number
    }

    // Get the amount of '000's in the number
    const index = Math.min(Math.floor(Math.log10(abs) / 3), suffixes.length - 1) // Using log10() gets how many digits before first one. Also make sure to not exceed the arrays length

    const value = abs / (1000 ** index)
    // Format with 'd' decimals, then trim trailing zeros
    let string = value.toFixed(decimals)
    if (trim) string = string.replace(/\.?0+$/, '')

    return sign + string + suffixes[index]
}

console.log(toAbbreviated(1000000, { decimals: 2, trim: true }))