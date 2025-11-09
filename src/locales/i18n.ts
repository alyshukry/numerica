import ar from './ar.json'
import de from './de.json'
import en_gb from './en-GB.json'
import en_us from './en-US.json'

export type LocaleKey = 'en-us' | 'en-gb' | 'de' | 'ar'
export type Locale = typeof en_us

export const locales: Record<LocaleKey, Locale> = {
    'en-us': en_us,
    'en-gb': en_gb,
    'de': de,
    'ar': ar
}

let currentLocaleKey: LocaleKey = 'en-us'

export function setLocale(loc: LocaleKey) {
    currentLocaleKey = loc
}

export function getLocale(key: LocaleKey = currentLocaleKey): { key: LocaleKey, object: Locale } {
    return { key: key, object: locales[key] }
}