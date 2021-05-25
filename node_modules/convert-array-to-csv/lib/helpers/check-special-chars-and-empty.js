"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkSpecialCharsAndEmpty = void 0;
var SYMBOLS = '\\n"';

var checkSpecialCharsAndEmpty = function checkSpecialCharsAndEmpty(value) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var thisValue = value.toString().toLowerCase();
  var hasSpecialChars = false;

  if (typeof value === 'string') {
    var regexp = SYMBOLS;

    if (typeof separator !== 'undefined' && separator !== null && !SYMBOLS.includes(separator)) {
      regexp += separator;
    }

    hasSpecialChars = thisValue.length === 0 || new RegExp("[".concat(regexp, "]")).test(thisValue);
  }

  return hasSpecialChars;
};

exports.checkSpecialCharsAndEmpty = checkSpecialCharsAndEmpty;