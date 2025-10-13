interface Options {
    d?: number
}

/**
 * Abbreviates large numbers using standard metric-style suffixes (e.g., `k`, `m`, `b`, `t`).
 *
 * Useful for displaying large values in a compact and readable form, such as for
 * social media stats, monetary values, or data counts.
 *
 * @param {number} n - The number to abbreviate.
 * @param {Object} [options] - Optional formatting settings.
 * @param {number} [options.d=1] - Number of decimal places to include in the abbreviated output. (Trailing zeros are removed)
 * @returns {string} A compact, human-readable representation of the number.
 *
 * @example
 * toAbbreviated(1500)
 * // Returns: "1.5k"
 *
 * @example
 * toAbbreviated(2500000, { d: 2 })
 * // Returns: "2.5m" (trailing zeros are removed)
 *
 * @example
 * toAbbreviated(987654321)
 * // Returns: "987.7m"
 *
 * @example
 * toAbbreviated(1000000000000)
 * // Returns: "1t"
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