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
 * Converts a date into a human-readable relative time string.
 *
 * This function compares a given date to the current time (or a custom reference date)
 * and expresses the difference in natural language — for example, `"3 days ago"` or `"in 2 hours"`.
 * It supports multiple levels of detail (e.g., `"1 year, 2 months"`), abbreviations, and optional suffixes.
 *
 * @param {Date} date - The target date to compare against the reference date.
 * @param {Object} [options] - Optional settings to control formatting and precision.
 * @param {Date} [options.now=new Date()] - The reference date to compare with (defaults to the current time).
 * @param {number} [options.lod=1] - Level of detail (number of time units to include).  
 * For example, `2` might produce `"1 year, 2 months"` instead of just `"1 year"`.
 * @param {string} [options.separator=", "] - String used to separate time units in the output.
 * @param {boolean} [options.abbreviate=false] - Whether to abbreviate units (e.g., `"1d"` instead of `"1 day"`).
 * @param {boolean} [options.includeSuffix=true] - Whether to include `"ago"` or `"in"` to indicate direction in time.
 * @returns {string} A human-readable string representing the relative time.
 *
 * @example
 * toRelativeTime(new Date(Date.now() - 60000))
 * // Returns: "1 minute ago"
 *
 * @example
 * toRelativeTime(new Date(Date.now() + 3600000))
 * // Returns: "in 1 hour"
 *
 * @example
 * toRelativeTime(new Date(Date.now() - 90061000), { lod: 2 })
 * // Returns: "1 day, 1 hour ago"
 *
 * @example
 * toRelativeTime(new Date(Date.now() - 90061000), { abbreviate: true, includeSuffix: false })
 * // Returns: "1d, 1h"
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