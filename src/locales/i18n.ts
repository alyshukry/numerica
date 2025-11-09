import ar from './ar.json'
import de from './de.json'
import en_gb from './en-GB.json'
import en_us from './en-US.json'

export type LocaleKey = 'en-us' | 'en-US' | 'en-gb' | 'en-GB' | 'de' | 'ar'
type NormalizedLocale = 'en-us' | 'en-gb' | 'de' | 'ar'
export type Locale = typeof en_us

export const locales: Record<NormalizedLocale, Locale> = {
    'en-us': en_us,
    'en-gb': en_gb,
    'de': de,
    'ar': ar
}

let currentLocaleKey: NormalizedLocale = 'en-us'

function normalizeLocaleKey(key?: string): NormalizedLocale {
    if (!key) return currentLocaleKey
    const lower = key.toLowerCase().replace('_', '-')
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