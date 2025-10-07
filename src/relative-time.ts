const UNITS = [
    { ms: 1000 * 60 * 60 * 24 * 365, name: "year", abb: "y" },
    { ms: 1000 * 60 * 60 * 24 * 30, name: "month", abb: "mo" },
    { ms: 1000 * 60 * 60 * 24 * 7, name: "week", abb: "w" },
    { ms: 1000 * 60 * 60 * 24, name: "day", abb: "d" },
    { ms: 1000 * 60 * 60, name: "hour", abb: "h" },
    { ms: 1000 * 60, name: "minute", abb: "min" },
    { ms: 1000, name: "second", abb: "s" }
]

interface Options {
    now?: Date,
    lod?: number,
    separator?: string,
    abbreviate?: boolean,
    includeSuffix?: boolean
}

export function relativeTime(
    date: Date,
    {
        now = new Date(),
        lod = 1,
        separator = ", ",
        abbreviate = false,
        includeSuffix = true

    }: Options = {}): string {
        
    const time = date.getTime() - now.getTime()
    const timeVal = Math.abs(time)

    if (timeVal < 1000) return "just now"

    let words: string[] = []
    let t = timeVal
    let unitsUsed = 0
    for (const u of UNITS) {
        if (unitsUsed >= lod) break

        if (t >= u.ms) {
            unitsUsed++
            const val = Math.floor(t / u.ms)

            words.push(
                val + (
                    abbreviate
                        ? u.abb
                        : " " + u.name + (val > 1 ? "s" : "")
                )
            )
            t -= val * u.ms
        }
    }

    let string = words.join(separator)
    if (includeSuffix) time < 0 ? string += " ago" : string = `in ${string}`

    return string
}