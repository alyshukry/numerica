function abbreviate(n: number, d: number = 1): string {
    // Get the number of digits
    const digits = n.toString().length
    // Get how many 000's are before the first number
    const suffixIndex = Math.floor((digits - 1) / 3)
    // Get the multiple of the suffix
    const number = (n / (1000 ** (suffixIndex))).toFixed(d)

    const suffixes = [
        "", "k", "m", "b", "t", // Reliable suffixes
        "qa", "qi", "sx", "sp", "oc", "no", "dc"
    ]

    const string = number + suffixes[suffixIndex]

    return string
}

export default abbreviate