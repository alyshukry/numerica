const ONES = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
]
const TEENS = [
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
    'sixteen', 'seventeen', 'eighteen', 'nineteen',
]
const TENS = [
    '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety',
]
const THOUSANDS = [
    '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion',
]

interface Options {
    hyphens?: boolean,
    and?: boolean,
    separator?: string
}

/**
 * Converts a number into its English words representation.
 *
 * This function handles both integer and decimal parts of the number.
 * It supports optional formatting for hyphens between tens and ones, 
 * inclusion of "and" in hundreds, and a custom separator between words.
 *
 * @param {number} n - The number to convert. Can be an integer or float.
 * @param {Object} [options] - Optional settings for formatting.
 * @param {boolean} [options.hyphens=false] - Whether to include hyphens between tens and ones (e.g., "twenty-one").
 * @param {boolean} [options.and=false] - Whether to include "and" after hundreds (e.g., "one hundred and twenty").
 * @param {string} [options.separator=" "] - The string used to separate words in the output.
 * @returns {string} The English words representation of the number.
 *
 * @example
 * spell(123) 
 * // Returns: "one hundred twenty three"
 *
 * @example
 * spell(123, { and: true }) 
 * // Returns: "one hundred and twenty three"
 *
 * @example
 * spell(45.67, { hyphens: true }) 
 * // Returns: "forty-five point six seven"
 *
 * @example
 * spell(1001, { separator: "-" }) 
 * // Returns: "one-thousand-one"
 */
export function spell(
    n: number,
    {
        hyphens = false,
        and = false,
        separator = ' ',

    }: Options = {}): string {

    if (n === 0) return 'zero'
    let string: string[] = []

    const decimals: number[] = n.toString().includes('.') ? [...n.toString().split('.')[1]].map(Number) : []

    let i = -1
    while (n >= 1) {
        i++

        // Convert chunk into a three digit word
        let chunk = n % 1000
        let wordChunk: string = ''
        if (chunk >= 1) {
            const words: string[] = []

            if (chunk >= 100) {
                words.push(ONES[Math.floor(chunk / 100)] + (and ? `${separator}hundred${separator}and` : `${separator}hundred`))
                chunk %= 100
            }
            if (chunk >= 20) {
                const tens = TENS[Math.floor(chunk / 10)]
                const ones = chunk % 10 > 0 ? (hyphens ? '-' : separator) + ONES[Math.floor(chunk % 10)] : ''
                words.push(tens + ones)
            }
            else if (chunk >= 10) words.push(TEENS[chunk - 10])
            else if (chunk > 0) words.push(ONES[chunk])

            wordChunk = words.join(separator)
        }
        wordChunk += i > 0 ? separator + THOUSANDS[i] : THOUSANDS[i]

        string.push(wordChunk)

        n = Math.floor(n / 1000)
    }

    string = string.reverse()

    // Handling decimals
    if (decimals.length > 0) {
        string.push('point')
        for (let i = 0; i < decimals.length; i++) string.push(ONES[decimals[i]])
    }

    return (
        string.join(separator)
    )
}

console.log(spell(101, { and: true }))