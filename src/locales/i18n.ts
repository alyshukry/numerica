import en from "./en.json"

const locales: Record<string, any> = { en, }

export type Locale = typeof en
export let locale = en

export function setLocale(loc: string) {
    if (locales[loc]) locale = locales[loc]
    else throw new Error(`Locale '${loc}' not found.`)
}

export function getLocale(): Locale {
    return locale
}