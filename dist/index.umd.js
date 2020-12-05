(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.duriso = {}));
}(this, (function (exports) { 'use strict';

    var timeMap = [{
      u: "years",
      ms: 31104000000
    }, {
      u: "months",
      ms: 2592000000
    }, {
      u: "weeks",
      ms: 604800000
    }, {
      u: "days",
      ms: 86400000
    }, {
      u: "hours",
      ms: 3600000
    }, {
      u: "minutes",
      ms: 60000
    }, {
      u: "seconds",
      ms: 1000
    }];
    var serialize = function serialize(d) {
      var s = function s(val, symbol) {
        return !!val && String(val) + symbol;
      };

      var str = ["P", s(d.years, "Y"), s(d.months, "M"), s(d.weeks, "W"), s(d.days, "D"), (d.hours || d.minutes || d.seconds) && "T", s(d.hours, "H"), s(d.minutes, "M"), s(d.seconds, "S")].filter(Boolean).join("");
      return str;
    };
    var parse = function parse(durationStr) {
      var regex = /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?(?:T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?)?/;
      var matches = durationStr.match(regex);
      var durationMatch = matches.slice(2, 9);
      var duration = {};
      var ms = 0;

      for (var idx in durationMatch) {
        if (durationMatch[idx]) {
          var unit = timeMap[idx].u; // @ts-ignore

          duration[unit] = durationMatch[idx];
          ms += Number(durationMatch[idx]) * timeMap[idx].ms;
        }
      }

      return {
        duration: duration,
        ms: ms
      };
    };

    exports.parse = parse;
    exports.serialize = serialize;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
