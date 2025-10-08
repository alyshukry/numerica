interface Options {
    mixed?: boolean,
    pretty?: boolean,
    symbol?: string,
    space?: string
}

/**
 * Converts a decimal number into its fractional representation.
 *
 * Supports mixed fractions, typographic fraction symbols, and custom spacing.
 * Simplifies the resulting fraction using the greatest common factor (GCF).
 *
 * @param {number} n - The decimal number to convert.
 * @param {Object} [options] - Optional formatting settings.
 * @param {boolean} [options.mixed=false] - Whether to display improper fractions as mixed numbers (e.g., `1 1/2` instead of `3/2`).
 * @param {boolean} [options.pretty=false] - Whether to use a typographic fraction slash (`⁄`) instead of a standard slash (`/`).
 * @param {string} [options.symbol=pretty ? "⁄" : "/"] - The symbol used to separate numerator and denominator.
 * @param {string} [options.space=" "] - The string used between whole and fractional parts in mixed numbers.
 * @returns {string} The simplified fractional representation of the input number.
 *
 * @example
 * toFraction(0.75)
 * // Returns: "3/4"
 *
 * @example
 * toFraction(1.25, { mixed: true })
 * // Returns: "1 1/4"
 *
 * @example
 * toFraction(2.5, { pretty: true })
 * // Returns: "5⁄2"
 *
 * @example
 * toFraction(1.333, { mixed: true, symbol: " / ", space: " " })
 * // Returns: "1 1 / 3"
 */
export function toFraction(
    n: number,
    {
        mixed = false,
        pretty = false,
        symbol = pretty ? "⁄" : "/",
        space = " "

    }: Options = {}): string {

    const str = String(n)
    if (!str.includes('.')) {
        // no decimal part
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
            (n > 1 ? "" : "-") +
            (numerator > denominator ? Math.floor(numerator / denominator) + space : "") +
            ((numerator % denominator) / gcf) +
            (symbol) +
            (denominator / gcf)
        )
        : (
            (numerator / gcf) +
            (symbol) +
            (denominator / gcf)
        );

}