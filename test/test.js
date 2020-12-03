const test = require("tape");
const duration = require("../dist/index.js");
const parse = duration.parse;
const serialize = duration.serialize;

const fullMs = 110464205000;

const semiMs = 45005000;

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

test("Parse Full", (t) => {
  t.plan(1);
  const outputObj = parse(fullDurationStr);
  t.equal(JSON.stringify(outputObj.duration), JSON.stringify(fullDurationObj));
});

test("Milliseconds Full", (t) => {
  t.plan(1);
  const outputObj = parse(fullDurationStr);
  t.equal(outputObj.ms, fullMs);
});

test("Serialize Full", (t) => {
  t.plan(1);
  const outputStr = serialize(fullDurationObj);
  t.equal(outputStr, fullDurationStr);
});

test("Parse Semi", (t) => {
  t.plan(1);
  const outputObj = parse(semiDurationStr);
  t.equal(JSON.stringify(outputObj.duration), JSON.stringify(semiDurationObj));
});

test("Milliseconds Semi", (t) => {
  t.plan(1);
  const outputObj = parse(semiDurationStr);
  t.equal(outputObj.ms, semiMs);
});

test("Serialize Semi", (t) => {
  t.plan(1);
  const outputStr = serialize(semiDurationObj);
  t.equal(outputStr, semiDurationStr);
});
