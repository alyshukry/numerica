## Function
```js
function separate(n: number, char?: string = ",", segment?: number = 3): string
```
Formats a number by inserting a separator character at regular intervals (default: thousands with commas).
## Parameters
| Parameter    | Type    | Default | Description |
|--------------|---------|---------|-------------|
| `n`          | number  | `—`       | number you'd like to format. |
| `char`    | string| `","` | separator character to insert.|
| `segment`  | number  | `3`   | how many digits per group. |

## Example
```js
import { separate } from "numerica"

console.log(separate(1000)) // 1,000
console.log(separate(123456789)) // 123,456,789
console.log(separate(123456789, ".")) // 123.456.789
console.log(separate(123456789, " ", 4)) // 1 2345 6789
```