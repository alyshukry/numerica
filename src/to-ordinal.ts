import { getLocale, LocaleKey, toLocaleDigits } from './locales/i18n'

interface Options {
    locale?: LocaleKey,
    grammar?: Record<string, string>
}

/**
 * Converts a number to its localized ordinal representation (e.g., "1st", "2nd", "3rd").
 * 
 * @param n - The number to convert to an ordinal
 * @param options - Configuration options
 * @param options.locale - The locale/language to use for the ordinal (default: current locale)
 * @param options.grammar - Grammatical options for languages with gendered ordinals
 * @param options.grammar.gender - The gender to use for the ordinal ("masc", "fem", etc.; default: "masc")
 * 
 * @returns The number as a localized ordinal string
 * 
 * @remarks
 * Supports three types of ordinal formatting depending on the locale:
 * - `fixed`: a single value added as a prefix or suffix (e.g., French "n°1")
 * - `gendered`: different values depending on grammatical gender
 * - `rules`: values determined by modular arithmetic rules for the number
 * 
 * @example
 * toOrdinal(1) // "1st" (default locale: English US)
 * toOrdinal(2, { locale: "es", grammar: { gender: "fem" } }) // "2ª" (Spanish)
 * toOrdinal(3, { locale: "de" }) // "3." (German)
 * toOrdinal(4, { locale: "ar" }) // "٤º" (Arabic)
 */
export function toOrdinal(
    n: number,
    {
        locale = getLocale().key,
        grammar = {
            gender: 'masc'
        }

    }: Options = {}): string {

    const ordinalObj = getLocale(locale).object.number.ordinal
    const numStr = `${toLocaleDigits(locale, n)}`

    if (ordinalObj.type === 'fixed' && !ordinalObj.gender) {
        return ordinalObj.position === 'prefix' ? ordinalObj.value + numStr : numStr + ordinalObj.value
    }

    const isFeminine = ['fem', 'f', 'feminine'].includes(grammar.gender.toLowerCase())
    const isMasculine = ['masc', 'm', 'masculine'].includes(grammar.gender.toLowerCase())

    if (ordinalObj.gender && ordinalObj.type !== 'rules') {
        const genderValue =
            isFeminine
                ? ordinalObj.gender.fem
                : isMasculine
                    ? ordinalObj.gender.masc
                    : ''
        return ordinalObj.position === 'prefix' ? genderValue + numStr : numStr + genderValue
    }

    if (ordinalObj.type === 'rules') {
        let ordinal: string | undefined
        for (const rule of ordinalObj.rules!) {
            const mod = n % rule.mod
            ordinal = rule.values[mod] ?? rule.default
            if (ordinal) break
        }
        return ordinalObj.position === 'prefix' ? ordinal + numStr : numStr + ordinal
    }

    return numStr // fallback
}