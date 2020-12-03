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
export declare const serialize: (d: DurationValues) => string;
export declare const parse: (durationStr: string) => DurationResults;
export {};
