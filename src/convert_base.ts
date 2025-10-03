export function convertBase(n: number | string, to: number, from: number = 10): string {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (to > chars.length || from > chars.length) throw new Error(`Largest base supported is ${chars.length}.`)

    const digits = n.toString().split('')

    // Validate digits
    for (const d of digits) {
        const idx = chars.indexOf(d)
        if (idx === -1) throw new Error(`Invalid character '${d}' in number.`)
        if (idx >= from) throw new Error(`Digit '${d}' not valid in base ${from}.`)
    }

    // Convert input to base 10
    const b10 = digits
        .map((d) => chars.indexOf(d))
        .map((d, i) => d * (from ** (digits.length - 1 - i)))
        .reduce((sum, val) => sum + val, 0)

    // Convert base 10 to target base
    let dividend = b10
    let result: string[] = []

    // Get remainders
    while (dividend > 0) {
        const remainder = dividend % to
        result.unshift(chars[remainder])
        dividend = Math.floor(dividend / to)
    }

    return result.join('') || "0"
}