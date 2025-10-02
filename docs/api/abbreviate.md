## Function
```js
function abbreviate(n: number, d?: number = 1): string
```
Abbreviates large numbers into shorter forms (e.g., `1.2k`, `3.5m`).
## Parameters
|Parameter|Type|Default|Description|
|--|--|--|--|
|`n`|number|`—`|number you'd like to abbreviate.|
|`d`|number|`1`|number of decimals to include.|
## Example
```js
import { abbreviate } from "numerica"

console.log(abbreviate(132560)) // 132.6k
console.log(abbreviate(27829172, 3)) // 27.829m
console.log(abbreviate(3992992, 0)) // 4m
```