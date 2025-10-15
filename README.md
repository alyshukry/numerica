<p align="center">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset=".github/assets/logo-dark.svg">
        <source media="(prefers-color-scheme: light)" srcset=".github/assets/logo-light.svg">
        <img alt="numerica logo" src="assets/logo-light.svg" width="400">
    </picture>
    A utility library for number formatting.<br>String-to-number parsing coming soon.
</p>

## Navigation
1. [Documentation](https://numerica.js.org)
2. [Contributing](https://github.com/alyshukry/numerica?tab=contributing-ov-file#collaborating-guide)
3. [License](https://github.com/alyshukry/numerica?tab=MIT-1-ov-file)
## Installation
Javascript:
```bash
npm  install  numerica
```
```js
import … from  "numerica"
```
## Examples
```js
toAbbreviated(12345, { d: 1 }) // Returns "12.3k"
toAbbreviated(1000000) // Returns "1m"
```
```js
toWords(12345, { and: true, hyphen: true }) // Returns "twelve thousand three hundred and forty-five"
toWords(54321, { space: "_" }) // Returns "fifty four thousand three hundred twenty one"
```
```js
toRelativeTime(new Date(Date.now() - (DAY + HOUR + MINUTE)), { lod: 3, separator: ' • ' }) // Returns "1 day • 1 hour • 1 minute ago"
toRelativeTime(new Date(Date.now() - 1000)) // Returns "just now"
```
```js
toGrouped(12345, { segment: 3, char: "." }) // Returns "12.345"
toGrouped(0100100001101001, { segment: 8, char: " " }) // Returns "01001000 01101001"
```
```js
toFraction(2.5, { mixed: true, pretty: true }) // Returns "2 1⁄2"
toFraction(2.5, { symbol: "|" }) // Returns "5|2"
```
```js
toBase("HELLO", 36, 10) // Returns "1495338607"
toBase(123, 10, 2) // Returns "1111011"
```