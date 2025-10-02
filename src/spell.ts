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

function spell(n: number, hyphens: boolean = false, and: boolean = false, separator: string = " "): string {
    if (n === 0) return "zero"
    let string: string[] = []

    let i = -1
    while (n > 0) {
        i++

        // Convert chunk into a three digit word
        let chunk = n % 1000
        let wordChunk: string = ""
        if (chunk > 0) {
            let words: string[] = []

            if (chunk >= 100) {
                words.push(ONES[Math.floor(chunk / 100)] + (and ? `${separator}hundred${separator}and` : `${separator}hundred`))
                chunk %= 100
            }
            if (chunk >= 20) {
                let tens = TENS[Math.floor(chunk / 10)]
                let ones = chunk % 10 > 0 ? (hyphens ? "-" : separator) + ONES[chunk % 10] : ""
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

    return (
        string
            .reverse()
            .join(separator)
    )
}

export default spell