interface Options {
    d?: number
}

/**
 * Converts a number to an abbreviated string format with suffixes like 'k', 'm', 'b', etc.
 * 
 * @param n - The number to abbreviate
 * @param options - Configuration options
 * @param options.d - Number of decimal places to display (default: 1)
 * 
 * @returns The abbreviated number as a string
 * 
 * @example
 * toAbbreviated(1500)           // "1.5k"
 * toAbbreviated(2500000)        // "2.5m"
 * toAbbreviated(1000000, {d: 2}) // "1m" (trailing zeros removed)
 * toAbbreviated(1234567, {d: 0}) // "1m"
 * toAbbreviated(500)            // "500"
 * toAbbreviated(-3400)          // "-3.4k"
 */
export function toAbbreviated(
    n: number,
    {
        d = 1,
        
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
        // Else, format to 'd' decimals then remove trailing zeros
        return sign + (d === 0 ? String(Math.round(abs)) : abs.toFixed(d)).replace(/\.?0+$/, '')
    }

    // Get the amount of '000's in the number
    const index = Math.min(Math.floor(Math.log10(abs) / 3), suffixes.length - 1) // Using log10() gets how many digits before first one. Also make sure to not exceed the arrays length

    const value = abs / (1000 ** index)
    // Format with 'd' decimals, then trim trailing zeros
    const string = (d === 0 ? String(Math.round(value)) : value.toFixed(d)).replace(/\.?0+$/, '')

    return sign + string + suffixes[index]
}