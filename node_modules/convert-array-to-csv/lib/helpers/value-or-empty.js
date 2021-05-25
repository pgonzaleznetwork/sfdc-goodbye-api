"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valueOrEmpty = void 0;

var valueOrEmpty = function valueOrEmpty(data) {
  if (data || data === false || data === 0) {
    return data;
  }

  return '';
};

exports.valueOrEmpty = valueOrEmpty;