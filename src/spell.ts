const ONES = [
    "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"
]
const TEENS = [
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
    "sixteen", "seventeen", "eighteen", "nineteen"
]
const TENS = [
    "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
]
const THOUSANDS = [
    "", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion"
]

/**
 * Converts a number into its written word representation
 * 
 * @param n - The number to convert (must be a non-negative integer)
 * @param hyphens - Whether to use hyphens between tens and ones (e.g., "twenty-one" vs "twenty one"). Default: false
 * @param and - Whether to include "and" after hundreds (e.g., "one hundred and twenty" vs "one hundred twenty"). Default: false
 * @param separator - The separator to use between words. Default: " " (space)
 * @returns The number spelled out as words
 * 
 * @example
 * Basic usage
 * ```ts
 * spell(42)
 * // Returns: "forty two"
 * ```
 * 
 * @example
 * With hyphens
 * ```ts
 * spell(42, true)
 * // Returns: "forty-two"
 * ```
 * 
 * @example
 * With "and" after hundreds
 * ```ts
 * spell(123, false, true)
 * // Returns: "one hundred and twenty three"
 * ```
 * 
 * @example
 * Large numbers
 * ```ts
 * spell(1234567)
 * // Returns: "one million two hundred thirty four thousand five hundred sixty seven"
 * ```
 * 
 * @example
 * Custom separator
 * ```ts
 * spell(42, false, false, "_")
 * // Returns: "forty_two"
 * ```
 * 
 * @example
 * Zero
 * ```ts
 * spell(0)
 * // Returns: "zero"
 * ```
 */
export function spell(n: number, hyphens: boolean = false, and: boolean = false, separator: string = " "): string {
    if (n === 0) return "zero"
    let string: string[] = []

    const decimals: number[] = n.toString().includes('.') ? [...n.toString().split('.')[1]].map(Number) : []

    let i = -1
    while (n >= 1) {
        i++

        // Convert chunk into a three digit word
        let chunk = n % 1000
        let wordChunk: string = ""
        if (chunk >= 1) {
            let words: string[] = []

            if (chunk >= 100) {
                words.push(ONES[Math.floor(chunk / 100)] + (and ? `${separator}hundred${separator}and` : `${separator}hundred`))
                chunk %= 100
            }
            if (chunk >= 20) {
                let tens = TENS[Math.floor(chunk / 10)]
                let ones = chunk % 10 > 0 ? (hyphens ? "-" : separator) + ONES[Math.floor(chunk % 10)] : ""
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
        string.push("point")
        for (let i = 0; i < decimals.length; i++) string.push(ONES[decimals[i]])
    }

    return (
        string.join(separator)
    )
}

console.log(spell(123456789))