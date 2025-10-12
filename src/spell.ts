interface Options {
    hyphens?: boolean
    and?: boolean
    separator?: string
}

const ONES = [
    '', 'one', 'two', 'three', 'four', 'five',
    'six', 'seven', 'eight', 'nine'
]
const DIGITS = [
    'zero', 'one', 'two', 'three', 'four', 'five',
    'six', 'seven', 'eight', 'nine'
]
const TEENS = [
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
    'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
]
const TENS = [
    '', '', 'twenty', 'thirty', 'forty', 'fifty',
    'sixty', 'seventy', 'eighty', 'ninety'
]
const THOUSANDS = [
    '', 'thousand', 'million', 'billion', 'trillion'
]

export function spell(
    n: number,
    {
        hyphens = false,
        and = false,
        separator = ' ',

    }: Options = {}): string {

    if (n === 0) return 'zero'

    const parts: string[] = []
    const [intStr, decStr] = n.toString().split('.')
    let intNum = Math.floor(Math.abs(Number(intStr)))

    // Preserve decimals (including leading zeros)
    const decimals = decStr ? decStr.split('').map(ch => parseInt(ch, 10)) : []

    // Handle integer part
    let i = 0
    while (intNum > 0) {
        const chunk = intNum % 1000
        if (chunk > 0) {
            const chunkWords = spellChunk(chunk, hyphens, and, separator)
            const suffix = THOUSANDS[i] ? separator + THOUSANDS[i] : ''
            parts.unshift(chunkWords + suffix)
        }
        intNum = Math.floor(intNum / 1000)
        i++
    }

    // If there was no integer part (e.g., 0.123) we still want "zero point ..."
    if (parts.length === 0 && decimals.length > 0) parts.push('zero')

    if (decimals.length > 0) {
        parts.push('point')
        for (const d of decimals) {
            // use DIGITS not ONES
            parts.push(DIGITS[d])
        }
    }

    // Add "and" between thousands and last < 100 chunk
    if (and && decimals.length === 0) {
        // Find last numeric chunk
        const lastIdx = parts.length - 1
        if (lastIdx >= 0) {
            // Detect the numerical value of last 3 digits by parsing original number
            const lastThree = Math.abs(Math.floor(Number(n)) % 1000)
            if (lastThree > 0 && lastThree < 100) {
                // Replace last part with "and <last part>"
                parts[lastIdx] = 'and' + separator + parts[lastIdx]
            }
        }
    }

    return parts.join(separator).replace(/\s+/g, ' ').trim()
}

// Converts a 3-digit chunk into words
function spellChunk(
    num: number,
    hyphens: boolean,
    and: boolean,
    separator: string

): string {

    const words: string[] = []
    const hundred = Math.floor(num / 100)
    const remainder = num % 100

    if (hundred > 0) {
        words.push(ONES[hundred] + separator + 'hundred')
        if (and && remainder > 0) words.push('and')
    }

    if (remainder >= 20) {
        const tens = Math.floor(remainder / 10)
        const ones = remainder % 10
        const joiner = ones > 0 ? (hyphens ? '-' : separator) : ''
        words.push(TENS[tens] + (ones > 0 ? joiner + ONES[ones] : ''))
    } else if (remainder >= 10) {
        words.push(TEENS[remainder - 10])
    } else if (remainder > 0) {
        words.push(ONES[remainder])
    }

    return words.join(separator)
}