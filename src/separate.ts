interface Options {
    char?: string,
    segment?: number
}

export function separate(
    n: number,
    {
        char = ",", 
        segment = 3

    }: Options = {}): string {
        
    const parts = n.toString().split(".")
    const regex = new RegExp(`\\B(?=(\\d{${segment}})+(?!\\d))`, "g")
    parts[0] = parts[0].replace(regex, char)
    return parts.join(".")
}