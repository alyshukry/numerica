import { getLocale, LocaleKey } from "./locales/i18n"

interface Options {
    locale?: LocaleKey,
    separator?: string,
    decimal?: string,
    segment?: number | number[]
}

/**
 * Formats a number with digit grouping separators for better readability.
 * 
 * @param n - The number to format
 * @param options - Configuration options
 * @param options.locale - Which language to output
 * @param options.separator - The separator character
 * @param options.decimal - The decimal separator character
 * @param options.segment - Number of digits per group
 * 
 * @returns The formatted number as a string with separators
 * 
 * @example
 * toGrouped(1000000) // "1,000,000"
 * toGrouped(1234.56) // "1,234.56"
 * toGrouped(1000000, {separator: '.'}) // "1.000.000" (European format)
 * toGrouped(1000000, {separator: ' ', locale: 'ar'}) // "١ ٠٠٠ ٠٠٠"
 * toGrouped(12345678, {segment: 4}) // "1234,5678" (custom grouping)
 * toGrouped(12345678, {segment: [3, 2]}) // "1,23,45,678" (Indian numbering)
 */
export function toGrouped(
    n: number,
    {
        locale = getLocale().key,
        separator = getLocale(locale).object.number.separator,
        decimal = getLocale(locale).object.number.decimal,
        segment = getLocale(locale).object.number.grouping,

    }: Options = {}): string {

    if (n === Infinity) return getLocale(locale).object.number.infinity
    if (n === -Infinity) return getLocale(locale).object.number.negative_sign + getLocale(locale).object.number.infinity

    const isNegative = n < 0
    const parts = n.toString().replace('-', '').split('.')

    segment = Array.isArray(segment) ? segment : [segment]

    // Reverse integer part
    const reversed = parts[0].split('').reverse()

    const string: string[] = []
    const loops = reversed.length // Copying the reversed number's size onto 'loops', since the 'reversed' array is getting spliced
    for (let i = 0; i < loops; i++) {
        if (reversed.length === 0) break

        const currentSegment = i < segment.length ? segment[i] : segment[segment.length - 1]

        string.push(reversed.slice(0, currentSegment).map((n) => n.toString()).join(''))
        string.push(separator)

        reversed.splice(0, currentSegment)
    }

    string.pop() // Remove leading separator character

    // Localize integer part digits
    parts[0] = string
        .join('')
        .split('')
        .reverse()
        .map(d => getLocale(locale).object.digits[parseInt(d, 10)] || d)
        .join('')
    // Localize decimal part digits
    if (parts[1]) {
        parts[1] = parts[1].split('').map(d => getLocale(locale).object.digits[parseInt(d, 10)] || d).join('')
    }

    return (isNegative ? getLocale(locale).object.number.negative_sign : '') + parts.join(decimal)
}