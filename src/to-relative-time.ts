const UNITS = [
    { ms: 1000 * 60 * 60 * 24 * 365, name: 'year', abb: 'y' },
    { ms: 1000 * 60 * 60 * 24 * 30, name: 'month', abb: 'mo' },
    { ms: 1000 * 60 * 60 * 24 * 7, name: 'week', abb: 'w' },
    { ms: 1000 * 60 * 60 * 24, name: 'day', abb: 'd' },
    { ms: 1000 * 60 * 60, name: 'hour', abb: 'h' },
    { ms: 1000 * 60, name: 'minute', abb: 'min' },
    { ms: 1000, name: 'second', abb: 's' },
]

interface Options {
    now?: Date,
    lod?: number,
    separator?: string,
    abbreviate?: boolean,
    includeSuffix?: boolean
}

/**
 * Converts a date to a human-readable relative time string.
 * 
 * @param date - The date to convert to relative time
 * @param options - Configuration options
 * @param options.now - Reference date for comparison (default: current date/time)
 * @param options.lod - Level of detail, number of time units to show (default: 1)
 * @param options.separator - Separator between time units (default: ", ")
 * @param options.abbreviate - Use short forms like "5h" instead of "5 hours" (default: false)
 * @param options.includeSuffix - Add "ago" or "in" to the result (default: true)
 * 
 * @returns The relative time as a human-readable string
 * 
 * @example
 * // Assuming now is Jan 1, 2024, 12:00 PM
 * toRelativeTime(new Date('2024-01-01T10:00'))     // "2 hours ago"
 * toRelativeTime(new Date('2024-01-03T12:00'))     // "in 2 days"
 * toRelativeTime(new Date('2024-01-01T11:58'))     // "just now"
 * 
 * // With level of detail = 2
 * toRelativeTime(new Date('2023-12-30T10:00'), {lod: 2})
 * // "2 days, 2 hours ago"
 * 
 * // Abbreviated format
 * toRelativeTime(new Date('2024-01-03T14:30'), {abbreviate: true})
 * // "in 2d"
 * 
 * // Without suffix
 * toRelativeTime(new Date('2024-01-01T10:00'), {includeSuffix: false})
 * // "2 hours"
 */
export function toRelativeTime(
    date: Date,
    {
        now = new Date(),
        lod = 1,
        separator = ', ',
        abbreviate = false,
        includeSuffix = true,

    }: Options = {}): string {

    const time = date.getTime() - now.getTime()
    const timeVal = Math.abs(time)

    if (timeVal <= 1500) return 'just now'

    const words: string[] = []
    let t = timeVal
    let unitsUsed = 0

    for (const [, u] of UNITS.entries()) {
        if (unitsUsed >= lod) break

        const rawVal = t / u.ms
        
        // Round to nearest integer
        const val = Math.round(rawVal)

        // Only use this unit if we have at least 0.5 of it (which rounds to 1)
        if (val >= 1) {
            unitsUsed++

            words.push(
                val +
                (abbreviate
                    ? u.abb
                    : ' ' + u.name + (val > 1 ? 's' : '')),
            )

            // Subtract the rounded value to get remainder
            t = Math.abs(t - val * u.ms)
        }
    }

    let string = words.join(separator)

    if (includeSuffix) {
        if (time < 0) {
            string += ' ago'
        } else {
            string = `in ${string}`
        }
    }

    return string
}

console.log(toRelativeTime(new Date(Date.now()), {}))