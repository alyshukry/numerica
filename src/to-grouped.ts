interface Options {
    separator?: string,
    segment?: number
}

/**
 * Formats a number with digit grouping separators for better readability.
 * 
 * @param n - The number to format
 * @param options - Configuration options
 * @param options.separator - The separator separatoracter (default: ",")
 * @param options.segment - Number of digits per group (default: 3)
 * 
 * @returns The formatted number as a string with separators
 * 
 * @example
 * toGrouped(1000000)                    // "1,000,000"
 * toGrouped(1234.56)                    // "1,234.56"
 * toGrouped(1000000, {separator: '.'})       // "1.000.000" (European format)
 * toGrouped(1000000, {separator: ' '})       // "1 000 000"
 * toGrouped(12345678, {segment: 4})     // "1234,5678" (custom grouping)
 */
export function toGrouped(
    n: number,
    {
        separator = ',',
        segment = 3,

    }: Options = {}): string {

    const parts = n.toString().split('.')

    // Reverse integer part
    const reversed = parts[0].split('').reverse().join('')

    // Insert separator every `segment` digits
    const grouped = reversed.replace(
        new RegExp(`(\\d{${segment}})(?=\\d)`, 'g'),
        `$1${separator}`,
    )

    // Reverse back and remove any accidental leading separator
    const escapedseparator = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    parts[0] = grouped
        .split('')
        .reverse()
        .join('')
        .replace(new RegExp(`^${escapedseparator}`), '')

    return parts.join('.')
}