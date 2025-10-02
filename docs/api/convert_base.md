## Function
```js
function convertBase(n: number | string, to: number, from: number = 10): string
```
Converts a number from one base to another.
## Parameters
| Parameter | Type | Default | Description |
| --------- | ------------------ | ------- | ----------------------------------------------------------------------- |
| `n` | `number | string` | – | the number to convert, can be a number or string. (123 or "2D4FH") |
| `to` | `number` | – | the base to convert **to** (e.g. `2` for binary, `16` for hexadecimal). |
| `from` | `number` | `10` | the base to convert **from**. |

## Example
```js
import { convertBase } from "numerica"

convertBase(255, 16) // FF
convertBase("FF", 10, 16) // 255
```