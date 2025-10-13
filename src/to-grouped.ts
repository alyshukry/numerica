interface Options {
    char?: string,
    segment?: number
}

/**
 * Inserts a separator character into a number for improved readability.
 *
 * This function groups digits in the integer part of a number into segments
 * (such as thousands) and optionally preserves decimal parts. Useful for 
 * formatting large numbers like `1000000` into `1,000,000`.
 *
 * @param {number} n - The number to format.
 * @param {Object} [options] - Optional formatting settings.
 * @param {string} [options.char=","] - The character used to separate digit groups.
 * @param {number} [options.segment=3] - The number of digits per group.
 * @returns {string} The formatted number string with separators applied.
 *
 * @example
 * toGrouped(1234567)
 * // Returns: "1,234,567"
 *
 * @example
 * toGrouped(1234567.89)
 * // Returns: "1,234,567.89"
 *
 * @example
 * toGrouped(987654321, { char: " ", segment: 3 })
 * // Returns: "987 654 321"
 *
 * @example
 * toGrouped(123456, { segment: 2, char: "_" })
 * // Returns: "1_23_45_6"
 */
export function toGrouped(
    n: number,
    {
        char = ',',
        segment = 3,

    }: Options = {}): string {

    const parts = n.toString().split('.')

    // Reverse integer part
    const reversed = parts[0].split('').reverse().join('')

    // Insert separator every `segment` digits
    const grouped = reversed.replace(
        new RegExp(`(\\d{${segment}})(?=\\d)`, 'g'),
        `$1${char}`,
    )

    // Reverse back and remove any accidental leading separator
    const escaped_char = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    parts[0] = grouped
        .split('')
        .reverse()
        .join('')
        .replace(new RegExp(`^${escaped_char}`), '')

    return parts.join('.')
}