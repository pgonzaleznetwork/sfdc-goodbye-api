"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkSeparator = void 0;

var checkSeparator = function checkSeparator(separator) {
  if (!/^[^\n"]$/.test(separator)) {
    throw new Error('The separator must be single-character and cannot be a newline or double quotes');
  }
};

exports.checkSeparator = checkSeparator;