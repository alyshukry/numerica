interface Options {
  date: Date;
}

/**
 * Converts a given date object to an abbreviated string format
 * @param options - Configuration Options
 * @param options.date - Params containing date object
 *
 * @returns The string date format like DD/MM/YYYY
 */
export function toDate({ date }: Options): string {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // --month having 0th-indexed
    const year = date.getFullYear()
  
    const formattedDate = `${day}/${month}/${year}`
    return formattedDate
}

console.log(toDate({ date: new Date() }))
