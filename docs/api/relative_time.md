## Function
```js
function relativeTime(date: Date, options?: Options): string
```
Returns the difference between two dates in a human-readable relative format.
## Parameters
| Parameter | Type | Default | Description |
| --------------- | ------- | ------------ | ----------------------------------------------------------------------- |
| `date` | Date | `—` | the target date to compare against `now`. |
| `now` | Date | `new Date()` | date to compare against (defaults to the current time). |
| `lod` | number | `1` | level of detail — how many units to include (e.g., `1 year, 2 months`). |
| `separator` | string | `", "` | string used to separate units. |
| `abbreviate` | boolean | `false` | whether to abbreviate units (e.g., `h` instead of `hour`). |
| `includeSuffix` | boolean | `true` | whether to include "ago"/"in". |

## Example
```js
import { relativeTime } from "numerica"

console.log(relativeTime(new  Date("2026-01-01"))) // in 3 months
console.log(relativeTime(new  Date("2026-01-01"), { abbreviate:  true })) // in 3mo
console.log(relativeTime(new  Date("2025-01-01"), { lod:  3 })) // 9 months, 4 days, 15 hours ago
console.log(relativeTime(new  Date("2026-01-01"), { includeSuffix:  false })) // 3 months
```