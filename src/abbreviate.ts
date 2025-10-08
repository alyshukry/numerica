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
 * @param {number} [options.d=1] - Number of decimal places to include in the abbreviated output.
 * @returns {string} A compact, human-readable representation of the number.
 *
 * @example
 * abbreviate(1500)
 * // Returns: "1.5k"
 *
 * @example
 * abbreviate(2500000, { d: 2 })
 * // Returns: "2.50m"
 *
 * @example
 * abbreviate(987654321)
 * // Returns: "987.7m"
 *
 * @example
 * abbreviate(1000000000000)
 * // Returns: "1t"
 */
export function abbreviate(
    n: number,
    {
        d = 1

    }: Options = {}): string {
        
    // Get the number of digits
    const digits = n.toString().length
    // Get how many 000's are before the first number
    const suffixIndex = Math.floor((digits - 1) / 3)
    // Get the multiple of the suffix
    const number = (n / (1000 ** (suffixIndex))).toFixed(d)

    const suffixes = [
        "", "k", "m", "b", "t", // Reliable suffixes
        "qa", "qi", "sx", "sp", "oc", "no", "dc"
    ]

    const string = number + suffixes[suffixIndex]

    return string
}