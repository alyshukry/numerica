interface Options {
    mixed?: boolean,
    pretty?: boolean,
    symbol?: string,
    space?: string
}

/**
 * Converts a decimal number to its simplified fraction representation.
 * 
 * @param n - The decimal number to convert to a fraction
 * @param options - Configuration options
 * @param options.mixed - Display as a mixed number (default: false)
 * @param options.pretty - Use Unicode fraction slash (⁄) (default: false)
 * @param options.symbol - Custom fraction symbol (default: "/" or "⁄" if pretty)
 * @param options.space - Space character between whole and fractional parts (default: " ")
 * 
 * @returns The fraction as a string
 * 
 * @example
 * toFraction(0.5)                    // "1/2"
 * toFraction(2.5)                    // "5/2"
 * toFraction(2.5, {mixed: true})     // "2 1/2"
 * toFraction(0.75, {pretty: true})   // "3⁄4"
 * toFraction(0.333)                  // "333/1000"
 * toFraction(-1.25, {mixed: true})   // "-1 1/4"
 */
export function toFraction(
    n: number,
    {
        mixed = false,
        pretty = false,
        symbol = pretty ? '⁄' : '/',
        space = ' ',

    }: Options = {}): string {

    const str = String(n)
    if (!str.includes('.')) {
        // No decimal part
        return `${n}/1`
    }

    const [intPart, fracPart] = str.split('.')
    const denominator = 10 ** fracPart.length
    const numerator = Math.abs(Number(intPart + fracPart))

    function getGreatestCommonFactor(a: number, b: number): number {
        let R
        while ((a % b) > 0) {
            R = a % b
            a = b
            b = R
        }
        return b
    }

    const gcf = getGreatestCommonFactor(numerator, denominator)

    return mixed
        ? (
            (n > 0 ? '' : '-') +
            (numerator > denominator ? Math.floor(numerator / denominator) + space : '') +
            ((numerator % denominator) / gcf) +
            (symbol) +
            (denominator / gcf)
        )
        : (
            (n > 0 ? '' : '-') +
            (numerator / gcf) +
            (symbol) +
            (denominator / gcf)
        )

}