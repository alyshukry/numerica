import en from './en.json'

export type Locale = typeof en
type LocaleKey = 'en' // Add more as needed: 'en' | 'es' | 'fr'

const locales: Record<LocaleKey, Locale> = { en }
let currentLocale: Locale = en

export function setLocale(loc: string) {
    if (loc in locales) {
        currentLocale = locales[loc as LocaleKey]
    } else {
        throw new Error(`Locale '${loc}' not found.`)
    }
}

export function getLocale(): Locale {
    return currentLocale
}