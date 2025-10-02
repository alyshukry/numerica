## Function
```js
function  spell(n:  number, hyphens?:  boolean  =  false, and?:  boolean  =  false, separator?:  string  =  "  "):  string
```
Converts a number into its spelled-out English words.  
## Parameters
| Parameter    | Type    | Default | Description |
|--------------|---------|---------|-------------|
| `n`          | number  | `—`       | number you'd like to spell out. |
| `hyphens`    | boolean | `false` | whether to use hyphens in compound numbers (e.g., `twenty-one`). |
| `and`        | boolean | `false` | whether to include "and" in numbers (e.g., `one hundred and five`). |
| `separator`  | string  | `" "`   | string used to separate words. |

## Example
```js
import { spell } from "numerica"

console.log(spell(123)) // one hundred twenty three
console.log(spell(45, true)) // forty-five
console.log(spell(105, false, true)) // one hundred and five
console.log(spell(123456, false, false, "-")) // one-hundred-twenty-three-thousand-four-hundred-fifty-six
```
