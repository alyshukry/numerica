
  
![npm](https://img.shields.io/npm/v/numerica) ![license](https://img.shields.io/badge/license-MIT-blue.svg) ![downloads](https://img.shields.io/npm/dt/numerica)

**Numerica** is a lightweight number formatting library for frontend developers. 

### 🚀 Installation:
Javascript:
```bash
npm  install  numerica
```
```js
import … from "numerica"
```

## 📖 API Reference (Not up to date!!!!)
```js
function abbreviate(n: number, d?: number = 1): string
```
Abbreviates large numbers into shorter forms (e.g., `1.2k`, `3.5m`).
|Parameter|Type|Default|Description|
|--|--|--|--|
|`n`|number|`—`|number you'd like to abbreviate.|
|`d`|number|`1`|number of decimals to include.|
**Example:**
```js
import { abbreviate } from "numerica"

console.log(abbreviate(132560)) // 132.6k
console.log(abbreviate(27829172, 3)) // 27.829m
console.log(abbreviate(3992992, 0)) // 4m
```
<br>
<hr>

```js
function  spell(n:  number, hyphens?:  boolean  =  false, and?:  boolean  =  false, separator?:  string  =  "  "):  string
```
Converts a number into its spelled-out English words.  

| Parameter    | Type    | Default | Description |
|--------------|---------|---------|-------------|
| `n`          | number  | `—`       | number you'd like to spell out. |
| `hyphens`    | boolean | `false` | whether to use hyphens in compound numbers (e.g., `twenty-one`). |
| `and`        | boolean | `false` | whether to include "and" in numbers (e.g., `one hundred and five`). |
| `separator`  | string  | `" "`   | string used to separate words. |

**Example:**
```js
import { spell } from "numerica"

console.log(spell(123)) // one hundred twenty three
console.log(spell(45, true)) // forty-five
console.log(spell(105, false, true)) // one hundred and five
console.log(spell(123456, false, false, "-")) // one-hundred-twenty-three-thousand-four-hundred-fifty-six
```
<br>
<hr>

```js
function separate(n: number, char?: string = ",", segment?: number = 3): string
```
Formats a number by inserting a separator character at regular intervals (default: thousands with commas).

| Parameter    | Type    | Default | Description |
|--------------|---------|---------|-------------|
| `n`          | number  | `—`       | number you'd like to format. |
| `char`    | string| `","` | separator character to insert.|
| `segment`  | number  | `3`   | how many digits per group. |

**Example:**
```js
import { separate } from "numerica"

console.log(separate(1000)) // 1,000
console.log(separate(123456789)) // 123,456,789
console.log(separate(123456789, ".")) // 123.456.789
console.log(separate(123456789, " ", 4)) // 1 2345 6789
```
<br>
<hr>

```js
function relativeTime(date: Date, options?: Options): string
```
Returns the difference between two dates in a human-readable relative format.

| Parameter | Type | Default | Description |
| --------------- | ------- | ------------ | ----------------------------------------------------------------------- |
| `date` | Date | `—` | the target date to compare against `now`. |
| `now` | Date | `new Date()` | date to compare against (defaults to the current time). |
| `lod` | number | `1` | level of detail — how many units to include (e.g., `1 year, 2 months`). |
| `separator` | string | `", "` | string used to separate units. |
| `abbreviate` | boolean | `false` | whether to abbreviate units (e.g., `h` instead of `hour`). |
| `includeSuffix` | boolean | `true` | whether to include "ago"/"in". |

**Example:**
```js
import { relativeTime } from "numerica"

console.log(relativeTime(new  Date("2026-01-01"))) // in 3 months
console.log(relativeTime(new  Date("2026-01-01"), { abbreviate:  true })) // in 3mo
console.log(relativeTime(new  Date("2025-01-01"), { lod:  3 })) // 9 months, 4 days, 15 hours ago
console.log(relativeTime(new  Date("2026-01-01"), { includeSuffix:  false })) // 3 months
```
<br>
<hr>

```js
function convertBase(n: number | string, to: number, from: number = 10): string
```
Converts a number from one base to another.

| Parameter | Type | Default | Description |
| --------- | ------------------ | ------- | ----------------------------------------------------------------------- |
| `n` | `number | string` | – | the number to convert, can be a number or string. (123 or "2D4FH") |
| `to` | `number` | – | the base to convert **to** (e.g. `2` for binary, `16` for hexadecimal). |
| `from` | `number` | `10` | the base to convert **from**. |

**Example:**
```js
import { convertBase } from "numerica"

convertBase(255, 16) // FF
convertBase("FF", 10, 16) // 255
```
<br>

**License:** MIT
<br>
**Contributing:** Contributions welcome! Please feel free to submit a Pull Request.