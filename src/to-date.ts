import { getLocale, LocaleKey, toLocaleDigits } from './locales/i18n'
import { toOrdinal } from './to-ordinal'

interface Options {
    locale?: LocaleKey,
    format?: string,
    timezone?: string,
    grammar?: Record<string, string>,
}

const TOKENS = [
    'YYYY', // 4-digit year
    'YY',   // 2-digit year
    'MMMM', // month in words
    'MMM',  // month in short words
    'MM',   // 2-digit month
    'M',    // 1-digit month
    'DDDD', // day in words
    'DDD',  // day in short words
    'DD',   // 2-digit day
    'Do',   // day in ordinal
    'D',    // 1-digit day
    'HH',   // 2-digit hour
    'H',    // 1-digit hour
    'mm',   // 2-digit minute
    'm',    // 1-digit minute
    'ss',   // 2-digit second
    's',    // 1-digit second
]

/**
 * Formats a Date object into a localized string representation.
 * 
 * @param date - The Date object to format
 * @param options - Configuration options
 * @param options.locale - The locale/language to use for formatting (e.g., "en", "de", "ar")
 * @param options.format - The format pattern or preset ("short", "medium", "long", "full", or custom pattern)
 * @param options.timezone - The timezone to use (default: "UTC+0")
 * 
 * @returns The formatted date string according to the specified locale and format
 * 
 * @remarks
 * Supported format tokens:
 * - `YYYY` - 4-digit year
 * - `YY` - 2-digit year
 * - `MMMM` - Full month name
 * - `MMM` - Short month name
 * - `MM` - 2-digit month (01-12)
 * - `M` - 1-digit month (1-12)
 * - `DDDD` - Full weekday name
 * - `DDD` - Short weekday name
 * - `DD` - 2-digit day (01-31)
 * - `D` - 1-digit day (1-31)
 * - `Do` - Day with ordinal suffix (1st, 2nd, 3rd)
 * - `HH` - 2-digit hour (00-23)
 * - `H` - 1-digit hour (0-23)
 * - `mm` - 2-digit minute (00-59)
 * - `m` - 1-digit minute (0-59)
 * - `ss` - 2-digit second (00-59)
 * - `s` - 1-digit second (0-59)
 * 
 * @example
 * toDate(new Date()) // Uses default locale and short format
 * toDate(new Date(), {locale: "de"}) // "12.11.2025" (German format)
 * toDate(new Date(), {format: "YYYY-MM-DD"}) // "2025-11-12" (ISO format)
 * toDate(new Date(), {locale: "en", format: "DDDD, MMMM Do, YYYY"}) // "Wednesday, November 12th, 2025"
 * toDate(new Date(), {locale: "ar", format: "DD/MM/YYYY HH:mm"}) // "١٢/١١/٢٠٢٥ ١٤:٣٠" (Arabic numerals)
 * toDate(new Date(), {format: "long"}) // Uses locale's predefined long format
 */
export function toDate(
    date: Date,
    {
        locale = getLocale().key,
        format = getLocale(locale).object.date.format.short,
        timezone = 'local',
        grammar = {
            gender: "masc"
        }

    }: Options = {}): string {

    switch (format) {
        case 'short':
            format = getLocale(locale).object.date.format.short
            break
        case 'medium':
            format = getLocale(locale).object.date.format.medium
            break
        case 'long':
            format = getLocale(locale).object.date.format.long
            break
        case 'full':
            format = getLocale(locale).object.date.format.full
            break
    }

    type TokenItem = { token: string, escaped?: boolean }
    const tokens: TokenItem[] = []

    let i = 0
    while (i < format.length) {
        if (format[i] === '\\') {
            const nextToken = TOKENS.find(t => format.startsWith(t, i + 1))
            if (nextToken) {
                tokens.push({ token: nextToken, escaped: true })
                i += 1 + nextToken.length
            } else {
                tokens.push({ token: format[i + 1], escaped: true })
                i += 2
            }
            continue
        }

        const t = TOKENS.find(t => format.startsWith(t, i))
        if (t) {
            tokens.push({ token: t })
            i += t.length
        } else {
            tokens.push({ token: format[i] })
            i++
        }
    }

    function pad(num: string, length: number, locale: LocaleKey): string {
        const zero = getLocale(locale).object.digits[0]
        while (num.length < length) num = zero + num
        return num
    }

    const tokenMap: Record<string, (date: Date) => string> = {
        'YYYY': (d) => pad(toLocaleDigits(getLocale(locale).key, d.getFullYear()), 4, getLocale(locale).key),
        'YY': (d) => pad(toLocaleDigits(getLocale(locale).key, d.getFullYear() % 100), 2, getLocale(locale).key),

        'MMMM': (d) => getLocale(locale).object.date.names.months[d.getMonth()],
        'MMM': (d) => getLocale(locale).object.date.names.short_months[d.getMonth()],
        'MM': (d) => pad(toLocaleDigits(getLocale(locale).key, d.getMonth() + 1), 2, getLocale(locale).key),
        'M': (d) => toLocaleDigits(getLocale(locale).key, d.getMonth() + 1),

        'DDDD': (d) => getLocale(locale).object.date.names.weekdays[d.getDay()],
        'DDD': (d) => getLocale(locale).object.date.names.short_weekdays[d.getDay()],
        'DD': (d) => pad(toLocaleDigits(getLocale(locale).key, d.getDate()), 2, getLocale(locale).key),
        'D': (d) => toLocaleDigits(getLocale(locale).key, d.getDate()),
        'Do': (d) => {
            return toOrdinal(d.getDate(), { locale: locale, grammar: { gender: grammar.gender } })
        },

        'HH': (d) => pad(toLocaleDigits(getLocale(locale).key, d.getHours()), 2, getLocale(locale).key),
        'H': (d) => toLocaleDigits(getLocale(locale).key, d.getHours()),

        'mm': (d) => pad(toLocaleDigits(getLocale(locale).key, d.getMinutes()), 2, getLocale(locale).key),
        'm': (d) => toLocaleDigits(getLocale(locale).key, d.getMinutes()),

        'ss': (d) => pad(toLocaleDigits(getLocale(locale).key, d.getSeconds()), 2, getLocale(locale).key),
        's': (d) => toLocaleDigits(getLocale(locale).key, d.getSeconds()),
    }

    const string = tokens
        .map(({ token, escaped }) => escaped ? token : (tokenMap[token]?.(date) ?? token))
        .join('')

    return string
}