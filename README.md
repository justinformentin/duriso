# Duriso

A lightweight, 658 byte package for parsing and serializing [ISO 8601 Duration](https://en.wikipedia.org/wiki/ISO_8601#Durations) strings.

## Installation

```bash
npm install duriso
```

## Usage

### ES Modules (Recommended)

```js
import { serialize, parse } from "duriso";
```

### CommonJS

```js
const { serialize, parse } = require("duriso/index.cjs.js");
```

### UMD (Browser)

```html
<script src="https://unpkg.com/duriso/index.umd.js"></script>
<script>
  const { serialize, parse } = duriso;
</script>
```

## API Reference

### parse(durationString)

Parses an ISO 8601 duration string into a duration object.

**Parameters:**
- `durationString` (string): An ISO 8601 formatted duration string

**Returns:**
```typescript
{
  duration: {
    years?: number,
    months?: number,
    weeks?: number,
    days?: number,
    hours?: number,
    minutes?: number,
    seconds?: number
  }
}
```

### serialize(durationObject)

Serializes a duration object into an ISO 8601 duration string.

**Parameters:**
```typescript
{
  years?: number,
  months?: number,
  weeks?: number,
  days?: number,
  hours?: number,
  minutes?: number,
  seconds?: number
}
```

**Returns:**
- (string): An ISO 8601 formatted duration string

## Examples

### Serializing Duration Objects

```js
import { serialize } from "duriso";

// Full duration with all components
const fullDuration = {
  years: 3,
  months: 6,
  weeks: 2,
  days: 4,
  hours: 12,
  minutes: 30,
  seconds: 5
};

console.log(serialize(fullDuration));
// Output: "P3Y6M2W4DT12H30M5S"

// Time-only duration
const timeDuration = {
  hours: 12,
  minutes: 30,
  seconds: 5
};

console.log(serialize(timeDuration));
// Output: "PT12H30M5S"
```

### Parsing Duration Strings

```js
import { parse } from "duriso";

// Parse a full duration string
const fullParsed = parse("P3Y6M2W4DT12H30M5S");
console.log(fullParsed);
// Output:
// {
//   duration: {
//     years: 3,
//     months: 6,
//     weeks: 2,
//     days: 4,
//     hours: 12,
//     minutes: 30,
//     seconds: 5
//   }
// }

// Parse a time-only duration string
const timeParsed = parse("PT12H30M5S");
console.log(timeParsed);
// Output:
// {
//   duration: {
//     hours: 12,
//     minutes: 30,
//     seconds: 5
//   }
// }
```
