interface Options {
    mixed?: boolean,
    pretty?: boolean,
    symbol?: string,
    space?: string
}

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

console.log(toFraction(-2.336, { mixed: true, pretty: true, space: "_", symbol:"egro" }))
