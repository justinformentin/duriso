type DurationSymbols = 'Y' | 'M' | 'W' | 'D' | 'H' | 'S';

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
}

const timeMap: Array<keyof DurationValues> = [
  'years',
  'months',
  'weeks',
  'days',
  'hours',
  'minutes',
  'seconds',
];

export const serialize = (d: DurationValues) => {
  const s = (val: number | undefined, symbol: DurationSymbols) =>
    !!val && String(val) + symbol;
  const str = [
    'P',
    s(d.years, 'Y'),
    s(d.months, 'M'),
    s(d.weeks, 'W'),
    s(d.days, 'D'),
    (d.hours || d.minutes || d.seconds) && 'T',
    s(d.hours, 'H'),
    s(d.minutes, 'M'),
    s(d.seconds, 'S'),
  ]
    .filter(Boolean)
    .join('');
  return str;
};

export const parse = (durationStr: string): DurationResults => {
  const regex =
    /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?(?:T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?)?/;
  const matches = durationStr.match(regex);

  if (!matches) {
    throw new Error(`Invalid ISO 8601 duration format: ${durationStr}`);
  }

  const durationMatch: string[] = matches.slice(2, 9);
  const duration: DurationValues = {};

  for (let i = 0; i < durationMatch.length; i++) {
    const value = durationMatch[i];
    if (value) {
      duration[timeMap[i]] = Number(value.replace(',', '.'));
    }
  }

  return { duration };
};
