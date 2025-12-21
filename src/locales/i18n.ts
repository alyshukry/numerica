import ar from './ar.json'
import de from './de.json'
import en_gb from './en-GB.json'
import en_us from './en-US.json'
import es from './es.json'

export type LocaleKey = 'en-us' | 'en-US' | 'en-gb' | 'en-GB' | 'de' | 'ar' | 'es'
type NormalizedLocale = 'en-us' | 'en-gb' | 'de' | 'ar' | 'es'

export type Locale = {
    name: string
    language: string
    direction: "ltr" | "rtl"
    digits: string[]
    number: {
        grouping: number
        separator: string
        decimal: string
        negative_sign: string
        infinity: string
        nan: string
        ordinal: {
            position: "prefix" | "suffix",
            type: "fixed" | "rules",
            value?: string, // when 'type' is 'fixed' and 'gender' doesn't exist
            rules?: {
                mod: number
                values: Record<string, string>
                default?: string
            }[]
            gender?: {
                fem: string,
                masc: string
            }
        }
    }
    currency: {
        symbol: string
        position: "prefix" | "suffix"
        spacing: boolean
    }
    date: {
        names: {
            weekdays: string[]
            short_weekdays: string[]
            months: string[]
            short_months: string[]
        }
        format: {
            short: string
            medium: string
            long: string
            full: string
        }
    }
}

export const locales: Record<NormalizedLocale, Locale> = {
    'es': es as unknown as Locale,
    'en-us': en_us as unknown as Locale,
    'en-gb': en_gb as unknown as Locale,
    'de': de as unknown as Locale,
    'ar': ar as unknown as Locale,
}

let currentLocaleKey: NormalizedLocale = 'en-us'

function normalizeLocaleKey(key?: string): NormalizedLocale {
    if (!key) return currentLocaleKey
    const lower = key.toLowerCase().replace('_', '-')
    if (lower === 'es' || lower === 'es') return 'es'
    if (lower === 'en-us' || lower === 'en_us') return 'en-us'
    if (lower === 'en-gb' || lower === 'en_gb') return 'en-gb'
    if (lower === 'de') return 'de'
    if (lower === 'ar') return 'ar'
    // unknown -> fallback to current
    return currentLocaleKey
}

export function setLocale(loc: LocaleKey | string) {
    currentLocaleKey = normalizeLocaleKey(loc)
}

export function getLocale(key: LocaleKey | string = currentLocaleKey): { key: NormalizedLocale, object: Locale } {
    const normalized = normalizeLocaleKey(key)
    return { key: normalized, object: locales[normalized] }
}

export function toLocaleDigits(key: LocaleKey | string = currentLocaleKey, n: number): string {
    const digits = getLocale(key).object.digits
    return n.toString().replace(/\d/g, (d) => digits[+d])
}