# Duriso

A 1KB package for parsing and serializing [ISO 8601 Duration](https://en.wikipedia.org/wiki/ISO_8601#Durations) strings.

This package is just for some quick, unimportant conversions. Never use random packages you find on NPM for mission critical time/date conversions.

## Usage

### UMD

```html
<script src="https://unpkg.com/duriso/index.umd.js"></script>
<script>
  const { serialize, parse } = duriso;
</script>
```

### CJS

```js
const duriso = require("duriso/index.cjs.js");
const { serialize, parse } = duriso;
```

### ESM

```js
import { serialize, parse } from "duriso";
```

## Examples

```js
const fullDurationStr = "P3Y6M2W4DT12H30M5S";

const semiDurationStr = "PT12H30M5S";

const fullDurationObj = {
  years: "3",
  months: "6",
  weeks: "2",
  days: "4",
  hours: "12",
  minutes: "30",
  seconds: "5",
};

const semiDurationObj = {
  hours: "12",
  minutes: "30",
  seconds: "5",
};

const serializedSemi = serialize(semiDurationObj);
// PT12H30M5S

const serializedFull = serialize(fullDurationObj);
// P3Y6M2W4DT12H30M5S

const parsedSemi = parse(durationString);
// {
//    ms: 45005000,
//    duration: {
//      hours: 12
//      minutes: 30
//      seconds: 5
//    }
// }

const parsedFull = parse(durationString);
// {
//    ms: 110464205000,
//    duration: {
//      years: 3
//      months: 6
//      weeks: 2
//      days: 4
//      hours: 12
//      minutes: 30
//      seconds: 5
//    }
// }
```

## Parse

parse(string): {
  ms: number,
  duration: {
    years?: string;
    months?: string;
    weeks?: string;
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
  }
}

## Serialize

serialize({
  years?: string;
  months?: string;
  weeks?: string;
  days?: string;
  hours?: string;
  minutes?: string;
  seconds?: string;
}): string

## Warning

The millisecond conversion for `months` and `years` is inaccurate because the conversion is assuming 30 days in a month.
