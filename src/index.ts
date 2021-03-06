type DurationSymbols = "Y" | "M" | "W" | "D" | "H" | "S";

interface DurationValues {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

interface DurationResults {
  duration: DurationValues;
  ms: number;
}

const timeMap = [
  { u: "years", ms: 31104000000 },
  { u: "months", ms: 2592000000 },
  { u: "weeks", ms: 604800000 },
  { u: "days", ms: 86400000 },
  { u: "hours", ms: 3600000 },
  { u: "minutes", ms: 60000 },
  { u: "seconds", ms: 1000 },
];

export const serialize = (d: DurationValues) => {
  const s = (val: number | undefined, symbol: DurationSymbols) =>
    !!val && String(val) + symbol;
  const str = [
    "P",
    s(d.years, "Y"),
    s(d.months, "M"),
    s(d.weeks, "W"),
    s(d.days, "D"),
    (d.hours || d.minutes || d.seconds) && "T",
    s(d.hours, "H"),
    s(d.minutes, "M"),
    s(d.seconds, "S"),
  ]
    .filter(Boolean)
    .join("");
  return str;
};

export const parse = (durationStr: string): DurationResults => {
  const regex = /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?(?:T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?)?/;
  const matches: RegExpMatchArray = durationStr.match(regex)!;
  const durationMatch: string[] = matches.slice(2, 9);
  const duration = {};
  let ms = 0;
  for (const idx in durationMatch) {
    if (durationMatch[idx]) {
      const unit = timeMap[idx].u;
      // @ts-ignore
      duration[unit] = durationMatch[idx];
      ms += Number(durationMatch[idx]) * timeMap[idx].ms;
    }
  }
  return { duration, ms };
};